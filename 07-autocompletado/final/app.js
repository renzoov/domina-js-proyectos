// ─────────────────────────────────────────────────────────────
// Buscador con autocompletado: Viaja a un artículo
// Proyecto 7 de domina-js: https://domina-js.pages.dev/proyectos
//
// El código va en el orden en que se construye en la guía.
// Cada parte empieza con «PASO n» y termina con «FIN PASO n».
// Una línea que termina en «// PASO n» se agrega más tarde, en ese paso,
// dentro de código que ya estaba escrito.
// ─────────────────────────────────────────────────────────────


// PASO 1: las direcciones de Wikipedia, el estado y los elementos
// Wikipedia tiene dos servicios abiertos y sin clave que permiten CORS:
// uno busca títulos mientras escribes y otro da el resumen de un artículo.

const BUSQUEDA = 'https://es.wikipedia.org/w/rest.php/v1/search/title';
const RESUMEN = 'https://es.wikipedia.org/api/rest_v1/page/summary/';
const LIMITE = 8;     // cuántos resultados pedir
const ESPERA = 250;   // milisegundos sin escribir antes de buscar
const MINIMO = 2;     // letras mínimas para buscar

const estado = {
  consulta: '',     // lo que se buscó por última vez
  resultados: [],   // los billetes que se ven
  activo: -1,       // el billete marcado con el teclado (-1: ninguno)
};

const campo = document.querySelector('#campo');
const borrar = document.querySelector('#borrar');
const estadoTexto = document.querySelector('#estado');
const lista = document.querySelector('#billetes');
const aviso = document.querySelector('#aviso');
const elegido = document.querySelector('#elegido');
const fotoBienvenida = document.querySelector('#foto-bienvenida');
const plantillaBillete = document.querySelector('#plantilla-billete');
const plantillaElegido = document.querySelector('#plantilla-elegido');
// FIN PASO 1


// PASO 2: debounce, una función que espera a que dejes de escribir
// Si buscáramos con cada tecla, «machu picchu» serían 12 pedidos a Wikipedia.
// debounce devuelve una función nueva que, cada vez que la llamas, cancela
// la espera anterior y empieza otra. Solo cuando pasan `ms` milisegundos sin
// llamadas, llama a `fn`. La variable `espera` vive en el closure: cada
// función que devuelve debounce tiene la suya, y nadie más la ve.

function debounce(fn, ms) {
  let espera;
  return (...argumentos) => {
    clearTimeout(espera);
    espera = setTimeout(() => fn(...argumentos), ms);
  };
}
// FIN PASO 2


// PASO 3: pedir los resultados a Wikipedia
// La respuesta trae una lista `pages`. De cada página nos quedamos con su
// clave (para pedir el resumen), su título, su descripción y su foto.
// Las fotos llegan de 60 px de ancho y con una dirección que empieza con //:
// fotoDeTamano pide otro tamaño y, con new URL, la completa con https.

function fotoDeTamano(direccion, ancho) {
  return new URL(direccion.replace(/\/\d+px-/, `/${ancho}px-`), 'https://es.wikipedia.org').href;
}

async function pedirResultados(texto, senal) {
  const parametros = new URLSearchParams({ q: texto, limit: LIMITE });
  const respuesta = await fetch(`${BUSQUEDA}?${parametros}`, { signal: senal });
  if (!respuesta.ok) throw new Error(`Wikipedia respondió con el código ${respuesta.status}`);
  const { pages } = await respuesta.json();
  return pages.map((pagina) => ({
    clave: pagina.key,
    titulo: pagina.title,
    descripcion: pagina.description ?? '',
    foto: pagina.thumbnail ? fotoDeTamano(pagina.thumbnail.url, 250) : null,
  }));
}
// FIN PASO 3


// PASO 4: buscar mientras escribes, cancelando lo viejo
// Con debounce ya no se pide con cada tecla, pero las respuestas pueden
// llegar desordenadas: la de «li» podría llegar después de la de «lima» y
// pisarla. Por eso, antes de cada búsqueda nueva, se cancela la anterior con
// su AbortController. AbortSignal.any junta esa señal con un límite de tiempo.
// La caché guarda cada búsqueda hecha: si vuelves a escribirla, no se pide.

const cache = new Map();
let pedido = null;

