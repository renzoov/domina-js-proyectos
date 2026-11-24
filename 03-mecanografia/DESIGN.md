---
name: Reto de mecanografía
description: Un rótulo de neón en una pared oscura; cada letra que escribes bien se enciende cálida dentro del cartel de tubo rosa.
colors:
  pared: "#141016"
  resplandor: "#2a1c2c"
  fondo-cartel: "#1b131d"
  rosa: "#ff4fb0"
  cian: "#53f2e6"
  encendida: "#fff2c7"
  ambar: "rgba(255, 214, 107, 0.85)"
  error: "#ff3b3b"
  apagada: "#8f7a8d"
  texto: "#f7e9f2"
  rotulo: "#a88fa6"
typography:
  nombre:
    fontFamily: "Monoton, Kanit, sans-serif"
    fontSize: "clamp(24px, 2.4vw, 34px)"
    fontWeight: 400
    lineHeight: 1
  resultado:
    fontFamily: "Kanit, system-ui, sans-serif"
    fontSize: "clamp(56px, 5.4vw, 76px)"
    fontWeight: 600
    lineHeight: 1
    fontFeature: "tnum"
  cifra:
    fontFamily: "Kanit, system-ui, sans-serif"
    fontSize: "clamp(36px, 3.6vw, 52px)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0"
    fontFeature: "tnum"
  texto:
    fontFamily: "Kanit, system-ui, sans-serif"
    fontSize: "clamp(22px, 2.4vw, 34px)"
    fontWeight: 300
    lineHeight: 1.6
  dato:
    fontFamily: "Kanit, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 600
    lineHeight: 1.1
    fontFeature: "tnum"
  titulo:
    fontFamily: "Kanit, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.16em"
  cuerpo:
    fontFamily: "Kanit, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 300
    lineHeight: 1.5
  tubo:
    fontFamily: "Kanit, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1
  rotulo:
    fontFamily: "Kanit, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 300
    lineHeight: 1.3
    letterSpacing: "0.14em"
rounded:
  cartel: "28px"
  cartel-telefono: "22px"
  tubo: "24px"
  letra: "8px"
  tecla: "6px"
  espacio: "4px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "44px"
components:
  tubo:
    backgroundColor: "transparent"
    textColor: "{colors.cian}"
    typography: "{typography.tubo}"
    rounded: "{rounded.tubo}"
    padding: "8px 20px"
    height: "44px"
  tubo-lleno:
    backgroundColor: "{colors.cian}"
    textColor: "{colors.pared}"
    typography: "{typography.tubo}"
    rounded: "{rounded.tubo}"
    padding: "8px 20px"
    height: "44px"
  pastilla:
    backgroundColor: "transparent"
    textColor: "{colors.cian}"
    typography: "{typography.tubo}"
    rounded: "{rounded.tubo}"
    padding: "8px 20px"
    height: "44px"
  pastilla-elegida:
    backgroundColor: "{colors.cian}"
    textColor: "{colors.pared}"
  cartel:
    backgroundColor: "{colors.fondo-cartel}"
    textColor: "{colors.apagada}"
    typography: "{typography.texto}"
    rounded: "{rounded.cartel}"
    padding: "clamp(36px, 3.5vw, 50px) clamp(22px, 4.2vw, 60px) clamp(30px, 3vw, 44px)"
    width: "min(1000px, 100%)"
  dialogo:
    backgroundColor: "{colors.fondo-cartel}"
    textColor: "{colors.texto}"
    rounded: "{rounded.cartel}"
    padding: "40px clamp(20px, 4vw, 44px) 32px"
    width: "min(760px, calc(100% - 32px))"
  letra-fallada:
    backgroundColor: "transparent"
    textColor: "{colors.texto}"
    rounded: "{rounded.letra}"
    padding: "0 0.3em"
---

# Design System: Reto de mecanografía

## Overview

**Creative North Star: "El rótulo de neón que se enciende letra por letra"**

Escribir es encender un cartel. El texto vive dentro de un tubo rosa colgado en una pared oscura: antes de escribirlo está apagado (un tubo sin corriente, que se lee pero no brilla); cada letra escrita bien se enciende en un blanco cálido con halo ámbar, y el error parpadea y queda rojo. El nombre, «Mecanografía», es un segundo tubo, cian, montado sobre el borde superior del cartel. Las cuatro cifras de la prueba (quedan, palabras por minuto, precisión, récord) están clavadas en las esquinas de la pared como letreros chicos.

