// ─────────────────────────────────────────────────────────────
// Tienda pequeña: Ferretería Don Lucho
// Proyecto 5 de domina-js: https://domina-js.pages.dev/proyectos
//
// El código va en el orden en que se construye en la guía.
// Cada parte empieza con «PASO n» y termina con «FIN PASO n».
// Una línea que termina en «// PASO n» se agrega más tarde, en ese paso,
// dentro de código que ya estaba escrito.
// ─────────────────────────────────────────────────────────────


// PASO 1: los productos, el estado y los elementos de la página
// Cada producto tiene un id, su nombre, su sección, su precio en soles, el
// dibujo que lo representa (un <symbol> del HTML), el color de ese dibujo y
// una descripción corta para la vista rápida.

const SECCIONES = { herramientas: 'Herramientas', pinturas: 'Pinturas', tornillos: 'Tornillos', jardin: 'Jardín' };
const POR_PAGINA = 10;

const PRODUCTOS = [
  { id: 'p01', nombre: 'Martillo de uña', seccion: 'herramientas', precio: 24.9, dibujo: 'martillo', color: '#3b2a1d', descripcion: 'Cabeza de acero forjado y mango de madera. 16 onzas.' },
  { id: 'p02', nombre: 'Destornillador plano', seccion: 'herramientas', precio: 8.5, dibujo: 'destornillador', color: '#c0392b', descripcion: 'Punta de 6 mm y mango de goma que no resbala.' },
  { id: 'p03', nombre: 'Destornillador estrella', seccion: 'herramientas', precio: 8.5, dibujo: 'destornillador', color: '#f2c14e', descripcion: 'Punta Phillips n.º 2, la más común en la casa.' },
  { id: 'p04', nombre: 'Alicate universal', seccion: 'herramientas', precio: 19.9, dibujo: 'alicate', color: '#c0392b', descripcion: 'Corta, sujeta y dobla. 8 pulgadas, con mangos aislados.' },
  { id: 'p05', nombre: 'Wincha de 5 m', seccion: 'herramientas', precio: 14.5, dibujo: 'wincha', color: '#f2c14e', descripcion: 'Cinta de acero con freno y gancho magnético.' },
  { id: 'p06', nombre: 'Serrucho de 20"', seccion: 'herramientas', precio: 32, dibujo: 'serrucho', color: '#3e7d3a', descripcion: 'Para madera, con dientes templados y mango cerrado.' },
  { id: 'p07', nombre: 'Taladro percutor', seccion: 'herramientas', precio: 189, dibujo: 'taladro', color: '#c0392b', descripcion: '650 W y velocidad variable. Incluye 5 brocas.' },
  { id: 'p08', nombre: 'Llave inglesa de 10"', seccion: 'herramientas', precio: 27.9, dibujo: 'llave', color: '#1f1811', descripcion: 'Abre hasta 30 mm. Acero cromado.' },
  { id: 'p09', nombre: 'Nivel de burbuja', seccion: 'herramientas', precio: 18, dibujo: 'nivel', color: '#f2c14e', descripcion: '40 cm, de aluminio, con dos burbujas.' },
  { id: 'p10', nombre: 'Espátula de 3"', seccion: 'herramientas', precio: 9.9, dibujo: 'espatula', color: '#3e7d3a', descripcion: 'Hoja flexible para masilla y empaste.' },
  { id: 'p11', nombre: 'Candado de bronce', seccion: 'herramientas', precio: 22, dibujo: 'candado', color: '#c9a14a', descripcion: '40 mm, con tres llaves. No se oxida.' },
  { id: 'p12', nombre: 'Cinta aislante', seccion: 'herramientas', precio: 3.5, dibujo: 'cinta', color: '#1f1811', descripcion: 'Rollo de 10 m. Resiste hasta 80 °C.' },
  { id: 'p13', nombre: 'Látex blanco', seccion: 'pinturas', precio: 49.9, dibujo: 'lata', color: '#f7f3ea', descripcion: 'Galón para interiores. Lavable, acabado mate.' },
  { id: 'p14', nombre: 'Látex azul cielo', seccion: 'pinturas', precio: 52.9, dibujo: 'lata', color: '#7fb3d5', descripcion: 'Galón para interiores. Lavable, acabado mate.' },
  { id: 'p15', nombre: 'Esmalte rojo', seccion: 'pinturas', precio: 39.9, dibujo: 'lata', color: '#c0392b', descripcion: 'Cuarto de galón, brillante, para metal y madera.' },
  { id: 'p16', nombre: 'Esmalte verde', seccion: 'pinturas', precio: 39.9, dibujo: 'lata', color: '#3e7d3a', descripcion: 'Cuarto de galón, brillante, para metal y madera.' },
  { id: 'p17', nombre: 'Barniz marino', seccion: 'pinturas', precio: 44, dibujo: 'lata', color: '#b7791f', descripcion: 'Protege la madera al aire libre del sol y de la lluvia.' },
  { id: 'p18', nombre: 'Brocha de 2"', seccion: 'pinturas', precio: 6.9, dibujo: 'brocha', color: '#3b2a1d', descripcion: 'Cerda natural, para esmaltes y barnices.' },
  { id: 'p19', nombre: 'Brocha de 4"', seccion: 'pinturas', precio: 11.9, dibujo: 'brocha', color: '#c0392b', descripcion: 'Cerda sintética, para látex en paredes grandes.' },
  { id: 'p20', nombre: 'Rodillo de 9"', seccion: 'pinturas', precio: 16.5, dibujo: 'rodillo', color: '#f2c14e', descripcion: 'Felpa de pelo corto para paredes lisas.' },
  { id: 'p21', nombre: 'Spray negro mate', seccion: 'pinturas', precio: 13.9, dibujo: 'spray', color: '#1f1811', descripcion: 'Seca al tacto en 10 minutos.' },
  { id: 'p22', nombre: 'Cinta de enmascarar', seccion: 'pinturas', precio: 4.9, dibujo: 'cinta', color: '#e8d9a8', descripcion: 'Para bordes limpios al pintar. Rollo de 40 m.' },
  { id: 'p23', nombre: 'Tornillos para madera', seccion: 'tornillos', precio: 7.5, dibujo: 'caja', color: '#c0392b', descripcion: 'Caja de 100, de 1 1/2", con cabeza de estrella.' },
  { id: 'p24', nombre: 'Tornillos autorroscantes', seccion: 'tornillos', precio: 8.9, dibujo: 'caja', color: '#3e7d3a', descripcion: 'Caja de 100, para planchas de metal.' },
  { id: 'p25', nombre: 'Clavos de 2"', seccion: 'tornillos', precio: 5.9, dibujo: 'caja', color: '#f2c14e', descripcion: 'Medio kilo de clavos con cabeza.' },
  { id: 'p26', nombre: 'Clavos de 3"', seccion: 'tornillos', precio: 6.5, dibujo: 'caja', color: '#b7791f', descripcion: 'Medio kilo de clavos con cabeza.' },
  { id: 'p27', nombre: 'Tarugos de 1/4"', seccion: 'tornillos', precio: 4.5, dibujo: 'caja', color: '#7fb3d5', descripcion: 'Bolsa de 50, para pared de ladrillo o de concreto.' },
  { id: 'p28', nombre: 'Pernos con tuerca', seccion: 'tornillos', precio: 9.9, dibujo: 'caja', color: '#1f1811', descripcion: 'Caja de 25, de 3/8" por 2".' },
  { id: 'p29', nombre: 'Arandelas planas', seccion: 'tornillos', precio: 3.9, dibujo: 'caja', color: '#9aa0a6', descripcion: 'Bolsa de 50, de 3/8".' },
  { id: 'p30', nombre: 'Ganchos en S', seccion: 'tornillos', precio: 5.5, dibujo: 'caja', color: '#c9a14a', descripcion: 'Bolsa de 10, para colgar herramientas como estas.' },
  { id: 'p31', nombre: 'Pala de punta', seccion: 'jardin', precio: 34.9, dibujo: 'pala', color: '#3b2a1d', descripcion: 'Hoja de acero y mango de madera de 1,2 m.' },
  { id: 'p32', nombre: 'Rastrillo', seccion: 'jardin', precio: 26.9, dibujo: 'rastrillo', color: '#3e7d3a', descripcion: '14 dientes, para hojas y tierra.' },
  { id: 'p33', nombre: 'Regadera de 10 L', seccion: 'jardin', precio: 21, dibujo: 'regadera', color: '#3e7d3a', descripcion: 'Con flor removible, para regar suave.' },
  { id: 'p34', nombre: 'Manguera de 15 m', seccion: 'jardin', precio: 45, dibujo: 'manguera', color: '#f2c14e', descripcion: 'Reforzada, no se dobla. Incluye conectores.' },
  { id: 'p35', nombre: 'Tijera de podar', seccion: 'jardin', precio: 29.9, dibujo: 'tijera', color: '#c0392b', descripcion: 'Corta ramas de hasta 2 cm.' },
  { id: 'p36', nombre: 'Guantes de jardín', seccion: 'jardin', precio: 12.9, dibujo: 'guantes', color: '#f2c14e', descripcion: 'Palma de látex y puño elástico. Talla única.' },
  { id: 'p37', nombre: 'Semillas de albahaca', seccion: 'jardin', precio: 2.5, dibujo: 'semillas', color: '#3e7d3a', descripcion: 'Sobre de 1 g, unas 600 semillas.' },
  { id: 'p38', nombre: 'Semillas de girasol', seccion: 'jardin', precio: 2.5, dibujo: 'semillas', color: '#f2c14e', descripcion: 'Sobre de 10 g, unas 60 semillas.' },
  { id: 'p39', nombre: 'Tierra preparada', seccion: 'jardin', precio: 15, dibujo: 'saco', color: '#6b8e3d', descripcion: 'Saco de 25 L con compost, lista para macetas.' },
  { id: 'p40', nombre: 'Aspersor giratorio', seccion: 'jardin', precio: 19.9, dibujo: 'aspersor', color: '#c0392b', descripcion: 'Riega un círculo de hasta 8 m.' },
];

