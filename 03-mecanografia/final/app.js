// ─────────────────────────────────────────────────────────────
// Reto de mecanografía
// Proyecto 3 de domina-js: https://domina-js.pages.dev/proyectos
//
// El código va en el orden en que se construye en la guía.
// Cada parte empieza con «PASO n» y termina con «FIN PASO n».
// Una línea que termina en «// PASO n» se agrega más tarde, en ese paso,
// dentro de código que ya estaba escrito.
// ─────────────────────────────────────────────────────────────


// PASO 1: los textos, el estado y los elementos de la página
// Los textos son frases en español con tildes, ñ, ü y signos de apertura.
// Todo lo que el reto "sabe" vive en `estado`.

const TEXTOS = [
  'El veloz murciélago hindú comía feliz cardillo y kiwi.',
  'La cigüeña tocaba el saxofón detrás del palenque de paja.',
  '¿Quién añora el frío? Mañana, otra vuelta.',
  'El pingüino Ramón dejó su bufanda en la estación y nadie la reclamó durante tres semanas.',
  '¡Qué sorpresa! La señora del tercer piso aprendió a programar a los setenta y dos años.',
  'Un bucle sin condición de salida es como una noria que nunca se detiene: divertido al principio, agotador después.',
  'Antes de corregir un error, léelo con calma; casi siempre dice qué pasó y en qué línea.',
  'La niña guardó las semillas de girasol en un frasco de vidrio, junto a la ventana de la cocina.',
  '¿Cuántas veces has cerrado una pestaña sin querer? Por eso conviene guardar el progreso.',
  'El viejo farero apagaba la luz al amanecer y la encendía, puntual, cuando el sol tocaba el agua.',
  'Con paciencia y práctica, los dedos aprenden el camino de cada tecla sin que tengas que mirar.',
  'La antigüedad de un edificio se nota en sus escaleras: cada peldaño gastado cuenta una historia.',
  'Mi abuela decía que el pan de ayer sabe mejor tostado, con aceite de oliva y un poco de sal.',
  '¡Ojo con las tildes! Una sola convierte esta en está, y el sentido de la frase cambia.',
  'El año pasado plantamos un limonero en el patio; este otoño, por fin, dio sus primeros frutos.',
  'Las funciones pequeñas se leen como frases cortas: hacen una sola cosa y la hacen bien.',
  'A las ocho en punto sonó el timbre, y el pequeño Íñigo corrió escaleras abajo con su mochila.',
  'En la feria del libro, una vendedora curiosa recomendaba novelas según el clima del día.',
  '¿Sabías que el ñandú corre más rápido que muchos caballos? Sus patas largas lo ayudan bastante.',
  'Escribir rápido importa poco si te equivocas mucho; la precisión llega primero y la velocidad después.',
  'El güiro, la guitarra y el cajón sonaban juntos en la plaza mientras caía la tarde.',
  'Nadie sabía quién había dejado la carta bajo la puerta, ni por qué estaba escrita a lápiz.',
  'Un buen nombre de variable ahorra un comentario; uno malo obliga a escribir tres.',
  'Después de la lluvia, el olor a tierra mojada llenó la calle y los niños salieron a buscar caracoles.',
  '¡Bienvenida, Begoña! Tu escritorio está junto a la ventana, al lado del helecho que nadie riega.',
  'La brújula señalaba el norte con terquedad, aunque el mapa insistiera en lo contrario.',
  'El cartero silbaba la misma canción cada mañana; con los años, todo el barrio la aprendió.',
];

const estado = {
  duracion: 60, // en segundos: 30, 60 o 120
  fase: 'listo', // 'listo' (esperando la primera letra), 'escribiendo' o 'terminado'
  objetivo: [], // el texto que hay que escribir, letra por letra
  escrito: [], // lo que la persona lleva escrito, letra por letra
  inicio: 0, // el momento de la primera letra, en ms (performance.now())
  aciertos: 0, // letras bien escritas, contando las que después se borran
  errores: 0, // letras mal escritas, aunque después se corrijan
  tipos: { tilde: 0, mayuscula: 0, apertura: 0, otra: 0 }, // PASO 8
  fallos: new Map(), // PASO 8
  muestras: [], // PASO 10
};

