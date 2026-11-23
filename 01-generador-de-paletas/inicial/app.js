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

// Tu código va aquí

// FIN PASO 1


// PASO 2: de hex a RGB y a HSL, y de vuelta
// Un color se puede escribir de varias formas. Usamos tres:
//   hex  "E7C56A"                    → como lo escribimos en CSS
//   rgb  { r: 231, g: 197, b: 106 }  → cuánto rojo, verde y azul (0 a 255)
//   hsl  { h: 44, s: 72, l: 66 }     → tono (0 a 360°), saturación y luz (0 a 100 %)
// HSL es el que mejor se lleva con las armonías: girar el tono es sumar grados.

// Tu código va aquí

// FIN PASO 2


// PASO 3: el contraste, como lo mide la WCAG
// La WCAG (las pautas de accesibilidad de la web) compara la "luminancia"
// de dos colores: cuánta luz llega al ojo. El resultado va de 1:1 (iguales)
// a 21:1 (negro sobre blanco). Para leer texto normal hace falta 4,5:1 (AA);
// 7:1 es AAA, y 3:1 alcanza solo para texto grande.

// Tu código va aquí

// FIN PASO 3


// PASO 4: pintar la paleta
// Una sola función pone en la página todo lo que dice el estado.
// La llamamos cada vez que el estado cambia.

// Tu código va aquí

// FIN PASO 4


// PASO 5: generar colores que combinan
// Una armonía es una regla para elegir tonos en el círculo cromático.
// Partimos de un tono base y giramos: +180° es el opuesto, +120° el
// siguiente de un triángulo, ±20° los vecinos. La luz (l) va de oscuro a
// claro para que la paleta tenga de dónde sacar fondo y texto.

// Tu código va aquí

// FIN PASO 5


// PASO 6: la barra espaciadora y el botón «Generar»

// Tu código va aquí

// FIN PASO 6


// PASO 7: fijar los colores que te gustan
// Un color fijado no cambia al generar. Usamos delegación de eventos:
// un solo listener en la mesa atiende los cinco botones.

// Tu código va aquí

// FIN PASO 7


// PASO 8: deshacer y rehacer
// Dos pilas (arrays): antes de cada cambio guardamos la paleta en «atras».
// Deshacer saca la última de «atras» y guarda la actual en «adelante».

// Tu código va aquí

// FIN PASO 8


// PASO 9: copiar con un clic, y avisar
// navigator.clipboard es asíncrono: devuelve una promesa.

// Tu código va aquí

// FIN PASO 9


// PASO 10: la paleta vive en la dirección
// Así, si recargas o compartes el enlace, aparece la misma paleta:
//   index.html?c=1e3a4c-2f7f7a-e7c56a-f2994a-d2553f&a=analoga
// replaceState cambia la dirección sin recargar ni sumar entradas al historial.

// Tu código va aquí

// FIN PASO 10


// PASO 11: exportar las variables CSS
// Un <dialog> con showModal() ya trae lo difícil: atrapa el foco,
// se cierra con Escape y oscurece el fondo con ::backdrop.

// Tu código va aquí

// FIN PASO 11


// PASO 12: una paleta sacada de tu foto
// Dibujamos la imagen, pequeña, en un <canvas> y leemos sus píxeles con
// getImageData. Después agrupamos los colores parecidos (k-medias) y nos
// quedamos con los grupos más grandes: los colores que más se ven.

// Tu código va aquí

// FIN PASO 12


// PASO 13: el toque final, el abanico
// Al cambiar, los chips se abren como un muestrario y se asientan.
// Web Animations API: element.animate(fotogramas, opciones).

// Tu código va aquí

// FIN PASO 13