// Lo que se está mirando: la sección ('todo' o una de SECCIONES) y el pasillo (la página)
const estado = {
  seccion: 'todo',
  pagina: 1,
};

const tablero = document.querySelector('[data-tablero]');
const plantilla = document.querySelector('[data-plantilla]');
const titulo = document.querySelector('[data-titulo]');
const resumen = document.querySelector('[data-resumen]');
const anuncio = document.querySelector('[data-anuncio]');
// FIN PASO 1


// PASO 2: el tablero
// Los productos del pasillo actual: los de la sección, del 1 al 10, del 11
// al 20… Cada uno sale de la plantilla <template>. El precio se escribe con
// Intl.NumberFormat, que sabe cómo se escriben los soles: "S/ 24.90".

const soles = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' });

function productosDeLaSeccion() {
  if (estado.seccion === 'todo') return PRODUCTOS;
  return PRODUCTOS.filter((producto) => producto.seccion === estado.seccion);
}

function totalPasillos() {
  return Math.max(1, Math.ceil(productosDeLaSeccion().length / POR_PAGINA));
}

function productosDelPasillo() {
  const desde = (estado.pagina - 1) * POR_PAGINA;
  return productosDeLaSeccion().slice(desde, desde + POR_PAGINA);
}

function crearProducto(producto) {
  const item = plantilla.content.firstElementChild.cloneNode(true);
  item.dataset.id = producto.id;
  item.style.setProperty('--c', producto.color);
  item.querySelector('use').setAttribute('href', `#d-${producto.dibujo}`);
  item.querySelector('[data-nombre]').textContent = producto.nombre;
  item.querySelector('[data-precio]').textContent = soles.format(producto.precio);
  item.querySelector('[data-ver]').setAttribute('aria-label', `Ver de cerca: ${producto.nombre}`);
  item.querySelector('[data-agregar]').setAttribute('aria-label', `Agregar ${producto.nombre} a la caja`);
  return item;
}

