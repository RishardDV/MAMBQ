---
sidebar_position: 2
---

# Frontend

El frontend es una **Single Page Application (SPA)** en JavaScript vanilla sin frameworks, instalable como PWA.

## Módulos principales

| Archivo | Responsabilidad |
|---------|----------------|
| `index.html` | Estructura HTML de las 9 pantallas (ocultas/visibles con CSS) |
| `app.js` | Lógica de navegación, renderizado de obras, juego de memoria, perfiles |
| `style.css` | Diseño mobile-first, variables CSS, animaciones |
| `api.js` | Todas las llamadas a la API REST, con fallback a `localStorage` |
| `usernameModeration.js` | Filtro de apodos inapropiados en el cliente |
| `manifest.json` | Metadatos PWA (nombre, iconos, color de tema) |
| `sw.js` | Service Worker — caché de assets para soporte offline parcial |

## Navegación SPA

La app no usa rutas del navegador. Cada "pantalla" es una sección `<section>` con `display: none` por defecto. `app.js` controla cuál es visible llamando a la función `showScreen(id)`.

```js
// Ejemplo simplificado de navegación
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}
```

## Fallback offline

Cuando el backend no responde, `api.js` usa obras guardadas en `localStorage` bajo la clave `mamb_local_obras`, permitiendo navegar la galería sin conexión.

## PWA

La app cumple los criterios mínimos de instalación:
- `manifest.json` con `name`, `short_name`, `start_url`, `display: standalone`
- Service Worker registrado en `sw.js`
- Iconos en 192×192 y 512×512 px (SVG)
