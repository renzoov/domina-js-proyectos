// ─────────────────────────────────────────────────────────────
// Temporizador Pomodoro
// Proyecto 2 de domina-js: https://domina-js.pages.dev/proyectos
//
// El código va en el orden en que se construye en la guía.
// Cada parte empieza con «PASO n» y termina con «FIN PASO n».
// Una línea que termina en «// PASO n» se agrega más tarde, en ese paso,
// dentro de código que ya estaba escrito.
// ─────────────────────────────────────────────────────────────


// PASO 1: el estado y los elementos de la página
// Todo lo que el temporizador "sabe" vive en `estado`. Los tiempos van en
// milisegundos, que es como los da Date.now(), y las duraciones de los
// ajustes en minutos, que es como las escribe una persona.

const MINUTO = 60 * 1000;
const NOMBRES = { trabajo: 'Trabajo', corto: 'Descanso corto', largo: 'Descanso largo' };

const estado = {
  ajustes: { trabajo: 25, corto: 5, largo: 15, cada: 4, sonido: true },
  bloque: 'trabajo', // 'trabajo', 'corto' o 'largo'
  numero: 1, // qué pomodoro de la serie es: de 1 a ajustes.cada
  corriendo: false,
  terminaEn: 0, // la hora (en ms, como Date.now()) en que termina el bloque, si corre
  restante: 25 * MINUTO, // lo que queda, si está en pausa
  hechos: [], // los bloques terminados: { bloque, minutos, fin }
};

const tiempo = document.querySelector('[data-tiempo]');
const que = document.querySelector('[data-que]');
const numero = document.querySelector('[data-numero]');
const radiosBloque = [...document.querySelectorAll('input[name="bloque"]')];
const minutosBloque = [...document.querySelectorAll('[data-minutos]')];
const botonPrincipal = document.querySelector('[data-principal]');
const textoPrincipal = document.querySelector('[data-texto-principal]');
const iconoPrincipal = document.querySelector('[data-icono-principal]');
const botonSaltar = document.querySelector('[data-saltar]');
const botonReiniciar = document.querySelector('[data-reiniciar]');
const botonNuevaSerie = document.querySelector('[data-nueva-serie]');
const arco = document.querySelector('[data-arco]');
const aguja = document.querySelector('[data-aguja]');
const segundero = document.querySelector('[data-segundero]');
const marcas = document.querySelector('[data-marcas]');
const numeros = document.querySelector('[data-numeros]');
const listaSerie = document.querySelector('[data-serie]');
const anuncio = document.querySelector('[data-anuncio]');
// FIN PASO 1


// PASO 2: cuánto queda y cómo se escribe
// Si el reloj corre, lo que queda se calcula cada vez a partir de la hora
// de término (en el paso 4 verás por qué así no se atrasa).
// En pantalla va en minutos y segundos, redondeando hacia arriba: con
// 0,4 segundos por delante todavía se ve 0:01, y 0:00 es el final.

function restanteAhora() {
  if (!estado.corriendo) return estado.restante;
  return Math.max(0, estado.terminaEn - Date.now());
}

function formatear(ms) {
  const segundos = Math.ceil(ms / 1000);
  const minutos = Math.floor(segundos / 60);
  return `${minutos}:${String(segundos % 60).padStart(2, '0')}`;
}

// Lo que cambia con cada segundo
function pintarTiempo(restante) {
  const texto = formatear(restante);
  tiempo.textContent = texto;
  document.title = `${texto} · ${NOMBRES[estado.bloque]}`;
  pintarEsfera(restante); // PASO 3
  pintarAvance(restante); // PASO 5
}

