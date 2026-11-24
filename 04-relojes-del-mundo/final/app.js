// ─────────────────────────────────────────────────────────────
// Relojes del mundo
// Proyecto 4 de domina-js: https://domina-js.pages.dev/proyectos
//
// El código va en el orden en que se construye en la guía.
// Cada parte empieza con «PASO n» y termina con «FIN PASO n».
// Una línea que termina en «// PASO n» se agrega más tarde, en ese paso,
// dentro de código que ya estaba escrito.
// ─────────────────────────────────────────────────────────────


// PASO 1: las ciudades, el estado y los elementos de la página
// Cada ciudad tiene un nombre en español, su zona horaria (como la escribe
// la base de datos de zonas que usan todos los sistemas: "America/Lima") y
// el código de su país, que Intl traduce al español en el paso 4.

const CIUDADES = [
  { nombre: 'Ciudad de México', zona: 'America/Mexico_City', pais: 'MX' },
  { nombre: 'Ciudad de Guatemala', zona: 'America/Guatemala', pais: 'GT' },
  { nombre: 'San Salvador', zona: 'America/El_Salvador', pais: 'SV' },
  { nombre: 'Tegucigalpa', zona: 'America/Tegucigalpa', pais: 'HN' },
  { nombre: 'Managua', zona: 'America/Managua', pais: 'NI' },
  { nombre: 'San José', zona: 'America/Costa_Rica', pais: 'CR' },
  { nombre: 'Ciudad de Panamá', zona: 'America/Panama', pais: 'PA' },
  { nombre: 'La Habana', zona: 'America/Havana', pais: 'CU' },
  { nombre: 'Santo Domingo', zona: 'America/Santo_Domingo', pais: 'DO' },
  { nombre: 'San Juan', zona: 'America/Puerto_Rico', pais: 'PR' },
  { nombre: 'Bogotá', zona: 'America/Bogota', pais: 'CO' },
  { nombre: 'Caracas', zona: 'America/Caracas', pais: 'VE' },
  { nombre: 'Quito', zona: 'America/Guayaquil', pais: 'EC' },
  { nombre: 'Lima', zona: 'America/Lima', pais: 'PE' },
  { nombre: 'La Paz', zona: 'America/La_Paz', pais: 'BO' },
  { nombre: 'Santiago', zona: 'America/Santiago', pais: 'CL' },
  { nombre: 'Buenos Aires', zona: 'America/Argentina/Buenos_Aires', pais: 'AR' },
  { nombre: 'Montevideo', zona: 'America/Montevideo', pais: 'UY' },
  { nombre: 'Asunción', zona: 'America/Asuncion', pais: 'PY' },
  { nombre: 'São Paulo', zona: 'America/Sao_Paulo', pais: 'BR' },
  { nombre: 'Nueva York', zona: 'America/New_York', pais: 'US' },
  { nombre: 'Chicago', zona: 'America/Chicago', pais: 'US' },
  { nombre: 'Los Ángeles', zona: 'America/Los_Angeles', pais: 'US' },
  { nombre: 'Honolulu', zona: 'Pacific/Honolulu', pais: 'US' },
  { nombre: 'Toronto', zona: 'America/Toronto', pais: 'CA' },
  { nombre: 'Madrid', zona: 'Europe/Madrid', pais: 'ES' },
  { nombre: 'Las Palmas', zona: 'Atlantic/Canary', pais: 'ES' },
  { nombre: 'Lisboa', zona: 'Europe/Lisbon', pais: 'PT' },
  { nombre: 'Londres', zona: 'Europe/London', pais: 'GB' },
  { nombre: 'París', zona: 'Europe/Paris', pais: 'FR' },
  { nombre: 'Berlín', zona: 'Europe/Berlin', pais: 'DE' },
  { nombre: 'Roma', zona: 'Europe/Rome', pais: 'IT' },
  { nombre: 'Moscú', zona: 'Europe/Moscow', pais: 'RU' },
  { nombre: 'El Cairo', zona: 'Africa/Cairo', pais: 'EG' },
  { nombre: 'Lagos', zona: 'Africa/Lagos', pais: 'NG' },
  { nombre: 'Johannesburgo', zona: 'Africa/Johannesburg', pais: 'ZA' },
  { nombre: 'Dubái', zona: 'Asia/Dubai', pais: 'AE' },
  { nombre: 'Nueva Delhi', zona: 'Asia/Kolkata', pais: 'IN' },
  { nombre: 'Katmandú', zona: 'Asia/Kathmandu', pais: 'NP' },
  { nombre: 'Pekín', zona: 'Asia/Shanghai', pais: 'CN' },
  { nombre: 'Singapur', zona: 'Asia/Singapore', pais: 'SG' },
  { nombre: 'Seúl', zona: 'Asia/Seoul', pais: 'KR' },
  { nombre: 'Tokio', zona: 'Asia/Tokyo', pais: 'JP' },
  { nombre: 'Sídney', zona: 'Australia/Sydney', pais: 'AU' },
  { nombre: 'Auckland', zona: 'Pacific/Auckland', pais: 'NZ' },
];

