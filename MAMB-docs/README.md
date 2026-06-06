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

Aplicación web PWA del Museo de Arte Moderno de Barranquilla. MAMBQ combina una interfaz móvil-first con un backend en Node.js + PostgreSQL, integrando IA para estilización de obras e integra juegos interactivos y una galería virtual donde los visitantes pueden explorar y subir sus creaciones.

## Documentación Docusaurus

- [Documentación](https://risharddv.github.io/MAMBQ/) — Recomendamos borrar caché de página si ya abrió anteriormente este mismo link.

## Qué incluye

- 🖼️ Galería virtual con obras del museo y obras subidas por visitantes.
- 📤 Subida de obras por visitantes con moderación de contenido automática.
- 🎮 Juego de memoria con datos curiosos sobre pinturas famosas.
- ❤️ Sistema de likes y calificaciones (1–5 estrellas) para obras.
- 🔍 Búsqueda y filtros por técnica (Óleo, Acuarela, Acrílico, Mixta, Escultura).
- 📱 PWA instalable con Service Worker y soporte offline parcial.
- 🔐 Autenticación JWT y headers de seguridad con Helmet.
- 👤 Sistema de avatares y perfiles de visitante (incluye ciudad y nombre).
- 🤖 Modelo de IA capaz de aplicar estilos artísticos a obras subidas por niños.

## Demo en vivo

| | URL |
|---|---|
| **Landing page** | [risharddv.github.io/MAMBQ](https://risharddv.github.io/MAMBQ/) |
| **Aplicación (PWA)** | [mamb-qsi0.onrender.com](https://mamb-qsi0.onrender.com/) |

## Ejecución local

### Frontend

Abre `frontend/index.html` directamente en el navegador, o usa un servidor local:

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

Luego abre `http://localhost:3000`.

## Configuración de entorno

Crea un archivo `.env` en `backend/` con al menos estas variables:

```env
PORT=3000
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/mamb
JWT_SECRET=tu_clave_secreta_aqui
```

Opcional:

```env
CLIENT_ORIGIN=http://localhost:5500
NODE_ENV=development
```

## Paleta de colores

La aplicación utiliza una paleta inspirada en museos y espacios culturales del Caribe colombiano:

- **Primario (Azul marino)**: `#2e4a7a`
- **Primario oscuro**: `#1b2e50`
- **Acento (Dorado)**: `#c9a84c`
- **Fondo claro**: `#f5f3ef`
- **Texto principal**: `#1a1a1a`
- **Verde natural**: `#4a7c59`

## Tecnologías principales

| Componente | Tecnología |
|------------|------------|
| **Frontend** | HTML5, CSS3, JavaScript vanilla, PWA |
| **Backend** | Node.js, Express.js |
| **Base de datos** | PostgreSQL |
| **Autenticación** | JWT, bcryptjs |
| **IA** | TensorFlow.js |
| **Seguridad** | Helmet, CORS |
| **Subida de archivos** | Multer |
| **Logging** | Morgan |
| **Hosting** | Render (app + API), GitHub Pages (landing) |

## Estructura del proyecto

```
MAMBQ/
├── frontend/
│   ├── index.html              # SPA — 9 pantallas
│   ├── app.js                  # Lógica principal
│   ├── style.css               # Estilos de la app
│   ├── api.js                  # Cliente API REST
│   ├── usernameModeration.js   # Filtro de contenido
│   ├── manifest.json           # Configuración PWA
│   └── icons/                  # Iconos SVG (192×192, 512×512)
├── Landing MAMB/               # Landing page estática (GitHub Pages)
│   ├── index.html
│   ├── index.js
│   ├── styles.css
│   └── img/
├── MAMB-docs/                  # Documentación Docusaurus
├── backend/                    # API REST (actualmente vacío)
└── readme.md
```

## Evolución del proyecto

- **Fase 0** — Idea y prototipo: concepto inicial y primeras pantallas estáticas.
- **Fase 1** — MVP frontend: interfaz móvil-first con galería, subida y juego de memoria.
- **Fase 2** — Backend y API: endpoints CRUD para obras y almacenamiento en PostgreSQL.
- **Fase 3** — Integración IA: estilización de imágenes con TensorFlow.js.
- **Fase 4** — Documentación pública: migración de docs a Docusaurus y publicación en GitHub Pages.
- **Fase 5** — Mantenimiento y mejoras: refactor, accesibilidad y ajustes de diseño (actual).

## Contribuir

1. Haz fork del repositorio.
2. Crea una rama nueva: `git checkout -b feature/mi-feature`.
3. Haz commit de tus cambios.
4. Envía un pull request.

## Licencia

MIT — Ver [LICENSE](LICENSE) para más detalles.

---

Hecho con foco en experiencia artística e inclusión cultural.
Para que todos los niños y niñas de Barranquilla suban su hermosa creatividad. 🎨✨
