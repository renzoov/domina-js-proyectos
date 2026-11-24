// Pruebas del Explorador con scroll infinito (Mi sala), una por paso.
// Las corre herramientas/proyectos.mjs (en el repositorio de domina-js) con Playwright:
// abre la página con el app.js tal como queda después de cada paso y evalúa cada prueba en ella.
// Una prueba es código que corre en la página y devuelve true si el paso funciona
// (o una promesa que termina en true). Corren en orden, en la misma página.
// Usan la API real del Cleveland Museum of Art: hace falta conexión a internet.

/** Espera hasta que la condición se cumpla (o pase el tiempo) */
const esperarHasta = (condicion, ms = 20000) => `await (async () => {
  const fin = Date.now() + ${ms};
  while (!(${condicion}) && Date.now() < fin) await new Promise((listo) => setTimeout(listo, 100));
})()`;

/** Espera a que no haya ninguna tanda en camino */
const esperarQuieto = esperarHasta('!estado.cargando && lista.children.length > 0');

const DATO_FALSO = `{
  id: -1,
  title: 'The Red Kerchief',
  creators: [{ description: 'Claude Monet (French, 1840–1926)' }],
  creation_date: 'c. 1868–73',
  technique: 'oil on canvas',
  description: '<p>Camille, <i>la esposa</i> del pintor.</p>',
  accession_number: '1958.39',
  images: { web: { url: 'https://openaccess-cdn.clevelandart.org/1958.39/1958.39_web.jpg', width: '723', height: '900' } },
}`;

/** Vacía la sala, para que cada prueba empiece igual */
const vaciarSala = `sala.length = 0; actualizarSala();`;

