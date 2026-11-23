// Pruebas del Generador de paletas, una por paso.
// Las corre herramientas/proyectos.mjs (en el repositorio de domina-js) con Playwright:
// abre la página con el app.js tal como queda después de cada paso y evalúa cada prueba en ella.
// Una prueba es código que corre en la página y devuelve true si el paso funciona.

const espacio = `document.body.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', key: ' ', bubbles: true }))`;

export const pruebas = [
  {
    paso: 1,
    que: 'el estado tiene cinco colores y la página, cinco chips',
    codigo: `Array.isArray(estado.colores) && estado.colores.length === 5 && chips.length === 5 && tiras.length === 5`,
  },
  {
    paso: 2,
    que: 'hex, RGB y HSL se convierten de ida y vuelta',
    codigo: `hexARgb('E7C56A').g === 197 && rgbAHex({ r: 231, g: 197, b: 106 }) === 'E7C56A'
      && rgbAHsl({ r: 231, g: 197, b: 106 }).h === 44 && hslAHex({ h: 0, s: 100, l: 50 }) === 'FF0000'`,
  },
  {
    paso: 3,
    que: 'el contraste de negro sobre blanco es 21 y 4,48 no se muestra como 4,5',
    codigo: `Math.round(contraste('FFFFFF', '000000')) === 21 && nivelWcag(4.6) === 'AA' && nivelWcag(2) === '' && formatearRazon(4.48) === '4,4'`,
  },
  {
    paso: 4,
    que: 'los chips muestran el hex, el RGB y el contraste del estado',
    codigo: `document.querySelector('[data-hex]').textContent === estado.colores[0]
      && document.querySelector('[data-rgb]').textContent.includes('·')
      && document.querySelector('[data-contraste="blanco"] b').textContent !== ''`,
  },
  {
    paso: 5,
    que: 'cada armonía da cinco colores en hex',
    codigo: `['aleatoria', 'analoga', 'complementaria', 'triadica', 'monocromatica']
      .every((a) => { const c = generarColores(a); return c.length === 5 && c.every((h) => /^[0-9A-F]{6}$/.test(h)); })`,
  },
  {
    paso: 6,
    que: 'la barra espaciadora genera una paleta nueva',
    codigo: `(() => { const antes = estado.colores.join(); ${espacio}; return estado.colores.join() !== antes
      && document.querySelector('[data-hex]').textContent === estado.colores[0]; })()`,
  },
  {
    paso: 7,
    que: 'un color fijado no cambia al generar',
    codigo: `(() => { document.querySelector('[data-fijar]').click(); const fijo = estado.colores[0]; ${espacio};
      const ok = estado.fijados[0] && estado.colores[0] === fijo
        && document.querySelector('[data-fijar]').getAttribute('aria-pressed') === 'true';
      document.querySelector('[data-fijar]').click(); return ok; })()`,
  },
  {
    paso: 8,
    que: 'deshacer vuelve a la paleta anterior y rehacer, a la nueva',
    codigo: `(() => { const a = estado.colores.join(); generar(); const b = estado.colores.join();
      deshacer(); const vuelve = estado.colores.join() === a; rehacer();
      return vuelve && estado.colores.join() === b && !botonDeshacer.disabled; })()`,
  },
  {
    paso: 9,
    que: 'el aviso aparece con su mensaje',
    codigo: `(() => { avisar('Prueba'); return aviso.classList.contains('visible') && aviso.textContent === 'Prueba'; })()`,
  },
  {
    paso: 10,
    que: 'la dirección guarda la paleta y se puede leer de vuelta',
    codigo: `(() => { generar(); const c = new URLSearchParams(location.search).get('c');
      return c === estado.colores.join('-').toLowerCase() && leerDeUrl() === true; })()`,
  },
  {
    paso: 11,
    que: 'el diálogo de exportar muestra las cinco variables',
    codigo: `(() => { document.querySelector('[data-abrir-exportar]').click();
      const ok = dialogo.open && codigo.textContent.includes('--color-5: #' + estado.colores[4].toLowerCase())
        && textoCss().startsWith(':root {');
      dialogo.close(); return ok; })()`,
  },
  {
    paso: 12,
    que: 'una imagen roja y azul da una paleta con rojo y azul',
    codigo: `(async () => {
      const lienzo = document.createElement('canvas'); lienzo.width = 20; lienzo.height = 20;
      const ctx = lienzo.getContext('2d'); ctx.fillStyle = '#ff0000'; ctx.fillRect(0, 0, 20, 10); ctx.fillStyle = '#0000ff'; ctx.fillRect(0, 10, 20, 10);
      const blob = await new Promise((r) => lienzo.toBlob(r));
      await paletaDeFoto(new File([blob], 'prueba.png', { type: 'image/png' }));
      return estado.origen === 'foto' && estado.colores.includes('FF0000') && estado.colores.includes('0000FF'); })()`,
  },
  {
    paso: 13,
    que: 'al generar, los chips se animan',
    codigo: `(() => { generar(); return chips.some((c) => c.getAnimations().length > 0); })()`,
  },
];
