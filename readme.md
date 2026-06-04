# MAMBQ

[![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=flat&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=flat&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)
[![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Plataforma digital del Museo de Arte Moderno de Barranquilla. MAMBQ combina una interfaz web PWA con un backend en Node.js + PostgreSQL, integrando IA para deteccion de poses con Teachable Machine y TensorFlow.js, juegos interactivos y una galeria virtual donde los visitantes pueden explorar y subir obras.

## Que incluye

- `frontend/app.html`: aplicacion principal single-page con 9 pantallas (inicio, galeria, subir obra, juego de memoria, IA de poses, perfil, colecciones, about, detalle de obra).
- `frontend/`: recursos de la app (CSS, JS, Service Worker, manifest PWA, iconos).
- `backend/`: API REST con Express, PostgreSQL, JWT, Multer para carga de imagenes.
- `Landing MAMB/`: landing page estatica del museo con informacion de artistas destacados.

## Caracteristicas clave

- 🏛️ Galeria virtual con obras del museo y obras subidas por visitantes.
- 🎨 Subida de obras por visitantes con moderacion de contenido.
- 🤖 Deteccion de poses en tiempo real con Teachable Machine + TensorFlow.js.
- 🧠 Juego de memoria con datos curiosos sobre pinturas famosas.
- ❤️ Sistema de likes y ratings (1-5 estrellas) para obras.
- 🔍 Busqueda y filtros por tecnica (Oleo, Acuarela, Acrilico, Mixta, Escultura).
- 📱 PWA instalable con Service Worker y soporte offline parcial.
- 🔐 Autenticacion JWT y headers de seguridad con Helmet.
- 👤 Sistema de avatares y perfiles de visitante.

## Estructura del proyecto

```
MAMBQ/
├── frontend/                           # Aplicacion web (SPA)
│   ├── app.html                        # Pagina principal (9 pantallas)
│   ├── style.css                       # Estilos
│   ├── api.js                          # Cliente API
│   ├── usernameModeration.js           # Filtro de contenido
│   ├── sw.js                           # Service Worker
│   ├── manifest.json                   # Configuracion PWA
│   └── icons/                          # Iconos SVG
├── backend/                            # API REST
│   ├── server.js                       # Punto de entrada
│   ├── app.js                          # Configuracion Express
│   ├── db.js                           # Conexion PostgreSQL
│   ├── package.json                    # Dependencias
│   ├── .env.example                    # Variables de entorno ejemplo
│   ├── routes/
│   │   ├── index.js                    # Router principal
│   │   └── obras.js                    # CRUD de obras + likes + ratings
│   ├── models/
│   │   ├── Obra.js                     # Modelo de obra
│   │   └── User.js                     # Modelo de usuario
│   ├── middleware/
│   │   ├── auth.js                     # Autenticacion JWT
│   │   ├── error.js                    # Manejo de errores
│   │   └── notFound.js                 # 404 handler
│   ├── utils/
│   │   ├── AppError.js                 # Clase de error personalizada
│   │   ├── artworkValidation.js        # Validacion de obras
│   │   ├── asyncHandler.js             # Wrapper async
│   │   └── env.js                      # Configuracion de entorno
│   └── uploads/                        # Imagenes subidas
├── Landing MAMB/                       # Landing page estatica
│   ├── index.html
│   ├── styles.css
│   └── img/                            # Assets de artistas
└── README.md
```

## Ejecucion local

### Frontend

- Abre `frontend/app.html` directamente en el navegador, o usa un servidor local:

```bash
cd frontend
npx http-server
```

### Backend

```bash
cd backend
npm install
npm run dev
```

El servidor estara disponible en `http://localhost:3000`.

### Landing Page

- Abre `Landing MAMB/index.html` directamente en el navegador.

## Configuracion de entorno

Crea un archivo `.env` en `backend/` basado en `.env.example`:

```bash
cp backend/.env.example backend/.env
```

Variables requeridas:

```env
PORT=3000
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/mamb
JWT_SECRET=tu_clave_secreta_muy_larga_aqui
```

Opcional:

```env
CLIENT_ORIGIN=http://localhost:8080
NODE_ENV=development
```

## API REST

### Base URL
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
| **IA** | TensorFlow.js, Teachable Machine (deteccion de poses) |
| **Seguridad** | Helmet, CORS |
| **Subida de archivos** | Multer |
| **Logging** | Morgan |

## Paleta de Colores

- **Primario (Terracota/Oxido)**: `#C1440E`
- **Fondo (Marfil)**: `#F5F0E8`
- **Texto (Negro Carbon)**: `#1E1E1E`

## Contribuir

1. Haz fork del repositorio.
2. Crea una rama nueva: `git checkout -b feature/mi-feature`.
3. Haz commit de tus cambios.
4. Envia un pull request.

## Licencia

MIT - Ver [LICENSE](LICENSE) para mas detalles.

---

Hecho con foco en experiencia cultural y arte moderno del Caribe colombiano. 🎨✨
