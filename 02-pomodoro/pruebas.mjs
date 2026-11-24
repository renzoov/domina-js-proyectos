// Pruebas del Temporizador Pomodoro, una por paso.
// Las corre herramientas/proyectos.mjs (en el repositorio de domina-js) con Playwright:
// abre la página con el app.js tal como queda después de cada paso y evalúa cada prueba en ella.
// Una prueba es código que corre en la página y devuelve true si el paso funciona
// (o una promesa que termina en true). Corren en orden, en la misma página.

const tecla = (code) => `document.body.dispatchEvent(new KeyboardEvent('keydown', { code: '${code}', bubbles: true }))`;
const esperar = (ms) => `await new Promise((listo) => setTimeout(listo, ${ms}))`;

export const pruebas = [
  {
    paso: 1,
    que: 'el estado empieza en el primer pomodoro de trabajo, de 25 minutos',
    codigo: `estado.bloque === 'trabajo' && estado.numero === 1 && estado.restante === 25 * MINUTO
      && radiosBloque.length === 3 && botonPrincipal instanceof HTMLButtonElement && arco instanceof SVGElement`,
  },
  {
    paso: 2,
    que: 'el tiempo se escribe en minutos y segundos, y va en el título de la pestaña',
    codigo: `formatear(25 * MINUTO) === '25:00' && formatear(60400) === '1:01' && formatear(0) === '0:00'
      && document.title === '25:00 · Trabajo'`,
  },
  {
    paso: 3,
    que: 'la esfera tiene una marca por minuto del bloque y el arco lleno',
    codigo: `marcas.querySelectorAll('line').length === 25 && numeros.querySelectorAll('text').length === 4
      && arco.style.strokeDasharray.startsWith('100')`,
  },
  {
    paso: 4,
    que: 'empezar y pausar guardan lo que queda, calculado con la hora de término',
    codigo: `(() => {
      empezar();
      const corria = estado.corriendo && textoPrincipal.textContent === 'Pausar';
      estado.terminaEn = Date.now() + 90500;
      pausar();
      return corria && !estado.corriendo && Math.abs(estado.restante - 90500) < 300 && tiempo.textContent === '1:31';
    })()`,
  },
  {
    paso: 5,
    que: 'al terminar un pomodoro se anota y sigue el descanso corto',
    codigo: `(() => {
      estado.bloque = 'trabajo';
      estado.numero = 1;
      estado.corriendo = true;
      estado.terminaEn = Date.now();
      terminarBloque();
      return estado.bloque === 'corto' && estado.hechos.length === 1 && serie().length === 8
        && listaSerie.querySelectorAll('li').length === 8 && listaSerie.querySelector('[data-actual]') !== null;
    })()`,
  },
  {
    paso: 6,
    que: 'la pestaña «Descanso largo» lo elige, saltar vuelve al primer pomodoro y «Empezar de nuevo» también',
    codigo: `(() => {
      document.querySelector('input[name="bloque"][value="largo"]').click();
      const largo = estado.bloque === 'largo' && tiempo.textContent === '15:00';
      botonSaltar.click();
      const saltado = estado.bloque === 'trabajo' && estado.numero === 1 && botonNuevaSerie.disabled;
      irA({ bloque: 'corto', numero: 3 });
      const habilitado = !botonNuevaSerie.disabled;
      botonNuevaSerie.click();
      return largo && saltado && habilitado && estado.bloque === 'trabajo' && estado.numero === 1 && botonNuevaSerie.disabled;
    })()`,
  },
  {
    paso: 7,
    que: 'Espacio empieza y R reinicia',
    codigo: `(() => {
      ${tecla('Space')};
      const corria = estado.corriendo;
      ${tecla('KeyR')};
      return corria && !estado.corriendo && tiempo.textContent === '25:00';
    })()`,
  },
  {
    paso: 8,
    que: 'con la pestaña escondida, se agenda un setTimeout para el final',
    codigo: `(() => {
      empezar();
      Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
      document.dispatchEvent(new Event('visibilitychange'));
      const agendado = typeof alarma === 'number' && alarma > 0;
      delete document.hidden;
      document.dispatchEvent(new Event('visibilitychange'));
      pausar();
      return agendado;
    })()`,
  },
  {
    paso: 9,
    que: 'al terminar llega un aviso del sistema',
    codigo: `(() => {
      window.Notification = class { static permission = 'granted'; constructor(titulo) { window.avisoRecibido = titulo; } };
      avisar();
      return String(window.avisoRecibido).startsWith('Terminó: ');
    })()`,
  },
  {
    paso: 10,
    que: 'el sonido se prepara al empezar y el pitido no falla',
    codigo: `(() => {
      empezar();
      pausar();
      pitar();
      return audio instanceof AudioContext;
    })()`,
  },
  {
    paso: 11,
    que: 'mientras corre, se pide que la pantalla no se apague',
    codigo: `(async () => {
      Object.defineProperty(navigator, 'wakeLock', { configurable: true, value: {
        request: async () => ({ release: async () => {}, addEventListener() {} }),
      } });
      empezar();
      ${esperar(50)};
      const encendida = textoPantalla.hidden === false;
      pausar();
      return encendida && textoPantalla.hidden === true;
    })()`,
  },
  {
    paso: 12,
    que: 'el estado se guarda en localStorage y el resumen cuenta los pomodoros de hoy',
    codigo: `(() => {
      pintar();
      const guardado = JSON.parse(localStorage.getItem('pomodoro:v1'));
      return guardado.bloque === estado.bloque && guardado.hechos.length === estado.hechos.length
        && document.querySelector('[data-hoy]').textContent === String(trabajoDe(new Date()).length)
        && document.querySelector('[data-hoy]').textContent !== '0';
    })()`,
  },
  {
    paso: 13,
    que: 'en Ajustes se cambia la duración del trabajo, y el historial muestra 7 días',
    codigo: `(async () => {
      document.querySelector('input[name="bloque"][value="trabajo"]').click();
      document.querySelector('[data-abrir-ajustes]').click();
      const form = document.querySelector('[data-dialogo-ajustes] form');
      form.elements.trabajo.value = 30;
      form.querySelector('[value="guardar"]').click();
      ${esperar(50)};
      const ajustado = estado.ajustes.trabajo === 30 && tiempo.textContent === '30:00';
      document.querySelector('[data-abrir-historial]').click();
      const dias = document.querySelectorAll('[data-dias] li').length === 7;
      document.querySelector('[data-dialogo-historial]').close();
      return ajustado && dias;
    })()`,
  },
];