// Las que aparecen la primera vez, además de la tuya
const INICIALES = ['America/Mexico_City', 'America/Argentina/Buenos_Aires', 'Europe/Madrid', 'Asia/Tokyo', 'Australia/Sydney'];

const estado = {
  ciudades: [], // las del tablero, en orden
  referencia: null, // la ciudad desde la que se cuentan las diferencias (una de estado.ciudades)
  formato: 24, // 24 o 12 horas
};

const filas = document.querySelector('[data-filas]');
const plantilla = document.querySelector('[data-plantilla]');
const fecha = document.querySelector('[data-fecha]');
const refNombre = document.querySelector('[data-ref-nombre]');
const anuncio = document.querySelector('[data-anuncio]');

// Una ciudad a partir de su zona. Si no está en la lista, el nombre sale
// de la zona: "America/Argentina/Jujuy" da "Jujuy".
function ciudadDeZona(zona) {
  const conocida = CIUDADES.find((ciudad) => ciudad.zona === zona);
  if (conocida) return conocida;
  return { nombre: zona.split('/').at(-1).replaceAll('_', ' '), zona, pais: '' };
}

// La primera vez: tu ciudad (la zona de tu computadora) y las iniciales
function ciudadesIniciales() {
  const tuya = ciudadDeZona(Intl.DateTimeFormat().resolvedOptions().timeZone);
  estado.ciudades = [tuya, ...INICIALES.filter((zona) => zona !== tuya.zona).map(ciudadDeZona)];
  estado.referencia = tuya;
}
// FIN PASO 1


// PASO 2: la hora en una zona
// horaEn(zona, instante) dice qué hora es en una zona en un instante (en ms,
// como Date.now()): la hora, los minutos, la fecha y el desfase, que es
// cuántos minutos está adelantada o atrasada respecto de UTC.
// Con Temporal es directo. Si el navegador todavía no lo tiene, el plan B
// arma lo mismo con Intl.DateTimeFormat y Date.

function horaEn(zona, instante) {
  if (globalThis.Temporal) {
    const t = Temporal.Instant.fromEpochMilliseconds(instante).toZonedDateTimeISO(zona);
    return { hora: t.hour, minuto: t.minute, fecha: t.toPlainDate().toString(), desfase: t.offsetNanoseconds / 60e9 };
  }
  return horaConDate(zona, instante);
}

// Crear un Intl.DateTimeFormat es lento: se crea uno por zona y se guarda
const formateadores = new Map();

function horaConDate(zona, instante) {
  if (!formateadores.has(zona)) {
    formateadores.set(zona, new Intl.DateTimeFormat('en-US', {
      timeZone: zona, hourCycle: 'h23',
      year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
    }));
  }
  // formatToParts da cada parte por separado: { type: 'hour', value: '10' }…
  const partes = {};
  for (const { type, value } of formateadores.get(zona).formatToParts(instante)) partes[type] = Number(value);

  // Si esa fecha y hora fueran UTC, ¿qué instante serían? La diferencia con
  // el instante de verdad es el desfase de la zona.
  const comoSiFueraUTC = Date.UTC(partes.year, partes.month - 1, partes.day, partes.hour, partes.minute, partes.second);
  const dosCifras = (n) => String(n).padStart(2, '0');
  return {
    hora: partes.hour,
    minuto: partes.minute,
    fecha: `${partes.year}-${dosCifras(partes.month)}-${dosCifras(partes.day)}`,
    desfase: Math.round((comoSiFueraUTC - instante) / 60000),
  };
}
// FIN PASO 2


