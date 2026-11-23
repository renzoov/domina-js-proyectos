---
name: Generador de paletas
description: Cinco chips de tinta plana sobre una mesa grafito, cada uno con su ficha técnica impresa.
colors:
  mesa: "#1c1d20"
  mesa-alta: "#26272b"
  linea: "#3d3e44"
  papel: "#f4f2ec"
  tinta: "#111111"
  tinta-suave: "#5b5a55"
  texto: "#ecebe6"
  texto-suave: "#a3a29c"
  magenta: "#e4007c"
  magenta-hondo: "#c8006d"
  magenta-claro: "#ff5fae"
typography:
  hex:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "40px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.02em"
    fontFeature: "tnum"
  titulo:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.02em"
  marca:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.03em"
  datos:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "0.04em"
    fontFeature: "tnum"
  rotulo:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.14em"
  cuerpo:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.4
  control:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1
rounded:
  impreso: "2px"
  chip: "4px"
  control: "6px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  boton:
    backgroundColor: "{colors.mesa-alta}"
    textColor: "{colors.texto}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "9px 14px"
  boton-principal:
    backgroundColor: "{colors.magenta}"
    textColor: "#ffffff"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "9px 14px"
  boton-principal-hover:
    backgroundColor: "{colors.magenta-hondo}"
  boton-claro:
    backgroundColor: "transparent"
    textColor: "{colors.tinta}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "9px 14px"
  armonia:
    backgroundColor: "transparent"
    textColor: "{colors.texto-suave}"
    typography: "{typography.control}"
    padding: "9px 14px"
  armonia-elegida:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
  chip:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.chip}"
    padding: "8px"
  accion:
    backgroundColor: "transparent"
    textColor: "{colors.tinta}"
    typography: "{typography.control}"
    rounded: "{rounded.impreso}"
    padding: "9px 8px"
  accion-fijada:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.papel}"
  contraste-mejor:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.papel}"
    padding: "6px 8px"
  dialogo:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.chip}"
    padding: "24px"
    width: "min(560px, calc(100vw - 32px))"
  aviso:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.chip}"
    padding: "11px 16px"
---

# Design System: Generador de paletas

## Overview

**Creative North Star: "El abanico de muestras de imprenta"**

Cada color es un chip de tinta plana arrancado de un muestrario de imprenta: arriba la tinta, abajo su ficha técnica impresa en negro sobre papel. Los cinco chips se apoyan sobre una mesa grafito y la llenan; todo lo demás (barra, pie, diálogo) es mobiliario discreto alrededor de ellos. La información está siempre a la vista, impresa, nunca escondida detrás de un hover.

El sistema es de dos materiales y un acento. La mesa (oscura) aloja la interfaz; el papel (claro) aloja los datos. El magenta de proceso es la única tinta de la interfaz: marca la acción principal y el foco, y nada más. La jerarquía la llevan el peso, la condensación y las mayúsculas, no una escala tipográfica amplia. Los estados se leen como marcas impresas: lleno es fijado o elegido, hueco es libre.