async function buscar(texto) {
  const consulta = texto.trim();
  estado.consulta = consulta;
  pedido?.abort();
  if (consulta.length < MINIMO) {
    estado.resultados = [];
    pintarBilletes(); // PASO 5
    if (!consulta) mostrarSugeridos(); // PASO 10
    return;
  }
  const clave = consulta.toLowerCase();
  if (cache.has(clave)) {
    estado.resultados = cache.get(clave);
    pintarBilletes(); // PASO 5
    return;
  }
  pedido = new AbortController();
  mostrarEspera(); // PASO 5
  try {
    const resultados = await pedirResultados(consulta, AbortSignal.any([pedido.signal, AbortSignal.timeout(10000)]));
    cache.set(clave, resultados);
    estado.resultados = resultados;
    pintarBilletes(); // PASO 5
  } catch (error) {
    // AbortError: una búsqueda más nueva reemplazó a esta, no es un error
    if (error.name === 'AbortError') return;
    lista.replaceChildren(); // PASO 9
    mostrarError(error, () => buscar(consulta)); // PASO 9
  }
}

// La búsqueda lee la caja recién cuando sale: si mientras tanto la borraste, busca lo que hay ahora
const buscarPronto = debounce(() => buscar(campo.value), ESPERA);
campo.addEventListener('input', buscarPronto);
// FIN PASO 4


// PASO 5: los billetes, a partir de un <template>
// Cada resultado es un <li role="option"> con su foto, su nombre, su
// descripción y su número en el talón. Mientras se busca, se ven billetes
// de espera. El CSS hace caer cada billete un poco después que el anterior:
// la variable --i dice cuántos van antes.

function crearBillete(resultado, i) {
  const billete = plantillaBillete.content.firstElementChild.cloneNode(true);
  billete.id = `billete-${i}`;
  billete.dataset.indice = i;
  billete.style.setProperty('--i', i);
  billete.querySelector('[data-nombre]').textContent = resultado.titulo;
  billete.querySelector('[data-nombre]').replaceChildren(marcar(resultado.titulo, estado.consulta)); // PASO 6
  billete.querySelector('[data-descripcion]').textContent = resultado.descripcion || 'Artículo de Wikipedia';
  billete.querySelector('[data-numero]').textContent = String(i + 1).padStart(2, '0');
  const foto = billete.querySelector('[data-foto]');
  if (resultado.foto) foto.style.backgroundImage = `url("${resultado.foto}")`;
  else foto.classList.add('sin-foto');
  return billete;
}

// El aviso también es un billete: el texto a la izquierda y un talón anulado
function mostrarAviso(titulo, texto, clase = '') {
  aviso.className = `aviso ${clase}`.trim();
  const cuerpo = Object.assign(document.createElement('div'), { className: 'aviso-cuerpo' });
  cuerpo.append(
    Object.assign(document.createElement('b'), { textContent: titulo }),
    Object.assign(document.createElement('p'), { textContent: texto }),
  );
  const talon = Object.assign(document.createElement('span'), {
    className: 'aviso-talon',
    textContent: clase === 'mal' ? 'Sin señal' : 'Sin destino',
  });
  talon.setAttribute('aria-hidden', 'true');
  aviso.replaceChildren(cuerpo, talon);
}

function pintarBilletes() {
  const { resultados, consulta } = estado;
  aviso.replaceChildren();
  lista.removeAttribute('aria-busy');
  lista.replaceChildren(...resultados.map(crearBillete));
  campo.setAttribute('aria-expanded', String(resultados.length > 0));
  estado.activo = -1; // PASO 7
  campo.removeAttribute('aria-activedescendant'); // PASO 7
  if (consulta.length < MINIMO) {
    estadoTexto.textContent = '';
  } else if (resultados.length) {
    const destinos = resultados.length === 1 ? '1 destino' : `${resultados.length} destinos`;
    estadoTexto.textContent = `${destinos} para «${consulta}». Muévete con ↑ ↓ y elige con Enter.`;
  } else {
    estadoTexto.textContent = '';
    mostrarAviso('Sin destinos', `No hay artículos para «${consulta}». Prueba con otra palabra.`);
  }
}

function mostrarEspera() {
  aviso.replaceChildren();
  estadoTexto.textContent = 'Imprimiendo billetes…';
  lista.setAttribute('aria-busy', 'true');
  const esperas = Array.from({ length: 3 }, (_, i) => {
    const billete = document.createElement('li');
    billete.className = 'billete espera';
    billete.setAttribute('aria-hidden', 'true');
    billete.style.setProperty('--i', i);
    billete.innerHTML = '<span class="foto"></span><span class="cuerpo"><i></i><i></i></span><span class="talon"></span>';
    return billete;
  });
  lista.replaceChildren(...esperas);
}
// FIN PASO 5


// PASO 6: resaltar lo que coincide, sin importar las tildes
// Wikipedia encuentra «Árbol» aunque escribas «arbol». Para resaltarlo,
// comparamos las dos cosas sin tildes: normalize('NFD') separa cada letra de
// su tilde (á pasa a ser a + ´) y /\p{M}/gu borra las tildes sueltas.
// Al quitar tildes, las posiciones podrían correrse, así que `origen` guarda
// de qué posición del título viene cada letra de la versión sin tildes.
// RegExp.escape (ES2025) convierte lo que escribiste en un patrón seguro:
// sin él, buscar «lima (fruta» rompería la expresión regular por el «(».

