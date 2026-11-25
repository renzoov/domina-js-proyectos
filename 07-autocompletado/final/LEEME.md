# Buscador con autocompletado: el proyecto terminado

Abre `index.html` con doble clic en tu navegador. No hace falta instalar nada, pero sí conexión a internet: los resultados llegan de Wikipedia.

- Escribe al menos dos letras: cuando dejas de escribir, aparecen los billetes.
- Lo que coincide se resalta en rojo, aunque escribas sin tildes («arbol» encuentra «Árbol»).
- Muévete con ↑ ↓ y elige con Enter (o con un clic). El billete grande trae el resumen.
- «Leer en Wikipedia» abre el artículo completo en otra pestaña. Escape borra la búsqueda.

`app.js` está ordenado como la guía: cada parte va entre `// PASO n` y `// FIN PASO n`.
Una línea que termina en `// PASO n` se agrega en ese paso, dentro de código anterior.

Guía paso a paso: https://domina-js.pages.dev/proyectos/autocompletado
Demo en línea: https://domina-js-proyectos.pages.dev/07-autocompletado/final/

## Llévalo más lejos

- Elegir el idioma: Wikipedia en inglés o en portugués, cambiando `es.` en las direcciones.
- Un historial de destinos: los últimos artículos elegidos, guardados en `localStorage`.
- Mover el billete activo también con el mouse (al pasar por encima), sin romper el teclado.

Textos y fotos: Wikipedia y Wikimedia Commons (los textos, con licencia CC BY-SA).
Fuente: Archivo, con licencia SIL Open Font License 1.1 (`fuentes/OFL.txt`).
