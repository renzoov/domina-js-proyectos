// ─────────────────────────────────────────────────────────────
// Relojes del mundo
// Proyecto 4 de domina-js: https://domina-js.pages.dev/proyectos
//
// El código va en el orden en que se construye en la guía.
// Cada parte empieza con «PASO n» y termina con «FIN PASO n».
// Una línea que termina en «// PASO n» se agrega más tarde, en ese paso,
// dentro de código que ya estaba escrito.
// ─────────────────────────────────────────────────────────────


// PASO 1: las ciudades, el estado y los elementos de la página
// Cada ciudad tiene un nombre en español, su zona horaria (como la escribe
// la base de datos de zonas que usan todos los sistemas: "America/Lima") y
// el código de su país, que Intl traduce al español en el paso 4.

// Tu código va aquí

// FIN PASO 1


// PASO 2: la hora en una zona
// horaEn(zona, instante) dice qué hora es en una zona en un instante (en ms,
// como Date.now()): la hora, los minutos, la fecha y el desfase, que es
// cuántos minutos está adelantada o atrasada respecto de UTC.
// Con Temporal es directo. Si el navegador todavía no lo tiene, el plan B
// arma lo mismo con Intl.DateTimeFormat y Date.

// Tu código va aquí

// FIN PASO 2


// PASO 3: la diferencia, el día y la noche
// La diferencia entre dos ciudades es la resta de sus desfases. Hay zonas
// con medias horas y cuartos de hora: Nueva Delhi va 5 h 30 min por
// delante de UTC, y Katmandú, 5 h 45 min.
// Las fechas "AAAA-MM-DD" se pueden comparar como texto: "2026-11-25" > "2026-11-24".

// Tu código va aquí

// FIN PASO 3


// PASO 4: el tablero
// Cada fila sale de la plantilla <template> del HTML: se copia con
// cloneNode(true) y se llena. Intl.DisplayNames traduce el código del país
// al español: "PE" da "Perú".

// Tu código va aquí

// FIN PASO 4


// PASO 5: las paletas
// La hora va en cinco paletas: cuatro cifras y los dos puntos. Cuando una
// cifra cambia, su paleta gira: media vuelta hacia abajo con animate(),
// cambia la cifra y termina de girar. animate() devuelve una animación, y
// su propiedad finished es una promesa que se cumple cuando termina.

// Tu código va aquí

// FIN PASO 5


// PASO 6: el reloj chico
// Las agujas son <line> que salen del centro (50, 50) hacia arriba, y se
// giran con el atributo transform="rotate(grados 50 50)".
// La hora local, en ms, es el instante más el desfase. De ahí salen los
// minutos del día (de 0 a 1440, con decimales):
// - el horario da una vuelta cada 12 horas (720 minutos);
// - el minutero, una cada hora;
// - el segundero, una cada minuto.

// Tu código va aquí

// FIN PASO 6


// PASO 7: el latido
// requestAnimationFrame llama a latir() antes de cada cuadro. En cada uno
// se mueven las agujas, y solo cuando cambia el minuto se vuelven a pintar
// las horas (y giran las paletas).
// Un detalle: todos los desfases son minutos enteros, así que los segundos
// son los mismos en todo el mundo. Las agujas se calculan con el desfase
// que quedó guardado en cada fila, sin volver a preguntarle a Intl.

// Tu código va aquí

// FIN PASO 7


// PASO 8: buscar y agregar una ciudad
// Intl.supportedValuesOf('timeZone') da todas las zonas que conoce el
// navegador (más de 400). Se busca primero en la lista de ciudades y
// después en las zonas, sin importar las tildes ni las mayúsculas.

// Tu código va aquí

// FIN PASO 8


// PASO 9: quitar, la referencia y el formato
// Los botones de las filas se escuchan todos juntos en la lista
// (delegación de eventos): closest() dice qué botón se tocó y en qué fila.

// Tu código va aquí

// FIN PASO 9


// PASO 10: arrastrar para cambiar el orden
// Cada fila tiene draggable="true". Mientras se arrastra, dragover dice
// sobre qué fila está el puntero, y si está en su mitad de arriba o de
// abajo: ahí se dibuja la línea amarilla. Al soltar, la ciudad cambia de
// lugar en estado.ciudades y el tablero se vuelve a pintar.

// Tu código va aquí

// FIN PASO 10


// PASO 11: mover con el teclado
// Arrastrar no funciona con el teclado ni con un lector de pantalla. Por
// eso la manija es un botón: con el foco en ella, las flechas suben y
// bajan la ciudad, y la región aria-live dice en qué lugar quedó.

// Tu código va aquí

// FIN PASO 11


// PASO 12: guardar y recordar
// Se guardan las ciudades, cuál es la referencia (su lugar en la lista) y
// el formato. Al volver, si una zona guardada no existe en este navegador,
// horaEn lanza un RangeError: esa ciudad se descarta.

// Tu código va aquí

// FIN PASO 12
