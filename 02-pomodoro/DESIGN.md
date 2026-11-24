---
name: Pomodoro
description: El reloj de ritmo de una piscina; una esfera blanca con aguja roja mide el bloque, y cada pomodoro es un largo de la serie del día.
colors:
  agua: "#0b5f78"
  agua-honda: "#084c60"
  junta: "rgba(255, 255, 255, 0.07)"
  linea-agua: "rgba(255, 255, 255, 0.28)"
  texto-agua: "#e9f3f2"
  texto-agua-suave: "#c4dfe2"
  blanco: "#f6faf9"
  gris-esfera: "#dfe9e9"
  regla: "#c9d6d7"
  gris-flotador: "#8fa6ad"
  tinta: "#111417"
  tinta-suave: "#44555a"
  rojo: "#e2231a"
  rojo-hondo: "#b8160f"
  azul-corchera: "#1d6fd1"
typography:
  tiempo:
    fontFamily: "Saira, Arial Narrow, sans-serif"
    fontSize: "18cqi"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.01em"
    fontFeature: "tnum"
    fontVariation: "\"wdth\" 75"
  cifra:
    fontFamily: "Saira, Arial Narrow, sans-serif"
    fontSize: "32px"
    fontWeight: 800
    lineHeight: 1
    fontFeature: "tnum"
    fontVariation: "\"wdth\" 75"
  titulo:
    fontFamily: "Saira, Arial Narrow, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1
    fontVariation: "\"wdth\" 80"
  marca:
    fontFamily: "Saira, Arial Narrow, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.02em"
    fontVariation: "\"wdth\" 80"
  accion:
    fontFamily: "Saira, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1
  control:
    fontFamily: "Saira, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1
  placa:
    fontFamily: "Saira, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.16em"
  cuerpo:
    fontFamily: "Saira, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.4
  fila:
    fontFamily: "Saira, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.1
rounded:
  recto: "0px"
  esfera: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "40px"
components:
  boton:
    backgroundColor: "transparent"
    textColor: "{colors.texto-agua}"
    typography: "{typography.control}"
    rounded: "{rounded.recto}"
    padding: "0 16px"
    height: "40px"
  boton-hover:
    backgroundColor: "rgba(255, 255, 255, 0.08)"
  boton-principal:
    backgroundColor: "{colors.rojo}"
    textColor: "#ffffff"
    typography: "{typography.control}"
    rounded: "{rounded.recto}"
    padding: "0 16px"
    height: "40px"
  boton-principal-hover:
    backgroundColor: "{colors.rojo-hondo}"
  boton-accion:
    typography: "{typography.accion}"
    padding: "0 26px"
    height: "52px"
  bloque:
    backgroundColor: "transparent"
    textColor: "{colors.texto-agua-suave}"
    typography: "{typography.control}"
    padding: "10px 18px"
  bloque-elegido:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.tinta}"
  carril:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.tinta}"
    size: "34px"
  serie:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.recto}"
    padding: "24px 24px 20px"
    width: "400px"
  dialogo:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.recto}"
    padding: "24px"
    width: "min(440px, calc(100vw - 32px))"
  campo:
    backgroundColor: "#ffffff"
    textColor: "{colors.tinta}"
    rounded: "{rounded.recto}"
    padding: "7px 8px"
    width: "76px"
---

# Design System: Pomodoro

## Overview

**Creative North Star: "El reloj de ritmo de la piscina"**

El tiempo se lee como en el reloj que cuelga al borde de una piscina de entrenamiento: una esfera blanca enorme con bisel negro, una aguja roja que barre y un punto rojo que da la vuelta al borde cada minuto. La esfera mide el bloque, no la hora: una marca por minuto, un número cada cinco, y el arco rojo es lo que queda. Todo lo demás es la piscina: agua azul con la junta del azulejo, y al lado la pizarra blanca de la serie del día, donde cada bloque es un carril con su corchera.

