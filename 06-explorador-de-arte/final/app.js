// ─────────────────────────────────────────────────────────────
// Explorador con scroll infinito: Mi sala
// Proyecto 6 de domina-js: https://domina-js.pages.dev/proyectos
//
// El código va en el orden en que se construye en la guía.
// Cada parte empieza con «PASO n» y termina con «FIN PASO n».
// Una línea que termina en «// PASO n» se agrega más tarde, en ese paso,
// dentro de código que ya estaba escrito.
// ─────────────────────────────────────────────────────────────


// PASO 1: la API, el estado y los elementos de la página
// Las obras vienen de la API abierta del Cleveland Museum of Art. No pide clave
// y permite CORS, así que fetch funciona desde cualquier página, incluso con
// doble clic en index.html. Pedimos de a 12 pinturas (limit) y vamos corriendo
// el punto de partida (skip) en cada tanda.

const API = 'https://openaccess-api.clevelandart.org/api/artworks/';
const CAMPOS = 'id,accession_number,title,creation_date,creators,technique,description,images';
const POR_TANDA = 12;
const LUGARES = 6;

const estado = {
  desde: 0,        // la próxima tanda empieza en esta obra (skip)
  total: null,     // cuántas pinturas hay; se sabe con la primera respuesta
  cargando: false, // hay una tanda en camino
  alFinal: false,  // el final de la lista está a la vista
  error: null,     // el último error, si la tanda falló
};

const lista = document.querySelector('#lista');
const cuentaObras = document.querySelector('#cuenta-obras');
const estadoCarga = document.querySelector('#estado-carga');
const centinela = document.querySelector('#centinela');
const plantilla = document.querySelector('#plantilla-obra');
const ficha = document.querySelector('#ficha');
const cuentaSala = document.querySelector('#cuenta-sala');
const avisoSala = document.querySelector('#aviso-sala');
const lugares = [...document.querySelectorAll('.lugar')];

const numero = new Intl.NumberFormat('es-PE');
// FIN PASO 1


// PASO 2: pedir una tanda de obras
// URLSearchParams arma la dirección con cada parámetro bien escrito.
// fetch solo rechaza la promesa cuando no hay red: un 404 o un 500 llegan como
// una respuesta normal, por eso se revisa respuesta.ok. AbortSignal.timeout
// corta la espera si el museo tarda más de 15 segundos.

async function pedirTanda(desde) {
  const parametros = new URLSearchParams({
    type: 'Painting',
    cc0: 1,
    has_image: 1,
    limit: POR_TANDA,
    skip: desde,
    fields: CAMPOS,
  });
  const respuesta = await fetch(`${API}?${parametros}`, { signal: AbortSignal.timeout(15000) });
  if (!respuesta.ok) throw new Error(`El museo respondió con el código ${respuesta.status}`);
  const { info, data } = await respuesta.json();
  return { total: info.total, datos: data };
}
// FIN PASO 2


// PASO 3: los datos de cada obra, ordenados y guardados en un Map
// La API manda mucho más de lo que mostramos, con nombres en inglés.
// aObra se queda solo con lo que usamos. El Map es la caché: guarda cada obra
// por su id, para abrir su ficha o colgarla sin volver a pedirla.

const obras = new Map();

function aObra(dato) {
  const imagen = dato.images?.web;
  const creador = dato.creators?.[0]?.description ?? '';
  return {
    id: dato.id,
    titulo: dato.title,
    autor: creador.split(' (')[0] || 'Autor desconocido',
    autorCompleto: creador || 'Autor desconocido',
    fecha: dato.creation_date || 'Sin fecha',
    anio: dato.creation_date?.match(/\d{4}/)?.[0] ?? '',
    tecnica: dato.technique || '',
    descripcion: (dato.description || '').replace(/<[^>]+>/g, ''),
    inventario: dato.accession_number,
    imagen: imagen ? { url: imagen.url, ancho: Number(imagen.width), alto: Number(imagen.height) } : null,
  };
}

function guardarObra(dato) {
  const obra = aObra(dato);
  obras.set(obra.id, obra);
  return obra;
}
// FIN PASO 3


// PASO 4: la tarjeta de cada obra, a partir de un <template>
// El HTML de la tarjeta ya está en la página, dentro de <template>.
// Lo copiamos con cloneNode y llenamos los datos con textContent, que nunca
// interpreta HTML. La imagen lleva loading="lazy": el navegador la descarga
// recién cuando se acerca a la pantalla. Con width y height, el lugar de la
// imagen queda reservado antes de que llegue y la lista no salta.

