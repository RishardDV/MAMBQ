---
sidebar_position: 1
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# Vista general

MAMB sigue una arquitectura **cliente-servidor** con el frontend desacoplado del backend. Ambos se despliegan dentro del mismo servicio en Render.

---

## Diagrama de componentes

### Arquitectura completa

```
+-----------------------------------------------------+
|                   CLIENTE (PWA)                      |
|  index.html - app.js - style.css - manifest.json    |
|              Service Worker (sw.js)                  |
+-------------------------+---------------------------+
                          | HTTPS / REST JSON
+-------------------------v---------------------------+
|              BACKEND — Node.js + Express             |
|  /api/obras  /api/obras/:id  /api/health             |
|  JWT Auth - Helmet - CORS - Multer - Morgan          |
+-------------------------+---------------------------+
                          |
              +-----------v-----------+
              |      PostgreSQL       |
              |  obras | usuarios     |
              |  likes | ratings      |
              +-----------+-----------+
                          |
              +-----------v-----------+
              |   Render Disk         |
              |   /uploads (imagenes) |
              +-----------------------+
```

### Capas del sistema

| Capa | Responsabilidad |
|------|----------------|
| **Presentacion** | PWA en el navegador (HTML/CSS/JS) |
| **API** | Express.js con middleware de seguridad |
| **Logica** | Validacion, moderacion, autenticacion |
| **Datos** | PostgreSQL + sistema de archivos |

---

## Flujo de peticiones

### Consultar la galeria

1. El visitante abre la app y navega a la galeria
2. `api.js` envia `GET /api/obras` con parametros de busqueda/filtro
3. Express consulta PostgreSQL y devuelve las obras en JSON
4. `app.js` renderiza las tarjetas en el DOM
5. Si no hay conexion, se muestran obras guardadas en `localStorage`

### Subir una obra

1. El visitante llena el formulario y selecciona una imagen
2. `api.js` envia `POST /api/obras` como `multipart/form-data`
3. Express valida el JWT y procesa la imagen con Multer
4. Se ejecuta moderacion de contenido sobre el apodo
5. La obra se guarda en PostgreSQL y la imagen en `/uploads`
6. Se devuelve la obra creada al cliente

### Dar like a una obra

1. El visitante pulsa el boton de like
2. `api.js` envia `POST /api/obras/:id/like`
3. Express incrementa `likes_count` en PostgreSQL
4. Se devuelve el nuevo conteo al cliente

### Calificar una obra

1. El visitante selecciona estrellas (1-5)
2. `api.js` envia `POST /api/obras/:id/rate` con el rating
3. Express suma al `rating_total` e incrementa `rating_count`
4. Se devuelve el nuevo total al cliente

---

## Estructura del repositorio

### Arbol de directorios

```
MAMBQ/
|-- frontend/
|   |-- index.html              # SPA — 9 pantallas
|   |-- app.js                  # Logica principal (1188 lineas)
|   |-- style.css               # Estilos mobile-first (2509 lineas)
|   |-- api.js                  # Cliente API REST con fallback offline
|   |-- usernameModeration.js   # Filtro de contenido
|   |-- manifest.json           # Configuracion PWA
|   +-- icons/                  # Iconos SVG 192x192, 512x512
|
|-- Landing MAMB/               # Landing estatica (GitHub Pages)
|   |-- index.html
|   |-- index.js
|   |-- styles.css
|   +-- img/
|
|-- backend/                    # API REST (Render)
|   |-- server.js               # Entry point del servidor
|   +-- uploads/                # Imagenes subidas por visitantes
|
|-- MAMB-docs/                  # Documentacion (Docusaurus)
|
|-- sw.js                       # Service Worker global
+-- readme.md                   # README del proyecto
```

### Descripcion de carpetas

| Carpeta | Contenido |
|---------|-----------|
| `frontend/` | SPA con 9 pantallas, PWA instalable |
| `Landing MAMB/` | Pagina informativa en GitHub Pages |
| `backend/` | Servidor Express con API REST |
| `MAMB-docs/` | Documentacion Docusaurus |

---

## Comunicacion entre componentes

### Tabla de comunicaciones

| Origen | Destino | Protocolo | Descripcion |
|--------|---------|-----------|-------------|
| PWA | Backend | HTTPS/REST | Todas las operaciones CRUD |
| PWA | localStorage | JS API | Cache offline de obras |
| Backend | PostgreSQL | TCP | Persistencia de datos |
| Backend | Disk | FS | Almacenamiento de imagenes |
| Landing | PWA | Enlace HTTP | Redireccion a la app |
| Namecheap | Render | DNS | Dominio mamb.online |

### Seguridad en la comunicacion

- **HTTPS** obligatorio en produccion
- **JWT** para endpoints protegidos
- **Helmet** para headers de seguridad
- **CORS** configurado para origenes permitidos
