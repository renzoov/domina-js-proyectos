// ─────────────────────────────────────────────────────────────
// Explorador con scroll infinito: Mi sala
// Proyecto 6 de domina-js: https://domina-js.pages.dev/proyectos
//
// El código va en el orden en que se construye en la guía.
// Cada parte empieza con «PASO n» y termina con «FIN PASO n».
// Una línea que termina en «// PASO n» se agrega más tarde, en ese paso,
// dentro de código que ya estaba escrito.
// ─────────────────────────────────────────────────────────────


// PASO 1: la API, el estado y los elementos de la página
// Las obras vienen de la API abierta del Cleveland Museum of Art. No pide clave
// y permite CORS, así que fetch funciona desde cualquier página, incluso con
// doble clic en index.html. Pedimos de a 12 pinturas (limit) y vamos corriendo
// el punto de partida (skip) en cada tanda.

// Tu código va aquí

// FIN PASO 1


// PASO 2: pedir una tanda de obras
// URLSearchParams arma la dirección con cada parámetro bien escrito.
// fetch solo rechaza la promesa cuando no hay red: un 404 o un 500 llegan como
// una respuesta normal, por eso se revisa respuesta.ok. AbortSignal.timeout
// corta la espera si el museo tarda más de 15 segundos.

// Tu código va aquí

// FIN PASO 2


// PASO 3: los datos de cada obra, ordenados y guardados en un Map
// La API manda mucho más de lo que mostramos, con nombres en inglés.
// aObra se queda solo con lo que usamos. El Map es la caché: guarda cada obra
// por su id, para abrir su ficha o colgarla sin volver a pedirla.

// Tu código va aquí

// FIN PASO 3


// PASO 4: la tarjeta de cada obra, a partir de un <template>
// El HTML de la tarjeta ya está en la página, dentro de <template>.
// Lo copiamos con cloneNode y llenamos los datos con textContent, que nunca
// interpreta HTML. La imagen lleva loading="lazy": el navegador la descarga
// recién cuando se acerca a la pantalla. Con width y height, el lugar de la
// imagen queda reservado antes de que llegue y la lista no salta.

// Tu código va aquí

// FIN PASO 4


// PASO 5: cargar la siguiente tanda
// Mientras la tanda viaja, se ven dos tarjetas de espera (esqueletos).
// estado.cargando evita pedir la misma tanda dos veces si cargarMas se llama
// otra vez antes de que llegue la respuesta.

// Tu código va aquí

// FIN PASO 5


// PASO 6: el scroll infinito, con IntersectionObserver
// El centinela es un <div> vacío al final de la lista. El observador avisa
// cuando entra en pantalla (o le faltan 800 px para entrar, por rootMargin),
// y ahí pedimos la siguiente tanda. Es mucho más liviano que escuchar el
// evento scroll, que se dispara decenas de veces por segundo.

// Tu código va aquí

// FIN PASO 6


// PASO 7: si la tanda falla, avisar y reintentar
// Sin red, fetch rechaza con un TypeError; si se acaba el tiempo, con un
// TimeoutError. Si el museo responde mal, es el Error que lanzamos en el PASO 2.
// Mientras haya un error, cargarMas no pide nada: así el scroll no insiste
// solo. El botón Reintentar borra el error y vuelve a pedir la misma tanda.

// Tu código va aquí

// FIN PASO 7


// PASO 8: la ficha de una obra, en un <dialog>
// showModal abre el diálogo encima de todo: el resto de la página queda
// inerte, Escape lo cierra y, al cerrarse, el foco vuelve al botón que lo
// abrió. Un clic en el fondo oscuro (fuera de la ficha) también lo cierra.
// La lista usa delegación: un solo oyente atiende los clics de todas las
// tarjetas, también de las que todavía no existen.

// Tu código va aquí

// FIN PASO 8


// PASO 9: la sala: colgar y descolgar
// sala guarda los ids de las obras colgadas, en el orden de los lugares.
// Cada lugar de la pared es un <g> del SVG, inclinado con una matriz para que
// quede en el plano de su pared. Para colgar una obra se le agregan un clavo,
// el hilo, el marco y la imagen, todos creados con createElementNS: los
// elementos SVG necesitan su propio espacio de nombres.

// Tu código va aquí

// FIN PASO 9


// PASO 10: el cuadro se asienta en la pared
// animate() (Web Animations) mueve el cuadro sin CSS extra: cae un poco,
// rebota y se queda quieto, girando desde el clavo (transform-origin arriba).
// Si la persona pidió menos movimiento en su sistema, no se anima.

// Tu código va aquí

// FIN PASO 10


// PASO 11: guardar la sala y volver a colgarla al abrir
// En localStorage guardamos solo los ids: ocupan poco y los datos de cada obra
// se piden frescos al museo. Al abrir la página se piden todas a la vez, y
// Promise.allSettled espera a que cada una termine, bien o mal: si una falla,
// las demás igual se cuelgan. Las que fallaron quedan pendientes, se siguen
// guardando y se pueden volver a pedir con Reintentar.

// Tu código va aquí

// FIN PASO 11