const entrada = document.querySelector('[data-entrada]');
const cartel = document.querySelector('[data-cartel]');
const texto = document.querySelector('[data-texto]');
const textoLeible = document.querySelector('[data-texto-leible]');
const quedan = document.querySelector('[data-quedan]');
const cifraPpm = document.querySelector('[data-ppm]');
const cifraPrecision = document.querySelector('[data-precision]');
const radiosDuracion = [...document.querySelectorAll('input[name="duracion"]')];
const anuncio = document.querySelector('[data-anuncio]');
// FIN PASO 1


// PASO 2: partir el texto en letras de verdad
// Para una persona, «é» es una letra, pero puede llegar como un solo
// carácter (U+00E9) o como dos: «e» más la tilde suelta (U+0301).
// normalize('NFC') junta las dos formas en una, e Intl.Segmenter parte el
// texto en grafemas, que son las letras tal como las vemos.

const segmentador = new Intl.Segmenter('es', { granularity: 'grapheme' });

function grafemas(cadena) {
  return [...segmentador.segment(cadena.normalize('NFC'))].map((parte) => parte.segment);
}

// Las frases en un orden al azar (Fisher-Yates), unidas con un espacio
function textoAlAzar() {
  const frases = [...TEXTOS];
  for (let i = frases.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [frases[i], frases[j]] = [frases[j], frases[i]];
  }
  return frases.join(' ');
}

let letras = []; // un <span> por letra del objetivo

// Cada letra va en su <span>, y cada palabra en otro que no se parte al
// final del renglón. Los espacios quedan sueltos: ahí puede saltar de línea.
function pintarTexto() {
  texto.replaceChildren();
  letras = [];
  let palabra = null;
  for (const letra of estado.objetivo) {
    const span = document.createElement('span');
    span.textContent = letra;
    if (letra === ' ') {
      span.className = 'espacio';
      texto.append(span);
      palabra = null;
    } else {
      if (!palabra) {
        palabra = document.createElement('span');
        palabra.className = 'palabra';
        texto.append(palabra);
      }
      palabra.append(span);
    }
    letras.push(span);
  }
  textoLeible.textContent = `Texto para escribir: ${estado.objetivo.join('')}`;
  pintarLetras(0, letras.length); // PASO 3
}
// FIN PASO 2


// PASO 3: escribir y comparar
// La persona escribe en un <input> invisible que está encima del cartel.
// Se escucha el evento `input` y no `keydown`: con una tecla muerta, la
// tilde y la «e» son dos teclas pero una sola letra, y `input` llega
// cuando la letra ya está armada.

function leer() {
  if (estado.fase === 'terminado') return;
  const nuevo = grafemas(entrada.value).slice(0, estado.objetivo.length);
  const antes = estado.escrito;

  // Desde dónde cambió: lo anterior quedó igual
  let desde = 0;
  while (desde < antes.length && desde < nuevo.length && antes[desde] === nuevo[desde]) desde++;

  if (estado.fase === 'listo' && nuevo.length > 0) empezar(); // PASO 4
  for (let i = desde; i < nuevo.length; i++) contar(i, nuevo[i]); // PASO 5

  estado.escrito = nuevo;
  pintarLetras(desde, Math.max(antes.length, nuevo.length) + 1);
  seguirCursor(); // PASO 6
  pintarCifras(); // PASO 5
}

// Cada letra queda bien (ok), mal (err) o por escribir; el cursor marca la siguiente
function pintarLetras(desde, hasta) {
  for (let i = desde; i < Math.min(hasta, letras.length); i++) {
    const escrita = estado.escrito[i];
    letras[i].classList.toggle('ok', escrita === estado.objetivo[i]);
    letras[i].classList.toggle('err', escrita !== undefined && escrita !== estado.objetivo[i]);
    letras[i].classList.toggle('cursor', i === estado.escrito.length);
  }
}

entrada.addEventListener('input', (evento) => {
  if (evento.isComposing) return; // la letra todavía se está armando
  leer();
});
entrada.addEventListener('compositionend', leer);

// Pegar o arrastrar texto no vale
entrada.addEventListener('paste', (evento) => evento.preventDefault());
entrada.addEventListener('drop', (evento) => evento.preventDefault());

// Hacer clic en cualquier parte del cartel es escribir en él
cartel.addEventListener('click', () => {
  if (estado.fase !== 'terminado') entrada.focus();
});
// FIN PASO 3


// PASO 4: el reloj
// El reloj arranca con la primera letra. performance.now() mide en
// milisegundos con decimales desde que se abrió la página, y no cambia si
// alguien mueve la hora del sistema. requestAnimationFrame llama a `tic`
// antes de cada cuadro, unas 60 veces por segundo.

