// Pruebas del Buscador con autocompletado (Viaja a un artículo), una por paso.
// Las corre herramientas/proyectos.mjs (en el repositorio de domina-js) con Playwright:
// abre la página con el app.js tal como queda después de cada paso y evalúa cada prueba en ella.
// Una prueba es código que corre en la página y devuelve true si el paso funciona
// (o una promesa que termina en true). Corren en orden, en la misma página.
// Usan la API real de Wikipedia en español: hace falta conexión a internet.

/** Espera hasta que la condición se cumpla (o pase el tiempo) */
const esperarHasta = (condicion, ms = 15000) => `await (async () => {
  const fin = Date.now() + ${ms};
  while (!(${condicion}) && Date.now() < fin) await new Promise((listo) => setTimeout(listo, 100));
})()`;

/** Escribe en la caja como una persona: una letra cada 30 ms, con su evento input */
const escribir = (texto) => `await (async () => {
  const caja = document.querySelector('#campo');
  caja.value = '';
  for (const letra of ${JSON.stringify(texto)}) {
    caja.value += letra;
    caja.dispatchEvent(new InputEvent('input', { bubbles: true }));
    await new Promise((listo) => setTimeout(listo, 30));
  }
})()`;

const tecla = (key) => `campo.dispatchEvent(new KeyboardEvent('keydown', { key: '${key}', bubbles: true, cancelable: true }))`;