function pintarTablero() {
  tablero.replaceChildren(...productosDelPasillo().map(crearProducto));
  titulo.textContent = estado.seccion === 'todo' ? 'Todo' : SECCIONES[estado.seccion];
  resumen.textContent = `${productosDeLaSeccion().length} productos · pasillo ${estado.pagina} de ${totalPasillos()}`;
  document.title = `${titulo.textContent} · Ferretería Don Lucho`;
  pintarEnCaja(); // PASO 6
}
// FIN PASO 2


// PASO 3: secciones y pasillos
// Los enlaces de las secciones y de los pasillos son <a> de verdad, con su
// dirección (?seccion=pinturas&pagina=2): se pueden abrir en otra pestaña.
// Pero un clic normal no recarga la página: se cancela con preventDefault()
// y solo se cambia el estado y se vuelve a pintar.

const navSecciones = document.querySelector('[data-secciones]');
const navPasillos = document.querySelector('[data-pasillos]');

function direccion(seccion, pagina) {
  const parametros = new URLSearchParams();
  if (seccion !== 'todo') parametros.set('seccion', seccion);
  if (pagina > 1) parametros.set('pagina', pagina);
  return `?${parametros}`;
}

function crearEnlace(texto, seccion, pagina, actual) {
  const enlace = document.createElement('a');
  enlace.href = direccion(seccion, pagina);
  enlace.textContent = texto;
  enlace.dataset.seccion = seccion;
  enlace.dataset.pagina = pagina;
  if (actual) enlace.setAttribute('aria-current', 'page');
  return enlace;
}

