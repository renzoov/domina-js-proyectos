---
name: Ferretería Don Lucho
description: El tablero perforado de una ferretería de barrio; las herramientas cuelgan de ganchos con su etiqueta naranja de precio y lo que llevas va a la caja de herramientas azul que espera abajo.
colors:
  madera: "#2b2118"
  barra: "#1f1811"
  tablero: "#8a5a2b"
  agujero: "#4a2f16"
  marco: "#6e4520"
  naranja: "#f2a541"
  naranja-hondo: "#d98a22"
  naranja-claro: "#f7b45c"
  azul: "#2e6f95"
  azul-hondo: "#255b7a"
  claro: "#f7f3ea"
  suave: "#d9cbb4"
  metal: "#c9c6bd"
  metal-oscuro: "#9aa0a6"
  borde-campo: "#8a7560"
  sugerido: "#9c8d78"
  error: "#ff9f80"
typography:
  marca:
    fontFamily: "Oswald, sans-serif"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.04em"
  precio-grande:
    fontFamily: "Oswald, sans-serif"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1.1
  dialogo:
    fontFamily: "Oswald, sans-serif"
    fontSize: "30px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.04em"
  pasillo:
    fontFamily: "Oswald, sans-serif"
    fontSize: "28px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "0.03em"
  total:
    fontFamily: "Oswald, sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1.1
    fontFeature: "tnum"
  caja:
    fontFamily: "Oswald, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "0.04em"
  precio:
    fontFamily: "Oswald, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.15
    fontFeature: "tnum"
  accion:
    fontFamily: "Oswald, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.05em"
  accion-chica:
    fontFamily: "Oswald, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.06em"
  menu:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.45
  nombre:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.15
  cuerpo:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.45
  detalle:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.45
  pegatina:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.45
rounded:
  etiqueta: "3px"
  chico: "4px"
  control: "6px"
  ver: "8px"
  dialogo: "10px"
  caja: "10px 10px 14px 14px"
  pildora: "16px"
  redondo: "50%"
spacing:
  xxs: "4px"
  xs: "8px"
  sm: "12px"
  md: "14px"
  lg: "18px"
  xl: "24px"
  xxl: "30px"
  borde-pagina: "48px"
components:
  tablero:
    backgroundColor: "{colors.tablero}"
    rounded: "{rounded.control}"
    padding: "18px 34px 22px"
  etiqueta:
    backgroundColor: "{colors.naranja}"
    textColor: "{colors.madera}"
    rounded: "{rounded.etiqueta}"
    padding: "6px 12px 7px"
  agregar:
    backgroundColor: "{colors.barra}"
    textColor: "{colors.claro}"
    typography: "{typography.accion-chica}"
    rounded: "{rounded.chico}"
    padding: "0 16px"
    height: "36px"
  en-caja:
    backgroundColor: "{colors.azul}"
    textColor: "{colors.claro}"
    typography: "{typography.pegatina}"
    rounded: "{rounded.dialogo}"
    padding: "2px 10px"
  boton:
    backgroundColor: "{colors.naranja}"
    textColor: "{colors.madera}"
    typography: "{typography.accion}"
    rounded: "{rounded.control}"
    padding: "0 26px"
    height: "48px"
  boton-hover:
    backgroundColor: "{colors.naranja-claro}"
    textColor: "{colors.madera}"
  boton-pagar:
    backgroundColor: "{colors.naranja}"
    textColor: "{colors.madera}"
    rounded: "{rounded.control}"
    padding: "0 34px"
    height: "56px"
  boton-borde:
    backgroundColor: "transparent"
    textColor: "{colors.claro}"
    rounded: "{rounded.control}"
    height: "48px"
  contador:
    backgroundColor: "{colors.azul}"
    textColor: "{colors.claro}"
    typography: "{typography.menu}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "46px"
  caja:
    backgroundColor: "{colors.azul}"
    textColor: "{colors.claro}"
    rounded: "{rounded.caja}"
    padding: "14px 24px 24px"
  item:
    backgroundColor: "{colors.azul-hondo}"
    textColor: "{colors.claro}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
    width: "220px"
  pasillo-actual:
    backgroundColor: "{colors.naranja}"
    textColor: "{colors.madera}"
    typography: "{typography.accion}"
    rounded: "{rounded.chico}"
    width: "42px"
    height: "42px"
  campo:
    backgroundColor: "{colors.madera}"
    textColor: "{colors.claro}"
    rounded: "{rounded.control}"
    padding: "0 14px"
    height: "46px"
  dialogo:
    backgroundColor: "{colors.barra}"
    textColor: "{colors.claro}"
    rounded: "{rounded.dialogo}"
    padding: "30px 32px 28px"
    width: "560px"
  vista:
    backgroundColor: "{colors.barra}"
    textColor: "{colors.claro}"
    rounded: "{rounded.dialogo}"
    width: "720px"
