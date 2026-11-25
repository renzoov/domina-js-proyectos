---
name: Avisos en fila
description: La demo de zona-toasts, una librería propia de avisos; los avisos blancos con foto se ven sobre una escena de Cusco oscurecida, y la cola que espera su turno se ve en un panel grafito junto al código con await.
colors:
  fondo: "#0E1116"
  panel: "#151A22"
  celda: "#1C2330"
  borde: "#2A3342"
  linea: "#232A36"
  tinta: "#E8ECF2"
  suave: "#8A93A1"
  azul: "#3D7BFF"
  azul-claro: "#8AB0FF"
  aviso: "#FFFFFF"
  aviso-suave: "#5B6676"
  gris-boton: "#EEF1F5"
  rojo-tiempo: "#E5484D"
  verde: "#5BE38F"
  rosa: "#FF7A8A"
  ambar: "#FFC876"
  codigo-cadena: "#8FE3A9"
  codigo-clave: "#FF8BC0"
typography:
  titulo:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "40px"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  bajada:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.5
  cuerpo:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  aviso-titulo:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 650
    lineHeight: 1.3
  aviso-texto:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.4
  boton:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1
  accion:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1
  fila:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.5
  detalle:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
  seccion:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    letterSpacing: "0.12em"
  codigo:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "13.5px"
    fontWeight: 500
    lineHeight: 1.65
  orden:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1
rounded:
  icono: "6px"
  boton: "8px"
  celda: "10px"
  aviso: "14px"
spacing:
  xs: "8px"
  sm: "10px"
  md: "12px"
  lg: "14px"
  xl: "28px"
  panel: "32px"
  alto: "40px"
  escena: "48px"
components:
  aviso:
    backgroundColor: "{colors.aviso}"
    textColor: "{colors.fondo}"
    rounded: "{rounded.aviso}"
    padding: "12px"
    width: "400px"
  aviso-accion:
    backgroundColor: "{colors.gris-boton}"
    textColor: "{colors.fondo}"
    typography: "{typography.accion}"
    rounded: "{rounded.boton}"
    padding: "7px 12px"
    height: "34px"
  aviso-accion-primaria:
    backgroundColor: "{colors.fondo}"
    textColor: "{colors.aviso}"
  aviso-cerrar:
    textColor: "{colors.suave}"
    rounded: "{rounded.boton}"
    width: "32px"
    height: "32px"
  probar:
    backgroundColor: "{colors.celda}"
    textColor: "{colors.tinta}"
    typography: "{typography.boton}"
    rounded: "{rounded.celda}"
    padding: "10px 14px"
    height: "48px"
  fila:
    backgroundColor: "{colors.celda}"
    textColor: "{colors.tinta}"
    typography: "{typography.fila}"
    rounded: "{rounded.celda}"
    padding: "10px 12px"
  codigo:
    backgroundColor: "{colors.fondo}"
    textColor: "{colors.tinta}"
    typography: "{typography.codigo}"
    rounded: "{rounded.celda}"
    padding: "14px 16px"
---

# Design System: Avisos en fila

## Overview

**Creative North Star: "La sala de espera a la vista"**

La demo enseña cómo trabaja la librería por dentro. La página se parte en dos: a la izquierda la escena, una foto de Cusco oscurecida (`brightness(.62)`) que se funde hacia la derecha en el grafito del fondo, con «Avisos en fila» y una línea de explicación arriba a la izquierda; a la derecha, el panel grafito de 440px con tres bloques: «Probar» (los botones de prueba), «En la cola · n» (las filas que esperan su turno) y «Código» (la llamada con `await` y lo que devolvió). Los avisos entran arriba a la derecha de la escena, blancos, con su foto o su ícono de tipo, y se ven como mucho dos. Cuando uno se cierra, la fila del siguiente sale del panel y viaja hasta el lugar del aviso nuevo: la cola avanza a la vista.