// Todo lo demás: se llama cada vez que cambia el estado
function pintar() {
  dibujarEsfera(); // PASO 3
  pintarSerie(); // PASO 5
  pintarTiempo(restanteAhora());
  que.textContent = estado.bloque === 'trabajo' ? `Pomodoro ${estado.numero} de ${estado.ajustes.cada}` : NOMBRES[estado.bloque];
  numero.textContent = estado.numero;
  textoPrincipal.textContent = estado.corriendo ? 'Pausar' : 'Empezar';
  iconoPrincipal.setAttribute('href', estado.corriendo ? '#i-pausar' : '#i-empezar');
  radiosBloque.forEach((radio) => (radio.checked = radio.value === estado.bloque));
  minutosBloque.forEach((el) => (el.textContent = estado.ajustes[el.dataset.minutos]));
  botonNuevaSerie.disabled = !estado.corriendo && estado.bloque === 'trabajo' && estado.numero === 1 && estado.restante === estado.ajustes.trabajo * MINUTO; // PASO 6
  pintarResumen(); // PASO 12
  guardar(); // PASO 12
}
// FIN PASO 2


// PASO 3: la esfera del reloj
// La esfera mide el bloque: una marca por minuto y un número cada 5. Si el
// bloque dura 10 minutos o menos, una marca cada 15 segundos y un número por
// minuto. Las marcas se crean con SVG desde JavaScript porque cambian con la
// duración. El arco rojo es lo que queda, y la aguja marca hasta dónde llegaste.
// En el borde, como en el reloj de la piscina, un punto da la vuelta cada minuto.

const SVG = 'http://www.w3.org/2000/svg';

// Un punto de la esfera: el ángulo en grados, con 0 arriba y en el sentido del reloj
function punto(angulo, radio) {
  const radianes = (angulo * Math.PI) / 180;
  return { x: 100 + radio * Math.sin(radianes), y: 100 - radio * Math.cos(radianes) };
}

function elementoSvg(nombre, atributos) {
  const elemento = document.createElementNS(SVG, nombre);
  for (const [clave, valor] of Object.entries(atributos)) elemento.setAttribute(clave, valor);
  return elemento;
}

function dibujarEsfera() {
  const minutos = estado.ajustes[estado.bloque];
  const corto = minutos <= 10;
  const total = corto ? minutos * 4 : minutos; // cuántas marcas
  const cadaGrande = corto ? 4 : 5; // cada cuántas marcas va una grande, con su número
  marcas.replaceChildren();
  numeros.replaceChildren();
  for (let i = 0; i < total; i++) {
    const angulo = (i / total) * 360;
    const grande = i % cadaGrande === 0;
    const desde = punto(angulo, 93);
    const hasta = punto(angulo, grande ? 82 : 87);
    marcas.append(elementoSvg('line', { x1: desde.x, y1: desde.y, x2: hasta.x, y2: hasta.y, class: grande ? 'grande' : '' }));
    // El 0 no lleva número: ahí descansa la aguja
    if (grande && i > 0) {
      const centro = punto(angulo, 59);
      const texto = elementoSvg('text', { x: centro.x, y: centro.y });
      texto.textContent = corto ? i / 4 : i;
      numeros.append(texto);
    }
  }
}

function pintarEsfera(restante) {
  const total = estado.ajustes[estado.bloque] * MINUTO;
  const pasado = Math.min(1, Math.max(0, 1 - restante / total)); // de 0 a 1
  // El arco mide 100 (por su pathLength): se dibuja lo que queda, desde la aguja
  arco.style.strokeDasharray = `${(1 - pasado) * 100} 100`;
  arco.style.strokeDashoffset = -pasado * 100;
  aguja.style.transform = `rotate(${pasado * 360}deg)`;
  // Los segundos: una vuelta por minuto
  const segundos = (MINUTO - (restante % MINUTO)) % MINUTO;
  segundero.style.transform = `rotate(${(segundos / MINUTO) * 360}deg)`;
}

// Al empezar otro bloque, la aguja vuelve hacia atrás y el arco se llena
function rellenar(desde) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const opciones = { duration: 650, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)' };
  aguja.animate([{ transform: `rotate(${desde * 360}deg)` }, { transform: 'rotate(0deg)' }], opciones);
  arco.animate([
    { strokeDasharray: `${(1 - desde) * 100} 100`, strokeDashoffset: -desde * 100 },
    { strokeDasharray: '100 100', strokeDashoffset: 0 },
  ], opciones);
}
// FIN PASO 3