function pintarNavegacion() {
  const secciones = { todo: 'Todo', ...SECCIONES };
  navSecciones.replaceChildren(...Object.entries(secciones).map(([clave, nombre]) =>
    crearEnlace(nombre, clave, 1, clave === estado.seccion)));

  const etiqueta = document.createElement('span');
  etiqueta.textContent = 'Pasillo';
  const pasillos = [];
  for (let n = 1; n <= totalPasillos(); n++) {
    const enlace = crearEnlace(String(n), estado.seccion, n, n === estado.pagina);
    enlace.setAttribute('aria-label', `Pasillo ${n}`);
    pasillos.push(enlace);
  }
  navPasillos.replaceChildren(etiqueta, ...pasillos);
}

function irA(seccion, pagina) {
  estado.seccion = seccion;
  estado.pagina = pagina;
  pintarTablero();
  pintarNavegacion();
  escribirURL(); // PASO 4
  titulo.scrollIntoView({ block: 'nearest' });
}

for (const nav of [navSecciones, navPasillos]) {
  nav.addEventListener('click', (evento) => {
    const enlace = evento.target.closest('a');
    // Ctrl, Cmd o la rueda del mouse: que el navegador abra la otra pestaña
    if (!enlace || evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.button !== 0) return;
    evento.preventDefault();
    irA(enlace.dataset.seccion, Number(enlace.dataset.pagina));
  });
}
// FIN PASO 3


// PASO 4: la dirección de la página
// La sección y el pasillo viven en la URL. Al abrir, se leen con
// URLSearchParams. Al cambiar, history.pushState escribe la dirección nueva
// sin recargar. Y al usar Atrás o Adelante, llega el evento popstate: se
// vuelve a leer la URL y se pinta lo que dice.

function leerURL() {
  const parametros = new URLSearchParams(location.search);
  const seccion = parametros.get('seccion');
  estado.seccion = seccion && Object.hasOwn(SECCIONES, seccion) ? seccion : 'todo';
  const pagina = Number(parametros.get('pagina'));
  estado.pagina = Number.isInteger(pagina) && pagina >= 1 ? Math.min(pagina, totalPasillos()) : 1;
}

function escribirURL() {
  const nueva = direccion(estado.seccion, estado.pagina);
  if (nueva !== location.search && !(nueva === '?' && location.search === '')) history.pushState(null, '', nueva);
}

window.addEventListener('popstate', () => {
  leerURL();
  pintarTablero();
  pintarNavegacion();
});
// FIN PASO 4


// PASO 5: el carrito, una clase
// El carrito guarda cuántas unidades hay de cada producto en un Map (id →
// cantidad). Ese Map es un campo privado (#items): desde afuera no se puede
// tocar, solo usar los métodos. La clase extiende EventTarget, así que el
// carrito puede lanzar su propio evento, «cambio», cada vez que algo cambia,
// y el resto de la página lo escucha como escucha un clic.