---

# Design System: Ferretería Don Lucho

## Overview

**Creative North Star: "El tablero perforado de la ferretería del barrio"**

La tienda es la pared de una ferretería de barrio: un tablero perforado de madera, con un agujero cada 32px, del que cuelgan diez herramientas por pasillo. Cada una sale de un agujero por un gancho de metal, tiene su dibujo plano y, debajo, su etiqueta de cartón naranja con el nombre y el precio en soles; más abajo, el botón negro «Agregar». Lo que llevas va a la caja de herramientas azul que espera bajo el tablero, con su asa de metal arriba. Al agregar, la herramienta se balancea en su gancho y el número del contador salta.

El sistema es un local de noche: piso de madera oscura (`madera`), una barra más oscura arriba (`barra`) y el tablero marrón claro (`tablero`) con agujeros (`agujero`) y marco (`marco`). Dos colores de trabajo que nunca se cruzan: naranja de etiqueta para el precio, la marca, lo elegido y la acción principal; azul de caja para todo lo que ya es tuyo (la caja, el contador, la pegatina «En tu caja»). El texto es un blanco cálido (`claro`) y los detalles un beige (`suave`). Dos familias: Oswald condensada en mayúsculas para lo que se pinta en un rótulo (marca, títulos, precios, acciones) y Barlow para leer. Esquinas chicas (3 a 10px); las sombras son cortas, como de cosas colgadas, y nunca halos.