// PASO 3: la diferencia, el día y la noche
// La diferencia entre dos ciudades es la resta de sus desfases. Hay zonas
// con medias horas y cuartos de hora: Nueva Delhi va 5 h 30 min por
// delante de UTC, y Katmandú, 5 h 45 min.
// Las fechas "AAAA-MM-DD" se pueden comparar como texto: "2026-11-25" > "2026-11-24".

function textoDiferencia(minutos) {
  if (minutos === 0) return 'misma hora';
  const signo = minutos > 0 ? '+' : '−';
  const horas = Math.floor(Math.abs(minutos) / 60);
  const resto = Math.abs(minutos) % 60;
  const partes = [];
  if (horas) partes.push(`${horas} h`);
  if (resto) partes.push(`${resto} min`);
  return signo + partes.join(' ');
}

function textoDia(fechaCiudad, fechaReferencia) {
  if (fechaCiudad > fechaReferencia) return 'mañana';
  if (fechaCiudad < fechaReferencia) return 'ayer';
  return 'hoy';
}

function esDeDia(hora) {
  return hora >= 6 && hora < 18;
}
// FIN PASO 3


// PASO 4: el tablero
// Cada fila sale de la plantilla <template> del HTML: se copia con
// cloneNode(true) y se llena. Intl.DisplayNames traduce el código del país
// al español: "PE" da "Perú".

const regiones = new Intl.DisplayNames('es', { type: 'region' });

// Si la ciudad no tiene país, se muestra la región de su zona:
// "America/North_Dakota/New_Salem" da "America · North Dakota"
function nombrePais(ciudad) {
  if (ciudad.pais) return regiones.of(ciudad.pais);
  return ciudad.zona.split('/').slice(0, -1).join(' · ').replaceAll('_', ' ');
}

function crearFila(ciudad) {
  const fila = plantilla.content.firstElementChild.cloneNode(true);
  fila.querySelector('[data-nombre]').textContent = ciudad.nombre;
  fila.querySelector('[data-pais]').textContent = nombrePais(ciudad);
  fila.querySelector('[data-ciudad]').title = 'Usar de referencia';
  fila.querySelector('[data-manija]').setAttribute('aria-label', `Mover ${ciudad.nombre}`);
  fila.querySelector('[data-quitar]').setAttribute('aria-label', `Quitar ${ciudad.nombre}`);
  fila.querySelector('[data-quitar]').disabled = estado.ciudades.length === 1;
  return fila;
}

function pintarTablero() {
  filas.replaceChildren(...estado.ciudades.map(crearFila));
  refNombre.textContent = estado.referencia.nombre;
  pintarHoras();
}

function formatearHora(hora) {
  const dosCifras = (n) => String(n).padStart(2, '0');
  if (estado.formato === 24) return { cifras: `${dosCifras(hora.hora)}:${dosCifras(hora.minuto)}`, sufijo: '' };
  return { cifras: `${dosCifras(hora.hora % 12 || 12)}:${dosCifras(hora.minuto)}`, sufijo: hora.hora < 12 ? 'a. m.' : 'p. m.' };
}

const formatoFecha = new Intl.DateTimeFormat('es', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' });
const formatoUTC = new Intl.DateTimeFormat('es', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: 'UTC' });