function formatear(segundos) {
  const enteros = Math.ceil(segundos);
  return `${Math.floor(enteros / 60)}:${String(enteros % 60).padStart(2, '0')}`;
}

function empezar() {
  estado.fase = 'escribiendo';
  estado.inicio = performance.now();
  cartel.dataset.fase = 'escribiendo';
  requestAnimationFrame(tic);
}

function tic(ahora) {
  if (estado.fase !== 'escribiendo') return;
  const pasado = Math.max(0, ahora - estado.inicio);
  quedan.textContent = formatear(Math.max(0, estado.duracion - pasado / 1000));
  tomarMuestra(pasado); // PASO 10
  if (pasado >= estado.duracion * 1000) {
    terminar();
    return;
  }
  pintarCifras(pasado); // PASO 5
  requestAnimationFrame(tic);
}

function terminar() {
  estado.fase = 'terminado';
  cartel.dataset.fase = 'terminado';
  quedan.textContent = '0:00';
  pintarCifras(estado.duracion * 1000); // PASO 5
  entrada.blur();
  mostrarResultado(); // PASO 9
}

// Volver a empezar, con el mismo texto o con uno nuevo
function reiniciar(textoNuevo) {
  if (textoNuevo) estado.objetivo = grafemas(textoAlAzar());
  estado.fase = 'listo';
  estado.escrito = [];
  estado.aciertos = 0;
  estado.errores = 0;
  estado.tipos = { tilde: 0, mayuscula: 0, apertura: 0, otra: 0 }; // PASO 8
  estado.fallos = new Map(); // PASO 8
  estado.muestras = []; // PASO 10
  entrada.value = '';
  cartel.dataset.fase = 'listo';
  quedan.textContent = formatear(estado.duracion);
  ocultarResultado(); // PASO 9
  rinconRecord.classList.remove('nuevo'); // PASO 11
  pintarTexto();
  seguirCursor(); // PASO 6
  pintarCifras(); // PASO 5
  entrada.focus();
}

for (const radio of radiosDuracion) {
  radio.addEventListener('change', () => {
    estado.duracion = Number(radio.value);
    pintarRecord(); // PASO 11
    guardar(); // PASO 11
    reiniciar(false);
  });
}
// FIN PASO 4


// PASO 5: palabras por minuto y precisión
// Una "palabra" mide 5 letras, contando espacios y signos: así un texto con
// palabras largas no sale más lento que uno con palabras cortas.
// - ppm: las letras que están bien ahora mismo, entre 5, por minuto.
// - precisión: de todas las letras que se escribieron (aunque después se
//   borraran), qué parte estaba bien.

function contar(indice, letra) {
  const esperada = estado.objetivo[indice];
  if (letra === esperada) {
    estado.aciertos++;
    return;
  }
  estado.errores++;
  anotarError(letra, esperada); // PASO 8
}

function letrasBien() {
  return estado.escrito.filter((letra, i) => letra === estado.objetivo[i]).length;
}

function ppm(pasado) {
  // Durante el primer segundo, se cuenta como un segundo entero, para que una
  // letra en 0,1 s no dé 120 palabras por minuto
  const minutos = Math.max(pasado, 1000) / 60000;
  return Math.round(letrasBien() / 5 / minutos);
}

function precision() {
  const total = estado.aciertos + estado.errores;
  return total === 0 ? 1 : estado.aciertos / total;
}

const porcentaje = new Intl.NumberFormat('es', { style: 'percent' });

function pintarCifras(pasado = performance.now() - estado.inicio) {
  cifraPpm.textContent = estado.fase === 'listo' ? 0 : ppm(pasado);
  cifraPrecision.textContent = porcentaje.format(precision());
}
// FIN PASO 5


// PASO 6: el cartel sube de renglón
// Se ven tres renglones. Cuando el cursor llega al tercero, todo el texto
// sube uno, para que el renglón que escribes quede siempre en el medio.
// offsetTop dice a qué altura está el <span> del cursor dentro del texto.

function seguirCursor() {
  const cursor = letras[Math.min(estado.escrito.length, letras.length - 1)];
  if (!cursor) return;
  const alto = parseFloat(getComputedStyle(texto).lineHeight);
  const renglon = Math.round(cursor.offsetTop / alto);
  texto.style.transform = `translateY(${-Math.max(0, renglon - 1) * alto}px)`;
}

