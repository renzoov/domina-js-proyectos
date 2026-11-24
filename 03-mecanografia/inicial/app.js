// ─────────────────────────────────────────────────────────────
// Reto de mecanografía
// Proyecto 3 de domina-js: https://domina-js.pages.dev/proyectos
//
// El código va en el orden en que se construye en la guía.
// Cada parte empieza con «PASO n» y termina con «FIN PASO n».
// Una línea que termina en «// PASO n» se agrega más tarde, en ese paso,
// dentro de código que ya estaba escrito.
// ─────────────────────────────────────────────────────────────


// PASO 1: los textos, el estado y los elementos de la página
// Los textos son frases en español con tildes, ñ, ü y signos de apertura.
// Todo lo que el reto "sabe" vive en `estado`.

// Tu código va aquí

// FIN PASO 1


// PASO 2: partir el texto en letras de verdad
// Para una persona, «é» es una letra, pero puede llegar como un solo
// carácter (U+00E9) o como dos: «e» más la tilde suelta (U+0301).
// normalize('NFC') junta las dos formas en una, e Intl.Segmenter parte el
// texto en grafemas, que son las letras tal como las vemos.

// Tu código va aquí

// FIN PASO 2


// PASO 3: escribir y comparar
// La persona escribe en un <input> invisible que está encima del cartel.
// Se escucha el evento `input` y no `keydown`: con una tecla muerta, la
// tilde y la «e» son dos teclas pero una sola letra, y `input` llega
// cuando la letra ya está armada.

// Tu código va aquí

// FIN PASO 3


// PASO 4: el reloj
// El reloj arranca con la primera letra. performance.now() mide en
// milisegundos con decimales desde que se abrió la página, y no cambia si
// alguien mueve la hora del sistema. requestAnimationFrame llama a `tic`
// antes de cada cuadro, unas 60 veces por segundo.

// Tu código va aquí

// FIN PASO 4


// PASO 5: palabras por minuto y precisión
// Una "palabra" mide 5 letras, contando espacios y signos: así un texto con
// palabras largas no sale más lento que uno con palabras cortas.
// - ppm: las letras que están bien ahora mismo, entre 5, por minuto.
// - precisión: de todas las letras que se escribieron (aunque después se
//   borraran), qué parte estaba bien.

// Tu código va aquí

// FIN PASO 5


// PASO 6: el cartel sube de renglón
// Se ven tres renglones. Cuando el cursor llega al tercero, todo el texto
// sube uno, para que el renglón que escribes quede siempre en el medio.
// offsetTop dice a qué altura está el <span> del cursor dentro del texto.

// Tu código va aquí

// FIN PASO 6


// PASO 7: el teclado
// - Esc empieza de nuevo con el mismo texto; Enter, al terminar, trae otro.
// - Las flechas no mueven el cursor: se escribe siempre al final.
// - getModifierState('CapsLock') dice si Bloq Mayús está activado.
// - Si pulsas una letra fuera del cartel, el foco salta al cartel y la
//   letra se escribe ahí, sin tener que hacer clic.

// Tu código va aquí

// FIN PASO 7


// PASO 8: qué tipo de error fue
// Con expresiones regulares se ve si el error fue solo de tilde: se separa
// la letra de sus marcas (NFD) y se borran las marcas con \p{M}, la clase
// Unicode de los acentos, la virgulilla de la ñ y la diéresis.
// Un Map cuenta cuántas veces fallaste cada letra.

// Tu código va aquí

// FIN PASO 8


// PASO 9: el resultado
// Al terminar el tiempo, el mismo cartel muestra cómo te fue.
// La región aria-live lo lee en voz alta a quien usa lector de pantalla.

// Tu código va aquí

// FIN PASO 9


// PASO 10: la gráfica del ritmo, en SVG
// Cada segundo se toma una muestra: las ppm hasta ese momento y cuántos
// errores hubo en ese segundo. Al final se dibuja una línea con las ppm y un
// punto rojo en cada segundo con errores. Los elementos SVG se crean con
// createElementNS, porque viven en otro espacio de nombres que el HTML.

// Tu código va aquí

// FIN PASO 10


// PASO 11: los récords
// Se guardan en localStorage los 5 mejores de cada duración, junto con la
// duración elegida. JSON.stringify los convierte en texto para guardarlos y
// JSON.parse los recupera.

// Tu código va aquí

// FIN PASO 11
