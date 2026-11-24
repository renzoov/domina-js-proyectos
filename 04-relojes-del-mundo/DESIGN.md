---
name: Relojes del mundo
description: El tablero de salidas de una estación; cada ciudad es una fila y su hora va en paletas que giran cuando cambia el minuto.
colors:
  fondo: "#0b0c0e"
  panel: "#131518"
  fila: "#1b1d21"
  fila-ref: "#24221a"
  borde: "#25282d"
  borde-fuerte: "#33363c"
  paleta-arriba: "#26292e"
  paleta-abajo: "#1e2125"
  cara-noche: "#2a2d33"
  cifra: "#f4f1e8"
  rotulo: "#9a978f"
  sugerido: "#8a877f"
  amarillo: "#f6c445"
  dia: "#4cc38a"
  noche: "#7b88ff"
typography:
  titulo:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "34px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.02em"
  paleta:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "44px"
    fontWeight: 800
    lineHeight: "62px"
    fontFeature: "tnum"
  ciudad:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "26px"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "0.02em"
  destacado:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.5
  diferencia:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.15
    fontFeature: "tnum"
  cuerpo:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.4
  detalle:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.4
  seccion:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.14em"
  columna:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.14em"
rounded:
  fila: "8px"
  control: "6px"
  paleta: "5px"
  redondo: "50%"
spacing:
  xxs: "4px"
  xs: "8px"
  sm: "14px"
  md: "24px"
  lg: "28px"
  xl: "40px"
components:
  fila:
    backgroundColor: "{colors.fila}"
    textColor: "{colors.cifra}"
    rounded: "{rounded.fila}"
    padding: "0 14px"
    height: "92px"
  fila-referencia:
    backgroundColor: "{colors.fila-ref}"
    textColor: "{colors.cifra}"
    rounded: "{rounded.fila}"
  paleta:
    backgroundColor: "{colors.paleta-arriba}"
    textColor: "{colors.cifra}"
    typography: "{typography.paleta}"
    rounded: "{rounded.paleta}"
    width: "46px"
    height: "62px"
  boton:
    backgroundColor: "{colors.amarillo}"
    textColor: "{colors.fondo}"
    rounded: "{rounded.fila}"
    height: "48px"
  boton-desactivado:
    backgroundColor: "{colors.borde}"
    textColor: "{colors.rotulo}"
  buscador:
    backgroundColor: "{colors.fondo}"
    textColor: "{colors.cifra}"
    typography: "{typography.cuerpo}"
    rounded: "{rounded.fila}"
    padding: "0 14px 0 42px"
    height: "48px"
  sugerencia:
    backgroundColor: "{colors.fila}"
    textColor: "{colors.cifra}"
    typography: "{typography.cuerpo}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
    height: "44px"
  formato-opcion:
    backgroundColor: "transparent"
    textColor: "{colors.cifra}"
    typography: "{typography.detalle}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "40px"
  formato-elegido:
    backgroundColor: "{colors.cifra}"
    textColor: "{colors.fondo}"
  panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.rotulo}"
    padding: "36px 28px"
    width: "340px"
---

# Design System: Relojes del mundo

## Overview

**Creative North Star: "El tablero de salidas de la estación"**

La hora del mundo se lee como el tablero de salidas de una estación: cada ciudad es una fila oscura, larga y baja, y su hora está en cinco paletas (cuatro cifras y los dos puntos) con la rendija negra al medio. Cuando cambia el minuto, solo giran las paletas que cambian: media vuelta hacia abajo, cambia la cifra, termina de girar. Al lado, un reloj chico de cara blanca (de día) u oscura (de noche) donde el segundero avanza sin parar. La ciudad desde la que se cuentan las diferencias se marca con un borde amarillo; es la única fila que se ve distinta.

