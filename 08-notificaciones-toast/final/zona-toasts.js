// ─────────────────────────────────────────────────────────────
// zona-toasts: una librería de avisos que se reutiliza
// Proyecto 8 de domina-js: https://domina-js.pages.dev/proyectos
//
// Este archivo es un módulo: lo que lleva «export» se puede importar desde
// otros archivos (la demo, o cualquier otro proyecto). Lo demás queda adentro.
//
// El código va en el orden en que se construye en la guía.
// Cada parte empieza con «PASO n» y termina con «FIN PASO n».
// Una línea que termina en «// PASO n» se agrega más tarde, en ese paso,
// dentro de código que ya estaba escrito.
// ─────────────────────────────────────────────────────────────


// PASO 1: html``, una etiqueta que escapa lo que viene de afuera
// Los avisos se arman con HTML, y su texto puede venir de cualquier lado: algo
// que escribió una persona o la respuesta de un servidor. Si llega «<img src=x
// onerror=...>» y lo pegamos tal cual, el navegador lo ejecuta.
// Una template tag recibe por separado las partes fijas (que escribimos
// nosotros) y los valores (que vienen de afuera), así puede escapar solo los
// valores. Devuelve un HTMLSeguro: si lo pones dentro de otro html``, ya no se
// vuelve a escapar.

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function escapar(valor) {
  return String(valor).replace(/[&<>"']/g, (letra) => ESCAPES[letra]);
}

class HTMLSeguro {
  constructor(texto) {
    this.texto = texto;
  }
  toString() {
    return this.texto;
  }
}

function aTexto(valor) {
  if (valor instanceof HTMLSeguro) return valor.texto;
  if (Array.isArray(valor)) return valor.map(aTexto).join('');
  if (valor === false || valor === null || valor === undefined) return '';
  return escapar(valor);
}

export function html(partes, ...valores) {
  let salida = partes[0];
  valores.forEach((valor, i) => {
    salida += aTexto(valor) + partes[i + 1];
  });
  return new HTMLSeguro(salida);
}
// FIN PASO 1


// PASO 2: el HTML de un aviso
// crearAviso arma el <div> de un aviso con html``: la foto o el ícono de su
// tipo, el título, el texto, los botones de acción, la X para cerrar y la barra
// del tiempo. Cada botón lleva su respuesta en data-accion.
// Un error se anuncia con role="alert" (el lector de pantalla interrumpe); los
// demás, con role="status" (lo lee cuando termina lo que estaba leyendo).

const ICONOS = {
  exito: html`<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>`,
  error: html`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v6M12 16.5v.5" /></svg>`,
  info: html`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5v.5" /></svg>`,
  cargando: html`<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 1-9 9" /></svg>`,
};
const CERRAR = html`<svg viewBox="0 0 24 24"><path d="M7 7l10 10M17 7L7 17" /></svg>`;

let contador = 0;

export function crearAviso(opciones) {
  const { tipo = 'info', titulo = '', texto = '', foto = '', acciones = [] } = opciones;
  const aviso = document.createElement('div');
  aviso.className = `aviso ${tipo}`;
  aviso.id = `aviso-${++contador}`;
  aviso.setAttribute('role', tipo === 'error' ? 'alert' : 'status');
  aviso.innerHTML = html`
    ${foto ? html`<img class="foto" src="${foto}" alt="" />` : html`<span class="icono">${ICONOS[tipo] ?? ICONOS.info}</span>`}
    <div class="cuerpo">
      <b class="titulo">${titulo}</b>
      ${texto && html`<p class="texto">${texto}</p>`}
      ${acciones.length > 0 && html`
        <div class="acciones">
          ${acciones.map((accion, i) => html`<button type="button" class="${i === 0 ? 'primaria' : ''}" data-accion="${accion}">${accion}</button>`)}
        </div>`}
    </div>
    <button type="button" class="cerrar" data-accion="cerrado" aria-label="Cerrar el aviso">${CERRAR}</button>
    <span class="tiempo" aria-hidden="true"></span>`;
  return aviso;
}
// FIN PASO 2


// PASO 3: abrir un aviso y esperar la respuesta
// abrirAviso pone el aviso en la lista y devuelve un objeto con el elemento,
// cerrar() y una promesa que se cumple cuando el aviso se cierra, con lo que
// eligió la persona («Ver fotos», «cerrado»…).
// Promise.withResolvers (ES2024) entrega la promesa y su resolve por separado:
// así cerrar() puede cumplirla desde afuera, cuando sea que ocurra.

export function abrirAviso(lista, opciones) {
  const elemento = crearAviso(opciones);
  const { promise, resolve } = Promise.withResolvers();
  const aviso = { opciones, elemento, promesa: promise, cerrado: false };

  aviso.cerrar = async (respuesta) => {
    if (aviso.cerrado) return;
    aviso.cerrado = true;
    aviso.reloj?.cancel(); // PASO 4
    await salir(elemento, aviso.desplazado); // PASO 5
    elemento.remove();
    resolve(respuesta);
  };

  elemento.addEventListener('click', (evento) => {
    const boton = evento.target.closest('[data-accion]');
    if (boton) aviso.cerrar(boton.dataset.accion);
  });

  lista.append(elemento);
  entrar(elemento); // PASO 5
  programarCierre(aviso); // PASO 4
  permitirDeslizar(aviso); // PASO 6
  if (opciones.esperar) esperarYCambiar(aviso); // PASO 10
  return aviso;
}
// FIN PASO 3


// PASO 4: el tiempo, que se detiene si lo estás mirando
// La barra de abajo se achica con animate(), y esa misma animación es el reloj:
// cuando termina (finished), el aviso se cierra. Pausar la animación pausa el
// reloj, así que no hay que llevar la cuenta de cuánto falta.
// Se pausa con el mouse encima o con el foco adentro (alguien está leyendo o
// va a tocar un botón), y sigue al salir. duracion: 0 = no se cierra solo.

export function programarCierre(aviso) {
  const { duracion = aviso.opciones.acciones?.length ? 8000 : 5000 } = aviso.opciones;
  if (!duracion) return;
  const barra = aviso.elemento.querySelector('.tiempo');
  aviso.reloj = barra.animate([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)' }], { duration: duracion, fill: 'forwards' });
  // Si el reloj se cancela (el aviso se cerró antes), finished se rechaza: no es un error
  aviso.reloj.finished.then(() => aviso.cerrar('tiempo'), () => {});

  const pausar = () => aviso.reloj.pause();
  const seguir = () => {
    if (!aviso.elemento.matches(':hover, :focus-within')) aviso.reloj.play();
  };
  aviso.elemento.addEventListener('pointerenter', pausar);
  aviso.elemento.addEventListener('pointerleave', seguir);
  aviso.elemento.addEventListener('focusin', pausar);
  aviso.elemento.addEventListener('focusout', seguir);
}
// FIN PASO 4


// PASO 5: entrar y salir con Web Animations
// Al entrar, el aviso baja un poco y aparece. Al salir, se va hacia la derecha
// y su alto baja a cero, para que los de abajo suban suave en vez de saltar.
// salir() devuelve la promesa de la animación: cerrar() la espera antes de
// quitar el elemento. Si la persona pidió menos movimiento, no se anima.

const pocoMovimiento = matchMedia('(prefers-reduced-motion: reduce)');

export function entrar(elemento) {
  if (pocoMovimiento.matches) return;
  elemento.animate(
    [{ opacity: 0, transform: 'translateY(-14px) scale(.97)' }, { opacity: 1, transform: 'none' }],
    { duration: 320, easing: 'cubic-bezier(.2, .8, .2, 1)' },
  );
}

export async function salir(elemento, desplazado = 0) {
  if (pocoMovimiento.matches) return;
  const alto = elemento.offsetHeight;
  await elemento.animate(
    [
      { opacity: desplazado ? 0.5 : 1, transform: `translateX(${desplazado}px)`, height: `${alto}px`, marginBottom: '12px' },
      { opacity: 0, transform: `translateX(${desplazado ? '110%' : '28px'})`, height: '0px', marginBottom: '0px', paddingTop: '0px', paddingBottom: '0px' },
    ],
    { duration: 280, easing: 'cubic-bezier(.4, 0, 1, 1)', fill: 'forwards' },
  ).finished;
}
// FIN PASO 5


// PASO 6: deslizar para cerrar, con el dedo o con el mouse
// Pointer Events tratan igual al dedo, al mouse y al lápiz. Al apretar,
// setPointerCapture hace que el aviso siga recibiendo el movimiento aunque el
// puntero se salga de él. Mientras arrastras, el aviso sigue al puntero (solo
// hacia la derecha) y se desvanece. Si lo sueltas pasada la mitad, se cierra;
// si no, vuelve a su lugar. Los botones siguen funcionando con un clic.

export function permitirDeslizar(aviso) {
  const { elemento } = aviso;
  let inicio = null;

  elemento.addEventListener('pointerdown', (evento) => {
    if (evento.button !== 0 || evento.target.closest('button')) return;
    inicio = evento.clientX;
    try {
      elemento.setPointerCapture(evento.pointerId);
    } catch {
      // Un puntero sintético (de una prueba) no se puede capturar: no importa
    }
    elemento.classList.add('arrastrando');
    aviso.reloj?.pause();
  });

  elemento.addEventListener('pointermove', (evento) => {
    if (inicio === null) return;
    const distancia = Math.max(0, evento.clientX - inicio);
    elemento.style.transform = `translateX(${distancia}px)`;
    elemento.style.opacity = String(1 - distancia / elemento.offsetWidth);
  });

  const soltar = (evento) => {
    if (inicio === null) return;
    const distancia = Math.max(0, evento.clientX - inicio);
    inicio = null;
    elemento.classList.remove('arrastrando');
    if (distancia > elemento.offsetWidth / 2) {
      aviso.desplazado = distancia;
      aviso.cerrar('cerrado');
      return;
    }
    elemento.style.transform = '';
    elemento.style.opacity = '';
    if (!pocoMovimiento.matches) {
      elemento.animate([{ transform: `translateX(${distancia}px)` }, { transform: 'none' }], { duration: 220, easing: 'ease-out' });
    }
    aviso.reloj?.play();
  };
  elemento.addEventListener('pointerup', soltar);
  elemento.addEventListener('pointercancel', soltar);
}
// FIN PASO 6


// PASO 7: <zona-toasts>, un elemento propio con su cola
// Un Web Component es una clase que extiende HTMLElement y se registra con un
// nombre (con guion). Su Shadow DOM es un HTML privado: los estilos de la
// página no entran y los de la librería no salen. Los estilos de los avisos
// están en zona-toasts.css, al lado de este archivo: import.meta.url es la
// dirección de este módulo, y con ella armamos la del CSS.
// La cola: se ven como mucho `maximo` avisos; los demás esperan en orden y
// salen cuando se cierra uno. Cada cambio se avisa con un evento propio,
// «cambio», para que la página pueda mostrar la cola.

const ESTILOS = new URL('./zona-toasts.css', import.meta.url).href;

export class ZonaToasts extends HTMLElement {
  #lista;
  #visibles = [];
  #cola = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = String(html`<link rel="stylesheet" href="${ESTILOS}" /><div class="lista"></div>`);
    this.#lista = this.shadowRoot.querySelector('.lista');
  }

  get maximo() {
    return Number(this.getAttribute('maximo')) || 3;
  }

  set maximo(valor) {
    this.setAttribute('maximo', valor);
  }

  connectedCallback() {
    escucharEscape(this); // PASO 9
  }

  mostrar(opciones) {
    const { promise, resolve } = Promise.withResolvers();
    this.#cola.push({ opciones, resolve });
    this.#avanzar();
    return promise;
  }

  cerrarUltimo() {
    this.#visibles.at(-1)?.cerrar('cerrado');
  }

  #avanzar() {
    while (this.#visibles.length < this.maximo && this.#cola.length > 0) {
      const { opciones, resolve } = this.#cola.shift();
      const aviso = abrirAviso(this.#lista, opciones);
      this.#visibles.push(aviso);
      aviso.promesa.then((respuesta) => {
        this.#visibles = this.#visibles.filter((otro) => otro !== aviso);
        resolve(respuesta);
        this.#avanzar();
      });
    }
    this.dispatchEvent(new CustomEvent('cambio', {
      detail: {
        visibles: this.#visibles.map((aviso) => aviso.opciones),
        esperando: this.#cola.map((pendiente) => pendiente.opciones),
      },
    }));
  }
}

if (!customElements.get('zona-toasts')) customElements.define('zona-toasts', ZonaToasts);
// FIN PASO 7


// PASO 8: la puerta de entrada: export const toasts
// Quien use la librería no tiene que buscar el elemento: importa toasts y
// llama a toasts.mostrar(...). Si la página no tiene un <zona-toasts>, se crea
// uno al final del <body>. exito() y error() son atajos.
// También se exporta por defecto: import toasts from './zona-toasts.js'.

function zona() {
  return document.querySelector('zona-toasts') ?? document.body.appendChild(document.createElement('zona-toasts'));
}

export const toasts = {
  mostrar: (opciones) => zona().mostrar(opciones),
  exito: (titulo, otras = {}) => zona().mostrar({ ...otras, tipo: 'exito', titulo }),
  error: (titulo, otras = {}) => zona().mostrar({ ...otras, tipo: 'error', titulo }),
  cargando: (tarea, textos) => zona().mostrar({ duracion: 0, ...textos.cargando, tipo: 'cargando', esperar: tarea, exito: textos.exito, error: textos.error }), // PASO 10
};

export default toasts;
// FIN PASO 8


// PASO 9: Escape cierra el último aviso
// Con el teclado no hay que perseguir la X: Escape cierra el aviso más nuevo.
// Si otra parte de la página ya usó el Escape (un diálogo abierto, por
// ejemplo, que llama a preventDefault), el aviso no se entera.

export function escucharEscape(zonaToasts) {
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && !evento.defaultPrevented) zonaToasts.cerrarUltimo();
  });
}
// FIN PASO 9