Es un mundo oscuro de interfaz de producto: grafito por capas (fondo, panel, celda) con bordes de 1px un poco más claros, un solo acento azul para lo activo, y el blanco reservado para los avisos, que son lo único que brilla sobre la foto. Los tipos (éxito, error, información, cargando) se distinguen por un ícono dibujado sobre un fondo tintado, nunca por una línea de color al costado. Dos familias: Inter Tight para la interfaz y JetBrains Mono para el código, siempre coloreado.

Se niega a la demo blanca de botones con avisos de línea de color. Es un producto aparte, con su propio mundo: no usa el pizarrón del curso ni los mundos de los proyectos 1 a 7. Se sirve por http (módulos ES), sin librerías, con las fuentes en `fuentes/` y las fotos en `fotos/`.

**Key Characteristics:**
- Escena de foto oscurecida a la izquierda, panel grafito de 440px a la derecha; en pantallas de hasta 1000px, la escena arriba y el panel debajo.
- Los avisos son tarjetas blancas de radio 14px con miniatura o ícono de 72px, botón de cerrar con X y una barra de tiempo de 3px abajo.
- La cola se ve: cada aviso que espera es una fila punteada en el panel; la siguiente va con borde azul sólido y un pulso suave.
- Un solo acento, `azul`, para la barra de tiempo, la fila siguiente, el foco de los avisos y la selección.
- Los tipos se marcan con ícono sobre fondo tintado: tintes oscuros en el panel y tintes claros dentro del aviso blanco.
- El código siempre va coloreado en JetBrains Mono; nunca texto plano.

## Colors

Grafito por capas, un azul eléctrico como único acento, el blanco para los avisos y cuatro colores de tipo.

### Primary
- **Azul señal** (`azul`): la barra de tiempo de los avisos, el borde de la fila siguiente en la cola, el anillo de foco dentro del aviso, la selección de texto y el cuadro azul del favicon. Es lo activo: lo que corre o lo que viene.
- **Azul claro** (`azul-claro`): el anillo de foco de la página, el ícono de información en el panel, las funciones en el código (`mostrar`, `cargando`), el número de orden de la cola y el enlace de créditos.

### Secondary
- **Blanco aviso** (`aviso`): el papel de cada aviso. Es lo único claro en la página; su texto es `fondo` y el secundario `aviso-suave`.
- **Gris botón** (`gris-boton`): las acciones secundarias del aviso y el fondo de la X al pasar el mouse; al pasar el mouse por una acción, #E2E7EE.

### Tertiary
Los colores de tipo, cada uno en pareja de ícono y fondo tintado.
- **Verde éxito** (`verde`) sobre #1F3D2B en el panel; dentro del aviso, #17803D sobre #E3F7EA.
- **Rosa error** (`rosa`) sobre #43222A en el panel; dentro del aviso, #C2253A sobre #FDE8EB, y la barra de tiempo del error en `rojo-tiempo`.
- **Información**: `azul-claro` sobre #1E2F4F en el panel; dentro del aviso, #2A5FD6 sobre #E6EEFF.
- **Ámbar cargando** (`ambar`) sobre #3B3320 en el panel; dentro del aviso, #9A6200 sobre #FFF3DC.