// Lo que cambia con cada minuto: la hora, la diferencia y el día de cada fila
function pintarHoras(instante = Date.now()) {
  const ref = horaEn(estado.referencia.zona, instante);
  estado.ciudades.forEach((ciudad, i) => {
    const fila = filas.children[i];
    const hora = horaEn(ciudad.zona, instante);
    const esReferencia = ciudad === estado.referencia;
    const { cifras, sufijo } = formatearHora(hora);

    fila.classList.toggle('es-referencia', esReferencia);
    fila.classList.toggle('de-noche', !esDeDia(hora.hora));
    fila.querySelector('[data-ciudad]').setAttribute('aria-pressed', esReferencia);
    fila.querySelector('[data-hora-texto]').textContent = `${cifras} ${sufijo}`.trim();
    fila.querySelector('[data-ampm]').textContent = sufijo;
    fila.querySelector('[data-dif]').textContent = esReferencia ? '—' : textoDiferencia(hora.desfase - ref.desfase);
    fila.querySelector('[data-dia]').textContent = `${textoDia(hora.fecha, ref.fecha)}, ${esDeDia(hora.hora) ? 'de día' : 'de noche'}`;
    ponerCifras(fila, cifras); // PASO 5
    pintarReloj(fila, instante, hora.desfase); // PASO 6
    fila.dataset.desfase = hora.desfase; // PASO 7
  });
  const dia = formatoFecha.format(instante);
  fecha.textContent = `${dia.charAt(0).toUpperCase()}${dia.slice(1)} · ${formatoUTC.format(instante)} UTC`;
}
// FIN PASO 4


// PASO 5: las paletas
// La hora va en cinco paletas: cuatro cifras y los dos puntos. Cuando una
// cifra cambia, su paleta gira: media vuelta hacia abajo con animate(),
// cambia la cifra y termina de girar. animate() devuelve una animación, y
// su propiedad finished es una promesa que se cumple cuando termina.

const sinMovimiento = matchMedia('(prefers-reduced-motion: reduce)');

function crearPaleta(caracter) {
  const paleta = document.createElement('span');
  paleta.className = caracter === ':' ? 'paleta dos-puntos' : 'paleta';
  paleta.textContent = caracter;
  return paleta;
}

function ponerCifras(fila, cifras) {
  const caja = fila.querySelector('[data-paletas]');
  // La primera vez se crean las paletas, sin girar
  if (caja.children.length !== cifras.length) {
    caja.replaceChildren(...[...cifras].map(crearPaleta));
    return;
  }
  [...cifras].forEach((caracter, i) => {
    if (caja.children[i].textContent !== caracter) girar(caja.children[i], caracter);
  });
}

async function girar(paleta, caracter) {
  if (sinMovimiento.matches) {
    paleta.textContent = caracter;
    return;
  }
  await paleta.animate([{ transform: 'perspective(260px) rotateX(0deg)' }, { transform: 'perspective(260px) rotateX(-90deg)' }], { duration: 130, easing: 'ease-in' }).finished;
  paleta.textContent = caracter;
  paleta.animate([{ transform: 'perspective(260px) rotateX(90deg)' }, { transform: 'perspective(260px) rotateX(0deg)' }], { duration: 170, easing: 'ease-out' });
}
// FIN PASO 5


// PASO 6: el reloj chico
// Las agujas son <line> que salen del centro (50, 50) hacia arriba, y se
// giran con el atributo transform="rotate(grados 50 50)".
// La hora local, en ms, es el instante más el desfase. De ahí salen los
// minutos del día (de 0 a 1440, con decimales):
// - el horario da una vuelta cada 12 horas (720 minutos);
// - el minutero, una cada hora;
// - el segundero, una cada minuto.

function girarAguja(aguja, grados) {
  aguja.setAttribute('transform', `rotate(${grados.toFixed(2)} 50 50)`);
}

function pintarReloj(fila, instante, desfase) {
  const local = instante + desfase * 60000;
  const minutosDelDia = (local / 60000) % 1440;
  const segundos = (instante / 1000) % 60;
  girarAguja(fila.querySelector('[data-horario]'), ((minutosDelDia % 720) / 720) * 360);
  girarAguja(fila.querySelector('[data-minutero]'), (minutosDelDia % 60) * 6);
  girarAguja(fila.querySelector('[data-segundero]'), segundos * 6);
}
// FIN PASO 6


