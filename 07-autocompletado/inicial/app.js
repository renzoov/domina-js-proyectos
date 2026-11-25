// ─────────────────────────────────────────────────────────────
// Buscador con autocompletado: Viaja a un artículo
// Proyecto 7 de domina-js: https://domina-js.pages.dev/proyectos
//
// El código va en el orden en que se construye en la guía.
// Cada parte empieza con «PASO n» y termina con «FIN PASO n».
// Una línea que termina en «// PASO n» se agrega más tarde, en ese paso,
// dentro de código que ya estaba escrito.
// ─────────────────────────────────────────────────────────────


// PASO 1: las direcciones de Wikipedia, el estado y los elementos
// Wikipedia tiene dos servicios abiertos y sin clave que permiten CORS:
// uno busca títulos mientras escribes y otro da el resumen de un artículo.

// Tu código va aquí

// FIN PASO 1


// PASO 2: debounce, una función que espera a que dejes de escribir
// Si buscáramos con cada tecla, «machu picchu» serían 12 pedidos a Wikipedia.
// debounce devuelve una función nueva que, cada vez que la llamas, cancela
// la espera anterior y empieza otra. Solo cuando pasan `ms` milisegundos sin
// llamadas, llama a `fn`. La variable `espera` vive en el closure: cada
// función que devuelve debounce tiene la suya, y nadie más la ve.

// Tu código va aquí

// FIN PASO 2


// PASO 3: pedir los resultados a Wikipedia
// La respuesta trae una lista `pages`. De cada página nos quedamos con su
// clave (para pedir el resumen), su título, su descripción y su foto.
// Las fotos llegan de 60 px de ancho y con una dirección que empieza con //:
// fotoDeTamano pide otro tamaño y, con new URL, la completa con https.

// Tu código va aquí

// FIN PASO 3


// PASO 4: buscar mientras escribes, cancelando lo viejo
// Con debounce ya no se pide con cada tecla, pero las respuestas pueden
// llegar desordenadas: la de «li» podría llegar después de la de «lima» y
// pisarla. Por eso, antes de cada búsqueda nueva, se cancela la anterior con
// su AbortController. AbortSignal.any junta esa señal con un límite de tiempo.
// La caché guarda cada búsqueda hecha: si vuelves a escribirla, no se pide.

// Tu código va aquí

// FIN PASO 4


// PASO 5: los billetes, a partir de un <template>
// Cada resultado es un <li role="option"> con su foto, su nombre, su
// descripción y su número en el talón. Mientras se busca, se ven billetes
// de espera. El CSS hace caer cada billete un poco después que el anterior:
// la variable --i dice cuántos van antes.

// Tu código va aquí

// FIN PASO 5


// PASO 6: resaltar lo que coincide, sin importar las tildes
// Wikipedia encuentra «Árbol» aunque escribas «arbol». Para resaltarlo,
// comparamos las dos cosas sin tildes: normalize('NFD') separa cada letra de
// su tilde (á pasa a ser a + ´) y /\p{M}/gu borra las tildes sueltas.
// Al quitar tildes, las posiciones podrían correrse, así que `origen` guarda
// de qué posición del título viene cada letra de la versión sin tildes.
// RegExp.escape (ES2025) convierte lo que escribiste en un patrón seguro:
// sin él, buscar «lima (fruta» rompería la expresión regular por el «(».

// Tu código va aquí

// FIN PASO 6


// PASO 7: el teclado, como un combobox de verdad
// El foco se queda siempre en la caja de texto: así puedes seguir escribiendo.
// Las flechas no mueven el foco, mueven el billete «activo», y la caja avisa
// cuál es con aria-activedescendant (el id del billete). Un lector de
// pantalla lo lee como si el foco estuviera ahí.

// Tu código va aquí

// FIN PASO 7


// PASO 8: elegir un billete y traer su resumen
// El resumen se pide a otro servicio de Wikipedia, con su propia caché y su
// propio AbortController: si eliges otro antes de que llegue, el viejo se
// cancela. La clave del artículo puede tener tildes y paréntesis
// («Lima_(fruta)»), por eso va con encodeURIComponent.
// En la lista, mousedown con preventDefault evita que el clic le quite el
// foco a la caja de texto.

// Tu código va aquí

// FIN PASO 8


// PASO 9: si Wikipedia no responde, avisar y reintentar
// Sin red, fetch rechaza con un TypeError; si se acabó el tiempo, con un
// error de nombre TimeoutError. Si Wikipedia responde mal, es el Error que
// lanzamos al revisar respuesta.ok. Cada caso dice qué pasó, y Reintentar
// vuelve a hacer exactamente lo que falló: la búsqueda o el resumen.

// Tu código va aquí

// FIN PASO 9


// PASO 10: los primeros destinos y el botón de borrar
// Antes de escribir (y cada vez que vacías la caja), la lista no queda
// vacía: muestra algunos destinos con foto. Se piden sus resúmenes todos a la vez con Promise.allSettled, que
// espera a que cada uno termine, bien o mal: si uno falla, los demás igual
// se muestran. Como son resultados normales, se recorren con las flechas y
// se eligen con Enter, igual que una búsqueda.
// El botón de borrar aparece solo cuando hay algo escrito.

// Tu código va aquí

// FIN PASO 10
