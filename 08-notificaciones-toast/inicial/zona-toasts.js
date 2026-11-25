// ─────────────────────────────────────────────────────────────
// zona-toasts: una librería de avisos que se reutiliza
// Proyecto 8 de domina-js: https://domina-js.pages.dev/proyectos
//
// Este archivo es un módulo: lo que lleva «export» se puede importar desde
// otros archivos (la demo, o cualquier otro proyecto). Lo demás queda adentro.
//
// El código va en el orden en que se construye en la guía.
// Cada parte empieza con «PASO n» y termina con «FIN PASO n».
// Una línea que termina en «// PASO n» se agrega más tarde, en ese paso,
// dentro de código que ya estaba escrito.
// ─────────────────────────────────────────────────────────────


// PASO 1: html``, una etiqueta que escapa lo que viene de afuera
// Los avisos se arman con HTML, y su texto puede venir de cualquier lado: algo
// que escribió una persona o la respuesta de un servidor. Si llega «<img src=x
// onerror=...>» y lo pegamos tal cual, el navegador lo ejecuta.
// Una template tag recibe por separado las partes fijas (que escribimos
// nosotros) y los valores (que vienen de afuera), así puede escapar solo los
// valores. Devuelve un HTMLSeguro: si lo pones dentro de otro html``, ya no se
// vuelve a escapar.

// Tu código va aquí

// FIN PASO 1


// PASO 2: el HTML de un aviso
// crearAviso arma el <div> de un aviso con html``: la foto o el ícono de su
// tipo, el título, el texto, los botones de acción, la X para cerrar y la barra
// del tiempo. Cada botón lleva su respuesta en data-accion.
// Un error se anuncia con role="alert" (el lector de pantalla interrumpe); los
// demás, con role="status" (lo lee cuando termina lo que estaba leyendo).

// Tu código va aquí

// FIN PASO 2


// PASO 3: abrir un aviso y esperar la respuesta
// abrirAviso pone el aviso en la lista y devuelve un objeto con el elemento,
// cerrar() y una promesa que se cumple cuando el aviso se cierra, con lo que
// eligió la persona («Ver fotos», «cerrado»…).
// Promise.withResolvers (ES2024) entrega la promesa y su resolve por separado:
// así cerrar() puede cumplirla desde afuera, cuando sea que ocurra.

// Tu código va aquí

// FIN PASO 3


// PASO 4: el tiempo, que se detiene si lo estás mirando
// La barra de abajo se achica con animate(), y esa misma animación es el reloj:
// cuando termina (finished), el aviso se cierra. Pausar la animación pausa el
// reloj, así que no hay que llevar la cuenta de cuánto falta.
// Se pausa con el mouse encima o con el foco adentro (alguien está leyendo o
// va a tocar un botón), y sigue al salir. duracion: 0 = no se cierra solo.

// Tu código va aquí

// FIN PASO 4


// PASO 5: entrar y salir con Web Animations
// Al entrar, el aviso baja un poco y aparece. Al salir, se va hacia la derecha
// y su alto baja a cero, para que los de abajo suban suave en vez de saltar.
// salir() devuelve la promesa de la animación: cerrar() la espera antes de
// quitar el elemento. Si la persona pidió menos movimiento, no se anima.

// Tu código va aquí

// FIN PASO 5


// PASO 6: deslizar para cerrar, con el dedo o con el mouse
// Pointer Events tratan igual al dedo, al mouse y al lápiz. Al apretar,
// setPointerCapture hace que el aviso siga recibiendo el movimiento aunque el
// puntero se salga de él. Mientras arrastras, el aviso sigue al puntero (solo
// hacia la derecha) y se desvanece. Si lo sueltas pasada la mitad, se cierra;
// si no, vuelve a su lugar. Los botones siguen funcionando con un clic.

// Tu código va aquí

// FIN PASO 6


// PASO 7: <zona-toasts>, un elemento propio con su cola
// Un Web Component es una clase que extiende HTMLElement y se registra con un
// nombre (con guion). Su Shadow DOM es un HTML privado: los estilos de la
// página no entran y los de la librería no salen. Los estilos de los avisos
// están en zona-toasts.css, al lado de este archivo: import.meta.url es la
// dirección de este módulo, y con ella armamos la del CSS.
// La cola: se ven como mucho `maximo` avisos; los demás esperan en orden y
// salen cuando se cierra uno. Cada cambio se avisa con un evento propio,
// «cambio», para que la página pueda mostrar la cola.

// Tu código va aquí

// FIN PASO 7


// PASO 8: la puerta de entrada: export const toasts
// Quien use la librería no tiene que buscar el elemento: importa toasts y
// llama a toasts.mostrar(...). Si la página no tiene un <zona-toasts>, se crea
// uno al final del <body>. exito() y error() son atajos.
// También se exporta por defecto: import toasts from './zona-toasts.js'.

// Tu código va aquí

// FIN PASO 8


// PASO 9: Escape cierra el último aviso
// Con el teclado no hay que perseguir la X: Escape cierra el aviso más nuevo.
// Si otra parte de la página ya usó el Escape (un diálogo abierto, por
// ejemplo, que llama a preventDefault), el aviso no se entera.

// Tu código va aquí

// FIN PASO 9


// PASO 10: un aviso que espera: cargando, y después éxito o error
// toasts.cargando(tarea, textos) muestra un aviso que no se cierra solo
// mientras la tarea está pendiente. Cuando termina, el mismo aviso cambia en
// su lugar: a éxito con el valor, o a error con el motivo. Los textos de
// éxito y error pueden ser funciones que reciben ese valor.
// La tarea puede ser una promesa o una función que la devuelve: con una
// función, el trabajo empieza recién cuando el aviso sale de la cola.

// Tu código va aquí

// FIN PASO 10
