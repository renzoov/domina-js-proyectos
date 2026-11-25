// ─────────────────────────────────────────────────────────────
// La demo de zona-toasts. Este archivo ya está hecho: conecta los botones
// de la página con tu librería, muestra la cola y el código de cada aviso.
//
// «import * as libreria» trae todo lo que exporta zona-toasts.js en un
// objeto. Mientras construyes la librería, lo que todavía no exportas
// simplemente no está (libreria.toasts es undefined), y la demo te lo dice
// en vez de romperse.
// ─────────────────────────────────────────────────────────────

import * as libreria from './zona-toasts.js';

const zona = document.querySelector('zona-toasts');
const cola = document.querySelector('[data-cola]');
const cuenta = document.querySelector('[data-cuenta]');
const vacia = document.querySelector('[data-vacia]');
const codigo = document.querySelector('[data-codigo]');
const respuesta = document.querySelector('[data-respuesta]');
const avisoDemo = document.querySelector('[data-aviso-demo]');
const plantillaFila = document.querySelector('#fila-cola');
const pocoMovimiento = matchMedia('(prefers-reduced-motion: reduce)');

const DESTINOS = [
  { titulo: 'Llegaste a Cusco', texto: '3 400 m sobre el mar. Tómalo con calma.', foto: 'fotos/cusco.jpg', acciones: ['Ver fotos', 'Más tarde'], duracion: 8000 },
  { titulo: 'Foto guardada', texto: 'Machu Picchu está en tu álbum.', foto: 'fotos/machu-picchu.jpg', tipo: 'exito' },
  { titulo: 'Huacachina', texto: 'El oasis está a 5 km de Ica.', foto: 'fotos/huacachina.jpg', acciones: ['Cómo llegar'] },
  { titulo: 'Arequipa', texto: 'La ciudad blanca, a 2 335 m.', foto: 'fotos/arequipa.jpg' },
  { titulo: 'Lima', texto: 'Tu vuelo sale mañana a las 7:40.', foto: 'fotos/lima.jpg', acciones: ['Ver vuelo'] },
];
let siguienteDestino = 0;

const EJEMPLOS = {
  exito: () => ({ tipo: 'exito', titulo: 'Cambios guardados', texto: 'Tu viaje se actualizó.' }),
  error: () => ({ tipo: 'error', titulo: 'No se pudo subir la foto', texto: 'Revisa tu conexión e inténtalo de nuevo.', acciones: ['Reintentar'] }),
  foto: () => DESTINOS[siguienteDestino++ % DESTINOS.length],
};

// ── El código del último aviso ──────────────────────────────
// El bloque «Código» muestra la llamada que hizo el último botón, y debajo,
// lo que respondió esa misma llamada (las demás no lo pisan).

const escapar = (texto) => String(texto).replace(/[&<>]/g, (letra) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[letra]);
const valorEnCodigo = (valor) => {
  if (typeof valor === 'number') return `<span class="n">${valor}</span>`;
  if (Array.isArray(valor)) return `[${valor.map(valorEnCodigo).join(', ')}]`;
  return `<span class="s">"${escapar(valor)}"</span>`;
};
const objetoEnCodigo = (objeto, sangria) => Object.entries(objeto)
  .map(([clave, valor]) => `${sangria}${clave}: ${valorEnCodigo(valor)},`)
  .join('\n');
const IMPORTAR = '<span class="k">import</span> toasts <span class="k">from</span> <span class="s">"./zona-toasts.js"</span>;\n\n';

let llamadaActual = 0;

function mostrarCodigo(texto) {
  llamadaActual += 1;
  codigo.innerHTML = IMPORTAR + texto;
  respuesta.textContent = 'esperando…';
  return llamadaActual;
}

function anotarRespuesta(llamada, resultado) {
  if (llamada === llamadaActual) respuesta.textContent = JSON.stringify(resultado);
}

// ── Probar ──────────────────────────────────────────────────

function faltaLibreria(paso) {
  avisoDemo.hidden = false;
  avisoDemo.textContent = `Tu librería todavía no exporta esto: llega en el paso ${paso}. Mientras tanto, prueba cada paso en la consola.`;
}

/** Muestra un aviso con la librería; si conCodigo, lo pone en el bloque de código */
async function probar(opciones, conCodigo = true) {
  if (!libreria.toasts) return faltaLibreria(8);
  const llamada = conCodigo
    ? mostrarCodigo(`<span class="k">const</span> respuesta = <span class="k">await</span> toasts.<span class="f">mostrar</span>({\n${objetoEnCodigo(opciones, '  ')}\n});`)
    : null;
  const resultado = await libreria.toasts.mostrar(opciones);
  if (llamada) anotarRespuesta(llamada, resultado);
}

