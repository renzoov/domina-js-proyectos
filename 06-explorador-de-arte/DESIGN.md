---
name: Mi sala
description: Una sala isométrica en pastel donde cuelgas las pinturas que te gustan, junto a la lista infinita de obras del Cleveland Museum of Art.
colors:
  fondo: "#F3EDFB"
  pared: "#D9CCF5"
  pared-clara: "#E4DAF9"
  puntos: "#C9B9EF"
  piso: "#F7D9C4"
  linea: "#6B5B95"
  tinta: "#3E3360"
  tinta-suave: "#635690"
  amarillo: "#FFE58F"
  rosa: "#FFC7D9"
  blanco: "#FFFFFF"
  apagado: "#B9AEDB"
  error: "#B4234A"
  error-fondo: "#FCEFF3"
typography:
  sala:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "44px"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  ficha:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "30px"
    fontWeight: 900
    lineHeight: 1.15
  museo:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 900
    lineHeight: 1.5
  destacado:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 700
    lineHeight: 1.5
  obra:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 800
    lineHeight: 1.25
  cuerpo:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  lectura:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  detalle:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  accion:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 800
    lineHeight: 1
  cuenta:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 800
    lineHeight: 1.5
    fontFeature: "tnum"
rounded:
  cuadro: "4px"
  espera: "6px"
  tarjeta: "14px"
  ficha: "20px"
  pildora: "999px"
  redondo: "50%"
spacing:
  xxs: "4px"
  xs: "8px"
  sm: "12px"
  md: "14px"
  lg: "18px"
  xl: "24px"
  xxl: "32px"
  sala: "40px"
components:
  colgar:
    backgroundColor: "{colors.pared}"
    textColor: "{colors.tinta}"
    typography: "{typography.accion}"
    rounded: "{rounded.pildora}"
    padding: "5px 14px 5px 10px"
    height: "36px"
  colgar-hover:
    backgroundColor: "{colors.pared-clara}"
    textColor: "{colors.tinta}"
  colgar-colgada:
    backgroundColor: "{colors.linea}"
    textColor: "{colors.blanco}"
  colgar-colgada-hover:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.blanco}"
  colgar-llena:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.tinta-suave}"
    rounded: "{rounded.pildora}"
  colgar-grande:
    backgroundColor: "{colors.pared}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.pildora}"
    padding: "8px 20px 8px 14px"
    height: "48px"
  cuenta:
    backgroundColor: "{colors.amarillo}"
    textColor: "{colors.tinta}"
    typography: "{typography.cuenta}"
    rounded: "{rounded.pildora}"
    padding: "4px 12px"
  obra:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.tarjeta}"
    padding: "10px 12px 10px 10px"
  miniatura:
    backgroundColor: "{colors.blanco}"
    rounded: "{rounded.cuadro}"
    padding: "5px"
    width: "96px"
    height: "96px"
  museo:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.tinta}"
    padding: "0 24px 32px"
    width: "420px"
  aviso:
    backgroundColor: "{colors.fondo}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.tarjeta}"
    padding: "16px"
  aviso-mal:
    backgroundColor: "{colors.error-fondo}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.tarjeta}"
    padding: "16px"
  ficha:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.ficha}"
    width: "1040px"
  cerrar:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.redondo}"
    width: "44px"
    height: "44px"
---

# Design System: Mi sala

## Overview

**Creative North Star: "Tu sala en miniatura"**

El explorador es una habitación de juguete. A la izquierda, fija mientras bajas, está «Mi sala»: un cuarto isométrico dibujado en SVG, con dos paredes lila de puntos, un piso durazno de baldosas, una alfombra amarilla, un banco rosa y una planta. En las paredes hay seis huecos punteados donde se cuelgan cuadros. A la derecha corre el museo: un panel blanco con «Obras del museo», la cuenta amarilla y la lista de pinturas, que se alarga sola al llegar al final. Cada obra es una tarjeta con su miniatura enmarcada como un cuadro de la sala y un botón de píldora «Colgar». Al colgarla, el cuadro cae en su lugar desde un clavo, se balancea y queda quieto.

