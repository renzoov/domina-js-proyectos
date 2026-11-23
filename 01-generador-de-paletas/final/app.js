// ─────────────────────────────────────────────────────────────
// Generador de paletas
// Proyecto 1 de domina-js: https://domina-js.pages.dev/proyectos
//
// El código va en el orden en que se construye en la guía.
// Cada parte empieza con «PASO n» y termina con «FIN PASO n».
// Una línea que termina en «// PASO n» se agrega más tarde, en ese paso,
// dentro de código que ya estaba escrito.
// ─────────────────────────────────────────────────────────────


// PASO 1: el estado y los elementos de la página
// Todo lo que la aplicación "sabe" vive en un solo objeto, `estado`.
// La página nunca es la fuente de la verdad: cuando algo cambia,
// cambiamos el estado y volvemos a pintar.

const CANTIDAD = 5;
const ARMONIAS = ['aleatoria', 'analoga', 'complementaria', 'triadica', 'monocromatica'];

const estado = {
  colores: ['1E3A4C', '2F7F7A', 'E7C56A', 'F2994A', 'D2553F'], // en hex, sin el #
  fijados: [false, false, false, false, false],
  armonia: 'analoga',
  origen: 'armonia', // 'armonia' o 'foto': de dónde salió la paleta actual
};

const chips = [...document.querySelectorAll('[data-chip]')];
const tiras = [...document.querySelectorAll('[data-tira]')];
const radiosArmonia = [...document.querySelectorAll('input[name="armonia"]')];
const botonGenerar = document.querySelector('[data-generar]');
const botonDeshacer = document.querySelector('[data-deshacer]');
const botonRehacer = document.querySelector('[data-rehacer]');
const textoEstado = document.querySelector('[data-estado]');
const aviso = document.querySelector('[data-aviso]');
// FIN PASO 1


// PASO 2: de hex a RGB y a HSL, y de vuelta
// Un color se puede escribir de varias formas. Usamos tres:
//   hex  "E7C56A"                    → como lo escribimos en CSS
//   rgb  { r: 231, g: 197, b: 106 }  → cuánto rojo, verde y azul (0 a 255)
//   hsl  { h: 44, s: 72, l: 66 }     → tono (0 a 360°), saturación y luz (0 a 100 %)
// HSL es el que mejor se lleva con las armonías: girar el tono es sumar grados.

function hexARgb(hex) {
  const numero = parseInt(hex, 16);
  return {
    r: (numero >> 16) & 255,
    g: (numero >> 8) & 255,
    b: numero & 255,
  };
}