function probarCargando() {
  if (!libreria.toasts?.cargando) return faltaLibreria(10);
  const llamada = mostrarCodigo(
    '<span class="k">const</span> respuesta = <span class="k">await</span> toasts.<span class="f">cargando</span>(subirFotos, {\n'
    + `  cargando: { titulo: ${valorEnCodigo('Subiendo 3 fotos…')} },\n`
    + `  exito: (n) =&gt; ({ titulo: <span class="s">\`\${n} fotos subidas\`</span> }),\n`
    + `  error: { titulo: ${valorEnCodigo('No se pudieron subir')} },\n});`,
  );
  // Una función: la subida empieza cuando el aviso entra en la escena, no cuando se pide
  const subirFotos = () => new Promise((cumplir) => setTimeout(() => cumplir(3), 2500));
  libreria.toasts.cargando(subirFotos, {
    cargando: { titulo: 'Subiendo 3 fotos…', texto: 'No cierres la página.' },
    exito: (cantidad) => ({ titulo: `${cantidad} fotos subidas`, texto: 'Ya están en tu álbum.' }),
    error: { titulo: 'No se pudieron subir', texto: 'Inténtalo de nuevo.' },
  }).then((resultado) => anotarRespuesta(llamada, resultado));
}

document.querySelector('.botones').addEventListener('click', (evento) => {
  const boton = evento.target.closest('[data-probar]');
  if (!boton) return;
  const tipo = boton.dataset.probar;
  if (tipo === 'cargando') probarCargando();
  else if (tipo === 'viaje') DESTINOS.forEach((destino, i) => probar(destino, i === 0));
  else probar(EJEMPLOS[tipo]());
});

// ── La cola a la vista ──────────────────────────────────────
// La librería avisa cada cambio con su evento propio «cambio». Cuando el
// primero de la cola pasa a la escena, una copia de su fila viaja desde el
// panel hasta el lugar donde aparece el aviso.

let primeroEsperando = null;

function crearFila(opciones, i) {
  const fila = plantillaFila.content.firstElementChild.cloneNode(true);
  fila.classList.toggle('siguiente', i === 0);
  fila.querySelector('[data-titulo]').textContent = opciones.titulo;
  fila.querySelector('[data-estado]').textContent = i === 0 ? 'Sale cuando se cierre uno' : 'En espera';
  fila.querySelector('[data-orden]').textContent = i === 0 ? 'siguiente' : `#${i + 1}`;
  const foto = fila.querySelector('[data-foto]');
  if (opciones.foto) {
    foto.style.backgroundImage = `url("${opciones.foto}")`;
  } else {
    // Sin foto, la fila muestra el ícono de su tipo
    const tipo = ['error', 'exito', 'cargando'].includes(opciones.tipo) ? opciones.tipo : 'info';
    foto.classList.add('ico', tipo);
    foto.innerHTML = `<svg aria-hidden="true"><use href="#i-${tipo === 'info' ? 'foto' : tipo}" /></svg>`;
  }
  return fila;
}

function viajar(fila, desde, titulo) {
  if (pocoMovimiento.matches || matchMedia('(max-width: 1000px)').matches) return;
  requestAnimationFrame(() => {
    const aviso = [...zona.shadowRoot.querySelectorAll('.aviso')].find((a) => a.querySelector('.titulo')?.textContent === titulo);
    if (!aviso) return;
    const hasta = aviso.getBoundingClientRect();
    const fantasma = document.createElement('ol');
    fantasma.className = 'fantasma';
    fantasma.setAttribute('aria-hidden', 'true');
    fantasma.style.cssText = `left:${desde.left}px;top:${desde.top}px;width:${desde.width}px`;
    fantasma.append(fila);
    document.body.append(fantasma);
    aviso.style.visibility = 'hidden';
    const viaje = fantasma.animate([
      { transform: 'none', opacity: 1 },
      { transform: `translate(${hasta.left - desde.left}px, ${hasta.top - desde.top}px) scale(${hasta.width / desde.width})`, opacity: 0.25 },
    ], { duration: 520, easing: 'cubic-bezier(.5, 0, .2, 1)' });
    viaje.finished.finally(() => {
      fantasma.remove();
      aviso.style.visibility = '';
    });
  });
}

zona.addEventListener('cambio', (evento) => {
  const { visibles, esperando } = evento.detail;
  const filaSiguiente = cola.querySelector('.fila.siguiente');
  const salio = primeroEsperando && visibles.includes(primeroEsperando) && filaSiguiente;
  const desde = salio ? filaSiguiente.getBoundingClientRect() : null;
  const titulo = salio ? primeroEsperando.titulo : '';

  cuenta.textContent = esperando.length;
  vacia.hidden = esperando.length > 0;
  cola.replaceChildren(...esperando.map(crearFila));
  primeroEsperando = esperando[0] ?? null;

  if (salio) viajar(filaSiguiente, desde, titulo);
});

// Al abrir, un viaje entero: dos avisos a la vista y tres en la cola
if (libreria.toasts) setTimeout(() => DESTINOS.forEach((destino, i) => probar(destino, i === 0)), 500);