Es un mundo claro y pastel, con un trazo de cómic: todo lleva contorno violeta (`linea`) de 3px, sala, tarjetas, botones, marcos y la ficha. El texto es un violeta muy oscuro (`tinta`). La profundidad no viene de halos ni de vidrio, sino de sombras cortas hacia abajo en violeta translúcido, como un juguete apoyado en la mesa. Una sola familia, Nunito, del 400 al 900; los títulos van en 900 y en `linea`.

Se niega al mosaico blanco de la web de colección de cualquier museo: las obras son una lista para elegir y la sala es donde viven. Es un producto aparte, con su propio mundo: no usa el pizarrón del curso ni los mundos de los proyectos 1 a 5. Se abre con doble clic (file://), sin librerías, con Nunito en `fuentes/`.

**Key Characteristics:**
- Fondo lila muy claro; la sala es un cuarto isométrico en SVG, nunca una cuadrícula de fotos.
- Contorno de 3px en `linea` en todo lo que se toca o se enmarca.
- Las obras van enmarcadas igual en la lista, en la sala y en la ficha: paspartú blanco y marco violeta de radio 4px.
- Los botones son píldoras con contorno y una sombra corta violeta que desaparece al apretar.
- El amarillo es la cuenta; el rosa y el durazno son muebles y piso, nunca interfaz.
- Al colgar, el cuadro se asienta con un pequeño rebote; sin movimiento si la persona lo pidió.

## Colors

Un cuarto de juguete en pastel: lilas para las paredes y los botones, durazno para el piso, un violeta de contorno que lo dibuja todo, un violeta muy oscuro para leer y un solo amarillo que cuenta.

### Primary
- **Violeta de contorno** (`linea`): el trazo de 3px de la sala, las tarjetas de espera y de aviso, los botones, la cuenta (2px), la miniatura, la ficha y el borde del panel del museo. También los títulos «Mi sala», «Obras del museo» y el de la ficha, los enlaces, el hilo y el clavo de cada cuadro colgado, la barra de desplazamiento y el relleno del botón «En tu sala».

### Secondary
- **Amarillo cuenta** (`amarillo`): la píldora «24 de 3 964» junto a «Obras del museo», la selección de texto y la alfombra de la sala.
- **Rosa mueble** (`rosa`): el asiento del banco y la maceta de la planta. Sus caras en sombra son #F2A9C3 y #E595B2.

### Neutral
- **Fondo** (`fondo`): la página y la sala, el fondo de la figura en la ficha, el aviso de fin y la base de las tarjetas de espera; también `theme-color`.
- **Pared** (`pared`): la pared izquierda de la sala, el botón «Colgar» en reposo y el borde de una tarjeta al pasar el mouse.
- **Pared clara** (`pared-clara`, en CSS también `--borde-suave`): la pared derecha, el botón «Colgar» al pasar el mouse, el borde de 3px de cada tarjeta de obra, la línea bajo la cabecera del museo y entre los datos de la ficha, y el latido de las tarjetas de espera.
- **Puntos** (`puntos`): el patrón de puntos de 3.2px cada 26px sobre las dos paredes.
- **Piso** (`piso`): el piso de la sala, con las juntas de las baldosas en #EFC6AA.
- **Tinta** (`tinta`): todo el texto, el anillo de foco y el botón «En tu sala» al pasar el mouse. El fondo de la ficha abierta es `tinta` al 55 %.
- **Tinta suave** (`tinta-suave`): el texto de apoyo, autor y año en la lista, los créditos, las etiquetas de la ficha, el aviso bajo el botón y el texto del botón «Sala llena».
- **Blanco** (`blanco`): el panel del museo, las tarjetas, el paspartú de cada cuadro y la ficha.
- **Apagado** (`apagado`): el borde del botón cuando la sala está llena. El zócalo de la sala es #B9A8E3 y el hueco punteado #9D8FC7; ambos viven solo en el dibujo.
- **Error** (`error`) y **Fondo de error** (`error-fondo`): el borde y el fondo del aviso cuando falla la carga de la lista o de la sala.

La planta es verde (#9BD3AE). Ese verde, el rosa y el durazno solo viven dentro del dibujo de la sala: nunca en texto, botones ni bordes de la interfaz.

### Named Rules
**The Un Solo Contorno Rule.** Todo lo que se toca o enmarca lleva el mismo trazo: 3px en `linea` (2px en la cuenta y en las líneas finas). Las tarjetas de la lista usan `pared-clara` para no competir con la sala; al pasar el mouse, `pared`.

**The Amarillo Cuenta Rule.** El amarillo cuenta: la píldora de obras cargadas y la selección. En la sala, solo la alfombra. No pinta botones ni estados.

## Typography

**Display Font:** Nunito 900 (con system-ui)
**Body Font:** Nunito 400 a 800 (con system-ui)

**Character:** Nunito, redonda y amable, sirve a un cuarto de juguete. La jerarquía sale del peso, no de otra familia: 900 para los títulos, 800 para obras, botones y la cuenta, 700 para el autor, 400 para leer. La cuenta va con `tabular-nums`.

### Hierarchy
- **Sala** (900, 44px, 1.05, tracking −0.01em, `linea`): «Mi sala»; 34px hasta 820px.
- **Ficha** (900, 30px, 1.15, `linea`, `text-wrap: balance`): el título de la obra en la ficha.
- **Museo** (900, 22px, `linea`): «Obras del museo».
- **Destacado** (700, 17px): el autor en la ficha. La cuenta de la sala usa 400 a 17px en `tinta-suave` (15px en teléfono); el título del aviso usa 800 a 17px.
- **Obra** (800, 16px, 1.25): el título en la lista, como mucho dos líneas.
- **Cuerpo** (400, 16px, 1.5): texto base.
- **Lectura** (400, 15px, 1.6, hasta 65ch): la descripción de la ficha; los datos y los avisos usan 15px.
- **Detalle** (400, 14px, `tinta-suave`): autor · año en la lista (una línea con puntos suspensivos) y los créditos. Las etiquetas de la ficha («Fecha», «Técnica», «Inventario») usan 800 a 14px.
- **Acción** (800, 14px, 1): «Colgar», «En tu sala», «Reintentar»; 16px en «Colgar en mi sala».
- **Cuenta** (800, 14px, tabular): «24 de 3 964».

### Named Rules
**The Una Familia Rule.** Todo es Nunito. Los títulos se distinguen por el peso 900 y el color `linea`, no por otra letra ni por mayúsculas.

## Layout

La página es una rejilla de dos columnas: la sala ocupa el resto (`minmax(0, 1fr)`) y el museo 420px. La sala queda fija a la altura de la pantalla (`100dvh`) con 32px × 40px de relleno: arriba «Mi sala» y su cuenta, en medio el cuarto en SVG (viewBox 1000 × 800) que llena lo que queda, y abajo los créditos. El museo se desplaza solo: cabecera fija con el título a la izquierda y la cuenta a la derecha, y debajo la lista con 12px entre tarjetas. Al final, las tarjetas de espera o el aviso, y un centinela de 1px que dispara la siguiente carga.

Cada tarjeta de obra es una rejilla de 96px (la miniatura) y el resto, con 14px entre ellas: título y autor arriba, y «Colgar» debajo, alineado a la izquierda.

La ficha es un `<dialog>` de hasta 1040px en dos columnas (1.25fr y 1fr): la obra a la izquierda sobre `fondo` con 28px de relleno, y a la derecha el texto con 32px × 30px.

Ritmo: 4 / 8 / 12 / 14 / 18 / 24 / 32 / 40px.

Comportamiento por ancho:
- **Hasta 1100px:** el museo pasa a 360px y la sala a 28px de relleno.
- **Hasta 820px (teléfono):** una sola columna. La sala va arriba, sin quedar fija, con 20px × 16px de relleno y el cuarto hasta 52vh de alto. El museo va debajo, con un borde violeta arriba en vez de a la izquierda y 16px a los lados. La ficha apila la obra (hasta 50dvh) sobre el texto y se desplaza entera.

**The Sala y Museo Rule.** La sala y la lista se ven juntas: la sala a la izquierda y la lista a la derecha en pantallas grandes, la sala arriba en el teléfono. Seis lugares, ni uno más.

## Elevation & Depth

Las cosas están apoyadas o colgadas, como juguetes. La profundidad viene del tono (fondo lila, panel blanco, paredes de dos lilas) y de sombras cortas, verticales, sin desenfoque y en violeta translúcido.

### Shadow Vocabulary
- **Apoyo** (`box-shadow: 0 3px 0 rgba(107, 91, 149, .22)`): los botones de píldora. Al apretar, el botón baja 2px y la sombra desaparece. El botón «Sala llena» no la lleva.
- **Ficha** (`box-shadow: 0 10px 0 rgba(107, 91, 149, .25)`): la ficha abierta, sobre el fondo `tinta` al 55 %.
- **Cuadro colgado** (rectángulo `rgba(107, 91, 149, .25)` desplazado 4px × 5px detrás del marco): cada cuadro en la pared de la sala.

### Named Rules
**The Sombra de Juguete Rule.** Las sombras son cortas y violetas, sin desenfoque, y dicen sobre qué se apoya algo. No hay halos, brillos, desenfoques de fondo ni vidrio.

## Shapes

Esquinas suaves para lo que se toca y chicas para lo que se enmarca: 4px en todos los marcos de obra (miniatura, cuadro en la pared, imagen de la ficha) y en los huecos punteados; 6px en las barras de las tarjetas de espera; 14px en tarjetas, avisos y en el aviso de la sala; 20px en la ficha. Lo redondo: los botones y la cuenta son píldoras (999px) y «Cerrar» es un círculo de 44px. La sala es isométrica: paredes y piso son polígonos con esquinas redondeadas en la unión (`stroke-linejoin: round`), y los lugares de cada pared se inclinan con una matriz (`matrix(1 ∓.5 0 1 …)`) para seguir su plano.

Los íconos (clavo, listo, cerrar, afuera, reintentar) son `<symbol>` SVG de trazo 2.2 y puntas redondas, dibujados una vez en el HTML y reusados con `<use>`.

## Components

### Cuadro (signature)
La obra enmarcada, igual en los tres lugares donde aparece: paspartú `blanco` y marco de 3px en `linea` con radio 4px.
- **En la lista:** botón de 96px con 5px de paspartú y la imagen `contain`; cursor de lupa. Al pasar el mouse se inclina −2°. La imagen aparece en 400ms cuando termina de cargar; si falla, queda un cuadro `pared-clara`.
- **En la pared:** dentro del hueco punteado, con 8px de paspartú, un hilo de 2px en `linea` hasta un clavo de 4.5px y la sombra corrida. Es un botón que abre la ficha; al pasar el mouse el marco engrosa a 5px, y con el foco pasa a 6px en `tinta`.
- **En la ficha:** la imagen grande con 8px de paspartú sobre `fondo`.

### Lugar vacío
Un rectángulo de radio 4px en blanco al 35 %, con borde punteado (8 / 7) de 2.5px en #9D8FC7. Tres lugares por pared: uno grande (150 × 188) y dos chicos (104 × 84).

### Botón «Colgar»
- **Shape:** píldora con contorno de 3px en `linea`, al menos 36px de alto (48px en «Colgar en mi sala»), ícono de 20px a la izquierda y la sombra de apoyo.
- **Reposo:** relleno `pared`, texto `tinta`, ícono del clavo. Al pasar el mouse, `pared-clara`; al apretar, baja 2px y pierde la sombra.
- **En tu sala:** relleno `linea`, texto `blanco`, ícono de listo; al pasar el mouse, `tinta`. En la ficha dice «Descolgar de mi sala» con el ícono de cerrar.
- **Sala llena:** relleno `blanco`, borde `apagado`, texto `tinta-suave`, sin sombra y con cursor de prohibido; usa `aria-disabled`.
- **Reintentar** usa la misma píldora con el ícono de reintentar.

### Tarjeta de obra
Fondo `blanco`, borde de 3px en `pared-clara`, radio 14px, 10px × 12px de relleno; al pasar el mouse el borde pasa a `pared` en 200ms. Miniatura, título (Obra), autor · año (Detalle) y «Colgar».

### Cuenta
Píldora `amarillo` con borde de 2px en `linea`, texto `tinta` (Cuenta), 4px × 12px. Dice «Cargando…» y luego «n de 3 964».

### Espera, aviso y fin
- **Tarjetas de espera:** el mismo marco que una obra (borde `pared-clara`, radio 14px, 122px de alto), con barras de radio 6px que laten de `fondo` a `pared-clara` cada 1.2s.
- **Aviso:** borde de 3px en `linea`, fondo `fondo`, radio 14px, 16px de relleno; título en 800 a 17px y texto en `tinta-suave`. Cuando algo falla, borde `error` y fondo `error-fondo`, con «Reintentar» debajo.
- **Aviso de la sala:** la misma forma, en fila, cuando no se pudieron volver a pedir obras guardadas.

### Ficha
Un `<dialog>` `blanco` de hasta 1040px, borde de 3px en `linea`, radio 20px y la sombra de ficha. Entra en 250ms subiendo 12px. «Cerrar» es un círculo de 44px con contorno arriba a la derecha (al pasar el mouse, `fondo`). Texto: título (Ficha), autor (Destacado), una lista de datos con etiqueta de 96px y una línea de 2px en `pared-clara` debajo de cada fila, «Colgar en mi sala» y el enlace «Ver en el museo» (800, `linea`, subrayado de 2px, con el ícono de afuera), el aviso y la descripción.

### Foco
Un anillo de 3px en `tinta` separado 3px. En la sala, el marco del cuadro engrosa a 6px en `tinta`.

### Motion
- **Asentarse:** al colgar, el cuadro cae 36px girado −7° y transparente, baja 3px de más con 4°, vuelve a −2° y queda quieto, en 700ms con `cubic-bezier(.2, .8, .2, 1)`, girando desde arriba (`transform-origin: 50% 0`). Lo hace `animate()` desde app.js.
- **Movimiento reducido:** con `prefers-reduced-motion: reduce` el cuadro aparece sin animación y las transiciones y animaciones de CSS duran 0.01ms.

## Do's and Don'ts

### Do:
- **Do** dibujar todo lo que se toca o enmarca con el contorno de 3px en `linea`.
- **Do** enmarcar cada obra igual en la lista, la pared y la ficha: paspartú `blanco` y marco `linea` de radio 4px.
- **Do** usar píldoras con contorno y la sombra de apoyo de 3px para las acciones; al apretar, bajan 2px y pierden la sombra.
- **Do** guardar el amarillo para la cuenta, la selección y la alfombra.
- **Do** escribir los títulos en Nunito 900 y `linea`, y la cuenta con `tabular-nums`.
- **Do** dibujar el foco como un anillo de 3px en `tinta` separado 3px.
- **Do** respetar `prefers-reduced-motion`: el cuadro aparece sin rebote.

### Don't:
- **Don't** volver el museo un mosaico blanco de fotos sin marco.
- **Don't** sacar el rosa, el durazno ni el verde de la sala a textos, botones o bordes.
- **Don't** usar halos, brillos, desenfoques ni vidrio; las sombras son cortas, verticales y violetas.
- **Don't** añadir una segunda familia tipográfica.
- **Don't** poner en los textos ni la interfaz nada que no sean letras, números y signos de puntuación.