Esta app no usa el mundo pizarra del sitio del curso: es un producto aparte con su propio mundo. Se abre con doble clic (file://), sin librerías, con las fuentes en la carpeta `fuentes/`.

**Key Characteristics:**
- Mesa grafito con chips de papel; el color del usuario es el único color abundante.
- Un solo acento, magenta de proceso, para la acción principal y el foco.
- Códigos en Barlow Condensed con cifras tabulares; interfaz en Barlow.
- Reglas de 1 px y estados lleno/hueco en lugar de sombras o rellenos de color.
- Movimiento propio: los chips libres se abren como un abanico al generar.

## Colors

Una paleta neutra y cálida de dos materiales (mesa y papel) con un único acento de imprenta; el color real lo pone la paleta del usuario.

### Primary
- **Magenta de proceso** (`magenta`): el botón «Generar», el botón «Copiar el CSS» del diálogo y la selección de texto. Al pasar el mouse se oscurece a **Magenta hondo** (`magenta-hondo`).
- **Magenta claro** (`magenta-claro`): el anillo de foco en toda la app, el borde punteado de la capa «Suelta la imagen» y las propiedades en el bloque de código exportado.

### Neutral
- **Mesa grafito** (`mesa`): el fondo de la página y del bloque de código dentro del diálogo; también `theme-color`.
- **Mesa alta** (`mesa-alta`): botones secundarios sobre la mesa.
- **Línea** (`linea`): toda regla y borde sobre la mesa (barra, control segmentado, botones, teclas).
- **Papel** (`papel`): chips, diálogo, aviso y la armonía elegida.
- **Tinta negra** (`tinta`): texto, reglas y estados llenos sobre el papel.
- **Tinta suave** (`tinta-suave`): rótulos sobre el papel (HEX, RGB, HSL, texto del diálogo); ≥ 4,5:1 sobre papel.
- **Texto** (`texto`) y **Texto suave** (`texto-suave`): texto principal y secundario sobre la mesa; el suave cumple ≥ 4,5:1.

### Named Rules
**The Una Sola Tinta Rule.** El magenta es el único color de la interfaz. Marca la acción principal de cada superficie (una por superficie) y el foco; nunca decora, nunca rellena paneles, nunca colorea datos.

**The Dos Materiales Rule.** La interfaz vive en la mesa (texto claro, reglas `linea`); los datos viven en el papel (tinta negra, reglas `tinta`). Una superficie nueva elige uno de los dos materiales; no inventa un tercero.

## Typography

**Display Font:** Barlow Condensed 500/600/700 (con Arial Narrow)
**Body Font:** Barlow 400/500/600 (con system-ui)

**Character:** Barlow Condensed es la letra de la ficha técnica: códigos, números de chip, títulos y estado, en cifras tabulares y a menudo en mayúsculas espaciadas. Barlow es la voz de la interfaz: botones, armonías, textos.

### Hierarchy
- **Hex** (700, 40px, 1): el código hexadecimal de cada chip, cifras tabulares. Baja a 34px en chips de menos de 250px de ancho y a 30px en filas de teléfono.
- **Título** (700, 28px, 1, mayúsculas): el título del diálogo.
- **Marca** (700, 22px, 1, mayúsculas): el nombre de la app en la barra; 20px en teléfono.
- **Datos** (500, 15px, 1.25, cifras tabulares): RGB y HSL en la ficha; 14px en teléfono, 13px a 420px. El código exportado usa la misma familia a 17px/1.6.
- **Cuerpo** (500, 15px, 1.4): texto base de la página.
- **Control** (600, 14px, 1): botones, armonías y acciones; las armonías bajan a 13px por debajo de 420px.
- **Rótulo** (600, 12–13px, tracking 0.14em): HEX, RGB, HSL, N.º 01, teclas `kbd` (mayúsculas, 0.1em). El estado del pie usa 600 14px, 0.08em, mayúsculas.

### Named Rules
**The Escala Corta Rule.** La escala va de 12 a 40px y no crece. La jerarquía se gana con peso, condensación, mayúsculas y tracking, no con tamaños nuevos.

**The Cifras Tabulares Rule.** Todo número que el usuario compara (hex, RGB, HSL, contraste) va en Barlow Condensed con `tabular-nums`, para que las columnas no bailen al generar.

## Layout

La página es una rejilla de tres filas a toda la altura (`100dvh`): barra, mesa, pie. La mesa reparte cinco columnas iguales con 16px de separación y 24px × 32px de margen; los chips son altos y la llenan. La tinta crece (`flex: 1`, mínimo 140px) y la ficha conserva su altura. Ritmo: 8 / 12 / 16 / 24 / 32px.

Comportamiento por ancho:
- **Hasta 1360px:** el control segmentado de armonías baja a su propia fila, a todo el ancho, con las cinco opciones en partes iguales y texto centrado.
- **Hasta 820px (teléfono y tableta vertical):** los chips pasan a filas (una columna, 12px de separación, 16px de margen); dentro de cada chip la tinta ocupa el 34 % a la izquierda y la ficha el resto. Las armonías forman una rejilla 3 + 2 separada por reglas de 1px (seis columnas: las tres primeras ocupan dos, las dos últimas tres). Las herramientas que no son la principal («Desde una foto», «Exportar», y deshacer y rehacer, que ya son solo ícono) muestran solo su ícono; «Generar» conserva su texto, y las herramientas caben en una fila bajo la marca. La barra y el pie bajan a 16px de margen y los atajos de teclado se ocultan.
- **Hasta 420px:** la tinta baja al 28 %, los datos se compactan (13px, rótulos 11px) y los dos contrastes se apilan; la marca puede partirse en dos líneas. Los segmentos de armonía bajan a 13px con 14px × 4px de relleno, para que «Complementaria» quepa a 360px.
- **Escritorio bajo (más de 820px de ancho y hasta 700px de alto):** la tinta cede altura (mínimo 80px) antes que la ficha.
- **Chip angosto (container query, hasta 250px):** el hex baja a 34px y los contrastes se apilan.

**The La Ficha No Cede Rule.** Cuando falta espacio, se encoge la tinta, nunca los datos.

## Elevation & Depth

Sistema plano con una sola elevación ambiental: los objetos de papel (chips, aviso, diálogo) flotan sobre la mesa con sombras suaves y difusas, como papel sobre una mesa. La interfaz sobre la mesa (botones, barra, armonías) es plana y se separa solo con reglas de 1px.

### Shadow Vocabulary
- **Chip sobre la mesa** (`box-shadow: 0 2px 4px rgba(0,0,0,0.25), 0 12px 28px rgba(0,0,0,0.35)`): los cinco chips.
- **Aviso** (`box-shadow: 0 10px 30px rgba(0,0,0,0.45)`): el aviso corto de «Copiado».
- **Diálogo** (`box-shadow: 0 24px 60px rgba(0,0,0,0.5)`): el diálogo de exportar, sobre un fondo `rgba(10,10,12,0.7)`.

### Named Rules
**The Solo El Papel Flota Rule.** Solo lo que es papel lleva sombra. Lo que está sobre la mesa es plano y se delimita con reglas `linea`.

## Shapes

Esquinas casi rectas, de imprenta. Tres radios: 2px para lo impreso dentro del papel (la tinta, las acciones, el botón cerrar), 4px para los objetos de papel (chip, diálogo, aviso, teclas) y 6px para los controles sobre la mesa (botones, control segmentado). Los bordes son siempre de 1px: `linea` sobre la mesa, `tinta` sobre el papel. Las únicas excepciones son el anillo de foco (3px) y el borde punteado de 2px de la capa para soltar una imagen.

## Components

### Buttons
Rectángulos sobrios con ícono SVG de trazo y etiqueta en Barlow 600.
- **Shape:** esquinas suaves (6px), borde de 1px `linea`, 9px × 14px.
- **Secundario:** fondo `mesa-alta`, texto `texto`; al pasar el mouse, el borde se aclara (#6b6c74).
- **Principal:** fondo y borde `magenta`, texto blanco; hover `magenta-hondo`. Uno por superficie: «Generar» en la barra, «Copiar el CSS» en el diálogo.
- **Claro (sobre papel):** transparente con borde y texto `tinta`; hover con un velo de tinta al 6 %.
- **Solo ícono:** 9px × 11px; la etiqueta queda oculta a la vista pero se conserva para lectores de pantalla, y el `title` nombra el atajo. Deshacer y rehacer son así a todo ancho; hasta 820px lo son también todas las herramientas salvo la principal, que nunca pierde su texto.
- **Desactivado:** deshacer y rehacer arrancan desactivados y se activan según el historial; opacidad 0.45, cursor `not-allowed`, sin cambio de borde al pasar.
- **Foco:** anillo de 3px `magenta-claro` con 2px de separación. El botón «Desde una foto» es un `label` y muestra el anillo cuando su `input` de archivo tiene el foco.

### Control segmentado (armonías)
Cinco radios con aspecto de control segmentado: borde de 1px `linea`, radio 6px, separadores de 1px. Sin elegir: texto `texto-suave`, que pasa a `texto` al pasar el mouse. Elegida: papel lleno con tinta negra. El foco va por dentro (desplazamiento −3px). Cuando la paleta sale de una foto, ningún radio queda marcado.

### Chips (signature)
El chip es la pieza central del sistema.
- **Estructura:** papel con 8px de margen; arriba la tinta (radio 2px) con su número «N.º 01–05» en Barlow Condensed y en el color de texto que mejor contrasta (blanco o tinta, lo decide app.js); abajo la ficha: hex grande con su rótulo, RGB y HSL en una lista de dos columnas, el contraste y las acciones.
- **Contraste:** una regla de 1px `tinta` encima y dos casillas de borde 1px (contra blanco y contra negro). La mejor de las dos va impresa en tinta llena con texto papel (marca `.mejor`).
- **Acciones:** «Fijar» y «Copiar», a medio ancho cada una, borde 1px `tinta`, radio 2px. Fijar es un botón con `aria-pressed`: hueco y candado abierto es libre; lleno de tinta con texto papel y candado cerrado es fijado, y el número añade « · fijado». El foco dentro del papel usa `magenta` (más oscuro) para contrastar sobre el claro.
- **Color:** la tinta cambia con una transición de 350ms, salvo en la primera pintada (ver Motion).

### Diálogo de exportar
`<dialog>` modal de papel, hasta 560px de ancho, 24px de margen, título en mayúsculas condensadas y botón cerrar cuadrado de 38px. El código exportado va en un bloque de mesa (texto `texto`, propiedades `magenta-claro`, selectores azul claro #8fc7ff, valores papel, con una muestra de 12px de cada color). Debajo, «Copiar el CSS» (principal) y «Copiar el enlace a esta paleta» (claro). Se cierra con Esc, con el botón o al hacer clic en el fondo.

### Aviso
Un `role="status"` de papel centrado abajo (28px del borde) con una muestra de 14px del color copiado. Entra subiendo 12px y apareciendo, y se va a los 1,8s. Mientras el diálogo está abierto, el aviso se muda dentro del diálogo para que se vea y se lea sobre el modal, y vuelve al `body` al cerrarlo.

### Barra y pie
La barra lleva la marca (cinco tiras de 6 × 22px con los colores actuales, que cambian en 300ms salvo en la primera pintada, y el nombre), las armonías y las herramientas alineadas a la derecha; una regla `linea` la separa de la mesa. El pie lleva los atajos en `kbd` y el estado «5 de 5 ranuras · N fijadas» en mayúsculas condensadas.

### Motion
- **Curva única:** `cubic-bezier(0.16, 1, 0.3, 1)` para transiciones y animaciones; hovers en 150ms, colores en 300–350ms.
- **El abanico:** al generar, solo los chips libres se abren desde la base (pivote bajo el chip) con Web Animations: de un giro de (i − 2) × 6° (3° para el central), 10px abajo y opacidad 0.6 a su sitio, en 560ms, escalonados 45ms. En filas (≤ 820px) giran 3° desde la izquierda. Los fijados no se mueven.
- **Primera pintada:** las transiciones de color de la tinta y de las tiras de la marca solo existen bajo `body.listo`, que app.js añade una sola vez, en el fotograma siguiente al arranque; la paleta inicial aparece sin animarse. Toda transición nueva de color de la paleta va bajo la misma clase.
- **Movimiento reducido:** con `prefers-reduced-motion: reduce` el abanico no corre y toda transición dura 0.01ms.

## Do's and Don'ts

### Do:
- **Do** mostrar todos los datos de cada color impresos y a la vista: hex, RGB, HSL y contraste.
- **Do** usar el magenta solo para la acción principal de la superficie y para el foco (anillo de 3px `magenta-claro`, `magenta` sobre papel).
- **Do** marcar los estados como impresión: lleno en tinta es fijado o elegido, hueco con borde de 1px es libre.
- **Do** poner todo número comparable en Barlow Condensed con cifras tabulares.
- **Do** encoger la tinta antes que la ficha cuando falte espacio.
- **Do** respetar `prefers-reduced-motion` y no animar la primera pintada.

### Don't:
- **Don't** esconder los datos de un color detrás de un hover, como las columnas sin datos de Coolors.
- **Don't** añadir un segundo color de acento ni usar el magenta como relleno decorativo.
- **Don't** poner sombra a lo que está sobre la mesa; solo el papel flota.
- **Don't** agrandar la escala tipográfica para crear jerarquía; usa peso, condensación y mayúsculas.
- **Don't** mover los chips fijados al generar.
