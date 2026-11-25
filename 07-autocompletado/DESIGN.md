---
name: Viaja a un artículo
description: Un buscador de Wikipedia que sugiere mientras escribes; cada resultado es un billete de avión con la foto de su destino, y el elegido trae su resumen con el sello «ELEGIDO».
colors:
  azul: "#0E2A5C"
  azul-hondo: "#0A1F45"
  azul-hover: "#173E85"
  azul-claro: "#9FB6E0"
  blanco: "#FFFFFF"
  papel: "#F4F6FB"
  rojo: "#E0263A"
  morado: "#6E3FA8"
  tinta-suave: "#4B5C7C"
  corte: "#B9C4D8"
  foco: "#FFD24D"
typography:
  titular:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "72px"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 72"
  grande:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "46px"
    fontWeight: 900
    lineHeight: 0.98
    fontVariation: "'wdth' 72"
  numero:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "54px"
    fontWeight: 900
    lineHeight: 1
    fontFeature: "tnum"
    fontVariation: "'wdth' 72"
  destino:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 900
    lineHeight: 1
    fontVariation: "'wdth' 75"
  sello:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "26px"
    fontWeight: 900
    letterSpacing: "0.08em"
    fontVariation: "'wdth' 75"
  campo:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "30px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.01em"
  bajada:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.5
  cuerpo:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  resumen:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  detalle:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  accion:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 800
    lineHeight: 1
  etiqueta:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 800
    letterSpacing: "0.18em"
rounded:
  barra: "4px"
  sello: "6px"
  boton: "8px"
  billete: "10px"
  grande: "14px"
  muesca: "50%"
spacing:
  xxs: "4px"
  xs: "8px"
  sm: "12px"
  md: "14px"
  lg: "18px"
  xl: "22px"
  xxl: "28px"
  pagina: "48px"
  canal: "56px"
components:
  billete:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.azul}"
    rounded: "{rounded.billete}"
    height: "150px"
  billete-talon:
    textColor: "{colors.morado}"
    width: "110px"
  billete-talon-elegido:
    backgroundColor: "{colors.rojo}"
    textColor: "{colors.blanco}"
  campo:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.azul}"
    typography: "{typography.campo}"
    rounded: "{rounded.grande}"
    padding: "0 72px 0 66px"
    height: "76px"
  borrar:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.azul}"
    rounded: "{rounded.billete}"
    width: "48px"
    height: "48px"
  boton:
    backgroundColor: "{colors.azul}"
    textColor: "{colors.blanco}"
    typography: "{typography.accion}"
    rounded: "{rounded.boton}"
    padding: "8px 18px 8px 14px"
    height: "44px"
  boton-hover:
    backgroundColor: "{colors.azul-hover}"
    textColor: "{colors.blanco}"
  billete-grande:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.azul}"
    rounded: "{rounded.grande}"
    width: "480px"
  sello:
    textColor: "{colors.rojo}"
    typography: "{typography.sello}"
    rounded: "{rounded.sello}"
    padding: "4px 12px"
  aviso:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.azul}"
    rounded: "{rounded.billete}"
    padding: "22px 24px"
---

# Design System: Viaja a un artículo

## Overview

**Creative North Star: "El mostrador de embarque"**

Buscar es elegir a dónde viajar. La página es un mostrador de aerolínea de noche: un azul profundo con rutas de avión punteadas apenas visibles y un brillo más claro arriba a la derecha. Arriba a la izquierda, «VIAJA A UN ARTÍCULO» en Archivo negra y condensada, y la caja de búsqueda, grande y blanca. Debajo cae el mazo: cada resultado de Wikipedia es un billete blanco con la foto del artículo a la izquierda, «DESTINO» y su número en el talón, y el título en mayúsculas con la parte que coincide en rojo. Los billetes se montan unos sobre otros en abanico, cada uno un poco más a la derecha e inclinado al revés que el anterior. A la derecha, fijo mientras bajas, está el billete grande del elegido: la foto arriba, el título, el resumen, «Leer en Wikipedia» y el sello rojo «ELEGIDO», que cae de golpe.