// Si cambia el ancho de la ventana, las palabras se acomodan distinto
window.addEventListener('resize', seguirCursor);
// FIN PASO 6


// PASO 7: el teclado
// - Esc empieza de nuevo con el mismo texto; Enter, al terminar, trae otro.
// - Las flechas no mueven el cursor: se escribe siempre al final.
// - getModifierState('CapsLock') dice si Bloq Mayús está activado.
// - Si pulsas una letra fuera del cartel, el foco salta al cartel y la
//   letra se escribe ahí, sin tener que hacer clic.

const avisoMayus = document.querySelector('[data-mayus]');
const TECLAS_QUIETAS = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'];

entrada.addEventListener('keydown', (evento) => {
  if (TECLAS_QUIETAS.includes(evento.key)) evento.preventDefault();
});

document.addEventListener('keydown', (evento) => {
  avisoMayus.hidden = !evento.getModifierState('CapsLock');
  if (document.querySelector('dialog[open]')) return;

  if (evento.key === 'Escape') {
    evento.preventDefault();
    reiniciar(false);
    return;
  }
  // Enter sobre un botón lo pulsa, como siempre
  if (evento.key === 'Enter' && estado.fase === 'terminado' && evento.target.tagName !== 'BUTTON') {
    evento.preventDefault();
    reiniciar(true);
    return;
  }

  // Una letra (una sola tecla con texto) escrita fuera del cartel
  const esLetra = evento.key.length === 1 && evento.key !== ' ' && !evento.ctrlKey && !evento.metaKey && !evento.altKey;
  if (esLetra && estado.fase !== 'terminado' && evento.target !== entrada) entrada.focus();
});

document.addEventListener('keyup', (evento) => {
  avisoMayus.hidden = !evento.getModifierState('CapsLock');
});
// FIN PASO 7


// PASO 8: qué tipo de error fue
// Con expresiones regulares se ve si el error fue solo de tilde: se separa
// la letra de sus marcas (NFD) y se borran las marcas con \p{M}, la clase
// Unicode de los acentos, la virgulilla de la ñ y la diéresis.
// Un Map cuenta cuántas veces fallaste cada letra.

function sinMarcas(letra) {
  return letra.normalize('NFD').replace(/\p{M}/gu, '');
}

function tipoDeError(escrita, esperada) {
  if (sinMarcas(escrita) === sinMarcas(esperada)) return 'tilde'; // é por e, n por ñ, u por ü
  if (escrita.toLowerCase() === esperada.toLowerCase()) return 'mayuscula';
  if (/[¿¡]/u.test(esperada)) return 'apertura';
  return 'otra';
}

function anotarError(escrita, esperada) {
  estado.tipos[tipoDeError(escrita, esperada)]++;
  estado.fallos.set(esperada, (estado.fallos.get(esperada) ?? 0) + 1);
}

// Las tres letras más falladas, de la que más a la que menos
function masFalladas() {
  return [...estado.fallos]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([letra]) => letra);
}
// FIN PASO 8


// PASO 9: el resultado
// Al terminar el tiempo, el mismo cartel muestra cómo te fue.
// La región aria-live lo lee en voz alta a quien usa lector de pantalla.

const vistaTexto = document.querySelector('[data-vista-texto]');
const vistaResultado = document.querySelector('[data-vista-resultado]');
const lineaFalladas = document.querySelector('[data-r-falladas-linea]');

function nombreDeLetra(letra) {
  return letra === ' ' ? 'espacio' : letra;
}

function mostrarResultado() {
  const final = ppm(estado.duracion * 1000);
  const exactitud = porcentaje.format(precision());
  document.querySelector('[data-r-ppm]').textContent = final;
  document.querySelector('[data-r-precision]').textContent = exactitud;
  document.querySelector('[data-r-bien]').textContent = letrasBien();
  document.querySelector('[data-r-errores]').textContent = estado.errores;
  document.querySelector('[data-r-tildes]').textContent = estado.tipos.tilde;

  const falladas = masFalladas();
  lineaFalladas.hidden = falladas.length === 0;
  const lista = document.querySelector('[data-r-falladas]');
  lista.replaceChildren(...falladas.map((letra) => {
    const b = document.createElement('b');
    b.textContent = nombreDeLetra(letra);
    return b;
  }));

  const record = guardarResultado(final, precision()); // PASO 11
  document.querySelector('[data-r-record]').hidden = !record; // PASO 11
  document.querySelector('[data-r-record]').textContent = records[estado.duracion].length === 1 ? 'Primer récord' : 'Récord nuevo'; // PASO 11

  vistaTexto.hidden = true;
  vistaResultado.hidden = false;
  dibujarGrafica(); // PASO 10
  anuncio.textContent = `Terminó el tiempo: ${final} palabras por minuto, con ${exactitud} de precisión.`
    + (record ? ' Es tu récord.' : ''); // PASO 11
  document.querySelector('[data-otro]').focus({ preventScroll: true });
}