function rgbAHex({ r, g, b }) {
  return [r, g, b]
    .map((canal) => Math.round(canal).toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
}

function rgbAHsl({ r, g, b }) {
  const [rr, gg, bb] = [r / 255, g / 255, b / 255];
  const max = Math.max(rr, gg, bb);
  const min = Math.min(rr, gg, bb);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rr) h = (gg - bb) / d + (gg < bb ? 6 : 0);
    else if (max === gg) h = (bb - rr) / d + 2;
    else h = (rr - gg) / d + 4;
    h *= 60;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslARgb({ h, s, l }) {
  const ss = s / 100;
  const ll = l / 100;
  const k = (n) => (n + h / 30) % 12;
  const a = ss * Math.min(ll, 1 - ll);
  const f = (n) => ll - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return { r: f(0) * 255, g: f(8) * 255, b: f(4) * 255 };
}

function hslAHex(hsl) {
  return rgbAHex(hslARgb(hsl));
}
// FIN PASO 2


// PASO 3: el contraste, como lo mide la WCAG
// La WCAG (las pautas de accesibilidad de la web) compara la "luminancia"
// de dos colores: cuánta luz llega al ojo. El resultado va de 1:1 (iguales)
// a 21:1 (negro sobre blanco). Para leer texto normal hace falta 4,5:1 (AA);
// 7:1 es AAA, y 3:1 alcanza solo para texto grande.

function luminancia(hex) {
  const { r, g, b } = hexARgb(hex);
  const [rr, gg, bb] = [r, g, b].map((canal) => {
    const c = canal / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rr + 0.7152 * gg + 0.0722 * bb;
}

function contraste(hexA, hexB) {
  const [claro, oscuro] = [luminancia(hexA), luminancia(hexB)].sort((a, b) => b - a);
  return (claro + 0.05) / (oscuro + 0.05);
}

function nivelWcag(razon) {
  if (razon >= 7) return 'AAA';
  if (razon >= 4.5) return 'AA';
  if (razon >= 3) return 'AA grande';
  return '';
}

// Se corta (no se redondea) a un decimal: 4,48 no debe mostrarse como 4,5,
// porque no llega a AA
function formatearRazon(razon) {
  const cortado = Math.floor(razon * 10) / 10;
  return cortado.toLocaleString('es', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}
// FIN PASO 3


// PASO 4: pintar la paleta
// Una sola función pone en la página todo lo que dice el estado.
// La llamamos cada vez que el estado cambia.

const BLANCO = 'FFFFFF';
const NEGRO = '111111';

function pintar() {
  chips.forEach((chip, i) => {
    const hex = estado.colores[i];
    const rgb = hexARgb(hex);
    const hsl = rgbAHsl(rgb);
    const conBlanco = contraste(hex, BLANCO);
    const conNegro = contraste(hex, NEGRO);
    const fijado = estado.fijados[i];

    chip.style.setProperty('--tinta-chip', `#${hex}`);
    chip.style.setProperty('--texto-chip', conBlanco >= conNegro ? '#fff' : `#${NEGRO}`);
    chip.classList.toggle('fijo', fijado);
    chip.setAttribute('aria-label', `Color ${i + 1}: #${hex}${fijado ? ', fijado' : ''}`);

    chip.querySelector('[data-hex]').textContent = hex;
    chip.querySelector('[data-rgb]').textContent = `${rgb.r} · ${rgb.g} · ${rgb.b}`;
    chip.querySelector('[data-hsl]').textContent = `${hsl.h}° · ${hsl.s}% · ${hsl.l}%`;

    pintarContraste(chip.querySelector('[data-contraste="blanco"]'), 'Blanco', conBlanco, conBlanco >= conNegro);
    pintarContraste(chip.querySelector('[data-contraste="negro"]'), 'Negro', conNegro, conNegro > conBlanco);

    const botonFijar = chip.querySelector('[data-fijar]');
    botonFijar.setAttribute('aria-pressed', String(fijado));
    botonFijar.querySelector('use').setAttribute('href', fijado ? '#i-cerrado' : '#i-abierto');
    botonFijar.querySelector('span').textContent = fijado ? 'Fijado' : 'Fijar';
    chip.querySelector('[data-copiar]').setAttribute('aria-label', `Copiar #${hex}`);

    tiras[i].style.setProperty('--color', `#${hex}`);
  });

  radiosArmonia.forEach((radio) => {
    radio.checked = estado.origen === 'armonia' && radio.value === estado.armonia;
  });

  const cuantos = estado.fijados.filter(Boolean).length;
  textoEstado.textContent = `${CANTIDAD} de ${CANTIDAD} ranuras · ${cuantos} ${cuantos === 1 ? 'fijada' : 'fijadas'}`;
  pintarHistorial(); // PASO 8
}

function pintarContraste(elemento, nombre, razon, esMejor) {
  const nivel = nivelWcag(razon);
  elemento.firstChild.textContent = `${nombre} `;
  elemento.querySelector('b').textContent = `${formatearRazon(razon)}${nivel ? ` ${nivel}` : ''}`;
  elemento.classList.toggle('mejor', esMejor);
}
// FIN PASO 4


// PASO 5: generar colores que combinan
// Una armonía es una regla para elegir tonos en el círculo cromático.
// Partimos de un tono base y giramos: +180° es el opuesto, +120° el
// siguiente de un triángulo, ±20° los vecinos. La luz (l) va de oscuro a
// claro para que la paleta tenga de dónde sacar fondo y texto.

function aleatorio(min, max) {
  return min + Math.random() * (max - min);
}

function limitar(valor, min, max) {
  return Math.min(max, Math.max(min, valor));
}

function armonizar(armonia, h, s) {
  switch (armonia) {
    case 'analoga':
      return [-40, -20, 0, 20, 40].map((giro, i) => ({ h: h + giro, s: s + aleatorio(-8, 8), l: 28 + i * 12 }));
    case 'complementaria':
      return [
        { h, s, l: 22 },
        { h, s, l: 40 },
        { h, s: s - 10, l: 64 },
        { h: h + 180, s, l: 56 },
        { h: h + 180, s: s - 15, l: 82 },
      ];
    case 'triadica':
      return [
        { h, s, l: 30 },
        { h: h + 120, s, l: 48 },
        { h: h + 240, s, l: 60 },
        { h, s: s - 25, l: 84 },
        { h: h + 120, s: s - 10, l: 22 },
      ];
    case 'monocromatica':
      return [18, 34, 50, 66, 82].map((l) => ({ h, s, l }));
    default: // aleatoria
      return Array.from({ length: CANTIDAD }, () => ({ h: aleatorio(0, 360), s: aleatorio(35, 85), l: aleatorio(25, 80) }));
  }
}

function generarColores(armonia) {
  // Si hay un color fijado, la armonía gira alrededor de su tono
  const primerFijado = estado.fijados.indexOf(true);
  const h = primerFijado >= 0 ? rgbAHsl(hexARgb(estado.colores[primerFijado])).h : aleatorio(0, 360);
  const s = aleatorio(45, 75);

  return armonizar(armonia, h, s).map((color) =>
    hslAHex({
      h: ((color.h % 360) + 360) % 360,
      s: limitar(color.s, 0, 100),
      l: limitar(color.l, 0, 100),
    }),
  );
}
// FIN PASO 5


// PASO 6: la barra espaciadora y el botón «Generar»

function generar() {
  guardarEnHistorial(); // PASO 8
  const nuevos = generarColores(estado.armonia);
  const cambiados = []; // PASO 13
  estado.colores = estado.colores.map((hex, i) => {
    if (estado.fijados[i]) return hex;
    cambiados.push(i); // PASO 13
    return nuevos[i];
  });
  estado.origen = 'armonia';
  pintar();
  actualizarUrl(); // PASO 10
  abanico(cambiados); // PASO 13
}

botonGenerar.addEventListener('click', generar);

document.addEventListener('keydown', (evento) => {
  if (evento.code !== 'Space' || evento.ctrlKey || evento.metaKey || evento.altKey) return;
  // Si el foco está en un botón o en un control, el espacio es suyo (pulsarlo, marcarlo)
  if (evento.target.closest('button, input, select, textarea, a, dialog, [contenteditable]')) return;
  evento.preventDefault(); // que la página no haga scroll
  generar();
});

radiosArmonia.forEach((radio) => {
  radio.addEventListener('change', () => {
    estado.armonia = radio.value;
    generar();
  });
});
// FIN PASO 6


// PASO 7: fijar los colores que te gustan
// Un color fijado no cambia al generar. Usamos delegación de eventos:
// un solo listener en la mesa atiende los cinco botones.

document.querySelector('[data-mesa]').addEventListener('click', (evento) => {
  const boton = evento.target.closest('[data-fijar]');
  if (!boton) return;
  const i = chips.indexOf(boton.closest('[data-chip]'));
  estado.fijados[i] = !estado.fijados[i];
  pintar();
});
// FIN PASO 7


// PASO 8: deshacer y rehacer
// Dos pilas (arrays): antes de cada cambio guardamos la paleta en «atras».
// Deshacer saca la última de «atras» y guarda la actual en «adelante».

const historial = { atras: [], adelante: [] };
const MAXIMO_HISTORIAL = 50;

function guardarEnHistorial() {
  historial.atras.push([...estado.colores]);
  if (historial.atras.length > MAXIMO_HISTORIAL) historial.atras.shift();
  historial.adelante = [];
}

function deshacer() {
  if (!historial.atras.length) return;
  historial.adelante.push([...estado.colores]);
  estado.colores = historial.atras.pop();
  pintar();
  actualizarUrl(); // PASO 10
}

function rehacer() {
  if (!historial.adelante.length) return;
  historial.atras.push([...estado.colores]);
  estado.colores = historial.adelante.pop();
  pintar();
  actualizarUrl(); // PASO 10
}

function pintarHistorial() {
  botonDeshacer.disabled = historial.atras.length === 0;
  botonRehacer.disabled = historial.adelante.length === 0;
}

botonDeshacer.addEventListener('click', deshacer);
botonRehacer.addEventListener('click', rehacer);

document.addEventListener('keydown', (evento) => {
  if (!(evento.ctrlKey || evento.metaKey)) return;
  const tecla = evento.key.toLowerCase();
  if (tecla === 'z' && !evento.shiftKey) {
    evento.preventDefault();
    deshacer();
  } else if (tecla === 'y' || (tecla === 'z' && evento.shiftKey)) {
    evento.preventDefault();
    rehacer();
  }
});
// FIN PASO 8


// PASO 9: copiar con un clic, y avisar
// navigator.clipboard es asíncrono: devuelve una promesa.

let temporizadorAviso;

function avisar(mensaje, hex) {
  aviso.textContent = '';
  if (hex) {
    const muestra = document.createElement('span');
    muestra.className = 'muestra';
    muestra.style.background = `#${hex}`;
    aviso.append(muestra);
  }
  aviso.append(mensaje);
  aviso.classList.add('visible');
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(() => aviso.classList.remove('visible'), 1800);
}

async function copiar(texto) {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    return false;
  }
}

document.querySelector('[data-mesa]').addEventListener('click', async (evento) => {
  const boton = evento.target.closest('[data-copiar]');
  if (!boton) return;
  const hex = estado.colores[chips.indexOf(boton.closest('[data-chip]'))];
  const ok = await copiar(`#${hex}`);
  avisar(ok ? `#${hex} copiado` : 'No se pudo copiar: el navegador no dio permiso', ok ? hex : null);
});
// FIN PASO 9


// PASO 10: la paleta vive en la dirección
// Así, si recargas o compartes el enlace, aparece la misma paleta:
//   index.html?c=1e3a4c-2f7f7a-e7c56a-f2994a-d2553f&a=analoga
// replaceState cambia la dirección sin recargar ni sumar entradas al historial.

function actualizarUrl() {
  const parametros = new URLSearchParams({
    c: estado.colores.join('-').toLowerCase(),
    a: estado.armonia,
  });
  try {
    history.replaceState(null, '', `?${parametros}`);
  } catch {
    // Algunos navegadores no dejan cambiar la dirección de un archivo abierto
    // con doble clic (file://). La aplicación sigue funcionando igual.
  }
}

function leerDeUrl() {
  const parametros = new URLSearchParams(location.search);
  const colores = (parametros.get('c') ?? '').split('-');
  const armonia = parametros.get('a');
  if (ARMONIAS.includes(armonia)) estado.armonia = armonia;
  const validos = colores.length === CANTIDAD && colores.every((hex) => /^[0-9a-f]{6}$/i.test(hex));
  if (validos) estado.colores = colores.map((hex) => hex.toUpperCase());
  return validos;
}
// FIN PASO 10


// PASO 11: exportar las variables CSS
// Un <dialog> con showModal() ya trae lo difícil: atrapa el foco,
// se cierra con Escape y oscurece el fondo con ::backdrop.

const dialogo = document.querySelector('[data-dialogo]');
const codigo = document.querySelector('[data-codigo]');

function textoCss() {
  const lineas = estado.colores.map((hex, i) => `  --color-${i + 1}: #${hex.toLowerCase()};`);
  return `:root {\n${lineas.join('\n')}\n}`;
}

function abrirExportar() {
  // Los hex ya están validados (solo 0-9 y a-f), así que es seguro armar HTML con ellos
  const lineas = estado.colores.map(
    (hex, i) =>
      `  <span class="propiedad">--color-${i + 1}</span>: <span class="muestra" style="background:#${hex}"></span><span class="valor">#${hex.toLowerCase()}</span>;`,
  );
  codigo.innerHTML = `<span class="selector">:root</span> {\n${lineas.join('\n')}\n}`;
  // Con el diálogo abierto, el resto de la página queda "inerte" y oscurecida:
  // el aviso se muda adentro para que se vea y se lea, y vuelve al cerrar
  dialogo.append(aviso);
  dialogo.showModal();
}

dialogo.addEventListener('close', () => document.body.append(aviso));

document.querySelector('[data-abrir-exportar]').addEventListener('click', abrirExportar);
document.querySelector('[data-cerrar]').addEventListener('click', () => dialogo.close());

// Un clic en el fondo oscuro (fuera de la caja) también cierra
dialogo.addEventListener('click', (evento) => {
  if (evento.target === dialogo) dialogo.close();
});

document.querySelector('[data-copiar-css]').addEventListener('click', async () => {
  const ok = await copiar(textoCss());
  avisar(ok ? 'CSS copiado' : 'No se pudo copiar: el navegador no dio permiso');
});

document.querySelector('[data-copiar-enlace]').addEventListener('click', async () => {
  const ok = await copiar(location.href);
  avisar(ok ? 'Enlace copiado' : 'No se pudo copiar: el navegador no dio permiso');
});
// FIN PASO 11


// PASO 12: una paleta sacada de tu foto
// Dibujamos la imagen, pequeña, en un <canvas> y leemos sus píxeles con
// getImageData. Después agrupamos los colores parecidos (k-medias) y nos
// quedamos con los grupos más grandes: los colores que más se ven.

const entradaFoto = document.querySelector('[data-foto]');
const capaSoltar = document.querySelector('[data-soltar]');

async function paletaDeFoto(archivo) {
  if (!archivo || !archivo.type.startsWith('image/')) {
    avisar('Ese archivo no es una imagen');
    return;
  }
  const url = URL.createObjectURL(archivo);
  try {
    const imagen = new Image();
    imagen.src = url;
    await imagen.decode();

    const libres = estado.fijados.map((fijo, i) => (fijo ? -1 : i)).filter((i) => i >= 0);
    if (!libres.length) {
      avisar('Todos los colores están fijados');
      return;
    }
    const colores = coloresDominantes(imagen, CANTIDAD);

    guardarEnHistorial();
    // Los más vistos, de oscuro a claro, van a las ranuras libres
    const elegidos = colores.slice(0, libres.length).sort((a, b) => luminancia(a) - luminancia(b));
    libres.forEach((ranura, j) => (estado.colores[ranura] = elegidos[j] ?? estado.colores[ranura]));
    estado.origen = 'foto';
    pintar();
    actualizarUrl();
    abanico(libres); // PASO 13
    avisar(`Paleta sacada de ${archivo.name}`);
  } catch {
    avisar('No se pudo leer esa imagen');
  } finally {
    URL.revokeObjectURL(url);
  }
}

function coloresDominantes(imagen, cuantos) {
  // 1. La imagen, en un canvas de 100 px de lado como máximo: alcanza y es rápido
  const escala = Math.min(1, 100 / Math.max(imagen.naturalWidth, imagen.naturalHeight));
  const lienzo = document.createElement('canvas');
  lienzo.width = Math.max(1, Math.round(imagen.naturalWidth * escala));
  lienzo.height = Math.max(1, Math.round(imagen.naturalHeight * escala));
  const ctx = lienzo.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(imagen, 0, 0, lienzo.width, lienzo.height);

  // 2. Los píxeles: un array plano [r, g, b, a, r, g, b, a, ...]
  const { data } = ctx.getImageData(0, 0, lienzo.width, lienzo.height);
  const pixeles = [];
  for (let p = 0; p < data.length; p += 4) {
    if (data[p + 3] < 128) continue; // casi transparente: no cuenta
    pixeles.push([data[p], data[p + 1], data[p + 2]]);
  }
  if (!pixeles.length) return [];

  // 3. k-medias: arrancamos con píxeles repartidos de oscuro a claro...
  const porLuz = [...pixeles].sort((a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]));
  let centros = Array.from({ length: cuantos }, (_, k) => porLuz[Math.floor(((k + 0.5) / cuantos) * porLuz.length)]);
  let grupos = [];

  // ...y repetimos: cada píxel va con su centro más cercano, y cada centro
  // se mueve al promedio de su grupo
  for (let vuelta = 0; vuelta < 10; vuelta++) {
    grupos = centros.map(() => []);
    for (const pixel of pixeles) {
      let mejor = 0;
      let menorDistancia = Infinity;
      centros.forEach((centro, k) => {
        const distancia = (pixel[0] - centro[0]) ** 2 + (pixel[1] - centro[1]) ** 2 + (pixel[2] - centro[2]) ** 2;
        if (distancia < menorDistancia) {
          menorDistancia = distancia;
          mejor = k;
        }
      });
      grupos[mejor].push(pixel);
    }
    centros = grupos.map((grupo, k) => {
      if (!grupo.length) return centros[k];
      const suma = grupo.reduce((total, pixel) => [total[0] + pixel[0], total[1] + pixel[1], total[2] + pixel[2]], [0, 0, 0]);
      return suma.map((canal) => canal / grupo.length);
    });
  }

  // 4. Los grupos más grandes primero
  return centros
    .map((centro, k) => ({ hex: rgbAHex({ r: centro[0], g: centro[1], b: centro[2] }), tamano: grupos[k].length }))
    .sort((a, b) => b.tamano - a.tamano)
    .map((grupo) => grupo.hex);
}

entradaFoto.addEventListener('change', () => {
  paletaDeFoto(entradaFoto.files[0]);
  entradaFoto.value = ''; // para poder elegir la misma foto otra vez
});

// Arrastrar y soltar una imagen en cualquier parte de la página
const traeArchivos = (evento) => evento.dataTransfer?.types.includes('Files');

document.addEventListener('dragover', (evento) => {
  if (!traeArchivos(evento)) return;
  evento.preventDefault(); // sin esto, el navegador abriría la imagen
  capaSoltar.hidden = false;
});
document.addEventListener('dragleave', (evento) => {
  if (evento.relatedTarget === null) capaSoltar.hidden = true; // salió de la ventana
});
document.addEventListener('drop', (evento) => {
  if (!traeArchivos(evento)) return;
  evento.preventDefault();
  capaSoltar.hidden = true;
  paletaDeFoto(evento.dataTransfer.files[0]);
});
// FIN PASO 12


// PASO 13: el toque final, el abanico
// Al cambiar, los chips se abren como un muestrario y se asientan.
// Web Animations API: element.animate(fotogramas, opciones).

const sinMovimiento = matchMedia('(prefers-reduced-motion: reduce)');
const enFilas = matchMedia('(max-width: 820px)');

function abanico(indices) {
  if (sinMovimiento.matches) return;
  indices.forEach((i, orden) => {
    const giro = enFilas.matches ? 3 : (i - 2) * 6 || 3;
    chips[i].animate(
      [
        { transform: `rotate(${giro}deg) translateY(10px)`, opacity: 0.6 },
        { transform: 'rotate(0deg) translateY(0)', opacity: 1 },
      ],
      { duration: 560, delay: orden * 45, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'backwards' },
    );
  });
}
// FIN PASO 13


// ARRANQUE (desde el PASO 4): lo primero que corre al abrir la página
if (leerDeUrl()) { // PASO 10
  pintar(); // PASO 10
} else { // PASO 10
  estado.colores = generarColores(estado.armonia); // PASO 5
  pintar();
  actualizarUrl(); // PASO 10
} // PASO 10
// Desde la segunda pintada, los colores cambian con una transición // PASO 6
requestAnimationFrame(() => document.body.classList.add('listo')); // PASO 6