function crearTarjeta(obra) {
  const tarjeta = plantilla.content.firstElementChild.cloneNode(true);
  tarjeta.dataset.id = obra.id;
  tarjeta.querySelector('[data-titulo]').textContent = obra.titulo;
  tarjeta.querySelector('[data-autor]').textContent = obra.autor;
  tarjeta.querySelector('[data-anio]').textContent = obra.anio;
  tarjeta.querySelector('[data-ver]').setAttribute('aria-label', `Ver la ficha: ${obra.titulo}`);

  const imagen = tarjeta.querySelector('[data-imagen]');
  imagen.addEventListener('load', () => imagen.classList.add('lista'), { once: true });
  imagen.addEventListener('error', () => imagen.classList.add('rota'), { once: true });
  imagen.width = obra.imagen.ancho;
  imagen.height = obra.imagen.alto;
  imagen.src = obra.imagen.url;

  pintarBoton(tarjeta.querySelector('[data-colgar]'), obra.id, true); // PASO 9
  return tarjeta;
}
// FIN PASO 4


// PASO 5: cargar la siguiente tanda
// Mientras la tanda viaja, se ven dos tarjetas de espera (esqueletos).
// estado.cargando evita pedir la misma tanda dos veces si cargarMas se llama
// otra vez antes de que llegue la respuesta.

function mostrarEsqueletos() {
  const esqueletos = Array.from({ length: 2 }, () => {
    const esqueleto = document.createElement('div');
    esqueleto.className = 'esqueleto';
    esqueleto.setAttribute('aria-hidden', 'true');
    esqueleto.append(document.createElement('i'), document.createElement('i'), document.createElement('i'));
    return esqueleto;
  });
  const texto = Object.assign(document.createElement('span'), { className: 'solo-lector', textContent: 'Cargando más obras…' });
  estadoCarga.replaceChildren(texto, ...esqueletos);
}

function pintarCuenta() {
  cuentaObras.textContent = estado.total === null
    ? 'Cargando…'
    : `${numero.format(lista.children.length)} de ${numero.format(estado.total)}`;
}

function terminado() {
  return estado.total !== null && estado.desde >= estado.total;
}

async function cargarMas() {
  if (estado.cargando || terminado()) return;
  if (estado.error) return; // PASO 7
  estado.cargando = true;
  lista.setAttribute('aria-busy', 'true');
  mostrarEsqueletos();
  try {
    const { total, datos } = await pedirTanda(estado.desde);
    estado.total = datos.length ? total : estado.desde;
    estado.desde += datos.length;
    const tarjetas = datos.map(guardarObra).filter((obra) => obra.imagen).map(crearTarjeta);
    lista.append(...tarjetas);
    estadoCarga.replaceChildren();
    if (terminado()) mostrarFin(); // PASO 6
  } catch (error) {
    estado.error = error; // PASO 7
    mostrarError(error); // PASO 7
  } finally {
    estado.cargando = false;
    lista.removeAttribute('aria-busy');
    pintarCuenta();
  }
  // Si el final de la lista sigue a la vista (una pantalla alta), viene otra tanda
  if (estado.alFinal) cargarMas(); // PASO 6
}
// FIN PASO 5


// PASO 6: el scroll infinito, con IntersectionObserver
// El centinela es un <div> vacío al final de la lista. El observador avisa
// cuando entra en pantalla (o le faltan 800 px para entrar, por rootMargin),
// y ahí pedimos la siguiente tanda. Es mucho más liviano que escuchar el
// evento scroll, que se dispara decenas de veces por segundo.

const observador = new IntersectionObserver(([entrada]) => {
  estado.alFinal = entrada.isIntersecting;
  if (estado.alFinal) cargarMas();
}, { rootMargin: '0px 0px 800px 0px' });

function crearAviso(titulo, texto, clase = '') {
  const aviso = document.createElement('div');
  aviso.className = `aviso ${clase}`.trim();
  aviso.append(
    Object.assign(document.createElement('b'), { textContent: titulo }),
    Object.assign(document.createElement('p'), { textContent: texto }),
  );
  return aviso;
}

function mostrarFin() {
  observador.disconnect();
  estadoCarga.replaceChildren(crearAviso(
    'Llegaste al final',
    `Viste las ${numero.format(estado.total)} pinturas de dominio público del museo.`,
  ));
}
// FIN PASO 6


// PASO 7: si la tanda falla, avisar y reintentar
// Sin red, fetch rechaza con un TypeError; si se acaba el tiempo, con un
// TimeoutError. Si el museo responde mal, es el Error que lanzamos en el PASO 2.
// Mientras haya un error, cargarMas no pide nada: así el scroll no insiste
// solo. El botón Reintentar borra el error y vuelve a pedir la misma tanda.