Es un mundo oscuro de papel impreso: el azul es el fondo y también la tinta de los billetes, el blanco es el papel, el rojo es la tinta del sello y el morado carbón numera los talones. La profundidad son sombras hondas y azuladas, como billetes sobre una mesa con poca luz. Una sola familia, Archivo variable, que se condensa por el eje `wdth` (72 a 75) en todo lo que se imprime grande y en mayúsculas, y se queda en ancho normal para leer.

Se niega a la lista desplegable blanca del buscador de Wikipedia: los resultados son billetes con foto, no renglones. Es un producto aparte, con su propio mundo: no usa el pizarrón del curso ni los mundos de los proyectos 1 a 6. Se abre con doble clic (file://), sin librerías, con Archivo en `fuentes/`.

**Key Characteristics:**
- Fondo `azul` con rutas punteadas al 7 % de blanco; nunca un fondo claro.
- Cada resultado es un billete: foto, cuerpo y talón separados por una línea de corte punteada con dos muescas redondas.
- El mazo va en abanico: montado, corrido a la derecha y con giros alternos de ±1.2°.
- Todo lo impreso grande va en Archivo 900, condensado (`wdth` 72–75) y en mayúsculas.
- El rojo marca lo que coincide, la etiqueta «DESTINO», el talón del elegido y el sello.
- Los billetes caen al llegar, el elegido sale del mazo y el sello se estampa; sin movimiento si la persona lo pidió.

## Colors

Un azul de aerolínea de noche, papel blanco, una tinta roja de sello y un morado para numerar.

### Primary
- **Azul aerolínea** (`azul`): el fondo de la página, `theme-color`, el relleno de los botones («Reintentar», «Leer en Wikipedia») y las muescas del talón, que dejan ver el fondo. También es la tinta de los billetes: en CSS `--tinta` tiene el mismo valor. Al pasar el mouse, los botones pasan a `azul-hover`.

### Secondary
- **Rojo sello** (`rojo`): la parte que coincide en cada título (`<mark>` sin fondo), la etiqueta «DESTINO», el talón del billete elegido (relleno rojo con la etiqueta en #FFD9DD), el sello «ELEGIDO», la descripción del billete grande, el talón anulado del aviso, el cursor de la caja, el anillo de foco de la caja y la selección de texto.

### Tertiary
- **Morado carbón** (`morado`): el número grande del talón, «01», «02»…

### Neutral
- **Azul hondo** (`azul-hondo`): el fondo de una foto que no llegó (con un avión en `azul-claro` al 55 %) y el carril de la barra de desplazamiento.
- **Azul claro** (`azul-claro`): la bajada, el texto de estado bajo la caja y el pulgar de la barra de desplazamiento. Lo que se resalta dentro del estado va en `blanco`.
- **Blanco** (`blanco`): el papel de los billetes, la caja de búsqueda, el billete grande y los avisos; también el título de la página sobre el azul.
- **Papel** (`papel`): el botón de borrar dentro de la caja; al pasar el mouse, #E3E8F3, que es también el tono de los billetes de espera.
- **Tinta suave** (`tinta-suave`): la descripción de cada billete, el texto de los avisos y la lupa. El resumen del billete grande usa #33415E.
- **Línea de corte** (`corte`): la línea punteada de 2px que separa el talón y la foto del billete grande.
- **Amarillo foco** (`foco`): el anillo de foco de todo menos la caja, y el anillo de 4px del billete activo en el mazo.

Mientras la foto carga, su lugar es #DCE3F0.

### Named Rules
**The Tinta Roja Rule.** El rojo es tinta de sello: marca lo que coincide, el destino elegido y lo que no sirve. No rellena botones ni fondos grandes; el único relleno rojo es el talón del billete elegido.

**The Azul Es Tinta Rule.** No hay negro. El texto de los billetes es el mismo azul del fondo, como un billete impreso con la tinta de la aerolínea.

## Typography

**Display Font:** Archivo 900, condensada por el eje `wdth` (con system-ui)
**Body Font:** Archivo 400 a 800, en ancho normal (con system-ui)

**Character:** Archivo variable trae el aire de billete impreso: condensada y negra en lo que se lee de lejos, como el destino de una tarjeta de embarque; normal y abierta para leer el resumen. Se declara con `font-stretch` y `font-variation-settings: "wdth"` a la vez, para que el eje llegue en los tres navegadores.

### Hierarchy
- **Titular** (900, 72px, 0.95, `wdth` 72, mayúsculas, tracking 0.01em, espacio entre palabras 0.14em): «VIAJA A UN ARTÍCULO»; 50px en el teléfono.
- **Grande** (900, 46px, 0.98, `wdth` 72, mayúsculas): el título del billete elegido; 36px en el teléfono.
- **Número** (900, 54px, `wdth` 72, tabular, `morado`): el número del talón; 34px en el teléfono.
- **Destino** (900, 32px, 1, `wdth` 75, mayúsculas, tracking 0.01em, espacio entre palabras 0.14em): el título de cada billete; 27px hasta 1100px y 22px en el teléfono. El título del aviso usa lo mismo a 30px.
- **Sello** (900, 26px, `wdth` 75, mayúsculas, tracking 0.08em): «ELEGIDO»; 20px en el teléfono. El talón anulado del aviso usa 18px con 0.06em.
- **Campo** (800, 30px, 1, tracking −0.01em): lo que se escribe en la caja; 24px en el teléfono. El texto de ejemplo va en 600 y en #5E6B88 (5:1 sobre blanco).
- **Bajada** (400, 18px, hasta 52ch, `azul-claro`): la frase bajo el titular; 16px en el teléfono.
- **Cuerpo** (400, 16px, 1.5): texto base y el texto de los avisos.
- **Resumen** (400, 16px, 1.6): el extracto del billete grande, como mucho nueve líneas.
- **Detalle** (400, 15px): la descripción de cada billete, como mucho dos líneas; 14px en el teléfono. La descripción del billete grande usa 700 en `rojo`, y el estado bajo la caja 600 en `azul-claro`.
- **Acción** (800, 16px, 1): «Reintentar» y «Leer en Wikipedia».
- **Etiqueta** (800, 11px, tracking 0.18em, mayúsculas, `rojo`): «DESTINO» sobre el número del talón; 0.08em en el teléfono. Es la etiqueta impresa del billete, y solo vive en el talón.

### Named Rules
**The Condensada Impresa Rule.** Lo que se imprime grande en el billete va en 900, en mayúsculas y condensado (`wdth` 72 en titulares y números, 75 en destinos, avisos y sello). Lo que se lee de corrido nunca se condensa.

**The Una Familia Rule.** Todo es Archivo. La jerarquía sale del peso y del ancho, no de otra letra.

## Layout

La página es una rejilla de dos columnas de hasta 1440px, centrada, con 48px × 56px de relleno y 56px entre columnas: a la izquierda el mostrador (titular, bajada, caja, estado, mazo y aviso) y a la derecha el billete elegido, de 480px, fijo a 32px del borde de arriba mientras bajas. Al abrir, ese lugar lo ocupa un billete de bienvenida («¿A dónde viajamos hoy?») con la foto del primer destino sugerido.

Cada billete del mazo es una rejilla de tres columnas: la foto de 200px, el cuerpo (16px × 22px de relleno) y el talón de 110px, con al menos 150px de alto. El billete grande apila la foto (270px de alto) sobre el cuerpo (22px × 26px de relleno), con el sello a la derecha justo bajo la foto.

**The Mazo en Abanico Rule.** Los billetes se montan: cada uno sube 10px sobre el anterior, se corre `min(i, 7)` × 12px a la derecha, gira −1.2° o 1.2° según su lugar y queda debajo del anterior (`z-index` que baja). El que pasa bajo el mouse sube al frente, se endereza y avanza 6px; el activo avanza 18px. Nunca una lista recta de renglones.

Ritmo: 4 / 8 / 12 / 14 / 18 / 22 / 28 / 48 / 56px.

Comportamiento por ancho:
- **Hasta 1100px:** el elegido pasa a 400px, 36px entre columnas y 36px × 32px de relleno; la foto del billete a 150px, el talón a 92px y el corrimiento a 8px.
- **Hasta 820px (teléfono):** una sola columna con 24px × 16px de relleno, en este orden: titular, bajada, caja, estado, aviso, billete elegido y mazo. El billete de bienvenida se oculta; al elegir, el billete grande aparece entre la caja y el mazo y la página lo trae a la vista. Billetes de 96px de foto, 70px de talón, 108px de alto, montados 6px y corridos 4px; la foto grande a 200px y el giro del elegido a 0.8°.

## Elevation & Depth

Billetes de papel sobre una mesa azul con poca luz: la profundidad viene de sombras hondas, difusas y casi negras azuladas, y del giro de cada billete. El fondo tiene un brillo radial #17397A arriba a la derecha.

### Shadow Vocabulary
- **Billete** (`box-shadow: 0 14px 30px rgba(3, 12, 30, .45)`): la caja de búsqueda y los avisos.
- **Billete del mazo** (`box-shadow: 0 4px 10px rgba(3, 12, 30, .3)`): corta, para que un billete montado no oscurezca el papel del de abajo.
- **Billete grande** (`box-shadow: 0 24px 50px rgba(3, 12, 30, .55)`): el billete elegido, que está más cerca.
- **Activo** (`box-shadow: 0 0 0 4px #FFD24D, 0 14px 30px rgba(3, 12, 30, .45)`): el billete activo con las flechas o el mouse.

### Named Rules
**The Papel Sobre la Mesa Rule.** Todo lo blanco es papel y lleva sombra honda azulada; nada flota sin sombra ni brilla. Los giros (±1.2° en el mazo, 1.5° el elegido, −1° el aviso) son parte de la profundidad.

## Shapes

Papel cortado con esquinas apenas redondas: 10px en los billetes y avisos, 14px en la caja y el billete grande, 8px en los botones, 6px en el sello y 4px en las barras de espera. El talón se separa con una línea de corte de 2px punteada en `corte` y dos muescas: círculos de 20px del color del fondo, mordiendo arriba y abajo. El billete grande separa la foto del cuerpo con la misma línea. El sello es un rectángulo de borde rojo de 4px girado −12°.

Los íconos (lupa, borrar, afuera, reintentar) son `<symbol>` SVG de trazo 2.2 y puntas redondas, dibujados una vez en el HTML y reusados con `<use>`. Una foto que no llegó muestra un avión en silueta en `azul-claro`.

## Components

### Billete (signature)
Un resultado de la búsqueda, `role="option"` dentro del `listbox`.
- **Forma:** papel `blanco`, radio 10px, sombra de billete, foto a la izquierda (`cover`), cuerpo y talón.
- **Cuerpo:** el título (Destino) con la coincidencia en `rojo` y la descripción (Detalle) en `tinta-suave`.
- **Talón:** separado por la línea de corte y las muescas; «DESTINO» (Etiqueta) en `rojo` y el número (Número) en `morado`.
- **Activo:** se endereza, avanza 18px y lleva el anillo de 4px en `foco`.
- **Elegido:** el talón se rellena de `rojo`, con el número en `blanco` y la etiqueta en #FFD9DD.
- **Espera:** mientras llega la búsqueda, billetes con la foto y dos barras de radio 4px en #E3E8F3 que laten de opacidad 1 a 0.6 cada 1.1s.

### Caja de búsqueda
- **Estilo:** `blanco`, sin borde, radio 14px, 76px de alto, sombra de billete, lupa de 28px a la izquierda en `tinta-suave`, texto en Campo y cursor `rojo`.
- **Foco:** anillo de 4px en `rojo` separado 3px.
- **Borrar:** un cuadro de 48px en `papel`, radio 10px, con el ícono de borrar; aparece solo cuando hay algo escrito.

### Botón
- **Shape:** radio 8px, al menos 44px de alto, ícono de 22px a la izquierda.
- **Primario:** relleno `azul`, texto `blanco` (Acción); al pasar el mouse, `azul-hover`. Es «Reintentar» en el aviso y «Leer en Wikipedia» (12px × 18px, con el ícono de afuera) en el billete grande.

### Billete elegido y sello
El billete grande, `blanco`, radio 14px, girado 1.5° y con la sombra de billete grande: foto de 270px, línea de corte, título (Grande), descripción en `rojo`, resumen y «Leer en Wikipedia». El sello «ELEGIDO» va arriba a la derecha del cuerpo, girado −12°, en `rojo` con borde de 4px.

### Aviso
También es un billete: papel `blanco`, radio 10px, girado −1°, con el texto a la izquierda (título en mayúsculas condensadas a 30px y explicación en `tinta-suave`) y un talón anulado de 110px, rayado en diagonal con rojo al 14 %, que dice «SIN DESTINO» o «SIN SEÑAL». Cuando falla la red, el talón toma fondo #FDE7EA y debajo del texto va «Reintentar».

### Foco
Un anillo de 3px en `foco` separado 3px en todo, menos la caja de búsqueda, que usa 4px en `rojo`.

### Motion
- **Caer:** al llegar los resultados, cada billete cae 36px desde arriba, transparente y con seis veces su giro, en 550ms con `cubic-bezier(.2, .8, .2, 1)`, 60ms después que el anterior. El aviso cae igual en 500ms.
- **Salir:** el billete elegido entra desde 120px a la izquierda girado −6°, en 700ms con la misma curva.
- **Estampar:** a los 360ms el sello cae desde 1.6 veces su tamaño en 260ms, acelerando hasta el final (`cubic-bezier(.55, 0, .9, .4)`), sin rebote. Al tocar, a los 620ms, el billete grande se sacude 3px hacia abajo en 160ms.
- **Pasar el mouse:** los billetes se enderezan en 200ms.
- **Movimiento reducido:** con `prefers-reduced-motion: reduce` todo aparece sin movimiento: animaciones y transiciones de 0.01ms, sin retrasos y una sola vez.

## Do's and Don'ts

### Do:
- **Do** mostrar cada resultado como un billete con su foto, su cuerpo y su talón separado por la línea de corte y las muescas.
- **Do** montar los billetes en abanico, con giros alternos de ±1.2° y corridos a la derecha.
- **Do** imprimir lo grande en Archivo 900, condensado por `wdth` y en mayúsculas, declarando `font-stretch` y `font-variation-settings` a la vez.
- **Do** marcar en `rojo` la parte que coincide, sin fondo.
- **Do** usar el `azul` del fondo como tinta de los billetes y de los botones.
- **Do** dibujar el foco como un anillo de 3px en `foco` separado 3px (4px en `rojo` en la caja).
- **Do** contar los errores y la falta de resultados con un billete de talón anulado.
- **Do** respetar `prefers-reduced-motion`: los billetes y el sello aparecen sin movimiento.

### Don't:
- **Don't** volver los resultados una lista desplegable blanca de renglones.
- **Don't** poner un fondo claro: el mostrador es azul de noche.
- **Don't** rellenar botones o fondos grandes de `rojo`; es tinta de sello.
- **Don't** condensar el texto que se lee de corrido.
- **Don't** añadir una segunda familia tipográfica.
- **Don't** usar emojis en los textos ni en la interfaz; las flechas ↑ ↓ del estado son texto, y los íconos son los `<symbol>` SVG.