// PASO 4: contar sin atrasarse
// setInterval no promete puntualidad: cada vuelta puede llegar tarde (si el
// navegador está ocupado o la pestaña está escondida) y, si contáramos
// vueltas, esos retrasos se sumarían. Por eso guardamos la hora de término
// y en cada vuelta solo miramos cuánto falta para esa hora.

let intervalo = null;

function empezar() {
  if (estado.corriendo) return;
  estado.terminaEn = Date.now() + estado.restante;
  estado.corriendo = true;
  prepararSonido(); // PASO 10
  programar();
  pedirPantalla(); // PASO 11
  pintar();
}

function pausar() {
  if (!estado.corriendo) return;
  estado.restante = restanteAhora();
  estado.corriendo = false;
  programar();
  soltarPantalla(); // PASO 11
  pintar();
}

function alternar() {
  if (estado.corriendo) pausar();
  else empezar();
}

// Mientras corre, revisa el reloj cada 200 ms
function programar() {
  clearInterval(intervalo);
  clearTimeout(alarma); // PASO 8
  if (!estado.corriendo) return;
  if (document.hidden) { // PASO 8
    intervalo = setInterval(tic, 1000); // PASO 8
    alarma = setTimeout(tic, restanteAhora()); // PASO 8
    return; // PASO 8
  } // PASO 8
  intervalo = setInterval(tic, 200);
}

function tic() {
  const restante = restanteAhora();
  pintarTiempo(restante);
  if (restante === 0) terminarBloque(); // PASO 5
}

botonPrincipal.addEventListener('click', alternar);
// FIN PASO 4


// PASO 5: la serie del día
// Una serie son `cada` pomodoros, cada uno seguido de un descanso corto,
// salvo el último, que lleva el descanso largo. Al terminar un bloque se
// anota en `hechos` y se pasa al siguiente, que espera a que lo empieces.

function serie() {
  const bloques = [];
  for (let n = 1; n <= estado.ajustes.cada; n++) {
    bloques.push({ bloque: 'trabajo', numero: n });
    bloques.push({ bloque: n === estado.ajustes.cada ? 'largo' : 'corto', numero: n });
  }
  return bloques;
}

function siguiente() {
  if (estado.bloque === 'trabajo') {
    return { bloque: estado.numero === estado.ajustes.cada ? 'largo' : 'corto', numero: estado.numero };
  }
  return { bloque: 'trabajo', numero: estado.bloque === 'largo' ? 1 : estado.numero + 1 };
}

function irA({ bloque, numero }) {
  const pasado = 1 - restanteAhora() / (estado.ajustes[estado.bloque] * MINUTO);
  estado.bloque = bloque;
  estado.numero = numero;
  estado.restante = estado.ajustes[bloque] * MINUTO;
  estado.corriendo = false;
  programar();
  soltarPantalla(); // PASO 11
  pintar();
  rellenar(Math.min(1, Math.max(0, pasado)));
}

function terminarBloque() {
  estado.hechos.push({ bloque: estado.bloque, minutos: estado.ajustes[estado.bloque], fin: estado.terminaEn });
  anuncio.textContent = `Terminó: ${NOMBRES[estado.bloque]}. Sigue: ${NOMBRES[siguiente().bloque]}.`;
  avisar(); // PASO 9
  pitar(); // PASO 10
  irA(siguiente());
}

function pintarSerie() {
  const actual = (estado.numero - 1) * 2 + (estado.bloque === 'trabajo' ? 0 : 1);
  const mayor = Math.max(estado.ajustes.trabajo, estado.ajustes.corto, estado.ajustes.largo);
  listaSerie.innerHTML = serie()
    .map((b, i) => {
      const minutos = estado.ajustes[b.bloque];
      const clases = ['carril-fila', b.bloque !== 'trabajo' && 'descanso', i < actual && 'hecho', i === actual && 'actual'];
      return `<li class="${clases.filter(Boolean).join(' ')}"${i === actual ? ' data-actual aria-current="step"' : ''}>
        <b>${b.bloque === 'trabajo' ? b.numero : ''}</b>
        <span class="nombre">${NOMBRES[b.bloque]}</span>
        <span class="cuerda" style="width: ${(minutos / mayor) * 100}%"></span>
        <span class="minutos">${formatear(minutos * MINUTO)}</span>
      </li>`;
    })
    .join('');
}