// PASO 7: el latido
// requestAnimationFrame llama a latir() antes de cada cuadro. En cada uno
// se mueven las agujas, y solo cuando cambia el minuto se vuelven a pintar
// las horas (y giran las paletas).
// Un detalle: todos los desfases son minutos enteros, así que los segundos
// son los mismos en todo el mundo. Las agujas se calculan con el desfase
// que quedó guardado en cada fila, sin volver a preguntarle a Intl.

let minutoPintado = Math.floor(Date.now() / 60000);

function latir() {
  const instante = Date.now();
  const minuto = Math.floor(instante / 60000);
  if (minuto !== minutoPintado) {
    minutoPintado = minuto;
    pintarHoras(instante);
  }
  for (const fila of filas.children) pintarReloj(fila, instante, Number(fila.dataset.desfase));
  requestAnimationFrame(latir);
}
// FIN PASO 7


// PASO 8: buscar y agregar una ciudad
// Intl.supportedValuesOf('timeZone') da todas las zonas que conoce el
// navegador (más de 400). Se busca primero en la lista de ciudades y
// después en las zonas, sin importar las tildes ni las mayúsculas.

const buscar = document.querySelector('[data-buscar]');
const sugerencias = document.querySelector('[data-sugerencias]');
const botonAgregar = document.querySelector('[data-agregar]');
const todasLasZonas = Intl.supportedValuesOf('timeZone');
// Las que se sugieren antes de escribir nada
const PARA_EMPEZAR = ['Nueva York', 'Bogotá', 'Santiago', 'São Paulo', 'Londres', 'París'];

let encontradas = [];

function sinTildes(texto) {
  return texto.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
}

function yaEsta(ciudad) {
  return estado.ciudades.some((otra) => otra.zona === ciudad.zona && otra.nombre === ciudad.nombre);
}

function buscarCiudades(texto) {
  const buscado = sinTildes(texto.trim());
  // Sin nada escrito, algunas ciudades de la lista para empezar
  if (buscado.length < 2) {
    return CIUDADES.filter((ciudad) => PARA_EMPEZAR.includes(ciudad.nombre) && !yaEsta(ciudad)).slice(0, 4);
  }
  const conocidas = CIUDADES.filter((ciudad) => sinTildes(`${ciudad.nombre} ${nombrePais(ciudad)}`).includes(buscado));
  const otras = todasLasZonas
    .filter((zona) => !CIUDADES.some((ciudad) => ciudad.zona === zona) && sinTildes(zona.replaceAll('_', ' ')).includes(buscado))
    .map(ciudadDeZona);
  // Algunas zonas tienen dos nombres ("Asia/Katmandu" y "Asia/Kathmandu"):
  // si el nombre y la hora coinciden con una que ya está en la lista, sobra
  const ahora = Date.now();
  const vistas = new Set();
  return [...conocidas, ...otras]
    .filter((ciudad) => {
      const clave = `${sinTildes(ciudad.nombre)} ${horaEn(ciudad.zona, ahora).desfase}`;
      if (vistas.has(clave)) return false;
      vistas.add(clave);
      return !yaEsta(ciudad);
    })
    .slice(0, 6);
}

function pintarSugerencias() {
  encontradas = buscarCiudades(buscar.value);
  const ahora = Date.now();
  const ref = horaEn(estado.referencia.zona, ahora);
  sugerencias.replaceChildren(...encontradas.map((ciudad) => {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.textContent = ciudad.nombre;
    const detalle = document.createElement('span');
    detalle.textContent = `${nombrePais(ciudad)} · ${textoDiferencia(horaEn(ciudad.zona, ahora).desfase - ref.desfase)}`;
    boton.append(detalle);
    boton.addEventListener('click', () => agregar(ciudad));
    const item = document.createElement('li');
    item.append(boton);
    return item;
  }));
  if (encontradas.length === 0 && buscar.value.trim().length >= 2) {
    const nada = document.createElement('li');
    nada.className = 'ninguna';
    nada.textContent = `Ninguna ciudad con «${buscar.value.trim()}»`;
    sugerencias.append(nada);
  }
  const escribio = buscar.value.trim().length >= 2;
  botonAgregar.disabled = encontradas.length === 0 || !escribio;
  botonAgregar.textContent = encontradas.length && escribio ? `Agregar ${encontradas[0].nombre}` : 'Agregar';
}

