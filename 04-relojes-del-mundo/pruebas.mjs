// Pruebas de Relojes del mundo, una por paso.
// Las corre herramientas/proyectos.mjs (en el repositorio de domina-js) con Playwright:
// abre la página con el app.js tal como queda después de cada paso y evalúa cada prueba en ella.
// Una prueba es código que corre en la página y devuelve true si el paso funciona
// (o una promesa que termina en true). Corren en orden, en la misma página.

const esperar = (ms) => `await new Promise((listo) => setTimeout(listo, ${ms}))`;
// Martes 24 de noviembre de 2026, 15:42 UTC
const INSTANTE = 'Date.UTC(2026, 10, 24, 15, 42)';

export const pruebas = [
  {
    paso: 1,
    que: 'hay ciudades con su zona, y la primera vez el tablero empieza con la tuya de referencia',
    codigo: `(() => {
      const conocida = ciudadDeZona('America/Lima').nombre === 'Lima';
      const nueva = ciudadDeZona('America/Argentina/Jujuy').nombre === 'Jujuy';
      ciudadesIniciales();
      return CIUDADES.length >= 40 && estado.formato === 24 && conocida && nueva
        && estado.ciudades.length >= 5 && estado.referencia === estado.ciudades[0];
    })()`,
  },
  {
    paso: 2,
    que: 'horaEn da la hora, la fecha y el desfase de una zona, con Temporal y con el plan B',
    codigo: `(() => {
      const lima = horaEn('America/Lima', ${INSTANTE});
      const tokio = horaEn('Asia/Tokyo', ${INSTANTE});
      const katmandu = horaConDate('Asia/Kathmandu', ${INSTANTE});
      return lima.hora === 10 && lima.minuto === 42 && lima.fecha === '2026-11-24' && lima.desfase === -300
        && tokio.fecha === '2026-11-25' && tokio.hora === 0 && katmandu.desfase === 345
        && JSON.stringify(horaConDate('America/Lima', ${INSTANTE})) === JSON.stringify(lima);
    })()`,
  },
  {
    paso: 3,
    que: 'la diferencia se escribe con horas y minutos, y se sabe si es hoy, ayer o mañana',
    codigo: `textoDiferencia(-60) === '−1 h' && textoDiferencia(345) === '+5 h 45 min' && textoDiferencia(30) === '+30 min'
      && textoDiferencia(0) === 'misma hora'
      && textoDia('2026-11-25', '2026-11-24') === 'mañana' && textoDia('2026-11-23', '2026-11-24') === 'ayer'
      && esDeDia(6) && !esDeDia(18)`,
  },
  {
    paso: 4,
    que: 'el tablero tiene una fila por ciudad, con el país en español y la referencia marcada',
    codigo: `(() => {
      pintarTablero();
      const primera = filas.children[0];
      return filas.children.length > 0 && filas.children.length === estado.ciudades.length
        && primera.classList.contains('es-referencia') && primera.querySelector('[data-dif]').textContent === '—'
        && nombrePais({ pais: 'PE', zona: 'America/Lima' }) === 'Perú' && fecha.textContent.endsWith('UTC')
        && /^\\d\\d:\\d\\d$/.test(primera.querySelector('[data-hora-texto]').textContent);
    })()`,
  },
  {
    paso: 5,
    que: 'la hora va en cinco paletas, y la que cambia gira hasta la cifra nueva',
    codigo: `(async () => {
      const fila = filas.children[0];
      const cinco = fila.querySelectorAll('.paleta').length === 5;
      ponerCifras(fila, '12:34');
      ${esperar(450)};
      return cinco && [...fila.querySelectorAll('.paleta')].map((p) => p.textContent).join('') === '12:34';
    })()`,
  },
  {
    paso: 6,
    que: 'las agujas del reloj chico marcan la hora local',
    codigo: `(() => {
      const fila = filas.children[0];
      pintarReloj(fila, Date.UTC(2026, 10, 24, 15, 0), -300);
      return fila.querySelector('[data-horario]').getAttribute('transform') === 'rotate(300.00 50 50)'
        && fila.querySelector('[data-minutero]').getAttribute('transform') === 'rotate(0.00 50 50)';
    })()`,
  },
  {
    paso: 7,
    que: 'el segundero avanza solo, en cada cuadro',
    codigo: `(async () => {
      pintarTablero();
      const aguja = filas.children[0].querySelector('[data-segundero]');
      ${esperar(100)};
      const antes = aguja.getAttribute('transform');
      ${esperar(400)};
      return filas.children[0].dataset.desfase !== undefined && antes !== aguja.getAttribute('transform');
    })()`,
  },
  {
    paso: 8,
    que: 'se busca sin importar las tildes, también entre las zonas, y la primera se agrega con el botón',
    codigo: `(() => {
      const bogota = buscarCiudades('bogo')[0]?.nombre === 'Bogotá';
      const jujuy = buscarCiudades('jujuy').some((c) => c.nombre === 'Jujuy');
      const antes = estado.ciudades.length;
      buscar.value = 'katmandu';
      buscar.dispatchEvent(new Event('input'));
      botonAgregar.click();
      return bogota && jujuy && estado.ciudades.length === antes + 1 && estado.ciudades.at(-1).nombre === 'Katmandú'
        && filas.children.length === antes + 1 && buscar.value === '';
    })()`,
  },
  {
    paso: 9,
    que: 'se quita una ciudad, se elige otra de referencia y se cambia a 12 horas',
    codigo: `(() => {
      const antes = estado.ciudades.length;
      filas.lastElementChild.querySelector('[data-quitar]').click();
      const quitada = estado.ciudades.length === antes - 1;
      filas.children[1].querySelector('[data-ciudad]').click();
      const referencia = estado.referencia === estado.ciudades[1] && filas.children[1].classList.contains('es-referencia');
      document.querySelector('input[name="formato"][value="12"]').click();
      const doce = / [ap]\\. m\\.$/.test(filas.children[0].querySelector('[data-hora-texto]').textContent);
      document.querySelector('input[name="formato"][value="24"]').click();
      filas.children[0].querySelector('[data-ciudad]').click();
      return quitada && referencia && doce && estado.formato === 24;
    })()`,
  },
  {
    paso: 10,
    que: 'una fila arrastrada y soltada debajo de otra cambia de lugar',
    codigo: `(() => {
      const nombres = () => estado.ciudades.map((c) => c.nombre);
      const [a, b, c] = nombres();
      const datos = new DataTransfer();
      filas.children[0].dispatchEvent(new DragEvent('dragstart', { dataTransfer: datos, bubbles: true }));
      const destino = filas.children[2];
      const caja = destino.getBoundingClientRect();
      destino.dispatchEvent(new DragEvent('dragover', { dataTransfer: datos, bubbles: true, cancelable: true, clientY: caja.bottom - 5 }));
      destino.dispatchEvent(new DragEvent('drop', { dataTransfer: datos, bubbles: true, cancelable: true, clientY: caja.bottom - 5 }));
      filas.dispatchEvent(new DragEvent('dragend', { bubbles: true }));
      const [x, y, z] = nombres();
      return x === b && y === c && z === a;
    })()`,
  },
  {
    paso: 11,
    que: 'con el foco en la manija, la flecha hacia arriba sube la ciudad y se anuncia su lugar',
    codigo: `(() => {
      const segunda = estado.ciudades[1].nombre;
      const manija = filas.children[1].querySelector('[data-manija]');
      manija.focus();
      manija.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      return estado.ciudades[0].nombre === segunda && document.activeElement === filas.children[0].querySelector('[data-manija]')
        && anuncio.textContent.startsWith(segunda + ', lugar 1 de ');
    })()`,
  },
  {
    paso: 12,
    que: 'las ciudades, la referencia y el formato se guardan, y se recuperan sin las zonas que no existen',
    codigo: `(() => {
      usarDeReferencia(1);
      const guardado = JSON.parse(localStorage.getItem('relojes:v1'));
      const bien = guardado.ciudades.length === estado.ciudades.length && guardado.referencia === 1 && guardado.formato === 24;
      localStorage.setItem('relojes:v1', JSON.stringify({
        ciudades: [{ nombre: 'Lima', zona: 'America/Lima', pais: 'PE' }, { nombre: 'Nada', zona: 'Marte/Olimpo', pais: '' }],
        referencia: 0, formato: 12,
      }));
      cargar();
      return bien && estado.ciudades.length === 1 && estado.referencia.nombre === 'Lima' && estado.formato === 12;
    })()`,
  },
];