// El bloque actual de la serie muestra lo que queda y su corchera se va llenando
function pintarAvance(restante) {
  const fila = listaSerie.querySelector('[data-actual]');
  if (!fila) return;
  fila.querySelector('.minutos').textContent = formatear(restante);
  fila.querySelector('.cuerda').style.setProperty('--avance', 1 - restante / (estado.ajustes[estado.bloque] * MINUTO));
}
// FIN PASO 5


// PASO 6: saltar, reiniciar y elegir el bloque
// Los tres terminan en irA(): saltar va al siguiente sin anotar nada,
// reiniciar vuelve a empezar el mismo, empezar de nuevo vuelve al primer
// pomodoro de la serie, y las pestañas eligen uno a mano. Ninguno borra
// lo que ya terminaste: eso queda anotado en `hechos`.
// Si ya pasó más de un minuto del bloque, primero se pregunta: una tecla
// apretada sin querer no debería borrar 20 minutos de trabajo.

function puedoDejarlo() {
  const pasado = estado.ajustes[estado.bloque] * MINUTO - restanteAhora();
  return pasado < MINUTO || confirm(`¿Dejar este bloque? Se pierden los ${formatear(pasado)} que llevas.`);
}

function saltar() {
  if (puedoDejarlo()) irA(siguiente());
}

function reiniciar() {
  if (puedoDejarlo()) irA({ bloque: estado.bloque, numero: estado.numero });
}

function nuevaSerie() {
  if (puedoDejarlo()) irA({ bloque: 'trabajo', numero: 1 });
}

botonSaltar.addEventListener('click', saltar);
botonReiniciar.addEventListener('click', reiniciar);
botonNuevaSerie.addEventListener('click', nuevaSerie);

radiosBloque.forEach((radio) => {
  radio.addEventListener('change', () => {
    if (!puedoDejarlo()) return pintar(); // pintar() vuelve a marcar la pestaña de antes
    // El descanso largo es el del último pomodoro de la serie
    const numero = radio.value === 'largo' ? estado.ajustes.cada : estado.numero;
    irA({ bloque: radio.value, numero });
  });
});
// FIN PASO 6


// PASO 7: los atajos de teclado
// Espacio empieza o pausa, S salta y R reinicia. Si el foco está en un
// campo de texto o en un diálogo, las teclas son de ellos (las pestañas son
// radios, pero ahí sí valen los atajos). Si está en un botón
// (queda ahí después de hacerle clic), Espacio lo volvería a pulsar:
// preventDefault() lo evita y Espacio sigue siendo empezar o pausar.

document.addEventListener('keydown', (evento) => {
  if (evento.repeat || evento.ctrlKey || evento.metaKey || evento.altKey) return;
  if (evento.target.closest('input:not([type="radio"]), select, textarea, dialog')) return;
  if (evento.code === 'Space') {
    evento.preventDefault(); // ni pulsar el botón con foco ni bajar la página
    alternar();
  } else if (evento.code === 'KeyS') {
    saltar();
  } else if (evento.code === 'KeyR') {
    reiniciar();
  }
});
// FIN PASO 7


// PASO 8: la pestaña escondida
// Con la pestaña escondida, el navegador frena los timers para ahorrar
// batería: un setInterval puede pasar a una vuelta por segundo, o incluso
// por minuto. El tiempo no se atrasa (lo calculamos con la hora de término),
// pero el final sí podría llegar tarde. Por eso, al esconderse, agendamos
// un solo setTimeout justo para la hora de término. Al volver, repintamos.

let alarma = null;

document.addEventListener('visibilitychange', () => {
  programar();
  if (estado.corriendo) tic();
  if (!document.hidden && estado.corriendo) pedirPantalla(); // PASO 11
});
// FIN PASO 8


// PASO 9: el aviso al terminar
// Notification muestra un aviso del sistema aunque estés en otra pestaña o
// en otra aplicación. Hay que pedir permiso, y solo se puede pedir cuando
// la persona hace clic: por eso hay un botón. En el teléfono, además, vibra.

