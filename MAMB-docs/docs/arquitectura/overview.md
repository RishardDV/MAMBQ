---
sidebar_position: 1
---

# Vista general

MAMB sigue una arquitectura cliente-servidor clásica con el frontend desacoplado del backend y desplegados en servicios independientes.

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
┌───────────────────────▼─────────────────────────────┐
│              BASE DE DATOS — PostgreSQL             │
│              Tablas: obras, usuarios                │
└─────────────────────────────────────────────────────┘
```

## Flujo de una subida de obra

1. El visitante selecciona imagen y rellena el formulario en la app
2. `api.js` envía `multipart/form-data` a `POST /api/obras`
3. El backend valida el JWT y procesa la imagen con Multer
4. TensorFlow.js ejecuta moderación de contenido
5. Si pasa, la obra se persiste en PostgreSQL y se devuelve el objeto creado
6. La galería se refresca con la nueva obra

## Estructura del repositorio

```
MAMB/
├── frontend/
│   ├── index.html          # SPA — 9 pantallas
│   ├── app.js              # Lógica principal
│   ├── style.css           # Estilos de la app
│   ├── api.js              # Cliente API REST
│   ├── usernameModeration.js
│   ├── manifest.json       # Config PWA
│   └── icons/              # SVG 192×192, 512×512
├── Landing MAMB/           # Landing estática (GitHub Pages)
│   ├── index.html
│   ├── index.js
│   ├── styles.css
│   └── img/
├── backend/                # API REST (código en Render)
├── MAMB-docs/              # Esta documentación (Docusaurus)
└── readme.md
```
