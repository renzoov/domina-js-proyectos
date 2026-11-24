# Explorador con scroll infinito: el proyecto terminado

Abre `index.html` con doble clic en tu navegador. No hace falta instalar nada, pero sí conexión a internet: las obras llegan de la API del Cleveland Museum of Art.

- Baja por la lista: al llegar al final, llegan 12 obras más.
- Toca una obra para ver su ficha, con la imagen grande, la fecha, la técnica y su historia.
- «Colgar» la pone en tu sala, que tiene 6 lugares. Toca un cuadro de la sala para volver a su ficha.
- Cierra la página y vuelve a abrirla: tu sala sigue ahí.

`app.js` está ordenado como la guía: cada parte va entre `// PASO n` y `// FIN PASO n`.
Una línea que termina en `// PASO n` se agrega en ese paso, dentro de código anterior.

Guía paso a paso: https://domina-js.pages.dev/proyectos/explorador-de-arte
Demo en línea: https://domina-js-proyectos.pages.dev/06-explorador-de-arte/final/

## Llévalo más lejos

- Un buscador: la API acepta `q=` para buscar por palabra (por ejemplo, `q=flowers`).
- Filtros por época o por departamento, con la URL de la API armada con `URLSearchParams`.
- Mover los cuadros de un lugar a otro de la sala arrastrándolos.

Obras: Cleveland Museum of Art Open Access, dominio público (CC0).
Fuente: Nunito, con licencia SIL Open Font License 1.1 (`fuentes/OFL.txt`).
