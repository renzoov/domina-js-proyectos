// ─────────────────────────────────────────────────────────────
// Tienda pequeña: Ferretería Don Lucho
// Proyecto 5 de domina-js: https://domina-js.pages.dev/proyectos
//
// El código va en el orden en que se construye en la guía.
// Cada parte empieza con «PASO n» y termina con «FIN PASO n».
// Una línea que termina en «// PASO n» se agrega más tarde, en ese paso,
// dentro de código que ya estaba escrito.
// ─────────────────────────────────────────────────────────────


// PASO 1: los productos, el estado y los elementos de la página
// Cada producto tiene un id, su nombre, su sección, su precio en soles, el
// dibujo que lo representa (un <symbol> del HTML), el color de ese dibujo y
// una descripción corta para la vista rápida.

// Tu código va aquí

// FIN PASO 1


// PASO 2: el tablero
// Los productos del pasillo actual: los de la sección, del 1 al 10, del 11
// al 20… Cada uno sale de la plantilla <template>. El precio se escribe con
// Intl.NumberFormat, que sabe cómo se escriben los soles: "S/ 24.90".

// Tu código va aquí

// FIN PASO 2


// PASO 3: secciones y pasillos
// Los enlaces de las secciones y de los pasillos son <a> de verdad, con su
// dirección (?seccion=pinturas&pagina=2): se pueden abrir en otra pestaña.
// Pero un clic normal no recarga la página: se cancela con preventDefault()
// y solo se cambia el estado y se vuelve a pintar.

// Tu código va aquí

// FIN PASO 3


// PASO 4: la dirección de la página
// La sección y el pasillo viven en la URL. Al abrir, se leen con
// URLSearchParams. Al cambiar, history.pushState escribe la dirección nueva
// sin recargar. Y al usar Atrás o Adelante, llega el evento popstate: se
// vuelve a leer la URL y se pinta lo que dice.

// Tu código va aquí

// FIN PASO 4


// PASO 5: el carrito, una clase
// El carrito guarda cuántas unidades hay de cada producto en un Map (id →
// cantidad). Ese Map es un campo privado (#items): desde afuera no se puede
// tocar, solo usar los métodos. La clase extiende EventTarget, así que el
// carrito puede lanzar su propio evento, «cambio», cada vez que algo cambia,
// y el resto de la página lo escucha como escucha un clic.

// Tu código va aquí

// FIN PASO 5


// PASO 6: agregar y el contador
// Al tocar «Agregar», el producto va al carrito. El carrito avisa con su
// evento «cambio», y quien lo escucha pinta el contador de la barra y la
// marca «En tu caja» de cada producto. El producto se balancea en su gancho.

// Tu código va aquí

// FIN PASO 6


// PASO 7: la caja
// La caja muestra lo elegido, con botones para sumar o restar una unidad, el
// total y el botón de pagar. Como se vuelve a pintar entera en cada cambio,
// después de tocar − o + el foco se devuelve al mismo botón.

// Tu código va aquí

// FIN PASO 7


// PASO 8: guardar la caja y compartirla entre pestañas
// Cada cambio se guarda en localStorage. Cuando otra pestaña de la misma
// tienda guarda, a esta le llega el evento «storage» con el valor nuevo:
// se lo pasa al carrito, que avisa su «cambio», y todo se vuelve a pintar.

// Tu código va aquí

// FIN PASO 8


// PASO 9: la vista rápida
// Un popover es un elemento que aparece encima de todo y se cierra solo con
// Escape o tocando afuera. Este se llena con el producto que tocaste y se
// abre con showPopover().

// Tu código va aquí

// FIN PASO 9


// PASO 10: el formulario de pago
// El formulario tiene novalidate: el navegador no muestra sus globos de
// error, pero sigue revisando cada campo (required, type="email", pattern…).
// Con campo.validity se sabe qué falla, y el mensaje se escribe debajo del
// campo, en español y con la solución.

// Tu código va aquí

// FIN PASO 10


// PASO 11: pagar
// El pago es de prueba: procesarPago devuelve una promesa que se cumple a
// los 1,5 segundos con un número de pedido, o se rechaza si la tarjeta
// termina en 0000. Con async y await, el código espera sin congelar la
// página, y mientras tanto el botón dice «Procesando…».

// Tu código va aquí

// FIN PASO 11