const botonAvisos = document.querySelector('[data-avisos]');
const textoAvisos = document.querySelector('[data-texto-avisos]');

function pintarAvisos() {
  if (!('Notification' in window)) {
    textoAvisos.textContent = 'Este navegador no tiene avisos';
    botonAvisos.disabled = true;
    return;
  }
  const textos = {
    granted: 'Avisos activados',
    denied: 'Avisos bloqueados: actívalos en el candado',
    default: 'Activar avisos',
  };
  textoAvisos.textContent = textos[Notification.permission];
  botonAvisos.disabled = Notification.permission !== 'default';
}

botonAvisos.addEventListener('click', async () => {
  await Notification.requestPermission();
  pintarAvisos();
});

function avisar() {
  navigator.vibrate?.([200, 100, 200]);
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  const sigue = NOMBRES[siguiente().bloque].toLowerCase();
  new Notification(`Terminó: ${NOMBRES[estado.bloque]}`, {
    body: `Sigue el ${sigue}. Vuelve y pulsa Empezar.`,
    tag: 'pomodoro', // un aviso nuevo reemplaza al anterior
  });
}
// FIN PASO 9


// PASO 10: el pitido
// Web Audio fabrica sonido con código: un oscilador da la nota y un control
// de volumen (gain) la enciende y la apaga. Los navegadores solo dejan sonar
// audio después de un clic, así que el AudioContext se crea al pulsar
// Empezar y queda listo para cuando el bloque termine.

let audio = null;

function prepararSonido() {
  if (!('AudioContext' in window)) return; // sin Web Audio, el temporizador sigue sin pitido
  audio ??= new AudioContext();
  if (audio.state === 'suspended') audio.resume();
}

function pitar() {
  if (!audio || !estado.ajustes.sonido) return;
  const ahora = audio.currentTime;
  // Tres pitidos cortos
  [0, 0.35, 0.7].forEach((desde) => {
    const nota = audio.createOscillator();
    const volumen = audio.createGain();
    nota.frequency.value = 880; // un La agudo
    volumen.gain.setValueAtTime(0.0001, ahora + desde);
    volumen.gain.exponentialRampToValueAtTime(0.3, ahora + desde + 0.02);
    volumen.gain.exponentialRampToValueAtTime(0.0001, ahora + desde + 0.25);
    nota.connect(volumen).connect(audio.destination);
    nota.start(ahora + desde);
    nota.stop(ahora + desde + 0.3);
  });
}
// FIN PASO 10


// PASO 11: la pantalla encendida
// Mientras corre un bloque, pedimos que la pantalla no se apague (Wake Lock).
// El navegador suelta ese pedido cuando escondes la pestaña, así que lo
// volvemos a pedir al volver: es la línea que se suma en el paso 8.

const textoPantalla = document.querySelector('[data-pantalla]');
let pantalla = null;

async function pedirPantalla() {
  if (!('wakeLock' in navigator) || pantalla) return;
  try {
    pantalla = await navigator.wakeLock.request('screen');
    textoPantalla.hidden = false;
    pantalla.addEventListener('release', () => {
      pantalla = null;
      textoPantalla.hidden = true;
    });
  } catch {
    // Sin permiso o con poca batería: el temporizador funciona igual
  }
}

function soltarPantalla() {
  pantalla?.release();
  pantalla = null;
  textoPantalla.hidden = true;
}
// FIN PASO 11


// PASO 12: guardar y retomar
// localStorage guarda texto entre visitas, así que guardamos el estado como
// JSON cada vez que se pinta. Como lo guardado es la hora de término (y no
// cuánto faltaba), al recargar el reloj sigue donde iba, aunque haya pasado
// un rato. Con lo anotado en `hechos` sale el resumen del día.

const CLAVE = 'pomodoro:v1';
const resumenHoy = document.querySelector('[data-hoy]');
const resumenMinutos = document.querySelector('[data-minutos-hoy]');
const resumenRacha = document.querySelector('[data-racha]');

function guardar() {
  localStorage.setItem(CLAVE, JSON.stringify(estado));
}