const porId = new Map(PRODUCTOS.map((producto) => [producto.id, producto]));

class Carrito extends EventTarget {
  #items = new Map();

  cantidadDe(id) {
    return this.#items.get(id) ?? 0;
  }

  cambiar(id, cantidad) {
    if (cantidad <= 0) this.#items.delete(id);
    else this.#items.set(id, cantidad);
    this.#avisar();
  }

  agregar(id, cuantos = 1) {
    this.cambiar(id, this.cantidadDe(id) + cuantos);
  }

  vaciar() {
    this.#items.clear();
    this.#avisar();
  }

  // Cambia todo el contenido de una vez (lo usa el paso 8)
  reemplazar(pares) {
    this.#items = new Map(pares);
    this.#avisar();
  }

  // Los "getters" se leen como propiedades: carrito.cantidad, sin paréntesis
  get cantidad() {
    let suma = 0;
    for (const cantidad of this.#items.values()) suma += cantidad;
    return suma;
  }

  get total() {
    let suma = 0;
    for (const [id, cantidad] of this.#items) suma += porId.get(id).precio * cantidad;
    return Math.round(suma * 100) / 100;
  }

  get items() {
    return [...this.#items].map(([id, cantidad]) => ({ producto: porId.get(id), cantidad }));
  }

  // JSON.stringify(carrito) usa este método: guarda los pares [id, cantidad]
  toJSON() {
    return [...this.#items];
  }

  #avisar() {
    this.dispatchEvent(new CustomEvent('cambio', { detail: { cantidad: this.cantidad } }));
  }
}

const carrito = new Carrito();
// FIN PASO 5


// PASO 6: agregar y el contador
// Al tocar «Agregar», el producto va al carrito. El carrito avisa con su
// evento «cambio», y quien lo escucha pinta el contador de la barra y la
// marca «En tu caja» de cada producto. El producto se balancea en su gancho.

const contador = document.querySelector('[data-contador]');
const cantidadCaja = document.querySelector('[data-cantidad]');

function pintarContador() {
  cantidadCaja.textContent = carrito.cantidad;
  if (carrito.cantidad === 0) contador.classList.remove('cambio');
  contador.setAttribute('aria-label', `Tu caja: ${carrito.cantidad} ${carrito.cantidad === 1 ? 'producto' : 'productos'}`);
}

function pintarEnCaja() {
  for (const item of tablero.children) {
    const cuantos = carrito.cantidadDe(item.dataset.id);
    const marca = item.querySelector('[data-en-caja]');
    marca.hidden = cuantos === 0;
    marca.textContent = `En tu caja: ${cuantos}`;
  }
}

// Volver a poner una clase de animación la hace correr otra vez: se quita,
// se fuerza al navegador a mirar el elemento (offsetWidth) y se pone
function animar(elemento, clase) {
  elemento.classList.remove(clase);
  void elemento.offsetWidth;
  elemento.classList.add(clase);
}

// El contador queda marcado hasta que lo miras (pasas el mouse o le das el foco)
function marcarCambio() {
  animar(contador, 'cambio');
}
contador.addEventListener('pointerenter', () => contador.classList.remove('cambio'));
contador.addEventListener('focus', () => contador.classList.remove('cambio'));

carrito.addEventListener('cambio', () => {
  pintarContador();
  pintarEnCaja();
  pintarCaja(); // PASO 7
});

tablero.addEventListener('click', (evento) => {
  const boton = evento.target.closest('[data-agregar]');
  if (!boton) return;
  const item = boton.closest('.herramienta');
  carrito.agregar(item.dataset.id);
  animar(item, 'balanceo');
  marcarCambio();
  anuncio.textContent = `Agregaste ${porId.get(item.dataset.id).nombre}. Tienes ${carrito.cantidad} en la caja.`;
});
// FIN PASO 6


// PASO 7: la caja
// La caja muestra lo elegido, con botones para sumar o restar una unidad, el
// total y el botón de pagar. Como se vuelve a pintar entera en cada cambio,
// después de tocar − o + el foco se devuelve al mismo botón.

const listaCaja = document.querySelector('[data-items]');
const vacia = document.querySelector('[data-vacia]');
const totalCaja = document.querySelector('[data-total]');
const botonPagar = document.querySelector('[data-pagar]');

function crearItem({ producto, cantidad }) {
  const item = document.createElement('li');
  item.className = 'item';
  item.style.setProperty('--c', producto.color);
  item.innerHTML = `
    <svg viewBox="0 0 150 130" aria-hidden="true"><use href="#d-${producto.dibujo}" /></svg>
    <b></b>
    <span class="cantidad">
      <button type="button" data-accion="menos" data-id="${producto.id}"><svg aria-hidden="true"><use href="#i-menos" /></svg></button>
      <span data-unidades>${cantidad}</span>
      <button type="button" data-accion="mas" data-id="${producto.id}"><svg aria-hidden="true"><use href="#i-mas" /></svg></button>
      <span class="subtotal">${soles.format(producto.precio * cantidad)}</span>
    </span>`;
  item.querySelector('b').textContent = producto.nombre;
  item.querySelector('[data-accion="menos"]').setAttribute('aria-label', cantidad === 1 ? `Quitar ${producto.nombre}` : `Una menos de ${producto.nombre}`);
  item.querySelector('[data-accion="mas"]').setAttribute('aria-label', `Una más de ${producto.nombre}`);
  return item;
}

function pintarCaja() {
  const items = carrito.items;
  listaCaja.replaceChildren(...items.map(crearItem));
  vacia.hidden = items.length > 0;
  totalCaja.textContent = soles.format(carrito.total);
  botonPagar.disabled = items.length === 0;
}

listaCaja.addEventListener('click', (evento) => {
  const boton = evento.target.closest('[data-accion]');
  if (!boton) return;
  const { id, accion } = boton.dataset;
  const antes = carrito.cantidadDe(id);
  carrito.cambiar(id, accion === 'mas' ? antes + 1 : antes - 1);
  const nombre = porId.get(id).nombre;
  anuncio.textContent = carrito.cantidadDe(id) ? `${nombre}: ${carrito.cantidadDe(id)}.` : `Quitaste ${nombre} de la caja.`;
  // El foco vuelve al mismo botón; si el producto salió de la caja, al título de la caja
  const mismo = listaCaja.querySelector(`[data-id="${id}"][data-accion="${accion}"]`);
  (mismo ?? document.querySelector('#caja')).focus();
});
// FIN PASO 7


// PASO 8: guardar la caja y compartirla entre pestañas
// Cada cambio se guarda en localStorage. Cuando otra pestaña de la misma
// tienda guarda, a esta le llega el evento «storage» con el valor nuevo:
// se lo pasa al carrito, que avisa su «cambio», y todo se vuelve a pintar.

const CLAVE = 'ferreteria:caja';

// Lo guardado pudo cambiarlo cualquiera: solo se aceptan pares [id, cantidad] válidos
function leerGuardado(texto) {
  try {
    const pares = JSON.parse(texto);
    if (!Array.isArray(pares)) return [];
    return pares.filter(([id, cantidad]) => porId.has(id) && Number.isInteger(cantidad) && cantidad > 0);
  } catch {
    return [];
  }
}

carrito.addEventListener('cambio', () => {
  localStorage.setItem(CLAVE, JSON.stringify(carrito));
});

window.addEventListener('storage', (evento) => {
  if (evento.key !== CLAVE) return;
  carrito.reemplazar(leerGuardado(evento.newValue));
  marcarCambio();
  anuncio.textContent = `La caja cambió en otra pestaña: ahora tiene ${carrito.cantidad}.`;
});
// FIN PASO 8


// PASO 9: la vista rápida
// Un popover es un elemento que aparece encima de todo y se cierra solo con
// Escape o tocando afuera. Este se llena con el producto que tocaste y se
// abre con showPopover().

const vista = document.querySelector('[data-vista]');

function abrirVista(id) {
  const producto = porId.get(id);
  vista.dataset.id = id;
  vista.style.setProperty('--c', producto.color);
  vista.querySelector('[data-vista-uso]').setAttribute('href', `#d-${producto.dibujo}`);
  vista.querySelector('[data-vista-nombre]').textContent = producto.nombre;
  vista.querySelector('[data-vista-descripcion]').textContent = producto.descripcion;
  vista.querySelector('[data-vista-precio]').textContent = soles.format(producto.precio);
  vista.showPopover();
  vista.querySelector('[data-vista-agregar]').focus();
}

tablero.addEventListener('click', (evento) => {
  const boton = evento.target.closest('[data-ver]');
  if (boton) abrirVista(boton.closest('.herramienta').dataset.id);
});

vista.querySelector('[data-vista-agregar]').addEventListener('click', () => {
  const id = vista.dataset.id;
  carrito.agregar(id);
  vista.hidePopover();
  marcarCambio();
  anuncio.textContent = `Agregaste ${porId.get(id).nombre}. Tienes ${carrito.cantidad} en la caja.`;
  const item = tablero.querySelector(`[data-id="${id}"]`);
  if (item) {
    animar(item, 'balanceo');
    item.querySelector('[data-ver]').focus();
  }
});
// FIN PASO 9


// PASO 10: el formulario de pago
// El formulario tiene novalidate: el navegador no muestra sus globos de
// error, pero sigue revisando cada campo (required, type="email", pattern…).
// Con campo.validity se sabe qué falla, y el mensaje se escribe debajo del
// campo, en español y con la solución.

const dialogo = document.querySelector('[data-dialogo-pago]');
const formulario = document.querySelector('[data-formulario]');
const campos = [...formulario.querySelectorAll('input')];
const confirmado = document.querySelector('[data-confirmado]');
const estadoPago = document.querySelector('[data-estado-pago]');

const PATRONES = {
  tarjeta: 'La tarjeta tiene 16 dígitos.',
  vencimiento: 'Escribe el mes y el año así: 08/27.',
  codigo: 'El código tiene 3 o 4 dígitos, detrás de la tarjeta.',
};

function mensajeDe(campo) {
  const validez = campo.validity;
  if (validez.valueMissing) return 'Falta completar este campo.';
  if (validez.typeMismatch) return 'Escribe un correo como nombre@correo.com.';
  if (validez.tooShort) return `Escribe al menos ${campo.minLength} letras.`;
  if (validez.patternMismatch) return PATRONES[campo.name];
  if (validez.customError) return campo.validationMessage;
  return '';
}

// Un vencimiento con buena forma puede estar en el pasado: eso lo revisa JavaScript
function revisarVencimiento(campo) {
  campo.setCustomValidity('');
  const partes = campo.value.match(/^(\d{2})\/(\d{2})$/);
  if (!partes) return;
  const hoy = new Date();
  const [mes, anio] = [Number(partes[1]), 2000 + Number(partes[2])];
  if (anio < hoy.getFullYear() || (anio === hoy.getFullYear() && mes < hoy.getMonth() + 1)) {
    campo.setCustomValidity('La tarjeta está vencida.');
  }
}

function validarCampo(campo) {
  if (campo.name === 'vencimiento') revisarVencimiento(campo);
  const mensaje = campo.checkValidity() ? '' : mensajeDe(campo);
  formulario.querySelector(`[data-error="${campo.name}"]`).textContent = mensaje;
  campo.setAttribute('aria-invalid', mensaje ? 'true' : 'false');
  return mensaje === '';
}

// Mientras escribes: la tarjeta se separa de a cuatro cifras y el vencimiento lleva su barra
formulario.tarjeta.addEventListener('input', () => {
  const cifras = formulario.tarjeta.value.replace(/\D/g, '').slice(0, 16);
  formulario.tarjeta.value = cifras.replace(/(\d{4})(?=\d)/g, '$1 ');
});
formulario.vencimiento.addEventListener('input', (evento) => {
  const cifras = formulario.vencimiento.value.replace(/\D/g, '').slice(0, 4);
  const borrando = evento.inputType?.startsWith('delete');
  formulario.vencimiento.value = cifras.length > 2 || (cifras.length === 2 && !borrando) ? `${cifras.slice(0, 2)}/${cifras.slice(2)}` : cifras;
});
formulario.codigo.addEventListener('input', () => {
  formulario.codigo.value = formulario.codigo.value.replace(/\D/g, '');
});

for (const campo of campos) {
  // Al salir del campo se revisa; mientras escribes, solo se borra el error si ya está bien
  campo.addEventListener('change', () => validarCampo(campo));
  campo.addEventListener('input', () => {
    if (campo.getAttribute('aria-invalid') === 'true') validarCampo(campo);
  });
}

botonPagar.addEventListener('click', () => {
  formulario.hidden = false;
  confirmado.hidden = true;
  estadoPago.textContent = '';
  formulario.querySelector('[data-resumen-pago]').innerHTML =
    `<b>${carrito.cantidad}</b> ${carrito.cantidad === 1 ? 'producto' : 'productos'} · total <b>${soles.format(carrito.total)}</b>`;
  dialogo.showModal();
});

formulario.querySelector('[data-cancelar]').addEventListener('click', () => dialogo.close());

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const validos = campos.map(validarCampo);
  if (validos.includes(false)) {
    campos[validos.indexOf(false)].focus();
    return;
  }
  pagar(); // PASO 11
});
// FIN PASO 10


// PASO 11: pagar
// El pago es de prueba: procesarPago devuelve una promesa que se cumple a
// los 1,5 segundos con un número de pedido, o se rechaza si la tarjeta
// termina en 0000. Con async y await, el código espera sin congelar la
// página, y mientras tanto el botón dice «Procesando…».

const botonConfirmar = formulario.querySelector('[data-confirmar]');
const botonCancelar = formulario.querySelector('[data-cancelar]');

function procesarPago(datos) {
  return new Promise((cumplir, rechazar) => {
    setTimeout(() => {
      if (datos.tarjeta.endsWith('0000')) rechazar(new Error('La tarjeta fue rechazada. Prueba con otra.'));
      else cumplir({ pedido: `DL-${Math.floor(10000 + Math.random() * 90000)}` });
    }, 1500);
  });
}

function procesando(si) {
  formulario.setAttribute('aria-busy', si);
  botonConfirmar.disabled = si;
  botonCancelar.disabled = si;
  for (const campo of campos) campo.readOnly = si;
  botonConfirmar.textContent = si ? 'Procesando…' : 'Pagar';
}

async function pagar() {
  const datos = Object.fromEntries(new FormData(formulario));
  procesando(true);
  estadoPago.classList.remove('mal');
  estadoPago.textContent = 'Procesando el pago…';
  try {
    const { pedido } = await procesarPago(datos);
    const resumenCompra = `${carrito.cantidad} ${carrito.cantidad === 1 ? 'producto' : 'productos'} por ${soles.format(carrito.total)}`;
    carrito.vaciar();
    formulario.reset();
    for (const campo of campos) campo.removeAttribute('aria-invalid');
    estadoPago.textContent = '';
    formulario.hidden = true;
    confirmado.hidden = false;
    const detalle = confirmado.querySelector('[data-detalle-confirmado]');
    detalle.replaceChildren(`Pedido `, Object.assign(document.createElement('b'), { textContent: pedido }),
      ` · ${resumenCompra}. La boleta iría a ${datos.correo} (es un pago de prueba: no se envió nada).`);
    confirmado.querySelector('[data-titulo-confirmado]').focus();
  } catch (error) {
    // El problema es de la tarjeta: se dice en su campo, como los demás errores
    estadoPago.classList.add('mal');
    estadoPago.textContent = 'No se pudo pagar.';
    formulario.querySelector('[data-error="tarjeta"]').textContent = error.message;
    formulario.tarjeta.setAttribute('aria-invalid', 'true');
    formulario.tarjeta.focus();
  } finally {
    procesando(false);
  }
}

// Mientras procesa, Escape no cierra el diálogo
dialogo.addEventListener('cancel', (evento) => {
  if (formulario.getAttribute('aria-busy') === 'true') evento.preventDefault();
});

confirmado.querySelector('[data-seguir]').addEventListener('click', () => dialogo.close());
// FIN PASO 11


// ARRANQUE (desde el PASO 2): lo primero que corre al abrir la página
leerURL(); // PASO 4
pintarTablero();
pintarNavegacion(); // PASO 3
carrito.reemplazar(leerGuardado(localStorage.getItem(CLAVE))); // PASO 8
pintarContador(); // PASO 6
pintarCaja(); // PASO 7