function mostrarError(error) {
  const sinRed = error.name === 'TimeoutError' || error instanceof TypeError;
  const aviso = crearAviso(
    sinRed ? 'No se pudo llegar al museo' : 'El museo no respondió bien',
    sinRed ? 'Revisa tu conexión e inténtalo otra vez.' : `${error.message}. Inténtalo en un momento.`,
    'mal',
  );
  const boton = document.createElement('button');
  boton.type = 'button';
  boton.className = 'colgar';
  boton.innerHTML = '<svg class="icono" aria-hidden="true"><use href="#i-reintentar" /></svg>';
  boton.append('Reintentar');
  boton.addEventListener('click', () => {
    estado.error = null;
    cargarMas();
  });
  aviso.append(boton);
  estadoCarga.replaceChildren(aviso);
}
// FIN PASO 7


// PASO 8: la ficha de una obra, en un <dialog>
// showModal abre el diálogo encima de todo: el resto de la página queda
// inerte, Escape lo cierra y, al cerrarse, el foco vuelve al botón que lo
// abrió. Un clic en el fondo oscuro (fuera de la ficha) también lo cierra.
// La lista usa delegación: un solo oyente atiende los clics de todas las
// tarjetas, también de las que todavía no existen.

const fichaColgar = ficha.querySelector('[data-ficha-colgar]');
const fichaAviso = ficha.querySelector('[data-ficha-aviso]');
let obraEnFicha = null;

function abrirFicha(id) {
  const obra = obras.get(id);
  if (!obra) return;
  obraEnFicha = obra;
  const imagen = ficha.querySelector('[data-ficha-imagen]');
  imagen.width = obra.imagen.ancho;
  imagen.height = obra.imagen.alto;
  imagen.src = obra.imagen.url;
  imagen.alt = `${obra.titulo}, de ${obra.autor}`;
  ficha.querySelector('[data-ficha-titulo]').textContent = obra.titulo;
  ficha.querySelector('[data-ficha-autor]').textContent = obra.autorCompleto;
  ficha.querySelector('[data-ficha-fecha]').textContent = obra.fecha;
  ficha.querySelector('[data-ficha-tecnica]').textContent = obra.tecnica || 'Sin dato';
  ficha.querySelector('[data-ficha-inventario]').textContent = obra.inventario;
  ficha.querySelector('[data-ficha-descripcion]').textContent = obra.descripcion;
  ficha.querySelector('[data-ficha-enlace]').href = `https://www.clevelandart.org/art/${obra.inventario}`;
  fichaAviso.textContent = '';
  pintarBoton(fichaColgar, obra.id); // PASO 9
  if (!ficha.open) ficha.showModal();
}

lista.addEventListener('click', (evento) => {
  const ver = evento.target.closest('[data-ver]');
  if (ver) abrirFicha(Number(ver.closest('.obra').dataset.id));
});

ficha.querySelector('[data-cerrar]').addEventListener('click', () => ficha.close());
ficha.addEventListener('click', (evento) => {
  if (evento.target === ficha) ficha.close();
});
// FIN PASO 8


// PASO 9: la sala: colgar y descolgar
// sala guarda los ids de las obras colgadas, en el orden de los lugares.
// Cada lugar de la pared es un <g> del SVG, inclinado con una matriz para que
// quede en el plano de su pared. Para colgar una obra se le agregan un clavo,
// el hilo, el marco y la imagen, todos creados con createElementNS: los
// elementos SVG necesitan su propio espacio de nombres.

const sala = [];
const SVG = 'http://www.w3.org/2000/svg';

function estaColgada(id) {
  return sala.includes(id);
}

function pintarBoton(boton, id, conTitulo = false) {
  const colgada = estaColgada(id);
  const llena = !colgada && sala.length >= LUGARES;
  const enFicha = boton === fichaColgar;
  // En la lista, una obra colgada dice «En tu sala»; en la ficha, la acción completa
  const texto = colgada
    ? (enFicha ? 'Descolgar de mi sala' : 'En tu sala')
    : llena ? 'Sala llena' : (enFicha ? 'Colgar en mi sala' : 'Colgar');
  boton.classList.toggle('colgada', colgada);
  const icono = colgada ? (enFicha ? '#i-cerrar' : '#i-listo') : '#i-clavo';
  boton.querySelector('use').setAttribute('href', icono);
  boton.querySelector('[data-texto]').textContent = texto;
  if (llena) boton.setAttribute('aria-disabled', 'true');
  else boton.removeAttribute('aria-disabled');
  boton.title = llena ? 'Descuelga una obra para hacer lugar' : colgada && !enFicha ? 'Tócalo para descolgarla' : '';
  // El nombre accesible empieza con el texto visible y dice qué hace el botón
  const accion = colgada ? 'En tu sala. Descolgar' : texto;
  if (conTitulo) boton.setAttribute('aria-label', `${accion}: ${obras.get(id).titulo}`);
}

