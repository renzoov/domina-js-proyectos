// Pruebas de zona-toasts, una por paso.
// Las corre herramientas/proyectos.mjs (en el repositorio de domina-js) con Playwright:
// sirve la página por http (los módulos no cargan con file://) con el zona-toasts.js tal como
// queda después de cada paso, y evalúa cada prueba en ella.
// Como el archivo es un módulo, lo de adentro no es global: cada prueba lo importa con import(),
// y solo ve lo que el archivo exporta. Corren en orden, en la misma página.

const lib = "const m = await import('./zona-toasts.js');";
const espera = (ms) => `await new Promise((listo) => setTimeout(listo, ${ms}))`;

/** Espera hasta que la condición se cumpla (o pase el tiempo) */
const esperarHasta = (condicion, ms = 4000) => `await (async () => {
  const fin = Date.now() + ${ms};
  while (!(${condicion}) && Date.now() < fin) await new Promise((listo) => setTimeout(listo, 50));
})()`;

/** Una promesa que gana si termina antes que ms; si no, da 'sin respuesta' */
const conLimite = (promesa, ms) => `Promise.race([${promesa}, new Promise((listo) => setTimeout(() => listo('sin respuesta'), ${ms}))])`;

export const pruebas = [
  {
    paso: 1,
    que: 'html`` escapa los valores de afuera, pero no lo que ya es html``',
    codigo: `(async () => {
      ${lib}
      const malo = String(m.html(['<b>', '</b>'], '<img src=x onerror=alert(1)>'));
      const anidado = String(m.html(['<p>', '</p>'], m.html(['<i>', '</i>'], 'Lima & Cusco')));
      const lista = String(m.html(['<ul>', '</ul>'], ['a', 'b'].map((x) => m.html(['<li>', '</li>'], x))));
      return malo === '<b>&lt;img src=x onerror=alert(1)&gt;</b>'
        && anidado === '<p><i>Lima &amp; Cusco</i></p>'
        && lista === '<ul><li>a</li><li>b</li></ul>'
        && String(m.html(['<p>', '</p>'], false)) === '<p></p>';
    })()`,
  },
  {
    paso: 2,
    que: 'crearAviso arma el aviso con su tipo, su rol, los botones de acción y la X',
    codigo: `(async () => {
      ${lib}
      const error = m.crearAviso({ tipo: 'error', titulo: '<script>', texto: 'Revisa', acciones: ['Reintentar', 'Ignorar'] });
      const foto = m.crearAviso({ titulo: 'Cusco', foto: 'fotos/cusco.jpg' });
      const botones = [...error.querySelectorAll('[data-accion]')].map((b) => b.dataset.accion);
      return error.matches('div.aviso.error') && error.getAttribute('role') === 'alert'
        && error.querySelector('.titulo').textContent === '<script>' && !error.querySelector('script')
        && botones.join() === 'Reintentar,Ignorar,cerrado'
        && foto.getAttribute('role') === 'status' && foto.querySelector('img.foto') !== null && error.id !== foto.id;
    })()`,
  },
  {
    paso: 3,
    que: 'abrirAviso lo pone en la lista y su promesa se cumple con el botón que se tocó',
    codigo: `(async () => {
      ${lib}
      const lista = document.createElement('div');
      document.body.append(lista);
      const aviso = m.abrirAviso(lista, { titulo: 'Hola', acciones: ['Ver'], duracion: 0 });
      const adentro = lista.contains(aviso.elemento);
      aviso.elemento.querySelector('[data-accion="Ver"]').click();
      const respuesta = await ${conLimite('aviso.promesa', 2000)};
      const otro = m.abrirAviso(lista, { titulo: 'Chau', duracion: 0 });
      otro.elemento.querySelector('.cerrar').click();
      const cerrado = await ${conLimite('otro.promesa', 2000)};
      lista.remove();
      return adentro && respuesta === 'Ver' && cerrado === 'cerrado' && !lista.contains(aviso.elemento);
    })()`,
  },
  {
    paso: 4,
    que: 'el aviso se cierra solo con el tiempo, y no mientras el mouse está encima',
    codigo: `(async () => {
      ${lib}
      const lista = document.createElement('div');
      document.body.append(lista);
      const rapido = m.abrirAviso(lista, { titulo: 'Rápido', duracion: 300 });
      const tiempo = await ${conLimite('rapido.promesa', 2000)};
      const quieto = m.abrirAviso(lista, { titulo: 'Quieto', duracion: 300 });
      quieto.elemento.dispatchEvent(new PointerEvent('pointerenter'));
      ${espera(600)};
      const sigue = !quieto.cerrado;
      quieto.elemento.dispatchEvent(new PointerEvent('pointerleave'));
      const despues = await ${conLimite('quieto.promesa', 2000)};
      lista.remove();
      return tiempo === 'tiempo' && sigue && despues === 'tiempo';
    })()`,
  },
  {
    paso: 5,
    que: 'los avisos entran y salen con Web Animations, y salir() espera a que termine',
    codigo: `(async () => {
      ${lib}
      const lista = document.createElement('div');
      document.body.append(lista);
      const aviso = m.abrirAviso(lista, { titulo: 'Anima', duracion: 0 });
      const entra = aviso.elemento.getAnimations().length > 0;
      const antes = performance.now();
      await m.salir(aviso.elemento);
      const tardo = performance.now() - antes;
      lista.remove();
      return typeof m.entrar === 'function' && entra && tardo > 150;
    })()`,
  },
  {
    paso: 6,
    que: 'arrastrar un aviso más de la mitad lo cierra; menos, lo devuelve a su lugar',
    codigo: `(async () => {
      ${lib}
      const lista = document.createElement('div');
      lista.style.cssText = 'position:fixed;left:0;top:0;width:300px;list-style:none;margin:0;padding:0';
      document.body.append(lista);
      const aviso = m.abrirAviso(lista, { titulo: 'Desliza', duracion: 0 });
      const el = aviso.elemento;
      const tocar = (tipo, x) => el.dispatchEvent(new PointerEvent(tipo, { clientX: x, pointerId: 7, button: 0, bubbles: true }));
      tocar('pointerdown', 10); tocar('pointermove', 60); tocar('pointerup', 60);
      const vuelve = !aviso.cerrado;
      tocar('pointerdown', 10); tocar('pointermove', 260); tocar('pointerup', 260);
      const respuesta = await ${conLimite('aviso.promesa', 2000)};
      lista.remove();
      return vuelve && respuesta === 'cerrado';
    })()`,
  },
  {
    paso: 7,
    que: '<zona-toasts> muestra como mucho «maximo» avisos; los demás esperan y salen al cerrar uno',
    codigo: `(async () => {
      ${lib}
      const zona = document.createElement('zona-toasts');
      zona.maximo = 2;
      document.body.append(zona);
      const cambios = [];
      zona.addEventListener('cambio', (e) => cambios.push(e.detail.esperando.length));
      const promesas = ['uno', 'dos', 'tres'].map((titulo) => zona.mostrar({ titulo, duracion: 0 }));
      const visibles = () => zona.shadowRoot.querySelectorAll('.aviso').length;
      const dos = visibles() === 2 && cambios.at(-1) === 1;
      zona.shadowRoot.querySelector('.cerrar').click();
      const primera = await ${conLimite('promesas[0]', 2000)};
      ${esperarHasta("zona.shadowRoot.querySelector('.titulo')?.textContent === 'dos' && zona.shadowRoot.querySelectorAll('.titulo')[1]?.textContent === 'tres'")};
      const avanzo = [...zona.shadowRoot.querySelectorAll('.titulo')].map((t) => t.textContent).join() === 'dos,tres';
      zona.remove();
      return customElements.get('zona-toasts') === m.ZonaToasts && zona.shadowRoot !== null
        && dos && primera === 'cerrado' && avanzo && cambios.at(-1) === 0;
    })()`,
  },
  {
    paso: 8,
    que: 'el módulo exporta toasts (también por defecto), y toasts.mostrar usa el <zona-toasts> de la página',
    codigo: `(async () => {
      ${lib}
      const zona = document.querySelector('zona-toasts');
      zona.maximo = 20;
      const promesa = m.toasts.exito('Prueba del paso 8', { duracion: 0, acciones: ['Listo'] });
      ${esperarHasta("[...document.querySelector('zona-toasts').shadowRoot.querySelectorAll('.titulo')].some((t) => t.textContent === 'Prueba del paso 8')")};
      const aviso = [...zona.shadowRoot.querySelectorAll('.aviso')].find((a) => a.querySelector('.titulo').textContent === 'Prueba del paso 8');
      const bien = aviso?.classList.contains('exito');
      aviso?.querySelector('[data-accion="Listo"]').click();
      const respuesta = await ${conLimite('promesa', 2000)};
      return m.default === m.toasts && typeof m.toasts.error === 'function' && bien && respuesta === 'Listo';
    })()`,
  },
  {
    paso: 9,
    que: 'Escape cierra el aviso más nuevo',
    codigo: `(async () => {
      ${lib}
      const zona = document.querySelector('zona-toasts');
      zona.maximo = 20;
      const promesa = m.toasts.mostrar({ titulo: 'Prueba del paso 9', duracion: 0 });
      ${esperarHasta("[...document.querySelector('zona-toasts').shadowRoot.querySelectorAll('.titulo')].some((t) => t.textContent === 'Prueba del paso 9')")};
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      const respuesta = await ${conLimite('promesa', 2000)};
      return respuesta === 'cerrado';
    })()`,
  },
  {
    paso: 10,
    que: 'toasts.cargando muestra el aviso de carga y, al terminar la promesa, el mismo aviso pasa a éxito',
    codigo: `(async () => {
      ${lib}
      const zona = document.querySelector('zona-toasts');
      zona.maximo = 20;
      let cumplir;
      const trabajo = new Promise((listo) => { cumplir = listo; });
      const promesa = m.toasts.cargando(trabajo, {
        cargando: { titulo: 'Subiendo (paso 10)' },
        exito: (n) => ({ titulo: n + ' fotos subidas (paso 10)', duracion: 0 }),
        error: { titulo: 'Falló (paso 10)' },
      });
      ${esperarHasta("[...document.querySelector('zona-toasts').shadowRoot.querySelectorAll('.titulo')].some((t) => t.textContent === 'Subiendo (paso 10)')")};
      const aviso = [...zona.shadowRoot.querySelectorAll('.aviso')].find((a) => a.querySelector('.titulo').textContent === 'Subiendo (paso 10)');
      const carga = aviso?.classList.contains('cargando');
      cumplir(3);
      ${esperarHasta("document.querySelector('zona-toasts').shadowRoot.querySelector('.aviso.exito .titulo')?.textContent === '3 fotos subidas (paso 10)'")};
      const mismo = aviso.classList.contains('exito') && aviso.querySelector('.titulo').textContent === '3 fotos subidas (paso 10)';
      aviso.querySelector('.cerrar').click();
      const respuesta = await ${conLimite('promesa', 2000)};
      return carga && mismo && respuesta === 'cerrado';
    })()`,
  },
];