function agregar(ciudad) {
  estado.ciudades.push(ciudad);
  pintarTablero();
  guardar(); // PASO 12
  buscar.value = '';
  pintarSugerencias();
  anuncio.textContent = `Agregaste ${ciudad.nombre}.`;
  buscar.focus();
}

buscar.addEventListener('input', pintarSugerencias);
botonAgregar.addEventListener('click', () => {
  if (encontradas.length) agregar(encontradas[0]);
});

// Enter agrega la primera; la flecha hacia abajo va a las sugerencias,
// y ahí las flechas se mueven entre ellas y Escape vuelve al buscador
buscar.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter' && !botonAgregar.disabled) agregar(encontradas[0]);
  if (evento.key === 'ArrowDown' && encontradas.length) {
    evento.preventDefault();
    sugerencias.querySelector('button').focus();
  }
});
sugerencias.addEventListener('keydown', (evento) => {
  const botones = [...sugerencias.querySelectorAll('button')];
  const i = botones.indexOf(document.activeElement);
  if (evento.key === 'ArrowDown' && i < botones.length - 1) botones[i + 1].focus();
  if (evento.key === 'ArrowUp') (i > 0 ? botones[i - 1] : buscar).focus();
  if (evento.key === 'Escape') buscar.focus();
  if (['ArrowDown', 'ArrowUp'].includes(evento.key)) evento.preventDefault();
});
// FIN PASO 8


// PASO 9: quitar, la referencia y el formato
// Los botones de las filas se escuchan todos juntos en la lista
// (delegación de eventos): closest() dice qué botón se tocó y en qué fila.

const radiosFormato = [...document.querySelectorAll('input[name="formato"]')];

function indiceDe(fila) {
  return [...filas.children].indexOf(fila);
}

function quitar(i) {
  if (estado.ciudades.length === 1) return;
  const [ciudad] = estado.ciudades.splice(i, 1);
  if (ciudad === estado.referencia) estado.referencia = estado.ciudades[0];
  pintarTablero();
  guardar(); // PASO 12
  anuncio.textContent = `Quitaste ${ciudad.nombre}.`;
  // El foco pasa al botón de quitar de la fila que quedó en su lugar
  const siguiente = filas.children[Math.min(i, filas.children.length - 1)];
  siguiente.querySelector('[data-quitar]').focus();
}

function usarDeReferencia(i) {
  estado.referencia = estado.ciudades[i];
  refNombre.textContent = estado.referencia.nombre;
  pintarHoras();
  guardar(); // PASO 12
  anuncio.textContent = `Las diferencias se cuentan desde ${estado.referencia.nombre}.`;
}

filas.addEventListener('click', (evento) => {
  const fila = evento.target.closest('.fila');
  if (!fila) return;
  if (evento.target.closest('[data-quitar]')) quitar(indiceDe(fila));
  if (evento.target.closest('[data-ciudad]')) usarDeReferencia(indiceDe(fila));
});

for (const radio of radiosFormato) {
  radio.addEventListener('change', () => {
    estado.formato = Number(radio.value);
    pintarHoras();
    guardar(); // PASO 12
  });
}
// FIN PASO 9


// PASO 10: arrastrar para cambiar el orden
// Cada fila tiene draggable="true". Mientras se arrastra, dragover dice
// sobre qué fila está el puntero, y si está en su mitad de arriba o de
// abajo: ahí se dibuja la línea amarilla. Al soltar, la ciudad cambia de
// lugar en estado.ciudades y el tablero se vuelve a pintar.

let arrastrada = -1;

function limpiarMarcas() {
  for (const fila of filas.children) fila.classList.remove('antes', 'despues', 'arrastrando');
}