export const pruebas = [
  {
    paso: 1,
    que: 'están las dos direcciones de Wikipedia, los límites y el estado vacío',
    codigo: `(async () => {
      // Desde el paso 10, al abrir llegan los destinos sugeridos: los esperamos para que no se crucen con las pruebas
      ${esperarHasta("typeof mostrarSugeridos === 'undefined' || estado.resultados.length > 0")};
      return BUSQUEDA.startsWith('https://es.wikipedia.org/') && RESUMEN.startsWith('https://es.wikipedia.org/')
        && LIMITE === 8 && ESPERA === 250 && MINIMO === 2
        && Array.isArray(estado.resultados) && estado.activo === -1
        && campo instanceof HTMLInputElement && plantillaBillete instanceof HTMLTemplateElement;
    })()`,
  },
  {
    paso: 2,
    que: 'debounce espera a que dejes de llamar, y entonces llama una sola vez con lo último',
    codigo: `(async () => {
      const llamadas = [];
      const anotar = debounce((x) => llamadas.push(x), 80);
      anotar('l'); anotar('li'); anotar('lim');
      await new Promise((listo) => setTimeout(listo, 40));
      const antes = llamadas.length === 0;
      await new Promise((listo) => setTimeout(listo, 120));
      return antes && llamadas.length === 1 && llamadas[0] === 'lim';
    })()`,
  },
  {
    paso: 3,
    que: 'pedirResultados trae hasta 8 artículos con clave, título y foto en tamaño grande',
    codigo: `(async () => {
      const resultados = await pedirResultados('lima', new AbortController().signal);
      const conFoto = resultados.find((r) => r.foto);
      return resultados.length > 0 && resultados.length <= 8
        && resultados.some((r) => r.titulo === 'Lima') && typeof resultados[0].clave === 'string'
        && conFoto.foto.startsWith('https://') && conFoto.foto.includes('/250px-');
    })()`,
  },
  {
    paso: 4,
    que: 'escribir busca una sola vez al terminar, guarda en caché y cancela la búsqueda vieja',
    codigo: `(async () => {
      let pedidos = 0;
      const real = window.fetch;
      window.fetch = (...args) => { if (String(args[0]).includes('search/title')) pedidos++; return real(...args); };
      ${escribir('lima')};
      ${esperarHasta("estado.consulta === 'lima' && estado.resultados.length > 0")};
      const una = pedidos === 1 && cache.has('lima');
      await buscar('lima');
      const deCache = pedidos === 1;
      const viejo = buscar('perú');
      await buscar('peru');
      await viejo;
      window.fetch = real;
      return una && deCache && estado.consulta === 'peru' && cache.has('peru');
    })()`,
  },
  {
    paso: 5,
    que: 'cada resultado es un billete (role="option") con su foto, su nombre y su número',
    codigo: `(async () => {
      await buscar('lima');
      const billetes = lista.querySelectorAll('[role="option"]');
      const primero = billetes[0];
      const vacia = (await buscar('l'), lista.children.length === 0);
      await buscar('lima');
      return billetes.length === estado.resultados.length && primero.id === 'billete-0'
        && primero.querySelector('[data-numero]').textContent === '01'
        && primero.querySelector('[data-nombre]').textContent === estado.resultados[0].titulo
        && campo.getAttribute('aria-expanded') === 'true' && vacia;
    })()`,
  },
  {
    paso: 6,
    que: 'marcar resalta lo que coincide aunque cambien las tildes, y no se rompe con paréntesis',
    codigo: `(() => {
      const html = (texto, consulta) => {
        const caja = document.createElement('span');
        caja.append(marcar(texto, consulta));
        return caja.innerHTML;
      };
      return html('Árbol', 'arbol') === '<mark>Árbol</mark>'
        && html('Perú y el Perú', 'peru') === '<mark>Perú</mark> y el <mark>Perú</mark>'
        && html('Lima (fruta)', 'lima (f') === '<mark>Lima (f</mark>ruta)'
        && html('Lima', '') === 'Lima';
    })()`,
  },
  {
    paso: 7,
    que: 'las flechas mueven el billete activo con aria-activedescendant, y Escape borra',
    codigo: `(async () => {
      await buscar('lima');
      ${tecla('ArrowDown')}; ${tecla('ArrowDown')};
      const dos = estado.activo === 1 && campo.getAttribute('aria-activedescendant') === 'billete-1'
        && lista.children[1].getAttribute('aria-selected') === 'true';
      ${tecla('ArrowUp')}; ${tecla('ArrowUp')};
      const vuelta = estado.activo === estado.resultados.length - 1;
      campo.value = 'lima';
      ${tecla('Escape')};
      return dos && vuelta && campo.value === '' && estado.consulta === '' && !lista.querySelector('[aria-selected="true"]');
    })()`,
  },
  {
    paso: 8,
    que: 'Enter elige el billete activo y trae su resumen al billete grande, con su enlace',
    codigo: `(async () => {
      await buscar('lima');
      const i = estado.resultados.findIndex((r) => r.titulo === 'Lima');
      marcarActivo(i);
      ${tecla('Enter')};
      ${esperarHasta("elegido.querySelector('[data-titulo]')?.textContent === 'Lima'")};
      const grande = elegido.querySelector('.billete-grande');
      return grande !== null && grande.querySelector('[data-resumen]').textContent.length > 50
        && grande.querySelector('[data-enlace]').href.startsWith('https://es.wikipedia.org/wiki/')
        && lista.children[i].classList.contains('elegido-ya') && resumenes.has(estado.resultados[i].clave);
    })()`,
  },
  {
    paso: 9,
    que: 'si Wikipedia no responde, aparece un aviso con Reintentar, y Reintentar trae los billetes',
    codigo: `(async () => {
      const real = window.fetch;
      window.fetch = () => Promise.reject(new TypeError('Failed to fetch'));
      await buscar('montaña');
      const boton = aviso.querySelector('button');
      const avisa = aviso.classList.contains('mal') && aviso.textContent.includes('No se pudo llegar') && boton !== null;
      window.fetch = real;
      boton?.click();
      ${esperarHasta("estado.consulta === 'montaña' && lista.querySelectorAll('[role=option]').length > 0")};
      return avisa && lista.querySelectorAll('[role="option"]').length > 0 && aviso.children.length === 0;
    })()`,
  },
  {
    paso: 10,
    que: 'sin búsqueda, la lista muestra destinos con foto, y el botón de borrar aparece solo con texto',
    codigo: `(async () => {
      campo.value = '';
      await mostrarSugeridos();
      const destinos = estado.resultados.length >= 4 && estado.resultados.some((r) => r.titulo === 'Machu Picchu')
        && lista.querySelectorAll('[role="option"]').length === estado.resultados.length
        && fotoBienvenida.style.backgroundImage.includes('https://');
      campo.value = 'lima';
      campo.dispatchEvent(new InputEvent('input', { bubbles: true }));
      const aparece = !borrar.hidden;
      borrar.click();
      ${esperarHasta("estado.consulta === '' && estado.resultados.length > 0")};
      await new Promise((listo) => setTimeout(listo, 400));
      return destinos && aparece && campo.value === '' && borrar.hidden && document.activeElement === campo
        && estado.consulta === '' && estado.resultados.some((r) => r.titulo === 'Machu Picchu');
    })()`,
  },
];
