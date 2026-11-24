// Pruebas del Reto de mecanografía, una por paso.
// Las corre herramientas/proyectos.mjs (en el repositorio de domina-js) con Playwright:
// abre la página con el app.js tal como queda después de cada paso y evalúa cada prueba en ella.
// Una prueba es código que corre en la página y devuelve true si el paso funciona
// (o una promesa que termina en true). Corren en orden, en la misma página.

// Escribe en el campo como lo haría el teclado: cambia el valor y avisa con un evento input
const escribir = (valor) => `entrada.value = ${valor}; entrada.dispatchEvent(new InputEvent('input', { bubbles: true }))`;
const esperar = (ms) => `await new Promise((listo) => setTimeout(listo, ${ms}))`;
// Hace como si ya hubiera pasado todo el tiempo, y espera a que el reloj lo note
const agotarTiempo = `estado.inicio = performance.now() - estado.duracion * 1000 - 500; ${esperar(120)}`;

export const pruebas = [
  {
    paso: 1,
    que: 'hay textos para escribir y el estado empieza esperando la primera letra',
    codigo: `TEXTOS.length >= 20 && estado.fase === 'listo' && estado.duracion === 60
      && entrada instanceof HTMLInputElement && radiosDuracion.length === 3`,
  },
  {
    paso: 2,
    que: 'el texto se parte en grafemas (una «ñ» en dos partes cuenta como una) y cada letra tiene su <span>',
    codigo: `grafemas('cigu\\u0308en\\u0303a').length === 7 && grafemas('cigu\\u0308en\\u0303a')[5] === 'ñ'
      && letras.length === estado.objetivo.length && letras.length > 200
      && texto.querySelectorAll('.palabra').length > 30`,
  },
  {
    paso: 3,
    que: 'lo escrito se compara con el texto: bien, mal y el cursor en la letra siguiente',
    codigo: `(() => {
      ${escribir("estado.objetivo.slice(0, 3).join('') + '#'")};
      const bien = letras.slice(0, 3).every((l) => l.classList.contains('ok'));
      const mal = letras[3].classList.contains('err') && letras[4].classList.contains('cursor');
      ${escribir("''")};
      return bien && mal && !letras[0].classList.contains('ok') && letras[0].classList.contains('cursor');
    })()`,
  },
  {
    paso: 4,
    que: 'el reloj arranca con la primera letra y termina al agotarse el tiempo',
    codigo: `(async () => {
      reiniciar(false);
      const listo = estado.fase === 'listo' && quedan.textContent === '1:00' && formatear(90) === '1:30';
      ${escribir('estado.objetivo[0]')};
      const corre = estado.fase === 'escribiendo';
      ${agotarTiempo};
      return listo && corre && estado.fase === 'terminado' && quedan.textContent === '0:00';
    })()`,
  },
  {
    paso: 5,
    que: 'la precisión cuenta los errores corregidos, y las ppm son letras bien entre 5 por minuto',
    codigo: `(() => {
      reiniciar(false);
      const o = estado.objetivo;
      for (let i = 1; i <= 5; i++) { ${escribir("o.slice(0, i).join('')")}; }
      ${escribir("o.slice(0, 5).join('') + '#'")};
      ${escribir("o.slice(0, 5).join('')")};
      ${escribir("o.slice(0, 6).join('')")};
      return estado.aciertos === 6 && estado.errores === 1 && letrasBien() === 6
        && ppm(60000) === 1 && ppm(6000) === 12 && cifraPrecision.textContent === porcentaje.format(6 / 7);
    })()`,
  },
  {
    paso: 6,
    que: 'al pasar del segundo renglón, el texto sube',
    codigo: `(() => {
      reiniciar(false);
      const arriba = texto.style.transform === '' || texto.style.transform === 'translateY(0px)';
      ${escribir("estado.objetivo.slice(0, 160).join('')")};
      return arriba && /translateY\\(-\\d/.test(texto.style.transform);
    })()`,
  },
  {
    paso: 7,
    que: 'Esc empieza de nuevo y se avisa si Bloq Mayús está activado',
    codigo: `(() => {
      ${escribir("estado.objetivo.slice(0, 3).join('')")};
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      const reiniciado = estado.escrito.length === 0 && estado.fase === 'listo';
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', modifierCapsLock: true, bubbles: true }));
      const avisa = avisoMayus.hidden === false;
      document.dispatchEvent(new KeyboardEvent('keyup', { key: 'a', bubbles: true }));
      return reiniciado && avisa && avisoMayus.hidden === true;
    })()`,
  },
  {
    paso: 8,
    que: 'se reconoce un error de tilde, ñ o diéresis, y se cuenta cada letra fallada',
    codigo: `(() => {
      const tipos = tipoDeError('e', 'é') === 'tilde' && tipoDeError('n', 'ñ') === 'tilde' && tipoDeError('u', 'ü') === 'tilde'
        && tipoDeError('a', 'A') === 'mayuscula' && tipoDeError('?', '¿') === 'apertura' && tipoDeError('x', 'a') === 'otra';
      reiniciar(false);
      ${escribir("'#'")};
      ${escribir("''")};
      ${escribir("'#'")};
      const primera = estado.objetivo[0];
      return tipos && estado.fallos.get(primera) === 2 && masFalladas()[0] === primera;
    })()`,
  },
  {
    paso: 9,
    que: 'al terminar, el cartel muestra el resultado, y «Otro texto» vuelve a empezar',
    codigo: `(async () => {
      reiniciar(false);
      ${escribir("estado.objetivo.slice(0, 20).join('')")};
      ${agotarTiempo};
      const muestra = !vistaResultado.hidden && vistaTexto.hidden
        && document.querySelector('[data-r-ppm]').textContent === '4'
        && document.querySelector('[data-r-bien]').textContent === '20'
        && anuncio.textContent.startsWith('Terminó el tiempo: 4 palabras por minuto');
      document.querySelector('[data-otro]').click();
      return muestra && vistaResultado.hidden && !vistaTexto.hidden && estado.fase === 'listo' && estado.escrito.length === 0;
    })()`,
  },
  {
    paso: 10,
    que: 'se toma una muestra por segundo y la gráfica dibuja una línea con ellas',
    codigo: `(async () => {
      reiniciar(false);
      ${escribir("estado.objetivo.slice(0, 20).join('')")};
      estado.muestras = [];
      tomarMuestra(1500);
      tomarMuestra(1700);
      tomarMuestra(2100);
      tomarMuestra(5200);
      const segundos = estado.muestras.map((m) => m.segundo).join();
      ${agotarTiempo};
      const linea = grafica.querySelector('polyline');
      return segundos === '1,2,5' && linea !== null && linea.getAttribute('points').split(' ').length === estado.muestras.length
        && grafica.querySelectorAll('text').length >= 8;
    })()`,
  },
  {
    paso: 11,
    que: 'los récords se guardan por duración y la duración elegida también',
    codigo: `(async () => {
      reiniciar(false);
      ${escribir("estado.objetivo.slice(0, 30).join('')")};
      ${agotarTiempo};
      const guardado = JSON.parse(localStorage.getItem('mecanografia:v1'));
      const record = guardado.records[60][0].ppm === 6 && cifraRecord.textContent === '6';
      document.querySelector('input[name="duracion"][value="30"]').click();
      const treinta = estado.duracion === 30 && quedan.textContent === '0:30'
        && JSON.parse(localStorage.getItem('mecanografia:v1')).duracion === 30 && cifraRecord.textContent === '—';
      document.querySelector('[data-abrir-records]').click();
      const tablas = document.querySelectorAll('[data-tablas] section').length === 3;
      dialogoRecords.close();
      document.querySelector('input[name="duracion"][value="60"]').click();
      return record && treinta && tablas && cifraRecord.textContent === '6';
    })()`,
  },
];
