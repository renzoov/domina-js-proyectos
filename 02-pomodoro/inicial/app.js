// ─────────────────────────────────────────────────────────────
// Temporizador Pomodoro
// Proyecto 2 de domina-js: https://domina-js.pages.dev/proyectos
//
// El código va en el orden en que se construye en la guía.
// Cada parte empieza con «PASO n» y termina con «FIN PASO n».
// Una línea que termina en «// PASO n» se agrega más tarde, en ese paso,
// dentro de código que ya estaba escrito.
// ─────────────────────────────────────────────────────────────


// PASO 1: el estado y los elementos de la página
// Todo lo que el temporizador "sabe" vive en `estado`. Los tiempos van en
// milisegundos, que es como los da Date.now(), y las duraciones de los
// ajustes en minutos, que es como las escribe una persona.

// Tu código va aquí

// FIN PASO 1


// PASO 2: cuánto queda y cómo se escribe
// Si el reloj corre, lo que queda se calcula cada vez a partir de la hora
// de término (en el paso 4 verás por qué así no se atrasa).
// En pantalla va en minutos y segundos, redondeando hacia arriba: con
// 0,4 segundos por delante todavía se ve 0:01, y 0:00 es el final.

// Tu código va aquí

// FIN PASO 2


// PASO 3: la esfera del reloj
// La esfera mide el bloque: una marca por minuto y un número cada 5. Si el
// bloque dura 10 minutos o menos, una marca cada 15 segundos y un número por
// minuto. Las marcas se crean con SVG desde JavaScript porque cambian con la
// duración. El arco rojo es lo que queda, y la aguja marca hasta dónde llegaste.
// En el borde, como en el reloj de la piscina, un punto da la vuelta cada minuto.

// Tu código va aquí

// FIN PASO 3


// PASO 4: contar sin atrasarse
// setInterval no promete puntualidad: cada vuelta puede llegar tarde (si el
// navegador está ocupado o la pestaña está escondida) y, si contáramos
// vueltas, esos retrasos se sumarían. Por eso guardamos la hora de término
// y en cada vuelta solo miramos cuánto falta para esa hora.

// Tu código va aquí

// FIN PASO 4


// PASO 5: la serie del día
// Una serie son `cada` pomodoros, cada uno seguido de un descanso corto,
// salvo el último, que lleva el descanso largo. Al terminar un bloque se
// anota en `hechos` y se pasa al siguiente, que espera a que lo empieces.

// Tu código va aquí

// FIN PASO 5


// PASO 6: saltar, reiniciar y elegir el bloque
// Los tres terminan en irA(): saltar va al siguiente sin anotar nada,
// reiniciar vuelve a empezar el mismo, empezar de nuevo vuelve al primer
// pomodoro de la serie, y las pestañas eligen uno a mano. Ninguno borra
// lo que ya terminaste: eso queda anotado en `hechos`.
// Si ya pasó más de un minuto del bloque, primero se pregunta: una tecla
// apretada sin querer no debería borrar 20 minutos de trabajo.

// Tu código va aquí

// FIN PASO 6


// PASO 7: los atajos de teclado
// Espacio empieza o pausa, S salta y R reinicia. Si el foco está en un
// campo de texto o en un diálogo, las teclas son de ellos (las pestañas son
// radios, pero ahí sí valen los atajos). Si está en un botón
// (queda ahí después de hacerle clic), Espacio lo volvería a pulsar:
// preventDefault() lo evita y Espacio sigue siendo empezar o pausar.

// Tu código va aquí

// FIN PASO 7


// PASO 8: la pestaña escondida
// Con la pestaña escondida, el navegador frena los timers para ahorrar
// batería: un setInterval puede pasar a una vuelta por segundo, o incluso
// por minuto. El tiempo no se atrasa (lo calculamos con la hora de término),
// pero el final sí podría llegar tarde. Por eso, al esconderse, agendamos
// un solo setTimeout justo para la hora de término. Al volver, repintamos.

// Tu código va aquí

// FIN PASO 8


// PASO 9: el aviso al terminar
// Notification muestra un aviso del sistema aunque estés en otra pestaña o
// en otra aplicación. Hay que pedir permiso, y solo se puede pedir cuando
// la persona hace clic: por eso hay un botón. En el teléfono, además, vibra.

// Tu código va aquí

// FIN PASO 9


// PASO 10: el pitido
// Web Audio fabrica sonido con código: un oscilador da la nota y un control
// de volumen (gain) la enciende y la apaga. Los navegadores solo dejan sonar
// audio después de un clic, así que el AudioContext se crea al pulsar
// Empezar y queda listo para cuando el bloque termine.

// Tu código va aquí

// FIN PASO 10


// PASO 11: la pantalla encendida
// Mientras corre un bloque, pedimos que la pantalla no se apague (Wake Lock).
// El navegador suelta ese pedido cuando escondes la pestaña, así que lo
// volvemos a pedir al volver: es la línea que se suma en el paso 8.

// Tu código va aquí

// FIN PASO 11


// PASO 12: guardar y retomar
// localStorage guarda texto entre visitas, así que guardamos el estado como
// JSON cada vez que se pinta. Como lo guardado es la hora de término (y no
// cuánto faltaba), al recargar el reloj sigue donde iba, aunque haya pasado
// un rato. Con lo anotado en `hechos` sale el resumen del día.

// Tu código va aquí

// FIN PASO 12


// PASO 13: ajustes e historial
// Los dos son <dialog>: showModal() los abre encima de todo, con el foco
// adentro, y Escape los cierra. Sus formularios usan method="dialog": al
// enviarlos, el diálogo se cierra solo y returnValue dice con qué botón.

// Tu código va aquí

// FIN PASO 13
