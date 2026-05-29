# 🎨 MAMB - Museo de Arte Moderno de Barranquilla

Plataforma digital integral para la gestión, visualización y administración del Museo de Arte Moderno de Barranquilla. Sistema completo con backend, frontend web y aplicación móvil.

---

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Uso](#uso)
- [Configuración](#configuración)
- [API REST](#api-rest)
- [Contribución](#contribución)
- [Licencia](#licencia)

---

## 📝 Descripción

MAMB es una plataforma web y móvil diseñada para modernizar la gestión del Museo de Arte Moderno de Barranquilla. Permite a los administradores gestionar obras de arte, usuarios y contenido del museo, mientras que los visitantes pueden explorar el catálogo en la web o a través de una aplicación móvil.

---

## ✨ Características

### Backend
- ✅ API REST robusta con Express.js
- ✅ Autenticación y autorización con JWT
- ✅ Base de datos PostgreSQL
- ✅ Gestión segura de contraseñas con bcrypt
- ✅ Carga de archivos (imágenes, documentos)
- ✅ CORS habilitado para múltiples clientes
- ✅ Health check endpoint

### Frontend Web
- ✅ Interfaz moderna y responsive
- ✅ Integración con API REST
- ✅ Gestión de obras de arte
- ✅ Autenticación de usuarios

### Aplicación Móvil (Flutter)
- ✅ Experiencia nativa en iOS y Android
- ✅ Navegación intuitiva
- ✅ Sincronización con backend

---

## 🛠 Tecnologías

| Componente | Tecnología |
|-----------|-----------|
| **Backend** | Node.js, Express.js, PostgreSQL |
| **Frontend Web** | HTML5, CSS3, JavaScript Vanilla |
| **Móvil** | Flutter, Dart |
| **Autenticación** | JWT, bcryptjs |
| **Subida de Archivos** | Multer |
| **CORS** | Habilitado |

---

## 📦 Instalación

### Requisitos Previos
- Node.js (v14 o superior)
- npm o yarn
- PostgreSQL (v12 o superior)
- Flutter (para la app móvil)

### Instalación del Backend

```bash
# Clonar el repositorio
git clone https://github.com/RishardDV/MAMBQ.git
cd MAMBQ/backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Iniciar servidor en desarrollo
npm run dev

# O en producción
npm start
```

### Instalación del Frontend Web

```bash
cd frontend

# Abrir index.html en un navegador
# O usar un servidor local (recomendado)
# Con Python:
python -m http.server 8000

# Con Node.js:
npx http-server
```

### Instalación de la App Móvil

```bash
cd mamb_app

# Obtener dependencias
flutter pub get

# Ejecutar en emulador o dispositivo
flutter run
```

---

## 📁 Estructura del Proyecto

```
MAMBQ/
├── backend/                 # API REST (Express.js)
│   ├── models/             # Modelos de datos
│   ├── routes/             # Rutas de API
│   ├── middleware/         # Middlewares (autenticación, etc.)
│   ├── uploads/            # Directorio para archivos subidos
│   ├── db.js               # Configuración de base de datos
│   ├── server.js           # Punto de entrada
│   ├── app.js              # Configuración de Express
│   ├── package.json        # Dependencias
│   ├── .env.example        # Variables de entorno (ejemplo)
│   └── .env                # Variables de entorno (local)
│
├── frontend/               # Interfaz web
│   ├── index.html         # Página principal
│   └── style.css          # Estilos
│
├── mamb_app/              # Aplicación móvil (Flutter)
│
├── Landing MAMB/          # Landing page estática
│
└── readme.md              # Este archivo
```

---

## 🚀 Uso

### Iniciar el Servidor Backend

```bash
cd backend
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### Verificar Estado

```bash
curl http://localhost:3000/api/health
```

Respuesta esperada:
```json
{
  "status": "ok",
  "museo": "MAMB",
  "db": "PostgreSQL"
}
```

---

## ⚙️ Configuración

### Variables de Entorno (.env)

```env
PORT=3000
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/mamb
JWT_SECRET=tu_clave_secreta_aqui
NODE_ENV=development
```

Crear el archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Editar el archivo `.env` con tus valores específicos.

---

## 🔌 API REST

### Endpoints Principales

#### Obras de Arte

- **GET** `/api/obras` - Obtener todas las obras
- **GET** `/api/obras/:id` - Obtener obra por ID
- **POST** `/api/obras` - Crear nueva obra (requiere autenticación)
- **PUT** `/api/obras/:id` - Actualizar obra (requiere autenticación)
- **DELETE** `/api/obras/:id` - Eliminar obra (requiere autenticación)

#### Salud del Sistema

- **GET** `/api/health` - Verificar estado del servidor

### Autenticación

La mayoría de endpoints protegidos requieren un JWT token en el header:

```
Authorization: Bearer <token>
```

---

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

---

## 📧 Contacto

Para dudas o sugerencias, contacta al equipo de desarrollo.

**Repositorio:** https://github.com/RishardDV/MAMBQ

---

**Última actualización:** Mayo 2026
🎨 *Modernizando la experiencia cultural del Museo de Arte Moderno de Barranquilla*