El sistema es una pared y tres tubos. La pared (`pared`, con un resplandor radial `resplandor` al centro) no brilla: aloja rótulos chicos y cifras. Lo que brilla es tubo, y cada tubo tiene un trabajo: el rosa es el cartel (y el título del diálogo de récords), el cian es lo que se toca (nombre, cursor, pastillas, botones, la línea del ritmo, el foco), el cálido es lo escrito bien, el rojo es el error. El brillo es el material, no un adorno: un elemento que no es tubo no lleva halo. La tipografía es Kanit para todo, ligera (300) para leer y escribir, 600 para las cifras; Monoton aparece una sola vez, en el nombre.

Se niega al campo gris monoespaciado de la categoría (Monkeytype, 10FastFingers), donde el texto es una caja de formulario. Es un producto aparte, con su propio mundo: no usa el pizarrón del curso ni los mundos de los proyectos 1 y 2. Se abre con doble clic (file://), sin librerías, con las fuentes en `fuentes/`.

**Key Characteristics:**
- Pared casi negra con un resplandor ciruela al centro; nunca un fondo claro.
- Un cartel de tubo rosa (3px, radio 28px, halo rosa) con el texto dentro, en tres renglones que suben a medida que escribes.
- Letras en tres estados: apagada, encendida con halo ámbar, error rojo que parpadea.
- Cian para todo lo que se toca: pastillas y botones en tubo de 2px, cursor, foco.
- Cuatro cifras en las esquinas, con rótulo en mayúsculas espaciadas y cifra 600 tabular con halo rosa.
- El resultado aparece dentro del mismo cartel; no hay otra pantalla.

## Colors

Una pared oscura de ciruela y cuatro colores de tubo, cada uno con un solo trabajo.

### Primary
- **Tubo rosa** (`rosa`): el borde de 3px del cartel con su halo, el resplandor del brillo de las cifras de las esquinas (`text-shadow` rosa al 50 %), el título del diálogo de récords, las reglas de 2px sobre los datos del resultado (al 45 %) y la selección de texto (al 45 %).

### Secondary
- **Tubo cian** (`cian`): todo lo que se toca o señala dónde estás: el nombre en Monoton, el subrayado de 3px del cursor, las pastillas de duración y los botones (borde y texto; relleno en el elegido y en la acción principal), el borde del diálogo, la línea de la gráfica del ritmo, «Récord nuevo» y la cifra del récord cuando acaba de batirse, el aviso de foco perdido y el anillo de foco de 2px.

### Tertiary
- **Letra encendida** (`encendida`) con **Halo ámbar** (`ambar`): cada letra escrita bien, la gran cifra de palabras por minuto del resultado y las cifras de la tabla de récords. Es el único color cálido del sistema.
- **Error** (`error`): la letra fallada (con su propio halo y un fondo rojo al 28 % cuando lo fallado es un espacio), los puntos de la gráfica, el borde de las letras más falladas y el aviso de Bloq Mayús.

### Neutral
- **Pared** (`pared`): el fondo de todo; también `theme-color`.
- **Resplandor** (`resplandor`): el centro del degradado radial de la pared (elipse en 50 % 45 %, se funde con la pared al 70 %), fijo al desplazar.
- **Fondo del cartel** (`fondo-cartel`): el relleno opaco del cartel y del diálogo, y la franja que tapa el tubo rosa detrás del nombre.
- **Letra apagada** (`apagada`): el texto aún sin escribir, y las cifras de las esquinas cuando la prueba terminó (o el récord está vacío). Es el tubo sin corriente: se lee (4.5:1 sobre el cartel) pero no brilla.
- **Texto de la pared** (`texto`): las cifras de las esquinas, los datos del resultado, las letras falladas.
- **Rótulo** (`rotulo`): rótulos chicos en mayúsculas, la ayuda bajo el cartel, los ejes y el pie de la gráfica, los detalles de los récords. Sus versiones translúcidas son las reglas finas: al 22 % las guías de la gráfica, al 25 % los separadores de la tabla de récords.

### Named Rules
**The Todo Lo Que Brilla Es Tubo Rule.** El halo (`text-shadow`, `box-shadow` o `drop-shadow` de color) es el material del tubo y solo lo llevan el cartel, los tubos cian, las letras encendidas o falladas y las cifras. La pared, los rótulos y la ayuda no brillan.

**The Un Color Un Trabajo Rule.** Rosa es el cartel; cian, lo que se toca y dónde estás; cálido, lo escrito bien; rojo, el error. Un color no cambia de trabajo: un botón nunca es rosa, un error nunca es cian.

## Typography

**Display Font:** Monoton (con Kanit), solo para el nombre
**Body Font:** Kanit 300/400/600 (con system-ui)

**Character:** Kanit es redonda y geométrica, como letra de rótulo; ligera (300) es la voz del texto que se escribe y de la ayuda, y en 600 hace las cifras. Monoton, de líneas paralelas, es el tubo doblado del nombre y no se usa para nada más. Toda cifra que cambia o se compara va con `tabular-nums`.

### Hierarchy
- **Nombre** (Monoton 400, clamp(24px, 2.4vw, 34px), 1): «Mecanografía», en cian con halo, montado sobre el borde superior del cartel.
- **Resultado** (600, clamp(56px, 5.4vw, 76px), 1): las palabras por minuto al terminar, en `encendida` con halo ámbar; 56px en pantallas de escritorio bajas.
- **Cifra** (600, clamp(36px, 3.6vw, 52px), 1): las cuatro cifras de las esquinas; 34px en teléfono.
- **Texto** (300, clamp(22px, 2.4vw, 34px), renglón 1.6em): el texto del cartel, tres renglones visibles.
- **Dato** (600, 28px, 1.1): los cuatro datos del resultado (22px en pantallas bajas) y las cifras de la tabla de récords.
- **Título** (600, 22px, 1, tracking 0.16em, mayúsculas): título del diálogo de récords, en rosa con halo. «Récord nuevo» usa el mismo estilo en cian.
- **Cuerpo** (300, 18px, 1.5): texto base y «Las que más fallaste»; la ayuda bajo el cartel a 16px.
- **Tubo** (400, 16px, 1): pastillas y botones.
- **Rótulo** (300, 14px, 1.3, tracking 0.14em, mayúsculas): el nombre de cada cifra de las esquinas y las columnas de récords (400). Los rótulos de los datos del resultado van a 13px y 0.12em.

### Named Rules
**The Monoton Una Vez Rule.** Monoton es el nombre y nada más. Todo lo demás es Kanit; la jerarquía se gana con peso (300 a 600), tamaño y brillo.

**The Cifras Tabulares Rule.** Toda cifra que cambia mientras se mira (reloj, palabras por minuto, precisión, récord, datos, ejes de la gráfica) va con `tabular-nums`.

## Layout

La página es la pared: una rejilla de tres columnas (`1fr auto 1fr`) y tres filas a toda la altura (`100svh`). Arriba, «Quedan» a la izquierda y «Palabras por minuto» a la derecha; en el medio, el cartel de lado a lado; abajo, «Precisión» a la izquierda, las pastillas al centro y «Récord» a la derecha, alineados al pie. Las cifras de la derecha se alinean a la derecha. Margen de clamp(24px, 3.4vw, 48px) × clamp(20px, 3.9vw, 56px), 20px entre filas. El cartel se centra, hasta 1000px de ancho, con 28px arriba (lugar para el nombre) y 44px abajo (lugar para la ayuda, que va fuera del tubo, 14px por debajo). El texto se ve por una ventana de tres renglones; el renglón que escribes queda en el medio. Ritmo: 8 / 12 / 16 / 24 / 44px.

Comportamiento por ancho y alto:
- **Hasta 760px (teléfono):** dos columnas; las cuatro cifras forman una franja de dos por dos arriba (34px), el cartel ocupa todo el ancho (radio 22px, 64px abajo para la ayuda en dos líneas), las pastillas van al pie con 8px entre ellas y 14px a los lados. Los datos del resultado pasan a dos columnas y la tabla de récords a una.
- **Escritorio bajo (desde 761px de ancho y hasta 820px de alto):** todo se aprieta para que el resultado quepa sin desplazarse: 12px entre filas, cartel con 28px/22px de relleno vertical, resultado de 56px, datos de 22px y gráfica de 96 unidades de alto en vez de 130.
- **Pantalla táctil (`hover: none` y `pointer: coarse`):** se ocultan las teclas `kbd` y las frases que solo sirven con teclado.

**The El Cartel Manda Rule.** El cartel es lo primero que se ve y lo único que crece; las cifras van a las esquinas, lejos de él, y el resultado se muestra dentro del mismo cartel, sin cambiar de pantalla ni empujarlo fuera de la ventana.

## Elevation & Depth

No hay sombras de profundidad: la profundidad es luz. El cartel y el diálogo no flotan sobre la pared, se encienden: un halo exterior y otro interior del color de su tubo, más un resplandor amplio y tenue en el cartel. Las letras, las cifras y los tubos cian brillan con `text-shadow` o `box-shadow` de su propio color, sin desplazamiento. La pared se ilumina desde el centro con su degradado radial. El fondo del diálogo es pared al 78 % (`rgba(10, 7, 11, 0.78)`).

### Shadow Vocabulary
- **Halo rosa** (`box-shadow: 0 0 26px rgba(255, 79, 176, 0.55), inset 0 0 26px rgba(255, 79, 176, 0.25)`): el tubo del cartel; se suma `0 0 140px rgba(255, 79, 176, 0.1)` como luz sobre la pared.
- **Halo cian** (`box-shadow: 0 0 16px rgba(83, 242, 230, 0.75)`): pastilla elegida, tubo lleno, tubo al pasar el mouse, récord nuevo.
- **Halo del diálogo** (`box-shadow: 0 0 26px rgba(83, 242, 230, 0.4), inset 0 0 22px rgba(83, 242, 230, 0.15)`): el tubo cian del diálogo de récords.
- **Brillo de letra** (`text-shadow: 0 0 10px` ámbar en lo encendido, `0 0 12px` rojo en el error, `0 0 18px` rosa al 50 % en las cifras de las esquinas, `0 0 22px` ámbar en la cifra del resultado).

### Named Rules
**The Luz No Sombra Rule.** Ningún halo se desplaza: todo es `0 0 Npx` del color del tubo. Una sombra negra desplazada no existe en esta pared.

## Shapes

Todo es tubo doblado: esquinas redondeadas y líneas de 2 a 3px. El cartel y el diálogo son rectángulos de radio 28px con borde de 3px (22px de radio en teléfono). Las pastillas y botones son píldoras de radio 24px con borde de 2px. Las letras más falladas van en un recuadro de radio 8px con borde rojo de 2px; las teclas `kbd`, en un recuadro de radio 6px con borde de 1px del color del texto; el espacio fallado, en un fondo rojo de radio 4px. Las reglas que separan (sobre los datos del resultado, entre los récords, las guías de la gráfica) son rectas, finas y translúcidas. La línea del ritmo es un trazo de 3px con extremos y uniones redondos. El cursor es un subrayado de 3px, no una barra vertical.

## Components

### Buttons (tubos)
Píldoras de tubo cian que se encienden al tocarlas.
- **Shape:** radio 24px, borde 2px `cian`, al menos 44px de alto, 8px × 20px de relleno (14px a los lados en teléfono), 10px entre texto y tecla.
- **Tubo:** transparente, texto `cian`. Hover: se enciende el halo cian. Activo: baja 1px.
- **Tubo lleno:** relleno `cian` con texto `pared` y halo cian; es la acción principal («Otro texto»), una por superficie.
- **Con tecla:** la tecla del atajo va dentro del botón en un `kbd` de radio 6px y borde del color del texto («Otro texto Enter», «Repetir el mismo Esc»).
- **Foco:** anillo `cian` de 2px separado 4px.
- **Transición:** fondo, color y halo en 160ms con `cubic-bezier(0.16, 1, 0.3, 1)`.

### Pastillas de duración
Tres radios (30 s, 60 s, 120 s) dibujados como tubos, seguidos del tubo «Récords», centrados al pie con 10px entre ellos. La elegida está llena de cian con halo; las otras, solo el tubo. El radio real es invisible y cubre la pastilla; el foco del radio se dibuja en la pastilla. Se marca con `:has(input:checked)` además del selector de hermano.

### El cartel (signature)
El tubo rosa con el texto dentro.
- **Tubo:** borde `rosa` de 3px, radio 28px, relleno `fondo-cartel`, halo rosa. Cursor de texto.
- **Nombre:** «Mecanografía» en Monoton cian, centrado y subido sobre el borde (traslado de −55 %), con una franja de `fondo-cartel` que tapa solo el tubo detrás de las letras.
- **Texto:** Kanit 300, tres renglones visibles; el bloque sube un renglón (220ms) cuando el cursor llega al tercero. Las palabras no se parten.
- **Letras:** apagada (`apagada`); encendida (`encendida` con halo ámbar); error (`error` con halo rojo, parpadeo de 260ms en pasos, y fondo rojo al 28 % si es un espacio); cursor (letra blanca con subrayado cian de 3px que titila cada 1.1s solo mientras está en pausa, y se queda fijo mientras escribes). Color y halo cambian en 120ms.
- **Sin foco:** el texto baja al 15 % con desenfoque de 3px y aparece, en cian con halo, «Haz clic aquí para seguir escribiendo».
- **Avisos:** bajo el tubo, centrados: la ayuda en `rotulo` (se oculta al empezar) y el aviso de Bloq Mayús en `error`, en el mismo lugar.

### El resultado
Aparece dentro del mismo cartel, en una rejilla con 18px entre partes.
- **Cabeza:** la cifra de palabras por minuto (Resultado) y, a la derecha, «Récord nuevo» o «Primer récord» en cian.
- **Datos:** cuatro columnas (dos en teléfono), cada una con una regla rosa de 2px al 45 % arriba, rótulo de 13px y dato de 28px.
- **Gráfica del ritmo:** SVG del ancho real de la caja, 130 unidades de alto (96 en pantallas bajas); guías `rotulo` al 22 %, ejes de 12px tabulares, línea cian de 3px con brillo, un punto rojo por segundo con errores (radio 3 + errores, hasta 7). Pie de 14px en `rotulo`.
- **Pie:** «Las que más fallaste» con hasta tres letras en recuadros rojos, y a la derecha los dos tubos.

### Cifras de las esquinas
Rótulo en mayúsculas espaciadas (`rotulo`) y debajo la cifra (`texto`, 600, halo rosa). Al terminar la prueba, las tres cifras de la prueba se apagan a `apagada` sin halo, y el récord se queda: en cian con halo y parpadeo de arranque si es nuevo, apagado y con «—» si aún no hay.

### Diálogo de récords
`<dialog>` modal hasta 760px: tubo cian de 3px, radio 28px, relleno `fondo-cartel`, halo del diálogo. Título en rosa. Tres columnas (una en teléfono) con 24px entre ellas: cada una con su rótulo y hasta cinco récords, separados por reglas `rotulo` al 25 %: la cifra en `encendida` de 28px y a su lado «ppm · precisión» y la fecha en 14px. Columna vacía: «Todavía no hay récords.». El tubo «Cerrar» va a la derecha.

### Motion
- **Arranque del tubo:** al cargar, el cartel (1000ms) y el nombre (1000ms, 250ms después) parpadean como un tubo que duda dos veces antes de quedarse prendido (`arrancar`, opacidad en pasos 0.15 / 1 / 0.3 / 1 / 0.55 / 1). La misma animación enciende el diálogo (700ms), «Récord nuevo» (900ms) y la cifra del récord nuevo (900ms). Una vez por aparición, nunca en bucle.
- **Chispa:** el error parpadea en 260ms en pasos y queda rojo.
- **Cursor:** titila cada 1.1s en pasos mientras espera; quieto mientras escribes.
- **Renglón:** el texto sube en 220ms con `cubic-bezier(0.16, 1, 0.3, 1)`; el aviso de foco perdido entra en 200ms.
- **Movimiento reducido:** con `prefers-reduced-motion: reduce` no hay animaciones ni transiciones; todo queda encendido y estático.

## Do's and Don'ts

### Do:
- **Do** poner el texto dentro del cartel de tubo rosa (3px, radio 28px, relleno `fondo-cartel`) y mostrar el resultado en el mismo cartel.
- **Do** usar los tres estados de letra: apagada `apagada`, encendida `encendida` con halo ámbar, error `error` que parpadea y queda rojo.
- **Do** dibujar todo lo que se toca como tubo cian de 2px y radio 24px, con la acción principal llena; una por superficie.
- **Do** hacer brillar solo lo que es tubo, con halos `0 0 Npx` del color del tubo.
- **Do** escribir toda cifra en Kanit 600 con `tabular-nums`.
- **Do** mantener el texto sin escribir en `apagada` sobre el relleno opaco del cartel, para que se lea a 4.5:1.
- **Do** respetar `prefers-reduced-motion`: sin parpadeos, sin titileo, sin transiciones.

### Don't:
- **Don't** poner en los textos para escribir ni en la interfaz nada que no sea letras y signos de puntuación.
- **Don't** convertir el texto en un campo gris monoespaciado como Monkeytype o 10FastFingers; el texto vive en el cartel.
- **Don't** usar fondos claros: la pared es siempre oscura.
- **Don't** poner halo a la pared, a los rótulos o a la ayuda, ni usar sombras negras desplazadas.
- **Don't** cambiar el trabajo de un color: botones siempre cian, errores siempre rojos, el cartel siempre rosa.
- **Don't** usar Monoton fuera del nombre ni añadir otra familia tipográfica.
- **Don't** dejar el cartel transparente ni oscurecer la letra apagada por debajo de `apagada`.