export const pruebas = [
  {
    paso: 1,
    que: 'hay una dirección de la API, tandas de 12, 6 lugares en la sala y el estado empieza sin total',
    codigo: `API.startsWith('https://openaccess-api.clevelandart.org/') && POR_TANDA === 12 && LUGARES === 6
      && estado.desde >= 0 && 'total' in estado && plantilla instanceof HTMLTemplateElement
      && lugares.length === 6 && numero.format(3964) === '3,964'`,
  },
  {
    paso: 2,
    que: 'pedirTanda trae 12 pinturas desde la posición pedida, y el total de la colección',
    codigo: `(async () => {
      const { total, datos } = await pedirTanda(24);
      return datos.length === 12 && total > 1000 && typeof datos[0].images.web.url === 'string';
    })()`,
  },
  {
    paso: 3,
    que: 'aObra deja solo lo que se usa (autor sin paréntesis, año, imagen con números) y la obra queda en el Map',
    codigo: `(() => {
      const obra = guardarObra(${DATO_FALSO});
      const sinAutor = aObra({ id: -2, title: 'Sin nombre', images: {} });
      return obras instanceof Map && obras.get(-1) === obra
        && obra.autor === 'Claude Monet' && obra.anio === '1868' && obra.descripcion === 'Camille, la esposa del pintor.'
        && obra.imagen.ancho === 723 && obra.imagen.alto === 900 && obra.inventario === '1958.39'
        && sinAutor.autor === 'Autor desconocido' && sinAutor.imagen === null;
    })()`,
  },
  {
    paso: 4,
    que: 'crearTarjeta copia la plantilla y la llena: título, autor, año e imagen diferida con su tamaño',
    codigo: `(() => {
      const tarjeta = crearTarjeta(guardarObra(${DATO_FALSO}));
      const imagen = tarjeta.querySelector('img');
      return tarjeta.matches('li.obra') && tarjeta.dataset.id === '-1'
        && tarjeta.querySelector('h3').textContent === 'The Red Kerchief'
        && tarjeta.querySelector('[data-autor]').textContent === 'Claude Monet'
        && tarjeta.querySelector('[data-anio]').textContent === '1868'
        && imagen.loading === 'lazy' && imagen.getAttribute('width') === '723' && imagen.src.endsWith('1958.39_web.jpg');
    })()`,
  },
  {
    paso: 5,
    que: 'al abrir llega la primera tanda, la cuenta dice cuántas hay, y no se piden dos tandas a la vez',
    codigo: `(async () => {
      ${esperarQuieto};
      const llego = lista.children.length >= 12 && estado.total > 1000 && estado.desde >= 12
        && cuentaObras.textContent === numero.format(lista.children.length) + ' de ' + numero.format(estado.total);
      estado.cargando = true;
      const antes = estado.desde;
      await cargarMas();
      const unaVez = estado.desde === antes;
      estado.cargando = false;
      return llego && unaVez;
    })()`,
  },
  {
    paso: 6,
    que: 'al llegar al final de la lista, el IntersectionObserver trae la tanda siguiente',
    codigo: `(async () => {
      ${esperarQuieto};
      const antes = lista.children.length;
      centinela.scrollIntoView();
      ${esperarHasta('lista.children.length > antes')};
      const crecio = lista.children.length > antes;
      scrollTo(0, 0);
      ${esperarQuieto};
      return observador instanceof IntersectionObserver && crecio && typeof mostrarFin === 'function';
    })()`,
  },
  {
    paso: 7,
    que: 'si la tanda falla, aparece un aviso con Reintentar, el scroll no insiste, y Reintentar la trae',
    codigo: `(async () => {
      ${esperarQuieto};
      const real = window.fetch;
      window.fetch = () => Promise.reject(new TypeError('Failed to fetch'));
      await cargarMas();
      const aviso = estadoCarga.querySelector('.aviso.mal');
      const avisa = Boolean(aviso) && aviso.textContent.includes('No se pudo llegar') && estado.error instanceof TypeError;
      const desde = estado.desde;
      await cargarMas();
      const espera = estado.desde === desde;
      window.fetch = real;
      const antes = lista.children.length;
      aviso?.querySelector('button')?.click();
      ${esperarHasta('lista.children.length > antes && !estado.cargando')};
      return avisa && espera && estado.error === null && lista.children.length > antes && !estadoCarga.querySelector('.aviso.mal');
    })()`,
  },
  {
    paso: 8,
    que: 'tocar una obra abre su ficha con sus datos, y el botón de cerrar la cierra',
    codigo: `(async () => {
      ${esperarQuieto};
      const tarjeta = lista.firstElementChild;
      const obra = obras.get(Number(tarjeta.dataset.id));
      tarjeta.querySelector('[data-ver]').click();
      const abierta = ficha.open && ficha.querySelector('h2').textContent === obra.titulo
        && ficha.querySelector('[data-ficha-inventario]').textContent === obra.inventario
        && ficha.querySelector('[data-ficha-enlace]').href.endsWith(obra.inventario);
      ficha.querySelector('[data-cerrar]').click();
      return abierta && !ficha.open;
    })()`,
  },
  {
    paso: 9,
    que: 'Colgar pone la obra en la pared, la sala se llena con 6, y Descolgar la quita',
    codigo: `(async () => {
      ${esperarHasta('lista.children.length >= 7 && !estado.cargando')};
      ${vaciarSala}
      const botones = [...lista.querySelectorAll('[data-colgar]')].slice(0, 7);
      botones[0].click();
      const primera = sala.length === 1 && lugares[0].classList.contains('lleno') && lugares[0].querySelector('image') !== null
        && botones[0].textContent.trim() === 'En tu sala';
      for (const boton of botones.slice(1, 6)) boton.click();
      const llena = sala.length === 6 && botones[6].getAttribute('aria-disabled') === 'true'
        && botones[6].textContent.trim() === 'Sala llena';
      botones[6].click();
      const nadaMas = sala.length === 6;
      botones[0].click();
      const quitada = sala.length === 5 && !lugares[5].classList.contains('lleno') && cuentaSala.textContent.startsWith('5 de 6');
      ${vaciarSala}
      return primera && llena && nadaMas && quitada;
    })()`,
  },
  {
    paso: 10,
    que: 'el cuadro que se cuelga se anima al llegar a la pared',
    codigo: `(async () => {
      ${esperarQuieto};
      ${vaciarSala}
      lista.querySelector('[data-colgar]').click();
      const animado = lugares[0].querySelector('.colgando').getAnimations().length === 1;
      ${vaciarSala}
      return typeof animarCuadro === 'function' && animado;
    })()`,
  },
  {
    paso: 11,
    que: 'la sala se guarda en localStorage y al abrir se vuelve a colgar; si una obra no llega, queda pendiente',
    codigo: `(async () => {
      ${esperarHasta('lista.children.length >= 2 && !estado.cargando')};
      ${vaciarSala}
      const [a, b] = [...lista.children].slice(0, 2).map((tarjeta) => Number(tarjeta.dataset.id));
      lista.querySelector('[data-colgar]').click();
      const guardada = localStorage.getItem(CLAVE) === JSON.stringify([a]);
      sala.length = 0;
      pintarSala();
      localStorage.setItem(CLAVE, JSON.stringify([a, 999999999, b]));
      await restaurarSala();
      const colgadas = sala.length === 2 && sala[0] === a && sala[1] === b;
      const pendiente = pendientes.length === 1 && pendientes[0] === 999999999
        && avisoSala.textContent.includes('No se pudo traer 1 de tus obras')
        && JSON.parse(localStorage.getItem(CLAVE)).includes(999999999);
      pendientes = [];
      ${vaciarSala}
      avisoSala.replaceChildren();
      return guardada && colgadas && pendiente;
    })()`,
  },
];
