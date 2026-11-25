# Notificaciones toast: el proyecto terminado

**No abras `index.html` con doble clic.** Este proyecto usa módulos (`import` y `export`), y el navegador no los carga desde un archivo abierto así (`file://`). Ábrelo con un servidor local: en VS Code, instala la extensión **Live Server**, haz clic derecho en `index.html` y elige «Open with Live Server».

- Al abrir, llegan cinco avisos de un viaje: se ven dos y los otros tres esperan en «En la cola».
- Cierra uno (con la X, con Escape o deslizándolo hacia la derecha) y sube el siguiente.
- Pasa el mouse sobre un aviso: su tiempo se detiene.
- «Cargando» muestra un aviso que, a los dos segundos y medio, cambia solo a éxito.
- Debajo del código, «respuesta» muestra lo que devolvió el await.

La librería está en `zona-toasts.js` (con sus estilos en `zona-toasts.css`), ordenada como la guía: cada parte va entre `// PASO n` y `// FIN PASO n`. `demo.js` es la página de prueba que la usa.

Para usarla en otro proyecto, copia `zona-toasts.js` y `zona-toasts.css`, y en tu código:

```js
import toasts from './zona-toasts.js';
const respuesta = await toasts.mostrar({ titulo: 'Hola', acciones: ['Ver'] });
```

Guía paso a paso: https://domina-js.pages.dev/proyectos/notificaciones-toast
Demo en línea: https://domina-js-proyectos.pages.dev/08-notificaciones-toast/final/

## Llévalo más lejos

- Posición configurable con un atributo: `<zona-toasts posicion="abajo-izquierda">`.
- Un historial de los avisos cerrados, con un evento propio para cada cierre.
- Usar la librería en otro proyecto, por ejemplo para avisar «Copiado» en el generador de paletas.

Fotos: Wikimedia Commons (CC BY-SA), créditos en `fotos/CREDITOS.md`.
Fuentes: Inter Tight y JetBrains Mono, con licencia SIL Open Font License 1.1 (`fuentes/OFL.txt`).