// Lleva la ciudad del lugar `desde` al lugar `hacia`
function mover(desde, hacia) {
  const [ciudad] = estado.ciudades.splice(desde, 1);
  estado.ciudades.splice(hacia, 0, ciudad);
  pintarTablero();
  guardar(); // PASO 12
}

filas.addEventListener('dragstart', (evento) => {
  const fila = evento.target.closest('.fila');
  arrastrada = indiceDe(fila);
  evento.dataTransfer.effectAllowed = 'move';
  evento.dataTransfer.setData('text/plain', estado.ciudades[arrastrada].nombre);
  fila.classList.add('arrastrando');
});

filas.addEventListener('dragover', (evento) => {
  const fila = evento.target.closest('.fila');
  if (!fila || arrastrada < 0) return;
  evento.preventDefault(); // aquí se puede soltar
  const caja = fila.getBoundingClientRect();
  const arriba = evento.clientY < caja.top + caja.height / 2;
  for (const otra of filas.children) otra.classList.remove('antes', 'despues');
  fila.classList.add(arriba ? 'antes' : 'despues');
});

filas.addEventListener('drop', (evento) => {
  const fila = evento.target.closest('.fila');
  if (!fila || arrastrada < 0) return;
  evento.preventDefault();
  let hacia = indiceDe(fila) + (fila.classList.contains('despues') ? 1 : 0);
  if (hacia > arrastrada) hacia--; // al sacarla, las de abajo suben un lugar
  if (hacia !== arrastrada) mover(arrastrada, hacia);
  limpiarMarcas();
});

filas.addEventListener('dragend', () => {
  arrastrada = -1;
  limpiarMarcas();
});
// FIN PASO 10


// PASO 11: mover con el teclado
// Arrastrar no funciona con el teclado ni con un lector de pantalla. Por
// eso la manija es un botón: con el foco en ella, las flechas suben y
// bajan la ciudad, y la región aria-live dice en qué lugar quedó.

filas.addEventListener('keydown', (evento) => {
  const manija = evento.target.closest('[data-manija]');
  if (!manija || !['ArrowUp', 'ArrowDown'].includes(evento.key)) return;
  evento.preventDefault();
  const i = indiceDe(manija.closest('.fila'));
  const hacia = evento.key === 'ArrowUp' ? i - 1 : i + 1;
  if (hacia < 0 || hacia >= estado.ciudades.length) return;
  mover(i, hacia);
  filas.children[hacia].querySelector('[data-manija]').focus();
  anuncio.textContent = `${estado.ciudades[hacia].nombre}, lugar ${hacia + 1} de ${estado.ciudades.length}.`;
});
// FIN PASO 11


// PASO 12: guardar y recordar
// Se guardan las ciudades, cuál es la referencia (su lugar en la lista) y
// el formato. Al volver, si una zona guardada no existe en este navegador,
// horaEn lanza un RangeError: esa ciudad se descarta.

const CLAVE = 'relojes:v1';

function guardar() {
  localStorage.setItem(CLAVE, JSON.stringify({
    ciudades: estado.ciudades,
    referencia: estado.ciudades.indexOf(estado.referencia),
    formato: estado.formato,
  }));
}

function zonaValida(zona) {
  try {
    horaEn(zona, Date.now());
    return true;
  } catch {
    return false;
  }
}

function cargar() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE));
    if (!guardado) return;
    estado.ciudades = guardado.ciudades.filter((ciudad) => zonaValida(ciudad.zona));
    estado.referencia = estado.ciudades[guardado.referencia] ?? estado.ciudades[0] ?? null;
    estado.formato = guardado.formato === 12 ? 12 : 24;
  } catch {
    estado.ciudades = []; // si lo guardado está roto, se empieza de cero
  }
  for (const radio of radiosFormato) radio.checked = Number(radio.value) === estado.formato;
}
// FIN PASO 12


// ARRANQUE (desde el PASO 4): lo primero que corre al abrir la página
cargar(); // PASO 12
if (estado.ciudades.length === 0) ciudadesIniciales();
pintarTablero();
requestAnimationFrame(latir); // PASO 7
pintarSugerencias(); // PASO 8