function crearSVG(etiqueta, atributos) {
  const elemento = document.createElementNS(SVG, etiqueta);
  for (const [nombre, valor] of Object.entries(atributos)) elemento.setAttribute(nombre, valor);
  return elemento;
}

function dibujarCuadro(lugar, obra) {
  // El hueco punteado marca dónde va el cuadro: leemos su posición y su tamaño
  const hueco = lugar.querySelector('.hueco');
  const [x, y, ancho, alto] = ['x', 'y', 'width', 'height'].map((nombre) => Number(hueco.getAttribute(nombre)));
  const margen = 8;
  const escala = Math.min((ancho - 2 * margen) / obra.imagen.ancho, (alto - 2 * margen) / obra.imagen.alto);
  const anchoImagen = obra.imagen.ancho * escala;
  const altoImagen = obra.imagen.alto * escala;
  const marcoX = x + (ancho - anchoImagen) / 2 - margen;
  const marcoY = y + (alto - altoImagen) / 2 - margen;
  const marcoAncho = anchoImagen + 2 * margen;
  const marcoAlto = altoImagen + 2 * margen;
  const clavoX = marcoX + marcoAncho / 2;
  const clavoY = marcoY - 20;

  const cuadro = crearSVG('g', { class: 'colgando' });
  cuadro.append(
    crearSVG('path', { d: `M${marcoX + 12} ${marcoY} L${clavoX} ${clavoY} L${marcoX + marcoAncho - 12} ${marcoY}`, fill: 'none', stroke: '#6B5B95', 'stroke-width': 2 }),
    crearSVG('rect', { class: 'sombra', x: marcoX + 4, y: marcoY + 5, width: marcoAncho, height: marcoAlto, rx: 3 }),
    crearSVG('rect', { class: 'marco', x: marcoX, y: marcoY, width: marcoAncho, height: marcoAlto, rx: 3 }),
    crearSVG('image', { href: obra.imagen.url, x: marcoX + margen, y: marcoY + margen, width: anchoImagen, height: altoImagen, preserveAspectRatio: 'none' }),
  );
  const clavo = crearSVG('circle', { cx: clavoX, cy: clavoY, r: 4.5, fill: '#6B5B95' });
  lugar.append(cuadro, clavo);
  return cuadro;
}

function pintarSala(nuevaId) {
  lugares.forEach((lugar, i) => {
    for (const viejo of lugar.querySelectorAll(':scope > :not(.hueco)')) viejo.remove();
    const obra = obras.get(sala[i]);
    lugar.classList.toggle('lleno', Boolean(obra));
    if (!obra) {
      lugar.removeAttribute('tabindex');
      lugar.removeAttribute('role');
      lugar.removeAttribute('aria-label');
      return;
    }
    const cuadro = dibujarCuadro(lugar, obra);
    lugar.setAttribute('tabindex', '0');
    lugar.setAttribute('role', 'button');
    lugar.setAttribute('aria-label', `${obra.titulo}, de ${obra.autor}. Abrir su ficha`);
    if (obra.id === nuevaId) animarCuadro(cuadro); // PASO 10
  });
}

function pintarCuentaSala() {
  cuentaSala.textContent = sala.length === 0
    ? `Cuelga aquí hasta ${LUGARES} obras que te gusten.`
    : sala.length === LUGARES
      ? `Tu sala está llena: ${LUGARES} de ${LUGARES} obras.`
      : `${sala.length} de ${LUGARES} obras colgadas.`;
}

function actualizarSala(nuevaId) {
  pintarSala(nuevaId);
  pintarCuentaSala();
  for (const boton of lista.querySelectorAll('[data-colgar]')) {
    pintarBoton(boton, Number(boton.closest('.obra').dataset.id), true);
  }
  if (obraEnFicha) pintarBoton(fichaColgar, obraEnFicha.id);
  guardarSala(); // PASO 11
}

function alternar(id) {
  if (estaColgada(id)) {
    sala.splice(sala.indexOf(id), 1);
    actualizarSala();
    return 'descolgada';
  }
  if (sala.length >= LUGARES) return 'llena';
  sala.push(id);
  actualizarSala(id);
  return 'colgada';
}

