# MAMB

[![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=flat&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=flat&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)
[![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

![landing2](/img%20readme/landing2.png)

App Web del Museo de Arte Moderno de Barranquilla. MAMB combina una interfaz web PWA que tendrá un backend en Node.js + PostgreSQL , también ,tendrá un modelo de IA capaz de generar obras hechas por los niños, aplicando estilos artísticos,  juegos interactivos y una galeria virtual donde los visitantes pueden explorar y subir obras.




## Demo en vivo

| | URL |
|---|---|
| **Landing page** | [risharddv.github.io/MAMBQ](https://risharddv.github.io/MAMBQ/) |
| **Aplicacion (PWA)** | [mamb-qsi0.onrender.com](https://mamb-qsi0.onrender.com/) |

## Que incluye

- `frontend/index.html`: aplicacion principal single-page con 9 pantallas (inicio, galeria, subir obra, juego de memoria,perfil, colecciones, about, detalle de obra).
- `frontend/`: recursos de la app (CSS, JS, manifest PWA, iconos).
- `Landing MAMB/`:landing page del museo desplegada en GitHub Pages con información de artistas destacados.
- `backend/`: API REST desplegada en Render (el código fuente del backend no se incluye en este repositorio; solo se tendrá la carpeta vacía para luego agregar la base de datos).

## Caracteristicas clave

- Galeria virtual con obras del museo y obras subidas por visitantes.
-  Subida de obras por visitantes con moderacion de contenido.
- Juego de memoria con datos curiosos sobre pinturas famosas.
- Sistema de likes y ratings (1-5 estrellas) para obras.
- Busqueda y filtros por tecnica (Oleo, Acuarela, Acrilico, Mixta, Escultura).
- PWA instalable con Service Worker y soporte offline parcial.
- Autenticacion JWT y headers de seguridad con Helmet.
-  Sistema de avatares y perfiles de visitante(incluye ciudad y nombre del visitante).

## Estructura del proyecto

```
MAMB/
├── index.js                            # Interactividad de la landing
├── styles.css                          # Estilos de la landing
├── sw.js                               # Service Worker (landing)
├── img/                                # Assets de la landing (logo, artistas)
├── frontend/                           # Aplicacion web (SPA / PWA)
│   ├── index.html                      # Pagina principal (9 pantallas)
│   ├── app.js                          # Logica de la aplicacion
│   ├── style.css                       # Estilos de la app
│   ├── api.js                          # Cliente API
│   ├── usernameModer8ation.js           # Filtro de contenido
│   ├── manifest.json                   # Configuracion PWA
│   └── icons/                          # Iconos SVG (192x192, 512x512)
├── Backend                             # Actualmente vacio
├── Landing MAMB/                       # Landing page estatica (version original)
│   ├── index.html
│   ├── index.js
│   ├── styles.css
│   └── img/
└── readme.md
```

## Despliegue

### Landing page (GitHub Pages)
![landing1](/img%20readme/landing1.png)
La landing se sirve desde la carpeta Landing MAMB del repositorio en la rama `main`. Accesible en:

```
https://risharddv.github.io/MAMBQ/
```

### Aplicacion + Backend (Render)
![render](/img%20readme/app1.jpeg)
![render](/img%20readme/app2.jpeg)



La aplicación PWA y la API REST están desplegadas en Render:

```
https://mamb-qsi0.onrender.com/
```

## Como funciona?
Esta app principalmente es dirigida para niños, y va estar en un apartado del museo de arte moderno de Barranquilla, con el fin que los niños puedan subir sus obras 
y puedan a dar a conocer su pasión por el arte a traves de ella, estas obras se verán reflejadas en el apartado de galeria y estas antes pasan por un proceso estilización
para darle un toque más artístico e impresionante y no solo eso también podrán acceder a pequeños juegos, con el fin de entretener mientras exploran la aplicación y se divierten. 

![subir](img%20readme/app7.jpeg)
![](img%20readme/app4.jpeg)

## Ejecucion local

### Frontend

![landing](/img readme/responsive1.png)



Abre `frontend/index.html` directamente en el navegador, o usa un servidor local:

```bash
cd frontend
npx http-server
```

## API REST

### Base URL
- Produccion: `https://mamb-qsi0.onrender.com/api`
- Local: `http://localhost:3000/api`

### Endpoints

#### Health Check
```http
GET /api/health
```
Respuesta:
```json
{
  "status": "ok",
  "museo": "MAMB",
  "db": "PostgreSQL"
}
```

#### Listar todas las obras
```http
GET /api/obras
```
Parametros opcionales: `search`, `autorApodo`, `page`, `limit`

Respuesta:
```json
[
  {
    "id": 1,
    "titulo": "Paisaje Costero",
    "descripcion": "Vista del Caribe",
    "image_url": "/uploads/obra_123.jpg",
    "autor_apodo": "Carlos",
    "avatar_index": 0,
    "likes_count": 5,
    "rating_total": 12,
    "rating_count": 3,
    "created_at": "2026-05-29T..."
  }
]
```

#### Obtener obra por ID
```http
GET /api/obras/:id
```

#### Crear nueva obra
```http
POST /api/obras
Content-Type: multipart/form-data

image: [archivo]
titulo: "Paisaje Costero"
descripcion: "Vista del Caribe"
autorApodo: "Carlos"
avatarIndex: 0
```
Tamano maximo de imagen: 20MB. Formatos: `.jpg, .jpeg, .png, .webp, .gif`

#### Actualizar obra
```http
PATCH /api/obras/:id
Content-Type: application/json

{
  "titulo": "Nuevo titulo",
  "descripcion": "Nueva descripcion"
}
```

#### Eliminar obra
```http
DELETE /api/obras/:id
```

#### Dar like a una obra
```http
POST /api/obras/:id/like
```

#### Calificar una obra
```http
POST /api/obras/:id/rate
Content-Type: application/json

{
  "rating": 4
}
```

### Autenticacion

Los endpoints protegidos requieren JWT token en el header:

```
Authorization: Bearer <token>
```

## Tecnologias Principales

| Componente | Tecnologia |
|-----------|-----------|
| **Frontend** | HTML5, CSS3, JavaScript vanilla, PWA |
| **Backend** | Node.js, Express.js |
| **Base de datos** | PostgreSQL |
| **Autenticacion** | JWT, bcryptjs |
| **IA** | TensorFlow.js |
| **Seguridad** | Helmet, CORS |
| **Subida de archivos** | Multer |
| **Logging** | Morgan |
| **Hosting** | Render (app + API), GitHub Pages (landing) |


