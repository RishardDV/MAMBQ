---
sidebar_position: 1
---

# Vista general

MAMB sigue una arquitectura cliente-servidor con el frontend desacoplado del backend, ambos desplegados en servicios independientes.

## Diagrama de componentes

```
┌─────────────────────────────────────────────────────┐
│                   CLIENTE (PWA)                     │
│  index.html · app.js · style.css · manifest.json    │
│              Service Worker (sw.js)                 │
└───────────────────────┬─────────────────────────────┘
                        │ HTTPS / REST JSON
┌───────────────────────▼─────────────────────────────┐
│              BACKEND — Node.js + Express            │
│  /api/obras  /api/obras/:id  /api/health            │
│  JWT Auth · Helmet · CORS · Multer · Morgan         │
└───────────────────────┬─────────────────────────────┘
                        │
              ┌─────────▼─────────┐
              │  Almacenamiento   │
              │  (por definir)    │
              │  Imágenes en disk │
              │  BD — pendiente   │
              └───────────────────┘
```

:::info Base de datos
La persistencia en base de datos **no está implementada** en la versión actual. Las imágenes se almacenan temporalmente en el servidor. La integración con PostgreSQL está planificada junto con el módulo de IA — ver [Hoja de ruta IA](/guias/roadmap-ia).
:::

## Flujo de una subida de obra

1. El visitante selecciona imagen y rellena el formulario en la app
2. `api.js` envía `multipart/form-data` a `POST /api/obras`
3. El backend valida el JWT y procesa la imagen con Multer
4. Se ejecuta moderación de contenido
5. La obra se devuelve al cliente y se muestra en la galería

## Estructura del repositorio

```
MAMBQ/
├── frontend/
│   ├── index.html              # SPA — pantallas principales
│   ├── app.js                  # Lógica principal
│   ├── style.css               # Estilos de la app
│   ├── api.js                  # Cliente API REST
│   ├── usernameModeration.js   # Filtro de contenido
│   ├── manifest.json           # Config PWA
│   └── icons/                  # SVG 192×192, 512×512
├── Landing MAMB/               # Landing estática (GitHub Pages)
│   ├── index.html
│   ├── index.js
│   ├── styles.css
│   └── img/
├── backend/                    # API REST (desplegada en Render)
├── MAMB-docs/                  # Esta documentación (Docusaurus)
└── readme.md
```