function sinTildes(texto) {
  return texto.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
}

function marcar(texto, consulta) {
  let plano = '';
  const origen = [];
  let posicion = 0;
  for (const letra of texto) {
    const base = sinTildes(letra);
    for (let k = 0; k < base.length; k++) origen.push(posicion);
    plano += base;
    posicion += letra.length;
  }
  origen.push(texto.length);

  const fragmento = document.createDocumentFragment();
  const buscado = sinTildes(consulta.trim());
  if (!buscado) {
    fragmento.append(texto);
    return fragmento;
  }
  let desde = 0;
  for (const coincidencia of plano.matchAll(new RegExp(RegExp.escape(buscado), 'g'))) {
    const inicio = origen[coincidencia.index];
    const fin = origen[coincidencia.index + coincidencia[0].length];
    const marca = document.createElement('mark');
    marca.textContent = texto.slice(inicio, fin);
    fragmento.append(texto.slice(desde, inicio), marca);
    desde = fin;
  }
  fragmento.append(texto.slice(desde));
  return fragmento;
}
// FIN PASO 6


// PASO 7: el teclado, como un combobox de verdad
// El foco se queda siempre en la caja de texto: así puedes seguir escribiendo.
// Las flechas no mueven el foco, mueven el billete «activo», y la caja avisa
// cuál es con aria-activedescendant (el id del billete). Un lector de
// pantalla lo lee como si el foco estuviera ahí.

function marcarActivo(indice) {
  const billetes = lista.querySelectorAll('[role="option"]');
  estado.activo = indice;
  billetes.forEach((billete, i) => billete.setAttribute('aria-selected', String(i === indice)));
  if (indice < 0 || !billetes[indice]) {
    campo.removeAttribute('aria-activedescendant');
    return;
  }
  campo.setAttribute('aria-activedescendant', billetes[indice].id);
  billetes[indice].scrollIntoView({ block: 'nearest' });
}

campo.addEventListener('keydown', (evento) => {
  const total = estado.resultados.length;
  if (evento.key === 'ArrowDown' && total) {
    evento.preventDefault();
    marcarActivo((estado.activo + 1) % total);
  } else if (evento.key === 'ArrowUp' && total) {
    evento.preventDefault();
    marcarActivo(estado.activo <= 0 ? total - 1 : estado.activo - 1);
  } else if (evento.key === 'Enter' && total) {
    evento.preventDefault();
    elegir(Math.max(estado.activo, 0)); // PASO 8
  } else if (evento.key === 'Escape' && campo.value) {
    evento.preventDefault();
    campo.value = '';
    borrar.hidden = true; // PASO 10
    buscar('');
  }
});
// FIN PASO 7


// PASO 8: elegir un billete y traer su resumen
// El resumen se pide a otro servicio de Wikipedia, con su propia caché y su
// propio AbortController: si eliges otro antes de que llegue, el viejo se
// cancela. La clave del artículo puede tener tildes y paréntesis
// («Lima_(fruta)»), por eso va con encodeURIComponent.
// En la lista, mousedown con preventDefault evita que el clic le quite el
// foco a la caja de texto.

const resumenes = new Map();
let pedidoResumen = null;

async function pedirResumen(clave, senal) {
  if (resumenes.has(clave)) return resumenes.get(clave);
  const respuesta = await fetch(RESUMEN + encodeURIComponent(clave), { signal: senal });
  if (!respuesta.ok) throw new Error(`Wikipedia respondió con el código ${respuesta.status}`);
  const datos = await respuesta.json();
  const resumen = {
    clave,
    titulo: datos.title,
    descripcion: datos.description ?? '',
    texto: datos.extract ?? '',
    foto: datos.thumbnail ? fotoDeTamano(datos.thumbnail.source, 500) : null,
    enlace: datos.content_urls?.desktop?.page ?? `https://es.wikipedia.org/wiki/${encodeURIComponent(clave)}`,
  };
  resumenes.set(clave, resumen);
  return resumen;
}

function pintarElegido(resumen) {
  const billete = plantillaElegido.content.firstElementChild.cloneNode(true);
  billete.querySelector('[data-titulo]').replaceChildren(marcar(resumen.titulo, estado.consulta));
  billete.querySelector('[data-descripcion]').textContent = resumen.descripcion;
  billete.querySelector('[data-resumen]').textContent = resumen.texto;
  billete.querySelector('[data-enlace]').href = resumen.enlace;
  const foto = billete.querySelector('[data-foto]');
  if (resumen.foto) foto.style.backgroundImage = `url("${resumen.foto}")`;
  else foto.classList.add('sin-foto');
  billete.classList.add('llega');
  elegido.replaceChildren(billete);
  estadoTexto.textContent = `Elegiste «${resumen.titulo}». Su resumen está en el billete grande.`;
  // En el teléfono, el billete grande queda debajo de la lista: lo traemos a la vista
  if (matchMedia('(max-width: 820px)').matches) elegido.scrollIntoView({ block: 'start' });
}