El sistema es de dos materiales y un rojo. El agua (azul, con texto claro y reglas blancas translúcidas) aloja la interfaz; el blanco (esfera, panel de la serie, diálogos) aloja lo que se lee, en tinta negra. El rojo es la señal: la aguja, el arco que queda, el punto de los segundos, la acción principal y el carril actual. La jerarquía la llevan el peso y el ancho condensado de una sola familia, Saira, y las cifras son siempre tabulares. Todo es recto: el único círculo es la esfera.

Esta app no usa el pizarrón del sitio del curso ni la mesa de imprenta del proyecto 1: es un producto aparte con su propio mundo. Se abre con doble clic (file://), sin librerías, con la fuente en la carpeta `fuentes/`.

**Key Characteristics:**
- Agua azul con la cuadrícula del azulejo (una junta de 1px cada 36px); paneles blancos encima.
- Un solo rojo de señal: aguja, arco que queda, segundero, acción principal, carril actual.
- La esfera, a toda altura, es el centro; el tiempo en Saira 800 condensada dentro de ella.
- Cada bloque de la serie es un carril con corchera de largo proporcional a su duración.
- Esquinas rectas y reglas de 1px en todo; solo la esfera es redonda.

## Colors

Agua de piscina y blanco de esfera, tinta negra para leer y un único rojo de señal; los azules y rojos de la corchera son el material de la cuerda, no interfaz.

### Primary
- **Rojo de aguja** (`rojo`): la aguja, el arco de lo que queda, el punto de los segundos, el botón principal («Empezar/Pausar», «Guardar», «Cerrar»), el borde del carril actual, la selección de texto, el cursor de los campos, la casilla marcada y el borde de un campo inválido. Al pasar el mouse sobre el botón principal se oscurece a **Rojo hondo** (`rojo-hondo`).

### Secondary
- **Azul corchera** (`azul-corchera`): solo en la corchera de los bloques de trabajo, alternado con el rojo y separado por blanco. No aparece en ningún control.

### Neutral
- **Agua** (`agua`): el fondo de la página, con la **Junta** (`junta`) del azulejo encima.
- **Agua honda** (`agua-honda`): la barra superior; también `theme-color`.
- **Línea de agua** (`linea-agua`): toda regla y borde sobre el agua (barra, pie, botones, pestañas, teclas). Al pasar el mouse, el borde de un botón sube a blanco al 55 %.
- **Texto de agua** (`texto-agua`) y **Texto de agua suave** (`texto-agua-suave`): texto principal y secundario sobre el agua (pestañas sin elegir, pie).
- **Blanco de esfera** (`blanco`): la cara de la esfera, el panel de la serie, los diálogos, la pestaña elegida, el cuadro del número de la marca y el anillo de foco sobre el agua.
- **Gris de esfera** (`gris-esfera`): la pista del arco (lo ya pasado) y el hover de los botones secundarios dentro del diálogo.
- **Regla** (`regla`): reglas de 1px sobre blanco (resumen del día, filas de ajustes, el carril vacío de cada día del historial).
- **Gris flotador** (`gris-flotador`): los flotadores de la corchera de descanso, el borde de los campos y de los botones secundarios sobre blanco. Lo ya terminado de una corchera se rellena de un gris algo más claro (#9aaeb3).
- **Tinta** (`tinta`): texto sobre blanco, bisel, marcas y números de la esfera, el eje de la aguja, la parte recorrida de la corchera actual.
- **Tinta suave** (`tinta-suave`): título del panel, minutos de cada carril, rótulos del resumen, notas del diálogo.

### Named Rules
**The Rojo Es Señal Rule.** El rojo marca lo que corre y lo que se hace ahora: aguja, arco, segundero, acción principal (una por superficie) y carril actual. Nunca rellena paneles ni decora texto. La corchera usa rojo y azul porque así son las corcheras; es material, no señal, y no se lleva a los controles.

**The Dos Materiales Rule.** La interfaz vive en el agua (texto claro, reglas `linea-agua`, foco blanco); lo que se lee vive en el blanco (tinta, reglas `regla`, foco en tinta). Una superficie nueva elige uno de los dos; no inventa un tercero.

## Typography

**Display Font:** Saira 700/800 en ancho condensado (75–80 %), con Arial Narrow
**Body Font:** Saira 500/600 en ancho normal, con system-ui

**Character:** Una sola familia variable (peso 400–800, ancho 75–100 %) hace de todo. Condensada y pesada es el número pintado del carril y las cifras del reloj; a ancho normal es la voz de la interfaz. Toda cifra que cambia o se compara va con `tabular-nums`.

### Hierarchy
- **Tiempo** (800, 18cqi del ancho de la esfera, 0.9, ancho 75 %): la cuenta atrás dentro de la esfera, bajo el centro (21 % de relleno arriba). Lleva un halo del color de la esfera para que la aguja pase por debajo sin cortar las cifras.
- **Cifra** (800, 32px, 1, ancho 75 %): los tres números del resumen del día. El número de cada carril de la serie usa el mismo estilo a 23px, y el cuadro de la marca a 21px.
- **Título** (700, 24px, 1, ancho 80 %): título de los diálogos.
- **Marca** (700, 22px, 1, ancho 80 %): «Pomodoro» en la barra.
- **Acción** (600, 18px, 1): los tres botones bajo la esfera; 17px en teléfono.
- **Control** (600, 15px, 1): botones, pestañas de bloque, etiquetas de ajustes; 14px el botón chico del pie y las pestañas en teléfono.
- **Placa** (600, 15px, 1.2, tracking 0.16em, mayúsculas): «Pomodoro 2 de 4», la placa bajo la esfera. El título del panel («La serie de hoy») usa 700 15px, tracking 0.14em, mayúsculas, en `tinta-suave`.
- **Cuerpo** (500, 16px, 1.4): texto base; el pie va a 14px.
- **Fila** (600, 14px, 1.1): el nombre del bloque en cada carril; los minutos van a 600 16px tabulares.
- **Números de la esfera** (700, 11 unidades del SVG, ancho 75 %): escalan con la esfera.

### Named Rules
**The Una Familia Rule.** Todo es Saira. La jerarquía se gana con peso (500–800) y ancho (75–100 %), no con una segunda familia.

**The Cifras Tabulares Rule.** Todo número que cambia mientras se mira (tiempo, minutos, resumen, número del carril, minutos de las pestañas) va con `tabular-nums`, para que nada baile cada segundo.

## Layout

La página es una rejilla de tres filas a toda la altura (`100dvh`): barra (68px), piscina, pie. La piscina tiene dos columnas, la esfera y el panel de la serie (400px), con 40px de separación y hasta 1360px de ancho, centrada, con 32px × 40px de margen. La esfera ocupa lo que puede: `min(560px, 100%, 100dvh − 250px)`, nunca menos de 260px, para que el reloj, la placa y los botones quepan sin desplazarse. Ritmo: 8 / 12 / 16 / 24 / 32 / 40px.

Comportamiento por ancho:
- **Hasta 1080px:** una sola columna de hasta 680px; la serie baja debajo del reloj y la esfera llega a 520px.
- **Hasta 720px (teléfono):** la barra se parte; las pestañas bajan a su propia fila a todo el ancho, en tres partes iguales, y «Descanso» se abrevia a «Desc.». «Ajustes» e «Historial» quedan en solo ícono (40px), con la etiqueta oculta a la vista y legible para lectores de pantalla. El botón principal ocupa toda una fila; «Saltar» y «Reiniciar» van debajo. Márgenes de 16px; los atajos de teclado y la frase del pie se ocultan.

**The La Esfera Manda Rule.** La esfera es lo primero que se ve y lo último que se encoge en alto: su tamaño se calcula contra la altura de la ventana para que nunca empuje los botones fuera de la pantalla.

## Elevation & Depth

Plano con una sola sombra ambiental: los objetos blancos (esfera, panel de la serie, diálogos) cuelgan sobre el agua con una sombra difusa (`0 18px 40px rgba(0,0,0,0.32)`). La esfera suma un filo oscuro de 1px (`rgba(0,0,0,0.22)`). La interfaz sobre el agua (barra, pestañas, botones, pie) es plana y se separa solo con reglas `linea-agua`. El fondo de los diálogos es agua honda al 62 % (`rgba(4,32,42,0.62)`).

### Shadow Vocabulary
- **Sombra** (`box-shadow: 0 18px 40px rgba(0,0,0,0.32)`): esfera, serie y diálogos; la única sombra del sistema.

### Named Rules
**The Solo Lo Blanco Cuelga Rule.** Solo lo blanco lleva sombra. Lo que está sobre el agua es plano.

## Shapes

Todo es recto (radio 0): botones, pestañas, panel, diálogos, campos, teclas, el cuadro del número. El único círculo es la esfera, con su bisel negro de 6 unidades, y los círculos que viven dentro de ella (eje de la aguja, punto de los segundos) más el punto que anuncia «Pantalla encendida». Los bordes son de 1px: `linea-agua` sobre el agua, `regla` o `gris-flotador` sobre blanco. El foco es un anillo de 2px: blanco con 3px de separación sobre el agua, tinta dentro del blanco. El carril actual se marca con un contorno rojo de 2px separado 5px.

## Components

### Buttons
Rectángulos rectos con borde de 1px, ícono SVG de trazo de 18px y etiqueta en Saira 600.
- **Shape:** sin radio, 40px de alto, 16px a los lados, 8px entre ícono y texto.
- **Secundario (sobre el agua):** transparente, borde `linea-agua`, texto `texto-agua`; hover con velo blanco al 8 % y borde al 55 %; activo al 14 %.
- **Principal:** fondo y borde `rojo`, texto blanco, ícono relleno; hover `rojo-hondo`. Uno por superficie: «Empezar/Pausar» bajo la esfera, «Guardar» en ajustes, «Cerrar» en historial.
- **Acción (bajo la esfera):** 52px de alto, 26px a los lados, 18px; el principal tiene al menos 168px. En teléfono 48px y 17px, y el principal toma toda la fila.
- **Chico (pie):** 32px de alto, 12px a los lados, 14px, ícono de 16px. Cuando el aviso ya está activado o bloqueado, se desactiva y deja de verse como botón: sin borde ni relleno, solo el estado escrito.
- **Sobre blanco (diálogos y panel de la serie):** texto `tinta`, borde `gris-flotador`, hover `gris-esfera`. En la serie, «Empezar de nuevo» es chico y va a la derecha del título; se apaga (al 50 %, borde `regla`) cuando ya estás en el pomodoro 1 sin empezar.
- **Foco:** anillo blanco de 2px con 3px de separación (también sobre el rojo); en el diálogo, en tinta.

### Pestañas de bloque
Tres radios con aspecto de control segmentado: borde de 1px `linea-agua` y separadores de 1px, sin radio. Sin elegir: texto `texto-agua-suave` con los minutos en peso 500 al 80 %; hover a `texto-agua` con velo blanco al 6 %. Elegida: blanco lleno con tinta. El foco va con 2px de separación. Se marca con `:has(input:checked)` además del selector de hermano, porque WebKit no repinta el hermano cuando el script cambia el radio.

### La esfera (signature)
Un SVG de 200 × 200 unidades que escala con su contenedor.
- **Cara:** círculo blanco de radio 97 con bisel `tinta` de 6.
- **Marcas:** del radio 93 hacia adentro; las chicas hasta 87 (trazo 1), las grandes hasta 82 (trazo 2.6). Una por minuto y una grande cada 5; si el bloque dura 10 minutos o menos, una cada 15 segundos y una grande por minuto. Se dibujan desde app.js porque cambian con la duración.
- **Números:** en el radio 59, en cada marca grande menos el 0, donde descansa la aguja.
- **Arco:** radio 74, trazo 9; la pista es `gris-esfera` y el arco `rojo` dibuja lo que queda, desde la aguja hasta el 0.
- **Aguja:** línea roja de 2.4 con punta redonda, de 12 unidades bajo el centro hasta el radio 90; eje de radio 5 en tinta con borde rojo. Gira en el sentido del reloj desde arriba.
- **Segundero:** un punto rojo de radio 2.3 sobre el bisel que da una vuelta por minuto.
- **Lectura:** el tiempo va encima del SVG, bajo el centro, con el halo blanco que deja pasar la aguja por debajo. La placa «Pomodoro n de 4» va fuera de la esfera, debajo.

### La serie (panel y carriles)
Panel blanco de 400px con sombra, 24px de margen, título en placa con el botón «Empezar de nuevo» a su derecha (baja a la línea siguiente si no entra) y una lista de carriles con 14px de separación.
- **Carril:** rejilla de tres columnas: el número del pomodoro (cifra de 23px, solo en los de trabajo), el nombre con su corchera debajo, y los minutos a la derecha.
- **Corchera:** 12px de alto, largo proporcional a la duración del bloque (el más largo llena la columna). Trabajo: flotadores de 26px rojo, blanco, azul, blanco, repetidos con `round` para que siempre entren enteros. Descanso: flotadores de 9px `gris-flotador` y blanco. Lo recorrido del bloque actual se rellena de tinta de izquierda a derecha.
- **Estados:** terminado, en `tinta-suave`, nombre tachado y corchera llena de gris; actual, con contorno rojo de 2px a 5px, minutos en tinta 700 que cuentan hacia atrás.
- **Resumen:** regla `regla` arriba y tres cifras de 32px con su rótulo de 13px debajo: pomodoros hoy, minutos de trabajo, días seguidos.

### Diálogos
`<dialog>` modal blanco, hasta 440px, sin radio, 24px de margen y 18px entre partes, título de 24px condensado. Ajustes: filas con etiqueta a la izquierda y campo a la derecha, separadas por reglas `regla`; campos numéricos de 76px, sin flechas, cifras de 18px a la derecha, borde `gris-flotador` que pasa a `rojo` si el valor es inválido; casilla de 18px con `accent-color` rojo. Historial: los últimos 7 días, cada uno con su nombre, una corchera proporcional a los minutos (o una regla fina si no hubo trabajo) y los minutos a la derecha. Los botones van a la derecha.

### Barra y pie
La barra (68px, `agua-honda`, regla abajo) lleva la marca (el número del pomodoro actual en un cuadro blanco de 34px, como el número pintado de un carril, y «Pomodoro»), las pestañas y, a la derecha, «Ajustes» e «Historial». El pie lleva los atajos en `kbd` (borde `linea-agua`, 600 12px), la promesa de que el tiempo no se atrasa, «Pantalla encendida» con su punto blanco y el estado de los avisos.

### Motion
- **La aguja barre:** se repinta cada 200ms con la hora real (`Date.now()`), así que avanza de forma continua y no se atrasa con la pestaña escondida.
- **El rellenado:** al empezar otro bloque, la aguja vuelve a 0 y el arco se llena en un solo giro de 650ms con `cubic-bezier(0.2, 0.7, 0.2, 1)`, amortiguado y sin rebote (Web Animations).
- **Hovers:** fondo, borde y color en 150ms.
- **Movimiento reducido:** con `prefers-reduced-motion: reduce` el rellenado no corre y no hay transiciones.

## Do's and Don'ts

### Do:
- **Do** medir el bloque en la esfera: marcas por minuto, arco rojo de lo que queda, aguja que barre con la hora real.
- **Do** usar el rojo solo como señal: aguja, arco, segundero, la acción principal de cada superficie y el carril actual.
- **Do** dibujar cada bloque como un carril con corchera de largo proporcional a su duración, y dejar marcado lo terminado.
- **Do** poner toda cifra en Saira condensada con `tabular-nums`.
- **Do** mantener todo recto con reglas de 1px; la esfera es el único círculo.
- **Do** respetar `prefers-reduced-motion`: sin rellenado animado ni transiciones.

### Don't:
- **Don't** convertir el tiempo en un número suelto sobre una tarjeta translúcida, como Pomofocus; el tiempo vive en la esfera.
- **Don't** usar el rojo como relleno de paneles ni el azul de corchera en controles.
- **Don't** poner sombra a lo que está sobre el agua; solo lo blanco cuelga.
- **Don't** redondear esquinas de botones, paneles o diálogos.
- **Don't** añadir una segunda familia tipográfica.
