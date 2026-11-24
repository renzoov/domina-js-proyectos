// Pruebas de la Tienda pequeña, una por paso.
// Las corre herramientas/proyectos.mjs (en el repositorio de domina-js) con Playwright:
// abre la página con el app.js tal como queda después de cada paso y evalúa cada prueba en ella.
// Una prueba es código que corre en la página y devuelve true si el paso funciona
// (o una promesa que termina en true). Corren en orden, en la misma página.

const esperar = (ms) => `await new Promise((listo) => setTimeout(listo, ${ms}))`;
const escribir = (selector, valor) => `{
  const campo = document.querySelector('${selector}');
  campo.value = ${JSON.stringify(valor)};
  campo.dispatchEvent(new InputEvent('input', { bubbles: true }));
  campo.dispatchEvent(new Event('change', { bubbles: true }));
}`;

export const pruebas = [
  {
    paso: 1,
    que: 'hay 40 productos en 4 secciones, y el estado empieza en el primer pasillo de todo',
    codigo: `PRODUCTOS.length === 40 && Object.keys(SECCIONES).length === 4 && POR_PAGINA === 10
      && estado.seccion === 'todo' && estado.pagina === 1
      && PRODUCTOS.every((p) => p.seccion in SECCIONES && typeof p.precio === 'number')`,
  },
  {
    paso: 2,
    que: 'el tablero muestra los 10 productos del pasillo, con el precio en soles',
    codigo: `(() => {
      const primero = tablero.children.length === 10 && tablero.children[0].querySelector('[data-nombre]').textContent === PRODUCTOS[0].nombre;
      const precio = soles.format(24.9).replace(/\\s/g, ' ') === 'S/ 24.90';
      estado.seccion = 'pinturas';
      const pinturas = totalPasillos() === 1 && productosDelPasillo().every((p) => p.seccion === 'pinturas');
      estado.seccion = 'todo';
      estado.pagina = 4;
      const ultimo = productosDelPasillo().at(-1).id === 'p40' && totalPasillos() === 4;
      estado.pagina = 1;
      return primero && precio && pinturas && ultimo;
    })()`,
  },
  {
    paso: 3,
    que: 'las secciones y los pasillos son enlaces, y un clic cambia el tablero sin recargar',
    codigo: `(() => {
      pintarNavegacion();
      const enlaces = navSecciones.querySelectorAll('a').length === 5 && navPasillos.querySelectorAll('a').length === 4
        && navSecciones.querySelector('[data-seccion="pinturas"]').getAttribute('href') === '?seccion=pinturas';
      navPasillos.querySelectorAll('a')[1].click();
      const segundo = estado.pagina === 2 && tablero.children[0].querySelector('[data-nombre]').textContent === PRODUCTOS[10].nombre
        && navPasillos.querySelectorAll('a')[1].getAttribute('aria-current') === 'page';
      irA('todo', 1);
      return enlaces && segundo;
    })()`,
  },
  {
    paso: 4,
    que: 'la sección y el pasillo van en la URL, y el botón Atrás vuelve al anterior',
    codigo: `(async () => {
      irA('jardin', 1);
      irA('pinturas', 1);
      const escrita = location.search === '?seccion=pinturas';
      history.back();
      ${esperar(150)};
      const atras = estado.seccion === 'jardin' && location.search === '?seccion=jardin' && titulo.textContent === 'Jardín';
      history.replaceState(null, '', '?seccion=toString&pagina=99');
      leerURL();
      const rara = estado.seccion === 'todo' && estado.pagina === 4;
      irA('todo', 1);
      return escrita && atras && rara;
    })()`,
  },
  {
    paso: 5,
    que: 'el carrito es una clase con un Map privado que avisa cada cambio con un evento propio',
    codigo: `(() => {
      const prueba = new Carrito();
      let avisos = 0;
      prueba.addEventListener('cambio', () => avisos++);
      prueba.agregar('p01');
      prueba.agregar('p01');
      prueba.agregar('p05', 3);
      prueba.cambiar('p01', 1);
      const bien = prueba.cantidad === 4 && prueba.total === 68.4 && avisos === 4
        && JSON.stringify(prueba) === '[["p01",1],["p05",3]]' && Object.keys(prueba).length === 0;
      prueba.cambiar('p05', 0);
      return bien && prueba.items.length === 1 && prueba.items[0].producto.nombre === 'Martillo de uña' && prueba instanceof EventTarget;
    })()`,
  },
  {
    paso: 6,
    que: 'al agregar, el contador sube y el producto dice cuántos hay en la caja',
    codigo: `(() => {
      carrito.vaciar();
      tablero.querySelector('[data-agregar]').click();
      const marca = tablero.querySelector('[data-en-caja]');
      const bien = cantidadCaja.textContent === '1' && !marca.hidden && marca.textContent === 'En tu caja: 1'
        && anuncio.textContent.startsWith('Agregaste');
      carrito.vaciar();
      return bien && cantidadCaja.textContent === '0' && marca.hidden;
    })()`,
  },
  {
    paso: 7,
    que: 'la caja lista lo elegido, con más y menos, el total y el botón de pagar',
    codigo: `(() => {
      carrito.vaciar();
      const vaciaAntes = !vacia.hidden && botonPagar.disabled;
      carrito.agregar('p02', 2);
      const lista = listaCaja.children.length === 1 && totalCaja.textContent === soles.format(17) && !botonPagar.disabled;
      listaCaja.querySelector('[data-accion="mas"]').click();
      const tres = carrito.cantidadDe('p02') === 3;
      for (let i = 0; i < 3; i++) listaCaja.querySelector('[data-accion="menos"]').click();
      return vaciaAntes && lista && tres && listaCaja.children.length === 0 && !vacia.hidden && botonPagar.disabled;
    })()`,
  },
  {
    paso: 8,
    que: 'la caja se guarda, y lo que guarda otra pestaña llega con el evento storage',
    codigo: `(() => {
      carrito.vaciar();
      carrito.agregar('p03');
      const guardada = localStorage.getItem('ferreteria:caja') === '[["p03",1]]';
      window.dispatchEvent(new StorageEvent('storage', { key: 'ferreteria:caja', newValue: '[["p04",2],["no-existe",1]]' }));
      const llego = carrito.cantidadDe('p04') === 2 && carrito.cantidad === 2 && contador.classList.contains('cambio');
      const roto = leerGuardado('{roto').length === 0;
      carrito.vaciar();
      return guardada && llego && roto;
    })()`,
  },
  {
    paso: 9,
    que: 'la vista rápida abre un popover con el producto, y desde ahí se agrega',
    codigo: `(() => {
      carrito.vaciar();
      const item = tablero.children[2];
      item.querySelector('[data-ver]').click();
      const abierta = vista.matches(':popover-open') && vista.querySelector('[data-vista-nombre]').textContent === porId.get(item.dataset.id).nombre;
      vista.querySelector('[data-vista-agregar]').click();
      const bien = abierta && !vista.matches(':popover-open') && carrito.cantidadDe(item.dataset.id) === 1;
      carrito.vaciar();
      return bien;
    })()`,
  },
  {
    paso: 10,
    que: 'el formulario de pago dice qué está mal en cada campo, y da formato a la tarjeta',
    codigo: `(() => {
      carrito.agregar('p01');
      botonPagar.click();
      const abierto = dialogo.open;
      formulario.requestSubmit();
      const vacios = [...formulario.querySelectorAll('.error')].filter((e) => e.textContent === 'Falta completar este campo.').length === 5;
      ${escribir('#correo', 'lucia')}
      const correo = document.querySelector('[data-error="correo"]').textContent.startsWith('Escribe un correo');
      ${escribir('#vencimiento', '01/20')}
      const vencida = document.querySelector('[data-error="vencimiento"]').textContent === 'La tarjeta está vencida.';
      ${escribir('#tarjeta', '4111111111111111')}
      const formato = document.querySelector('#tarjeta').value === '4111 1111 1111 1111';
      dialogo.close();
      return abierto && vacios && correo && vencida && formato;
    })()`,
  },
  {
    paso: 11,
    que: 'pagar muestra «Procesando…», avisa si la tarjeta se rechaza y al final confirma y vacía la caja',
    codigo: `(async () => {
      carrito.vaciar();
      carrito.agregar('p01');
      botonPagar.click();
      ${escribir('#nombre', 'Lucía Pérez')}
      ${escribir('#correo', 'lucia@correo.com')}
      ${escribir('#tarjeta', '4111111111110000')}
      ${escribir('#vencimiento', '08/40')}
      ${escribir('#codigo', '123')}
      formulario.requestSubmit();
      const procesa = botonConfirmar.textContent === 'Procesando…' && botonConfirmar.disabled;
      ${esperar(1700)};
      const rechazada = document.querySelector('[data-error="tarjeta"]').textContent.includes('rechazada')
        && formulario.tarjeta.getAttribute('aria-invalid') === 'true' && carrito.cantidad === 1;
      ${escribir('#tarjeta', '4111111111111111')}
      formulario.requestSubmit();
      ${esperar(1700)};
      const listo = !confirmado.hidden && formulario.hidden && carrito.cantidad === 0
        && confirmado.textContent.includes('lucia@correo.com');
      dialogo.close();
      return procesa && rechazada && listo;
    })()`,
  },
];