async function elegir(indice) {
  const resultado = estado.resultados[indice];
  if (!resultado) return;
  marcarActivo(indice);
  for (const billete of lista.children) billete.classList.toggle('elegido-ya', billete === lista.children[indice]);
  pedidoResumen?.abort();
  pedidoResumen = new AbortController();
  elegido.setAttribute('aria-busy', 'true');
  try {
    const resumen = await pedirResumen(resultado.clave, AbortSignal.any([pedidoResumen.signal, AbortSignal.timeout(10000)]));
    pintarElegido(resumen);
  } catch (error) {
    if (error.name === 'AbortError') return;
    mostrarError(error, () => elegir(indice)); // PASO 9
  } finally {
    elegido.removeAttribute('aria-busy');
  }
}

lista.addEventListener('mousedown', (evento) => evento.preventDefault());
lista.addEventListener('click', (evento) => {
  const billete = evento.target.closest('[role="option"]');
  if (billete) elegir(Number(billete.dataset.indice));
});
// FIN PASO 8


// PASO 9: si Wikipedia no responde, avisar y reintentar
// Sin red, fetch rechaza con un TypeError; si se acabó el tiempo, con un
// error de nombre TimeoutError. Si Wikipedia responde mal, es el Error que
// lanzamos al revisar respuesta.ok. Cada caso dice qué pasó, y Reintentar
// vuelve a hacer exactamente lo que falló: la búsqueda o el resumen.

function mostrarError(error, reintentar) {
  const sinRed = error.name === 'TimeoutError' || error instanceof TypeError;
  estadoTexto.textContent = '';
  lista.removeAttribute('aria-busy');
  mostrarAviso(
    sinRed ? 'No se pudo llegar a Wikipedia' : 'Wikipedia no respondió bien',
    sinRed ? 'Revisa tu conexión e inténtalo otra vez.' : `${error.message}. Inténtalo en un momento.`,
    'mal',
  );
  const boton = document.createElement('button');
  boton.type = 'button';
  boton.className = 'boton';
  boton.innerHTML = '<svg class="icono" aria-hidden="true"><use href="#i-reintentar" /></svg>';
  boton.append('Reintentar');
  boton.addEventListener('click', () => {
    aviso.replaceChildren();
    reintentar();
  });
  aviso.querySelector('.aviso-cuerpo').append(boton);
}
// FIN PASO 9


// PASO 10: los primeros destinos y el botón de borrar
// Antes de escribir (y cada vez que vacías la caja), la lista no queda
// vacía: muestra algunos destinos con foto. Se piden sus resúmenes todos a la vez con Promise.allSettled, que
// espera a que cada uno termine, bien o mal: si uno falla, los demás igual
// se muestran. Como son resultados normales, se recorren con las flechas y
// se eligen con Enter, igual que una búsqueda.
// El botón de borrar aparece solo cuando hay algo escrito.

const SUGERIDOS = ['Machu_Picchu', 'Lago_Titicaca', 'Frida_Kahlo', 'Ajedrez', 'Volcán', 'Cusco'];

async function mostrarSugeridos() {
  const respuestas = await Promise.allSettled(SUGERIDOS.map((clave) => pedirResumen(clave, AbortSignal.timeout(10000))));
  // Si mientras tanto la persona empezó a escribir, su búsqueda manda
  if (campo.value.trim()) return;
  const llegaron = respuestas.filter((respuesta) => respuesta.status === 'fulfilled').map((respuesta) => respuesta.value);
  estado.consulta = '';
  estado.resultados = llegaron.map(({ clave, titulo, descripcion, foto }) => ({ clave, titulo, descripcion, foto }));
  pintarBilletes();
  estadoTexto.textContent = 'Destinos para empezar: elige uno con ↓ y Enter, o escribe el tuyo.';
  const conFoto = llegaron.find((resumen) => resumen.foto);
  if (conFoto) fotoBienvenida.style.backgroundImage = `url("${conFoto.foto}")`;
}

campo.addEventListener('input', () => {
  borrar.hidden = campo.value === '';
});

borrar.addEventListener('click', () => {
  campo.value = '';
  borrar.hidden = true;
  buscar('');
  campo.focus();
});
// FIN PASO 10


// ARRANQUE (desde el PASO 10): lo primero que corre al abrir la página
mostrarSugeridos();