lista.addEventListener('click', (evento) => {
  const boton = evento.target.closest('[data-colgar]');
  if (!boton) return;
  if (alternar(Number(boton.closest('.obra').dataset.id)) === 'llena') {
    cuentaSala.textContent = 'Tu sala está llena: descuelga una obra para hacer lugar.';
  }
});

fichaColgar.addEventListener('click', () => {
  const resultado = alternar(obraEnFicha.id);
  fichaAviso.textContent = {
    colgada: 'Listo: está colgada en tu sala.',
    descolgada: 'La descolgaste de tu sala.',
    llena: 'Tu sala está llena: descuelga una obra para hacer lugar.',
  }[resultado];
});

for (const lugar of lugares) {
  const abrir = () => {
    const id = sala[lugar.dataset.lugar];
    if (id) abrirFicha(id);
  };
  lugar.addEventListener('click', abrir);
  lugar.addEventListener('keydown', (evento) => {
    if (evento.key !== 'Enter' && evento.key !== ' ') return;
    evento.preventDefault();
    abrir();
  });
}
// FIN PASO 9


// PASO 10: el cuadro se asienta en la pared
// animate() (Web Animations) mueve el cuadro sin CSS extra: cae un poco,
// rebota y se queda quieto, girando desde el clavo (transform-origin arriba).
// Si la persona pidió menos movimiento en su sistema, no se anima.

const pocoMovimiento = matchMedia('(prefers-reduced-motion: reduce)');

function animarCuadro(cuadro) {
  if (pocoMovimiento.matches) return;
  cuadro.animate([
    { transform: 'translateY(-36px) rotate(-7deg)', opacity: 0 },
    { transform: 'translateY(3px) rotate(4deg)', opacity: 1, offset: 0.5 },
    { transform: 'rotate(-2deg)', offset: 0.75 },
    { transform: 'none' },
  ], { duration: 700, easing: 'cubic-bezier(.2, .8, .2, 1)' });
}
// FIN PASO 10


// PASO 11: guardar la sala y volver a colgarla al abrir
// En localStorage guardamos solo los ids: ocupan poco y los datos de cada obra
// se piden frescos al museo. Al abrir la página se piden todas a la vez, y
// Promise.allSettled espera a que cada una termine, bien o mal: si una falla,
// las demás igual se cuelgan. Las que fallaron quedan pendientes, se siguen
// guardando y se pueden volver a pedir con Reintentar.

const CLAVE = 'domina-js:mi-sala';
let pendientes = [];

function guardarSala() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify([...sala, ...pendientes].slice(0, LUGARES)));
  } catch {
    // Sin almacenamiento (modo privado estricto): la sala dura hasta cerrar la página
  }
}

function leerSala() {
  try {
    const ids = JSON.parse(localStorage.getItem(CLAVE));
    return Array.isArray(ids) ? ids.filter(Number.isInteger).slice(0, LUGARES) : [];
  } catch {
    return [];
  }
}

async function pedirObra(id) {
  if (obras.has(id)) return obras.get(id);
  const respuesta = await fetch(`${API}${id}?fields=${CAMPOS}`, { signal: AbortSignal.timeout(15000) });
  if (!respuesta.ok) throw new Error(`El museo respondió con el código ${respuesta.status}`);
  const { data } = await respuesta.json();
  return guardarObra(data);
}

async function restaurarSala(ids = leerSala()) {
  if (!ids.length) return;
  avisoSala.replaceChildren();
  cuentaSala.textContent = 'Colgando tus obras…';
  const resultados = await Promise.allSettled(ids.map(pedirObra));
  pendientes = [];
  resultados.forEach((resultado, i) => {
    if (resultado.status === 'rejected') pendientes.push(ids[i]);
    else if (!estaColgada(resultado.value.id) && sala.length < LUGARES) sala.push(resultado.value.id);
  });
  actualizarSala();
  if (!pendientes.length) return;

  const boton = document.createElement('button');
  boton.type = 'button';
  boton.className = 'colgar';
  boton.innerHTML = '<svg class="icono" aria-hidden="true"><use href="#i-reintentar" /></svg>';
  boton.append('Reintentar');
  boton.addEventListener('click', () => restaurarSala(pendientes));
  const cuantas = pendientes.length === 1 ? '1 de tus obras' : `${pendientes.length} de tus obras`;
  avisoSala.replaceChildren(
    Object.assign(document.createElement('p'), { textContent: `No se pudo traer ${cuantas}. Sigue guardada.` }),
    boton,
  );
}
// FIN PASO 11


// ARRANQUE (desde el PASO 5): lo primero que corre al abrir la página
cargarMas();
observador.observe(centinela); // PASO 6
pintarCuentaSala(); // PASO 9
restaurarSala(); // PASO 11