function cargar() {
  const guardado = JSON.parse(localStorage.getItem(CLAVE));
  if (!guardado) return;
  Object.assign(estado, guardado, { ajustes: { ...estado.ajustes, ...guardado.ajustes } });
  // Del historial alcanza con los últimos 30 días
  const limite = Date.now() - 30 * 24 * 60 * MINUTO;
  estado.hechos = estado.hechos.filter((hecho) => hecho.fin > limite);
}

// Los bloques de trabajo terminados en un día (`dia` es un Date)
function trabajoDe(dia) {
  return estado.hechos.filter((hecho) => hecho.bloque === 'trabajo' && new Date(hecho.fin).toDateString() === dia.toDateString());
}

// Cuántos días seguidos con al menos un pomodoro (hoy cuenta aunque todavía no haya)
function racha() {
  const dia = new Date();
  if (!trabajoDe(dia).length) dia.setDate(dia.getDate() - 1);
  let dias = 0;
  while (trabajoDe(dia).length) {
    dias++;
    dia.setDate(dia.getDate() - 1);
  }
  return dias;
}

function pintarResumen() {
  const hoy = trabajoDe(new Date());
  resumenHoy.textContent = hoy.length;
  resumenMinutos.textContent = hoy.reduce((suma, hecho) => suma + hecho.minutos, 0);
  resumenRacha.textContent = racha();
}
// FIN PASO 12


// PASO 13: ajustes e historial
// Los dos son <dialog>: showModal() los abre encima de todo, con el foco
// adentro, y Escape los cierra. Sus formularios usan method="dialog": al
// enviarlos, el diálogo se cierra solo y returnValue dice con qué botón.

const dialogoAjustes = document.querySelector('[data-dialogo-ajustes]');
const formAjustes = dialogoAjustes.querySelector('form');
const dialogoHistorial = document.querySelector('[data-dialogo-historial]');
const listaDias = document.querySelector('[data-dias]');

document.querySelector('[data-abrir-ajustes]').addEventListener('click', () => {
  for (const [clave, valor] of Object.entries(estado.ajustes)) {
    const campo = formAjustes.elements[clave];
    if (campo.type === 'checkbox') campo.checked = valor;
    else campo.value = valor;
  }
  dialogoAjustes.returnValue = ''; // si se cierra con Escape, que no quede el de la vez anterior
  dialogoAjustes.showModal();
});

dialogoAjustes.addEventListener('close', () => {
  if (dialogoAjustes.returnValue !== 'guardar') return;
  const datos = new FormData(formAjustes);
  estado.ajustes = {
    trabajo: Number(datos.get('trabajo')),
    corto: Number(datos.get('corto')),
    largo: Number(datos.get('largo')),
    cada: Number(datos.get('cada')),
    sonido: datos.has('sonido'),
  };
  estado.numero = Math.min(estado.numero, estado.ajustes.cada);
  // Si está en pausa, el bloque toma la duración nueva; si corre, la toma el próximo
  if (!estado.corriendo) estado.restante = estado.ajustes[estado.bloque] * MINUTO;
  pintar();
});

document.querySelector('[data-abrir-historial]').addEventListener('click', () => {
  const formato = new Intl.DateTimeFormat('es', { weekday: 'short', day: 'numeric' });
  const dias = [];
  for (let atras = 6; atras >= 0; atras--) {
    const dia = new Date();
    dia.setDate(dia.getDate() - atras);
    const minutos = trabajoDe(dia).reduce((suma, hecho) => suma + hecho.minutos, 0);
    dias.push({ nombre: atras === 0 ? 'hoy' : formato.format(dia), minutos });
  }
  const mayor = Math.max(60, ...dias.map((d) => d.minutos));
  listaDias.innerHTML = dias
    .map((d) => `<li><span>${d.nombre}</span><span class="cuerda" style="width: ${(d.minutos / mayor) * 100}%"></span><b>${d.minutos} min</b></li>`)
    .join('');
  dialogoHistorial.showModal();
});
// FIN PASO 13


// ARRANQUE (desde el PASO 2): lo primero que corre al abrir la página
cargar(); // PASO 12
programar(); // PASO 12
pintar();
pintarAvisos(); // PASO 9