// PASO 10: un aviso que espera: cargando, y después éxito o error
// toasts.cargando(tarea, textos) muestra un aviso que no se cierra solo
// mientras la tarea está pendiente. Cuando termina, el mismo aviso cambia en
// su lugar: a éxito con el valor, o a error con el motivo. Los textos de
// éxito y error pueden ser funciones que reciben ese valor.
// La tarea puede ser una promesa o una función que la devuelve: con una
// función, el trabajo empieza recién cuando el aviso sale de la cola.

export function actualizarAviso(aviso, cambios) {
  aviso.opciones = { ...aviso.opciones, ...cambios };
  const nuevo = crearAviso(aviso.opciones);
  aviso.elemento.className = nuevo.className;
  aviso.elemento.setAttribute('role', nuevo.getAttribute('role'));
  aviso.elemento.replaceChildren(...nuevo.childNodes);
  programarCierre(aviso);
}

async function esperarYCambiar(aviso) {
  const { esperar, exito = {}, error = {} } = aviso.opciones;
  const textos = (plantilla, valor) => (typeof plantilla === 'function' ? plantilla(valor) : plantilla);
  try {
    const valor = await (typeof esperar === 'function' ? esperar() : esperar);
    actualizarAviso(aviso, { tipo: 'exito', duracion: undefined, ...textos(exito, valor) });
  } catch (motivo) {
    actualizarAviso(aviso, { tipo: 'error', duracion: undefined, ...textos(error, motivo) });
  }
}
// FIN PASO 10