Se niega a la cuadrícula de tarjetas blancas con foto de la tienda en línea genérica. Es un producto aparte, con su propio mundo: no usa el pizarrón del curso ni los mundos de los proyectos 1 a 4. Se abre con doble clic (file://), sin librerías, con las fuentes en `fuentes/`.

**Key Characteristics:**
- Fondo de madera oscura; nunca un fondo claro.
- Los productos cuelgan del tablero perforado, cinco por fila, cada uno con gancho, dibujo, etiqueta naranja y «Agregar».
- Naranja es la etiqueta y la acción; azul es lo que ya llevas. No se intercambian.
- Los dibujos son SVG planos de un `<symbol>` cada uno; el color propio de cada producto entra por la variable `--c`.
- La caja de herramientas azul abajo, a todo el ancho, con los pasillos, el total y «Pagar» a su derecha.
- La vista rápida y el pago son paneles de `barra` que flotan sobre la tienda oscurecida.

## Colors

Una ferretería en madera: tres tonos de madera para el local y el tablero, un blanco cálido para leer y dos colores de trabajo, naranja y azul, que nunca cambian de papel.

### Primary
- **Naranja de etiqueta** (`naranja`): el fondo de cada etiqueta de precio, el nombre de la tienda, la sección y el pasillo actuales, el botón principal («Pagar», «Agregar a la caja», «Seguir comprando»), el número del contador justo después de un cambio, el sello de «¡Pago confirmado!», el anillo de foco y la selección de texto.
- **Naranja hondo** (`naranja-hondo`): el canto de 3px bajo los botones naranjas.
- **Naranja claro** (`naranja-claro`): el botón naranja al pasar el mouse.

### Secondary
- **Azul de caja** (`azul`): la caja de herramientas, el contador «Tu caja» de la barra y la pegatina «En tu caja: n» de cada etiqueta.
- **Azul hondo** (`azul-hondo`): la base de la caja (franja interior de 14px abajo), cada cosa dentro de la caja, el canto del contador y el riel de la barra de desplazamiento de la caja.

### Neutral
- **Madera** (`madera`): la página, el relleno de los campos del pago y el texto sobre naranja.
- **Barra** (`barra`): la barra de arriba, los botones «Agregar», la vista rápida y el diálogo de pago; también `theme-color`.
- **Tablero** (`tablero`), **Agujero** (`agujero`) y **Marco** (`marco`): el tablero perforado, sus agujeros de 3px de radio cada 32px y su marco interior de 6px. El tablero se repite como fondo del dibujo en la vista rápida.
- **Claro** (`claro`): todo el texto de lectura, el número del contador en reposo, el anillo de foco dentro del tablero.
- **Suave** (`suave`): las secciones de la barra que no son la actual, el resumen «40 productos · pasillo 1 de 4», «Pasillo», «Total», el subtotal de cada cosa en la caja, el resumen del pago y el texto de «¡Pago confirmado!»; también el borde de 2px del botón de borde.
- **Metal** (`metal`) y **Metal oscuro** (`metal-oscuro`): el gancho de cada herramienta, el asa de la caja y las partes de metal de los dibujos.
- **Borde de campo** (`borde-campo`): el borde de 1px de los campos del pago.
- **Texto sugerido** (`sugerido`): el texto de ejemplo de los campos («1234 5678 9012 3456», «MM/AA»).
- **Error** (`error`): el mensaje bajo un campo mal llenado, el borde de ese campo y «La tarjeta fue rechazada».

Los dibujos usan su propia pintura de ferretería (rojo #c0392b, amarillo #f2c14e, verde #3e7d3a, celeste #7fb3d5, ocre #b7791f, dorado #c9a14a y otros), guardada en cada producto de `app.js`. Esa pintura solo vive dentro de los dibujos: nunca en texto, bordes ni fondos de la interfaz.

### Named Rules
**The Naranja Etiqueta Rule.** El naranja dice «esto cuesta», «esto es donde estás» o «haz esto»: etiquetas, marca, sección y pasillo actuales, el botón principal y el foco. Nada que ya esté en tu caja es naranja; la única excepción es el número del contador justo después de un cambio, que avisa y se apaga en cuanto lo miras.

**The Azul Caja Rule.** El azul es solo lo que llevas: la caja, el contador y la pegatina «En tu caja». Fuera del contador, que es el camino a la caja, no pinta botones, enlaces ni estados de la tienda.

## Typography

**Display Font:** Oswald 600/700 (con sans-serif)
**Body Font:** Barlow 400/500/600 (con system-ui)

**Character:** Oswald es la letra condensada de un rótulo pintado a mano en una ferretería; en mayúsculas con algo de espacio entre letras se lee de lejos. Barlow, con su aire de letrero técnico, lleva lo que se lee de cerca. Todo precio, total y cantidad va con `tabular-nums`.

### Hierarchy
- **Marca** (Oswald 700, 32px, 1, tracking 0.04em, mayúsculas, `naranja`): «Ferretería Don Lucho»; 20px y tracking 0.02em en teléfono.
- **Precio grande** (Oswald 700, 32px): el precio en la vista rápida.
- **Diálogo** (Oswald 700, 30px, tracking 0.04em, mayúsculas): «Pagar» y «¡Pago confirmado!». El nombre del producto en la vista rápida usa Oswald 600 a 30px sin mayúsculas.
- **Pasillo** (Oswald 600, 28px, 1.1, tracking 0.03em, mayúsculas): el nombre de la sección arriba del tablero.
- **Total** (Oswald 700, 28px, tabular): el monto junto a «Total».
- **Caja** (Oswald 600, 22px, tracking 0.04em, mayúsculas): «Tu caja».
- **Precio** (Oswald 700, 20px, tabular): el precio en la etiqueta, en soles con `Intl.NumberFormat('es-PE')` («S/ 24.90»).
- **Acción** (Oswald 700, 18px, tracking 0.05em, mayúsculas): los botones; 22px en «Pagar». Los números de pasillo usan Oswald 600 a 18px.
- **Acción chica** (Oswald 600, 15px, tracking 0.06em, mayúsculas): «Agregar» bajo cada etiqueta.
- **Menú** (Barlow 500, 17px): las secciones de la barra; el contador usa Barlow 600 a 17px (16px en teléfono).
- **Nombre** (Barlow 600, 16px, 1.15): el nombre en la etiqueta y en cada cosa de la caja; 15px en teléfono.
- **Cuerpo** (Barlow 400, 16px, 1.45): texto base, descripción de la vista rápida, campos (17px), etiquetas de campo (600).
- **Detalle** (Barlow 400, 15px): el aviso del pago de prueba y los mensajes de error.
- **Pegatina** (Barlow 600, 14px): «En tu caja: 2».

### Named Rules
**The Rótulo y Letra Rule.** Oswald es solo para lo que iría pintado en un rótulo: marca, títulos, precios, total y acciones. Todo lo que se lee de corrido es Barlow. No hay una tercera familia.

**The Soles Tabulares Rule.** Todo precio, total, cantidad y el número del contador va con `tabular-nums`, para que nada salte al sumar.

## Layout

La página es una barra arriba y la tienda debajo, con 48px a los lados. La barra mide al menos 84px: la marca, las secciones (Todo, Herramientas, Pinturas, Tornillos, Jardín) con 22px entre ellas y, empujado a la derecha, el contador. Debajo, una línea con el nombre de la sección a la izquierda y el resumen a la derecha, alineados por la línea de base.

El tablero va a todo el ancho: una rejilla de cinco columnas iguales con 14px × 26px de separación y 18px × 34px de relleno, diez productos en dos filas. Cada producto es una columna centrada: gancho, dibujo (hasta 132px de ancho), etiqueta y «Agregar».

Bajo el tablero, a 18px, el pie: la caja (`minmax(0, 1fr)`) a la izquierda y, a la derecha, alineados abajo y a la derecha, los pasillos (1 a 4), el total y «Pagar», con 12px entre ellos. Dentro de la caja, las cosas van en una fila que se desliza de lado, con 12px entre ellas. Ritmo: 4 / 8 / 12 / 14 / 18 / 24 / 30 / 48px.

Comportamiento por ancho:
- **Hasta 1100px:** 24px a los lados; el tablero se aprieta a 14px × 12px de separación y los nombres de las etiquetas reservan dos líneas para que todas midan lo mismo.
- **Hasta 820px:** el tablero pasa a dos columnas; la caja ocupa todo el ancho y debajo van, en una fila, los pasillos, el total y «Pagar».
- **Hasta 640px (teléfono):** la barra queda fija arriba con 16px a los lados: marca y contador en la primera línea, las secciones en una sola fila que se desliza de lado y se desvanece a la derecha. Las cosas de la caja se apilan. La vista rápida pone el dibujo arriba (200px de alto) y el texto abajo; el pago pone «Vence» y «Código» uno bajo el otro.

**The Cinco Ganchos Rule.** Un pasillo son diez productos en el tablero: cinco por fila en pantallas grandes, dos en el teléfono. Nunca una lista ni tarjetas sueltas fuera del tablero.

## Elevation & Depth

Las cosas cuelgan o descansan; no flotan. La profundidad viene del tono (madera, barra, tablero) y de tres tipos de sombra, todas propias del mundo:

### Shadow Vocabulary
- **Canto** (`box-shadow: 0 3px 0` del tono hondo del mismo color): el grosor de los botones naranjas (`naranja-hondo`) y del contador (`azul-hondo`). Al apretar el botón, baja 2px y el canto queda en 1px. El tablero lleva su propio canto, `0 6px 0 rgba(0, 0, 0, 0.25)`, y la caja su base con `inset 0 -14px 0` `azul-hondo`. Siempre vertical, sin desenfoque y del mismo color en más hondo; nunca un desplazamiento diagonal en negro.
- **Colgado** (sombra corta en marrón oscuro): el dibujo (`drop-shadow(2px 5px 4px rgba(40, 22, 8, 0.35))`), la etiqueta (`1px 3px 6px rgba(40, 22, 8, 0.4)`) y la pegatina (`0 2px 4px rgba(40, 22, 8, 0.45)`).
- **Panel encima** (`0 24px 60px rgba(0, 0, 0, 0.6)`): solo la vista rápida y el diálogo de pago, con el fondo oscurecido al 70 a 75 %.
- **Marco** (`inset 0 0 0 6px` `marco`): el borde del tablero, hecho con sombra para no mover nada.

### Named Rules
**The Colgado No Halo Rule.** Las sombras dicen de dónde cuelga o sobre qué descansa algo: cortas, hacia abajo y en marrón. No hay halos de color ni brillos alrededor de nada.

## Shapes

Esquinas chicas en todo: 3px en la etiqueta de cartón; 4px en «Agregar» y en los pasillos; 6px en el tablero, botones, contador, campos, aviso y cada cosa de la caja; 8px en la zona del dibujo que abre la vista rápida; 10px en la vista rápida y el diálogo. La caja tiene 10px arriba y 14px abajo, como una caja de verdad. Lo redondo: los botones − y + de la caja (32px), el número del contador (píldora de 28px de alto), la pegatina, los agujeros y el sello de confirmación. El gancho es un trazo de 3px en `metal` con la parte de abajo curva (radio 7px) que sale de un agujero de 9px. El asa de la caja es un trazo de 6px en `metal-oscuro`, de 120px de ancho, con esquinas de 10px.

Los dibujos de las herramientas (24) y los íconos − y + son `<symbol>` SVG dibujados una vez en el HTML y reusados con `<use>`.

## Components

### Producto del tablero (signature)
- **Gancho:** 12px × 18px sobre su agujero, todo en `metal` y `agujero`.
- **Dibujo:** un botón sin fondo con el dibujo y cursor de lupa; al pasar el mouse, un fondo negro al 12 % con radio 8px. Abre la vista rápida.
- **Etiqueta:** cartón `naranja`, radio 3px, 6px × 12px de relleno, texto `madera` centrado: el nombre (Nombre) y el precio (Precio).
- **Pegatina «En tu caja: n»:** cuando el producto ya está en la caja, una píldora `azul` con texto `claro` (Pegatina) en la esquina de arriba a la derecha de la etiqueta, encima de ella, para que la fila no cambie de alto.
- **Agregar:** botón `barra` con texto `claro` (Acción chica), 36px de alto, radio 4px; al pasar el mouse, negro.
- **Foco:** dentro del tablero el anillo es `claro` en vez de naranja.

### Contador «Tu caja»
Un enlace a la caja: `azul`, 46px de alto (40px en teléfono), radio 6px, canto `azul-hondo`, «Tu caja» en Barlow 600 y el número en una píldora `claro` con texto `azul`. Cuando la caja cambia, también desde otra pestaña, el número salta y queda en `naranja` con texto `madera` hasta que pasas el mouse o el foco por el contador.

### Botón principal
- **Shape:** radio 6px, 48px de alto, 26px a los lados (56px y 34px en «Pagar»), canto `naranja-hondo` de 3px.
- **Activo:** relleno `naranja`, texto `madera` (Acción). Al pasar el mouse, `naranja-claro`; al apretar, baja 2px.
- **Desactivado:** sin canto y con cursor normal. Fondo #4a3b2e y texto #cbbfa9 (5.9:1).

### Botón de borde
«Cerrar» y «Volver a la tienda»: transparente, texto `claro`, borde interior de 2px en `suave`; al pasar el mouse, un blanco al 8 %.

### La caja
`azul`, radio 10px 10px 14px 14px, 14px × 24px de relleno, al menos 140px de alto, con la base `azul-hondo` y el asa encima. Título «Tu caja» (Caja). Cada cosa es una ficha `azul-hondo` de al menos 220px, radio 6px: el dibujo a 44px, el nombre, y debajo − cantidad + y el subtotal en `suave`. Los botones − y + son círculos de 32px sin relleno con el ícono en `claro`; al pasar el mouse, un blanco al 15 %. Borde de 1px en `claro` al 80 % (4.9:1 sobre `azul-hondo`). Vacía: «Todavía está vacía. Agrega herramientas del tablero.» en `claro`.

### Pasillos
«Pasillo» en `suave` y un cuadro de 42px por número, radio 4px, borde de 2px, número en `suave` (Oswald 600 18px). El actual: relleno y borde `naranja`, número `madera`. Al pasar el mouse, el borde pasa a `naranja`. En reposo, el borde es #9c8d78 (4.9:1 sobre `madera`); `marco` es solo el marco del tablero.

### Vista rápida
Un popover de hasta 720px en dos columnas: a la izquierda el dibujo sobre un trozo de tablero perforado (300px), a la derecha el nombre, la descripción, el precio (Precio grande) y «Agregar a la caja» con «Cerrar». Se cierra con Escape o tocando afuera.

### Pago
Un `<dialog>` de hasta 560px, `barra`, 30px × 32px de relleno. Arriba «Pagar» (Diálogo), un aviso en azul al 30 % («Es un pago de prueba: no se cobra nada…») y el resumen. Cada campo: etiqueta en Barlow 600, campo de 46px, relleno `madera`, borde de 1px `borde-campo`, radio 6px, texto de 17px; con el foco, el borde pasa a `naranja` y el anillo queda pegado. Mal llenado: borde `error` y el mensaje debajo en `error` (Detalle), conectado con `aria-describedby`. Al pagar, el botón dice «Procesando…» y los campos bajan al 60 %; si la tarjeta se rechaza, el mensaje sale en `error`. Confirmado: el sello naranja de 84px con la marca en `madera`, «¡Pago confirmado!», el número de pedido y «Seguir comprando».

### Motion
- **Balanceo:** al agregar, la herramienta gira sobre su gancho (`transform-origin: 50% 0`): 7°, −5°, 2.5° y quieta, en 900ms con `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Salto:** el número del contador sube 7px y vuelve en 420ms con la misma curva.
- **Movimiento reducido:** con `prefers-reduced-motion: reduce` no hay animaciones ni transiciones.

## Do's and Don'ts

### Do:
- **Do** colgar cada producto del tablero perforado con su gancho, su dibujo, su etiqueta naranja y «Agregar».
- **Do** guardar el naranja para etiquetas, marca, lo actual, la acción principal y el foco.
- **Do** guardar el azul para la caja, el contador y la pegatina «En tu caja».
- **Do** usar Oswald en mayúsculas solo para rótulos, precios y acciones; Barlow para leer.
- **Do** escribir precios, totales y cantidades en soles con `Intl.NumberFormat` y `tabular-nums`.
- **Do** dar a los botones naranjas y al contador un canto vertical de 3px del mismo color en más hondo.
- **Do** dibujar el foco como un anillo de 3px separado 3px: `naranja` fuera del tablero, `claro` dentro.
- **Do** respetar `prefers-reduced-motion`: nada se balancea ni salta.

### Don't:
- **Don't** poner en los nombres, los textos ni la interfaz nada que no sean letras, números y signos de puntuación.
- **Don't** volver la tienda una cuadrícula de tarjetas blancas con foto.
- **Don't** usar fondos claros: el local es siempre de madera oscura.
- **Don't** usar el azul para otros botones o enlaces que no sean el contador, ni el naranja para lo que ya está en la caja (salvo el aviso del contador tras un cambio).
- **Don't** sacar la pintura de los dibujos (rojo, verde, amarillo…) a textos, bordes o fondos de la interfaz.
- **Don't** usar halos, brillos ni sombras diagonales en negro; las sombras cuelgan hacia abajo.
- **Don't** redondear más de 10px nada que no sea una píldora, un círculo o la base de la caja.
- **Don't** añadir una tercera familia tipográfica.