### Neutral
- **Grafito fondo** (`fondo`): el fondo de la página, `theme-color`, el fondo del bloque de código, el degradado que funde la escena con el panel (`rgba(14, 17, 22, .9)`) y, dentro del aviso, la tinta y el relleno de la acción primaria (al pasar el mouse, #262B33).
- **Panel** (`panel`): el fondo del panel.
- **Celda** (`celda`): los botones de prueba y las filas de la cola; al pasar el mouse, #232C3C con borde #3A4559. El pulso de la fila siguiente llega a #1F2A3F.
- **Borde** (`borde`): el borde de los botones de prueba, el de la caja «Nadie espera» y el carril de la barra de desplazamiento. Las filas en espera usan un borde punteado #33405A, y el aviso de la demo #4A5468.
- **Línea** (`linea`): la línea que separa el panel de la escena y el borde del bloque de código.
- **Tinta** (`tinta`): el texto de la página y de los botones. La bajada de la escena y el aviso de la demo usan #C6CEDA; el texto base del código, #C9D2E0.
- **Suave** (`suave`): los títulos de sección, el estado de cada fila, la caja vacía, la línea «respuesta →», los créditos y la X del aviso en reposo.

En el código, además de `codigo-clave` (palabras clave), `codigo-cadena` (cadenas, y también la respuesta del `await`), `azul-claro` (funciones) y `ambar` (números).

### Named Rules
**The Un Solo Acento Rule.** `azul` marca lo activo y nada más: lo que corre (la barra de tiempo), lo que viene (la fila siguiente) y donde está el foco. Los tipos tienen sus propios colores, pero solo en el ícono y su fondo tintado.

**The Tinte Según el Fondo Rule.** Un mismo tipo cambia de tinte según dónde está: sobre el grafito, ícono claro sobre fondo oscuro; dentro del aviso blanco, ícono oscuro sobre fondo claro. Los tintes oscuros del panel no se leen sobre blanco.

**The Blanco Es del Aviso Rule.** El blanco puro solo vive en los avisos (y en el texto sobre la acción primaria). La página y el panel son grafito.

## Typography

**Display Font:** Inter Tight 700 (con system-ui)
**Body Font:** Inter Tight 400 a 650 (con system-ui)
**Label/Mono Font:** JetBrains Mono 500 (con ui-monospace)

**Character:** Inter Tight trae el aire de interfaz de producto, compacta y neutra, que deja hablar a las fotos; JetBrains Mono separa con claridad lo que es código. Inter Tight es variable (100–900), por eso el título del aviso usa 650.

### Hierarchy
- **Título** (700, 40px, 1.05, tracking −0.02em): «Avisos en fila» en la escena; 32px en el teléfono.
- **Bajada** (400, 17px, hasta 40ch, #C6CEDA): la frase bajo el título; 15px en el teléfono.
- **Cuerpo** (400, 16px, 1.5): texto base de la página.
- **Título del aviso** (650, 16px, 1.3): la primera línea de cada aviso.
- **Texto del aviso** (400, 14px, 1.4, `aviso-suave`): la explicación del aviso.
- **Botón** (600, 15px, 1): los botones de prueba.
- **Acción** (600, 13px, 1): los botones dentro del aviso.
- **Fila** (600, 14px, una línea con puntos suspensivos): el nombre en cada fila de la cola.
- **Detalle** (400, 13px, `suave`): el estado de cada fila y los créditos. La caja vacía y el aviso de la demo usan 14px.
- **Sección** (600, 13px, tracking 0.12em, mayúsculas, `suave`): los títulos `h2` de los tres bloques del panel, «Probar», «En la cola · n» y «Código».
- **Código** (JetBrains Mono 500, 13.5px, 1.65): el bloque de código y la línea «respuesta →».
- **Orden** (JetBrains Mono 500, 12px, `azul-claro`): «siguiente», «#2», «#3»… en cada fila.

### Named Rules
**The Código Coloreado Rule.** Todo lo que es código va en JetBrains Mono y con color: palabras clave en `codigo-clave`, cadenas en `codigo-cadena`, funciones en `azul-claro` y números en `ambar`. Nunca código en blanco plano.

**The Letra Heredada Rule.** Los avisos no traen letra propia: heredan la de la página a través del Shadow DOM, y sus botones usan `font-family: inherit`.

## Layout

La página es una rejilla de dos columnas a todo el alto de la ventana: la escena (`minmax(0, 1fr)`) y el panel (440px). La escena recorta la foto con `object-fit: cover`; el texto va a 48px de la izquierda y 44px de arriba, y la zona de avisos (400px de ancho, `min(400px, 100vw − 32px)`) a 44px de arriba y 32px de la derecha. El panel apila sus bloques con 28px entre ellos y 40px × 32px de relleno, y los créditos se van al fondo.

En «Probar», los botones van en dos columnas con 10px entre ellos; «Lanzar 5 a la vez» ocupa las dos. Cada fila de la cola es una rejilla de foto (40px), texto y orden, con 12px entre columnas y 8px entre filas. Entre avisos hay 12px. Cada aviso es una rejilla de miniatura (72px), cuerpo y cerrar (32px), con 14px entre columnas.

Ritmo: 8 / 10 / 12 / 14 / 28 / 32 / 40 / 48px.

Comportamiento por ancho:
- **Escena de hasta 880px** (consulta de contenedor): los avisos bajan a 190px de arriba, entre 24px de cada lado y hasta 440px, para no tapar el título.
- **Hasta 1000px:** una sola columna; la escena arriba (560px de alto, el degradado ahora hacia abajo) y el panel debajo, separado por la línea de arriba. La fila ya no viaja a la escena.
- **Hasta 560px (teléfono):** escena de 480px, texto a 16px de los lados y 24px de arriba, avisos a 176px de arriba entre 16px de cada lado, panel con 28px × 16px de relleno.

## Elevation & Depth

La página es plana por capas de grafito: el fondo, el panel un poco más claro y las celdas más claras aún, separadas por bordes de 1px. La única sombra es la de los avisos, que flotan sobre la foto. La escena gana profundidad con la foto oscurecida y el degradado que la funde con el panel.

### Shadow Vocabulary
- **Aviso** (`box-shadow: 0 10px 30px rgba(0, 0, 0, .35)`): cada aviso sobre la escena.

### Named Rules
**The Solo Flota el Aviso Rule.** En el panel nada lleva sombra: las capas se separan por tono y borde. La sombra es del aviso, que está encima de todo.

## Shapes

Esquinas suaves en una escala corta: 14px en los avisos, 10px en las celdas del panel (botones de prueba, filas, caja vacía, bloque de código) y en la miniatura o el ícono del aviso, 8px en las acciones y la X del aviso y en la foto de cada fila, y 6px en los íconos de tipo del panel. Los bordes del panel son de 1px: sólidos en lo que se puede tocar y punteados en lo que espera (las filas de la cola, la caja vacía, el aviso de la demo). La barra de tiempo es un filo de 3px pegado al borde de abajo del aviso, recortado por su radio.

Los íconos son SVG de trazo, sin relleno, con puntas y uniones redondas: 2.4 en los de tipo y 2.2 en la X. En la página son `<symbol>` reusados con `<use>`; dentro del Shadow DOM, la librería los dibuja en línea.

## Components

### Aviso (signature)
El aviso de la librería, dentro del Shadow DOM de `<zona-toasts>`. Se sobreescribe desde afuera con las variables `--aviso-fondo`, `--aviso-tinta`, `--aviso-suave`, `--aviso-acento` y `--aviso-radio`.
- **Forma:** `aviso`, radio 14px, 12px de relleno, sombra de aviso; a la izquierda la foto (72px, radio 10px, `cover`) o el ícono de tipo (72px, radio 10px, ícono de 30px).
- **Cuerpo:** el título (Título del aviso), el texto (Texto del aviso) y, si hay, las acciones con 8px entre ellas.
- **Acciones:** la primera es primaria (relleno `fondo`, texto blanco); las demás en `gris-boton`. Al menos 34px de alto, radio 8px.
- **Cerrar:** la X de 18px en un cuadro de 32px, en `suave`; al pasar el mouse, fondo `gris-boton` y X en la tinta.
- **Barra de tiempo:** 3px en `azul` (en `rojo-tiempo` si es un error) que se achica hasta cero; se detiene con el mouse encima o el foco adentro.
- **Cargando:** el ícono gira cada 0.9s; cuando la tarea termina, el mismo aviso pasa a éxito o a error en su lugar.
- **Deslizar:** se arrastra hacia la derecha, perdiendo opacidad; más de la mitad de su ancho lo cierra, menos lo devuelve en 220ms.
- **Accesibilidad:** `role="alert"` el error, `role="status"` los demás; Escape cierra el más nuevo.

### Botón de prueba
- **Shape:** radio 10px, al menos 48px de alto, 10px × 14px de relleno, borde de 1px en `borde`.
- **Estilo:** `celda` con texto `tinta` (Botón) y un ícono de tipo de 24px (radio 6px, ícono de 15px) a la izquierda.
- **Hover / Active:** #232C3C con borde #3A4559 en 150ms; al apretar baja 1px.

### Fila de la cola
- **Estilo:** `celda`, radio 10px, borde punteado #33405A, foto de 40px (radio 8px) o el ícono de su tipo, nombre (Fila), estado (Detalle) y orden (Orden).
- **Siguiente:** borde sólido `azul`, estado «Sale cuando se cierre uno», orden «siguiente» y un pulso de fondo hacia #1F2A3F cada 1.6s.
- **Vacía:** si nadie espera, una caja punteada en `borde` con «Nadie espera…» en `suave`.

### Bloque de código
- **Estilo:** `fondo`, radio 10px, borde de 1px en `linea`, 14px × 16px de relleno, Código coloreado, con salto de línea en vez de desplazamiento.
- **Respuesta:** debajo, «respuesta →» en `suave` y lo que devolvió el `await` en `codigo-cadena`. Muestra la llamada del último botón y solo su respuesta.

### Foco
Un anillo de 3px en `azul-claro` separado 3px en la página; dentro del aviso, 3px en `azul` separado 2px.

### Motion
- **Entrar:** el aviso baja 14px desde arriba con escala .97 y aparece, en 320ms con `cubic-bezier(.2, .8, .2, 1)`.
- **Salir:** se va 28px a la derecha (o termina el deslizamiento hasta 110 %) mientras su alto y su margen bajan a cero, en 280ms con `cubic-bezier(.4, 0, 1, 1)`, para que los de abajo suban suave.
- **La cola avanza:** cuando la fila siguiente pasa a la escena, una copia de ella viaja del panel al lugar del aviso, escalándose a su ancho y bajando a opacidad .25, en 520ms con `cubic-bezier(.5, 0, .2, 1)`; el aviso queda oculto hasta que llega. Solo con dos columnas.
- **Filas:** cada fila entra subiendo 6px en 300ms; la siguiente late cada 1.6s.
- **Movimiento reducido:** con `prefers-reduced-motion: reduce` los avisos entran y salen sin animar, la fila no viaja, el ícono de cargando no gira y en la página todas las animaciones y transiciones duran 0.01ms y corren una vez.

## Do's and Don'ts

### Do:
- **Do** mostrar los avisos blancos sobre la escena oscurecida, y la cola que espera en el panel, a la vista.
- **Do** marcar el tipo con un ícono dibujado sobre su fondo tintado: tintes oscuros en el panel y claros dentro del aviso.
- **Do** usar `azul` solo para lo activo: la barra de tiempo, la fila siguiente y el foco.
- **Do** separar las capas del panel por tono y borde de 1px, sin sombras.
- **Do** dibujar con borde punteado lo que espera y con borde sólido lo que se puede tocar o lo que sale ahora.
- **Do** colorear siempre el código en JetBrains Mono.
- **Do** dejar que el aviso herede la letra de la página y se ajuste con las variables `--aviso-*`.
- **Do** respetar `prefers-reduced-motion`: los avisos y la cola cambian sin movimiento.

### Don't:
- **Don't** volver la demo una página blanca de botones con avisos de línea de color al costado.
- **Don't** poner un fondo claro en la página o el panel; el blanco es del aviso.
- **Don't** usar un segundo acento para lo activo, ni pintar con los colores de tipo algo que no sea su ícono y su fondo.
- **Don't** mostrar código en texto plano blanco.
- **Don't** usar emojis en los textos ni en la interfaz; los íconos son SVG de trazo.