El sistema es un andén de noche: un fondo casi negro (`fondo`), filas un tono más claras (`fila`) y paletas otro tono más (`paleta-arriba` y `paleta-abajo`). Las cifras y los nombres son blanco cálido (`cifra`), los rótulos y detalles gris piedra (`rotulo`). El color es escaso y siempre significa algo: amarillo para la referencia, la acción principal y la línea de arrastre; verde y azul solo como la luz de día o de noche. Una sola familia, Inter Tight, en 800 y mayúsculas para lo que se lee de lejos (el título y las cifras de las paletas), 700 para ciudades y diferencias, 400 para lo demás. Esquinas chicas (5 a 8px); solo los relojes y las luces son redondos.

Se niega a la cuadrícula de tarjetas redondeadas iguales del reloj mundial del sistema operativo. Es un producto aparte, con su propio mundo: no usa el pizarrón del curso ni los mundos de los proyectos 1 a 3. Se abre con doble clic (file://), sin librerías, con la fuente en `fuentes/`.

**Key Characteristics:**
- Fondo casi negro; nunca un fondo claro.
- Una fila por ciudad, todas en la misma rejilla que la cabecera de columnas: manija, ciudad, hora, diferencia, día, reloj, quitar.
- La hora en paletas de dos mitades con la rendija del color del fondo; giran solo las que cambian.
- Amarillo solo para la referencia, la acción principal y la línea de arrastre; el foco es blanco.
- Verde y azul solo como la luz de 10px de día o de noche.
- Un panel de 340px a la derecha para agregar ciudades, el formato y la referencia.

## Colors

Un andén oscuro en cuatro tonos de gris frío, un blanco cálido para leer, y tres colores de señal que nunca cambian de trabajo.

### Primary
- **Amarillo de andén** (`amarillo`): el borde interior de 2px de la fila de referencia y su «· tu referencia», el botón «Agregar», la línea de 3px que dice dónde cae la fila que arrastras, la segunda mitad del título («del mundo») y la selección de texto. Nada más.

### Secondary
- **Luz de día** (`dia`): la luz redonda de 10px, con su halo de 8px, en las ciudades donde es de día (de 6 a 18 h).
- **Luz de noche** (`noche`): la misma luz de noche. Más clara que el #5b6cff del contrato de dirección, para que se lea sobre la fila.

### Neutral
- **Fondo** (`fondo`): la página, el relleno del buscador, la rendija de las paletas, las marcas y agujas del reloj de día y el texto sobre amarillo o blanco; también `theme-color`.
- **Panel** (`panel`): el panel de la derecha.
- **Fila** (`fila`): cada fila del tablero y cada sugerencia.
- **Fila de referencia** (`fila-ref`): la fila de referencia, un gris con un dejo de amarillo.
- **Borde** (`borde`) y **Borde fuerte** (`borde-fuerte`): la línea del panel y del separador de la referencia, el fondo al pasar el mouse por la manija o quitar y el botón desactivado; el borde fuerte en el buscador y las opciones de formato.
- **Paleta** (`paleta-arriba`, `paleta-abajo`): las dos mitades de cada paleta, la de abajo un tono más oscura.
- **Cara de noche** (`cara-noche`): la cara del reloj chico de noche, con marcas y agujas en `cifra`.
- **Cifra** (`cifra`): cifras, nombres de ciudad, diferencias, la cara del reloj de día, la opción de formato elegida y el anillo de foco.
- **Rótulo** (`rotulo`): el país, la fecha de la cabecera, los nombres de columna y de sección, el día, «a. m.» y «p. m.», la diferencia de la fila de referencia, el detalle de las sugerencias, la lupa y el texto del pie del panel; también el segundero y el eje del reloj chico.
- **Texto sugerido** (`sugerido`): el texto de ejemplo del buscador.

### Named Rules
**The Amarillo Escaso Rule.** El amarillo dice «esta es la tuya» o «haz esto»: la fila de referencia, el botón principal, la línea de arrastre y la marca del título. El foco, lo elegido y lo que se pasa con el mouse son blancos o grises, nunca amarillos.

**The Dos Luces Rule.** Verde y azul existen solo como la luz de día o de noche, en un punto de 10px con halo. No tiñen texto, bordes ni fondos.

## Typography

**Display Font:** Inter Tight 800 (con system-ui)
**Body Font:** Inter Tight 400/500/700 (con system-ui)

**Character:** Inter Tight es estrecha y firme, como las letras pintadas de un tablero de estación; en 800 y mayúsculas se lee de lejos, en 400 queda callada para los detalles. Toda cifra que cambia o se compara va con `tabular-nums`.

### Hierarchy
- **Título** (800, 34px, 1, tracking 0.02em, mayúsculas): «Relojes del mundo», con «del mundo» en amarillo; 26px en teléfono.
- **Paleta** (800, 44px, renglón 62px, tabular): cada cifra de la hora; 38px en paletas de 54px de alto en teléfono. Los dos puntos van a 40px (34px en teléfono).
- **Ciudad** (700, 26px, 1.05, tracking 0.02em, mayúsculas): el nombre de la ciudad, balanceado en dos líneas si no cabe; 22px en teléfono.
- **Destacado** (700, 22px): el nombre de la referencia en el pie del panel; 16px y en línea cuando el panel baja.
- **Diferencia** (700, 20px, 1.15, tabular): «+6 h», «−1 h», «misma hora» o «—» en la referencia; 18px en teléfono.
- **Cuerpo** (400, 16px, 1.4): texto base, el día, el buscador, las sugerencias y el botón (700).
- **Detalle** (400, 15px): el país, la fecha de la cabecera, las opciones de formato y el pie del panel (renglón 1.5); el detalle de las sugerencias a 14px.
- **Sección** (700, 14px, tracking 0.14em, mayúsculas): «Agregar ciudad» y «Formato».
- **Columna** (500, 13px, tracking 0.14em, mayúsculas): la cabecera de columnas del tablero. «a. m.» y «p. m.» usan 700 a 13px.

### Named Rules
**The Una Familia Rule.** Todo es Inter Tight. La jerarquía se gana con peso (400 a 800), mayúsculas y tamaño, no con otra familia.

**The Cifras Tabulares Rule.** Toda cifra que cambia mientras se mira (paletas, diferencias, la hora UTC de la cabecera) va con `tabular-nums`, para que nada salte cuando gira.

## Layout

La página es una rejilla de dos columnas: el tablero (`minmax(0, 1fr)`) y el panel (340px) a toda la altura. Arriba del tablero, la cabecera: el título a la izquierda y, a la derecha, la fecha y la hora en UTC (por ejemplo «Martes, 24 de noviembre · 17:53 UTC»), alineados por la línea de base, con 36px arriba y 40px a los lados. Debajo, la cabecera de columnas y las filas, con 8px entre filas.

La cabecera de columnas y cada fila comparten la misma rejilla de siete columnas: manija (28px), ciudad (`minmax(200px, 1fr)`), hora (262px), diferencia (140px), día (168px), reloj (64px) y quitar (40px), con 14px entre columnas. Cada fila mide al menos 92px de alto, con 14px a los lados. Ritmo: 4 / 8 / 14 / 24 / 28 / 40px.

El panel apila sus partes con 28px entre ellas y 36px × 28px de relleno: «Agregar ciudad» (título, buscador, sugerencias y botón, con 14px entre ellos), «Formato», y al pie, empujado abajo, «Las diferencias se cuentan desde» con el nombre de la referencia y la ayuda.

Comportamiento por ancho:
- **Hasta 1100px:** una columna. El panel baja entre la cabecera y el tablero como una caja con borde de 1px y radio 8px, 24px de relleno, en dos columnas (agregar a la izquierda, formato a la derecha) y la referencia en una línea al pie. La rejilla de las filas se aprieta a 150px mínimo para la ciudad, 272 / 128 / 150 / 56 / 40px y 12px entre columnas; el reloj baja a 56px.
- **Hasta 760px (teléfono):** cada fila se vuelve una tarjeta de tres renglones: manija a la izquierda de todo; ciudad y quitar arriba; paletas y reloj (52px) en el medio; diferencia y día abajo. No hay cabecera de columnas. El tablero va primero y el panel al final, en una columna con 18px de relleno. Márgenes de 16px.

**The Una Rejilla Rule.** La cabecera de columnas y las filas usan la misma rejilla; una columna nueva se agrega a las dos o a ninguna.

## Elevation & Depth

Plano, por capas de tono: fondo, panel, fila y paleta, cada uno un poco más claro. No hay sombras que hagan flotar nada. Hay tres excepciones, todas propias del tablero: el canto de cada paleta (`0 2px 0` negro al 45 %), que le da el grosor de una paleta de verdad; el halo de 8px de la luz de día o de noche, que es una lámpara; y el borde interior amarillo de 2px de la fila de referencia, hecho con `box-shadow` para no mover nada.

### Shadow Vocabulary
- **Canto de paleta** (`box-shadow: 0 2px 0 rgba(0, 0, 0, 0.45)`): solo las paletas de cifra, no los dos puntos.
- **Luz** (`box-shadow: 0 0 8px` del color de la luz): la luz de día o de noche.
- **Borde de referencia** (`box-shadow: inset 0 0 0 2px` `amarillo`): la fila de referencia.

### Named Rules
**The Capas No Sombras Rule.** La profundidad se da con el tono de la superficie. Fuera del canto de las paletas y de la luz, nada lleva sombra.

## Shapes

Esquinas chicas en todo lo rectangular: 8px en filas, buscador, botón y el panel cuando baja; 6px en lo que se toca dentro de una fila o del panel (manija, quitar, la ciudad al pasar el mouse, sugerencias, opciones de formato); 5px en las paletas. Cada paleta tiene una rendija recta de 2px del color del fondo justo al medio. Lo único redondo son los relojes chicos (cara de radio 46 en un cuadro de 100) y las luces de 10px. Los íconos (manija de seis puntos, cruz de quitar, lupa) son SVG de 20px (18px la lupa), dibujados una vez y reusados. Los bordes son de 1px; el de la referencia y el foco, de 2px; la línea de arrastre, de 3px con esquinas de 2px.

## Components

### Botón principal
El único botón lleno, amarillo, en el panel.
- **Shape:** radio 8px, 48px de alto, ancho del panel, sin borde.
- **Activo:** relleno `amarillo`, texto `fondo` 700 16px. Dice qué va a agregar: «Agregar Tokio».
- **Desactivado:** relleno `borde`, texto `rotulo`, cursor normal. Así está mientras el buscador tiene menos de dos letras o no encuentra nada.
- **Foco:** anillo `cifra` de 2px separado 3px.

### Botones de fila (manija y quitar)
Íconos sin borde, de 34px × 44px (manija) y 40px × 44px (quitar), radio 6px. En reposo, un gris tenue; al pasar el mouse, fondo `borde` e ícono `cifra`. La manija tiene cursor de agarrar y, con el foco, las flechas suben y bajan la fila.

### La ciudad
Un botón sin fondo con el nombre (Ciudad) y debajo el país (Detalle, `rotulo`). Al pasar el mouse, un fondo blanco al 4 % con radio 6px. Tocarlo la vuelve la referencia; en la referencia, el país suma «· tu referencia» en amarillo.

### Buscador
- **Style:** 48px de alto, relleno `fondo`, borde de 1px `borde-fuerte`, radio 8px, lupa en `rotulo` a 14px de la izquierda; texto `cifra`, ejemplo en `sugerido`.
- **Foco:** el borde pasa a `cifra` y el anillo de 2px queda pegado (separación 0).

### Sugerencias
Una lista con 6px entre botones, visible también con el buscador vacío (cuatro ciudades para empezar). Cada sugerencia es un botón de fondo `fila`, radio 6px, 44px mínimo de alto, 10px × 12px de relleno, borde transparente de 1px: el nombre de la ciudad en Cuerpo y, en una segunda línea, el país y la diferencia con la referencia en 14px `rotulo` («Colombia · misma hora»). Al pasar el mouse o con `aria-current`, el borde pasa a `rotulo`. Sin resultados: «Ninguna ciudad con «…»» en `rotulo`.

### Formato
Dos opciones, «24 horas» y «12 horas», como radios dibujados: 40px de alto, 16px a los lados, borde de 1px `borde-fuerte`, radio 6px, 15px. La elegida es blanca: relleno y borde `cifra`, texto `fondo` 700. El radio real es invisible y cubre la opción; el foco se dibuja en ella.

### El panel
Relleno `panel`, línea izquierda de 1px `borde`. Al pie, separado por una línea `borde` y 20px arriba, la referencia en tres líneas: «Las diferencias se cuentan desde», el nombre en Destacado `cifra` y la ayuda en `rotulo`.

### La fila (signature)
Una ciudad del tablero.
- **Fila:** fondo `fila`, radio 8px, al menos 92px de alto. La referencia: fondo `fila-ref` con borde interior `amarillo` de 2px; su diferencia es «—» en `rotulo`.
- **Hora:** cinco paletas de 46px × 62px (40px × 54px en teléfono) con 4px entre ellas, cada una con el degradado duro de `paleta-arriba` a `paleta-abajo` al 50 %, la rendija y el canto. Los dos puntos van sin paleta, en 16px de ancho. En 12 horas, «a. m.» o «p. m.» a 8px de las paletas, en `rotulo`.
- **Día:** la luz de 10px y, a 10px, «hoy, de día», «mañana, de noche» o «ayer, …» en `rotulo`.
- **Reloj chico:** 64px (56px en pantallas medianas, 52px en teléfono). De día: cara `cifra`, doce marcas, horario (7) y minutero (4.5) en `fondo` con extremos redondos. De noche: cara `cara-noche` con marcas y agujas en `cifra`. El segundero (2) y el eje van en `rotulo` de día y de noche.
- **Arrastrar:** la fila que se arrastra baja al 40 % de opacidad; una línea `amarillo` de 3px aparece 6px arriba o abajo de la fila donde va a caer.

### Motion
- **Giro de paleta:** cuando cambia el minuto, cada paleta que cambia gira sobre su eje horizontal con su propia `perspective(260px)`: de 0° a −90° en 130ms `ease-in`, cambia la cifra, y de 90° a 0° en 170ms `ease-out`. Las que no cambian se quedan quietas.
- **Segundero:** avanza continuo, cuadro a cuadro, con `requestAnimationFrame`.
- **Fila:** fondo y opacidad en 160ms con `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Movimiento reducido:** con `prefers-reduced-motion: reduce` la cifra cambia sin girar y no hay transiciones.

## Do's and Don'ts

### Do:
- **Do** poner cada ciudad en una fila oscura (`fila`, radio 8px) de la misma rejilla que la cabecera de columnas.
- **Do** mostrar la hora en paletas de dos mitades con la rendija del color del fondo, y girar solo las que cambian (130ms + 170ms, `perspective(260px)` en cada una).
- **Do** guardar el amarillo para la referencia, la acción principal y la línea de arrastre.
- **Do** dibujar el foco como un anillo `cifra` de 2px separado 3px.
- **Do** usar verde y azul solo como la luz de 10px de día o de noche.
- **Do** escribir toda cifra que cambia con `tabular-nums`.
- **Do** respetar `prefers-reduced-motion`: la cifra cambia sin girar.

### Don't:
- **Don't** poner en los nombres, los textos ni la interfaz nada que no sean letras, números y signos de puntuación.
- **Don't** volver el tablero una cuadrícula de tarjetas redondeadas iguales como el reloj mundial del sistema operativo.
- **Don't** usar fondos claros: el andén es siempre oscuro.
- **Don't** usar el amarillo para el foco, lo elegido o lo que se pasa con el mouse.
- **Don't** redondear más de 8px nada que no sea un reloj o una luz.
- **Don't** sumar sombras que hagan flotar filas o paneles; fuera del canto de la paleta y de la luz, todo es plano.
- **Don't** añadir otra familia tipográfica.