function ocultarResultado() {
  vistaResultado.hidden = true;
  vistaTexto.hidden = false;
  anuncio.textContent = '';
}

document.querySelector('[data-otro]').addEventListener('click', () => reiniciar(true));
document.querySelector('[data-repetir]').addEventListener('click', () => reiniciar(false));
// FIN PASO 9


// PASO 10: la gráfica del ritmo, en SVG
// Cada segundo se toma una muestra: las ppm hasta ese momento y cuántos
// errores hubo en ese segundo. Al final se dibuja una línea con las ppm y un
// punto rojo en cada segundo con errores. Los elementos SVG se crean con
// createElementNS, porque viven en otro espacio de nombres que el HTML.

const grafica = document.querySelector('[data-grafica]');
const figuraRitmo = document.querySelector('[data-ritmo]');
const tituloGrafica = document.querySelector('[data-grafica-titulo]');
const SVG = 'http://www.w3.org/2000/svg';
const MARGEN = { izquierda: 34, abajo: 24, arriba: 8 };

function tomarMuestra(pasado) {
  const segundo = Math.floor(pasado / 1000);
  const ultimo = estado.muestras.at(-1)?.segundo ?? 0;
  if (segundo <= ultimo || segundo > estado.duracion) return;
  const erroresAntes = estado.muestras.reduce((suma, m) => suma + m.errores, 0);
  estado.muestras.push({ segundo, ppm: ppm(segundo * 1000), errores: estado.errores - erroresAntes });
}

function crear(nombre, atributos, contenido) {
  const elemento = document.createElementNS(SVG, nombre);
  for (const [clave, valor] of Object.entries(atributos)) elemento.setAttribute(clave, valor);
  if (contenido !== undefined) elemento.textContent = contenido;
  return elemento;
}

function dibujarGrafica() {
  grafica.replaceChildren(tituloGrafica);
  const muestras = estado.muestras;
  // Con menos de dos muestras no hay línea que dibujar (pasa si la pestaña
  // quedó escondida: requestAnimationFrame se detiene)
  figuraRitmo.hidden = muestras.length < 2;
  if (figuraRitmo.hidden) return;

  // El viewBox mide lo mismo que la caja en pantalla: así las letras de los
  // ejes no se encogen en un teléfono. En pantallas bajas, la gráfica es más baja.
  const ANCHO = Math.max(280, Math.round(grafica.getBoundingClientRect().width));
  const ALTO = innerHeight < 820 ? 96 : 130;
  grafica.setAttribute('viewBox', `0 0 ${ANCHO} ${ALTO}`);

  // La escala vertical va de 0 al múltiplo de 20 que queda por encima del máximo
  const tope = Math.max(20, Math.ceil(Math.max(...muestras.map((m) => m.ppm)) / 20) * 20);
  const x = (segundo) => MARGEN.izquierda + (segundo / estado.duracion) * (ANCHO - MARGEN.izquierda);
  const y = (valor) => MARGEN.arriba + (1 - valor / tope) * (ALTO - MARGEN.arriba - MARGEN.abajo);

  for (let valor = 0; valor <= tope; valor += tope / 4) {
    grafica.append(crear('line', { class: 'guia', x1: MARGEN.izquierda, x2: ANCHO, y1: y(valor), y2: y(valor) }));
    grafica.append(crear('text', { x: MARGEN.izquierda - 8, y: y(valor) + 4, 'text-anchor': 'end' }, valor));
  }
  for (const segundo of [0, estado.duracion / 2, estado.duracion]) {
    const ancla = segundo === 0 ? 'start' : segundo === estado.duracion ? 'end' : 'middle';
    grafica.append(crear('text', { x: x(segundo), y: ALTO - 4, 'text-anchor': ancla }, `${segundo} s`));
  }

  const puntos = muestras.map((m) => `${x(m.segundo).toFixed(1)},${y(m.ppm).toFixed(1)}`).join(' ');
  grafica.append(crear('polyline', { class: 'linea', points: puntos }));
  for (const m of muestras.filter((m) => m.errores > 0)) {
    grafica.append(crear('circle', { class: 'fallo', cx: x(m.segundo), cy: y(m.ppm), r: Math.min(3 + m.errores, 7) }));
  }

  const mayor = Math.max(...muestras.map((m) => m.ppm));
  const conErrores = muestras.filter((m) => m.errores > 0).length;
  tituloGrafica.textContent = `Tu ritmo segundo a segundo: llegó a ${mayor} palabras por minuto, con errores en ${conErrores} de ${muestras.length} segundos.`;
}

// Si cambia el ancho de la ventana, la gráfica se vuelve a medir
window.addEventListener('resize', () => {
  if (estado.fase === 'terminado') dibujarGrafica();
});
// FIN PASO 10


// PASO 11: los récords
// Se guardan en localStorage los 5 mejores de cada duración, junto con la
// duración elegida. JSON.stringify los convierte en texto para guardarlos y
// JSON.parse los recupera.

const CLAVE = 'mecanografia:v1';
const cifraRecord = document.querySelector('[data-record]');
const rinconRecord = document.querySelector('[data-cifra-record]');
const dialogoRecords = document.querySelector('[data-dialogo-records]');
const tablas = document.querySelector('[data-tablas]');
const fecha = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'short' });

let records = { 30: [], 60: [], 120: [] };

function guardar() {
  localStorage.setItem(CLAVE, JSON.stringify({ duracion: estado.duracion, records }));
}

function cargar() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE));
    if (!guardado) return;
    records = { ...records, ...guardado.records };
    if ([30, 60, 120].includes(guardado.duracion)) estado.duracion = guardado.duracion;
  } catch {
    // Si lo guardado está roto, se empieza de cero
  }
  for (const radio of radiosDuracion) radio.checked = Number(radio.value) === estado.duracion;
}

// Devuelve true si el resultado es el nuevo récord de esta duración
function guardarResultado(valor, exactitud) {
  if (valor === 0) return false;
  const lista = records[estado.duracion];
  const anterior = lista[0]?.ppm ?? 0;
  lista.push({ ppm: valor, precision: exactitud, fecha: Date.now() });
  lista.sort((a, b) => b.ppm - a.ppm || b.precision - a.precision);
  lista.splice(5);
  guardar();
  pintarRecord();
  const esRecord = valor > anterior;
  rinconRecord.classList.toggle('nuevo', esRecord);
  return esRecord;
}

function pintarRecord() {
  const mejor = records[estado.duracion][0];
  rinconRecord.classList.remove('nuevo');
  rinconRecord.classList.toggle('vacio', !mejor);
  cifraRecord.textContent = mejor?.ppm ?? '—';
}

document.querySelector('[data-abrir-records]').addEventListener('click', () => {
  tablas.replaceChildren(...[30, 60, 120].map((segundos) => {
    const columna = document.createElement('section');
    const titulo = document.createElement('h3');
    titulo.textContent = `${segundos} segundos`;
    columna.append(titulo);
    const lista = records[segundos];
    if (lista.length === 0) {
      const vacio = document.createElement('p');
      vacio.className = 'vacio';
      vacio.textContent = 'Todavía no hay récords.';
      columna.append(vacio);
      return columna;
    }
    const ol = document.createElement('ol');
    for (const r of lista) {
      const li = document.createElement('li');
      const cifra = document.createElement('b');
      cifra.textContent = r.ppm;
      const detalle = document.createElement('span');
      detalle.textContent = `ppm · ${porcentaje.format(r.precision)}`;
      const cuando = document.createElement('span');
      cuando.textContent = fecha.format(r.fecha);
      li.append(cifra, detalle, cuando);
      ol.append(li);
    }
    columna.append(ol);
    return columna;
  }));
  dialogoRecords.showModal();
});
// FIN PASO 11


// ARRANQUE (desde el PASO 2): lo primero que corre al abrir la página
cargar(); // PASO 11
pintarRecord(); // PASO 11
estado.objetivo = grafemas(textoAlAzar());
pintarTexto();
quedan.textContent = formatear(estado.duracion); // PASO 4
entrada.focus(); // PASO 3
