---
sidebar_position: 1
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# API REST — Vista general

La API de MAMB gestiona obras de arte, interacciones (likes y calificaciones) y autenticacion. Todos los endpoints retornan y aceptan **JSON**, excepto la creacion de obras que usa `multipart/form-data`.

---

## Base URL

### URLs por entorno

| Entorno | URL |
|---------|-----|
| **Produccion** | `https://mamb-qsi0.onrender.com/api` |
| **Produccion (dominio)** | `https://www.mamb.online/api` |
| **Local** | `http://localhost:3000/api` |

---

## Resumen de endpoints

### Obras (CRUD)

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| `GET` | `/api/obras` | Listar obras con filtros y paginacion |
| `GET` | `/api/obras/:id` | Obtener una obra por ID |
| `POST` | `/api/obras` | Crear nueva obra (multipart) |
| `PATCH` | `/api/obras/:id` | Actualizar titulo/descripcion |
| `DELETE` | `/api/obras/:id` | Eliminar una obra |

### Interacciones

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| `POST` | `/api/obras/:id/like` | Dar like a una obra |
| `POST` | `/api/obras/:id/rate` | Calificar una obra (1-5) |

### Sistema

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| `GET` | `/api/health` | Estado del servidor y conexion a BD |

---

## Autenticacion

### JWT Bearer Token

Los endpoints protegidos requieren un **JWT Bearer token** en el header:

```http
Authorization: Bearer <token>
```

### Obtencion del token

El token se obtiene al registrarse o iniciar sesion y tiene expiracion automatica.

### Endpoints sin autenticacion

Los endpoints de lectura (`GET`) son publicos y no requieren token.

---

## Health check

### Endpoint

```http
GET /api/health
```

### Respuesta exitosa

**`200 OK`:**

```json
{
  "status": "ok",
  "museo": "MAMB",
  "db": "PostgreSQL"
}
```

### Uso recomendado

Usar este endpoint para verificar que el servidor y la base de datos estan operativos. Util para monitoreo y para "despertar" el servicio en Render antes de una demo.

---

## Manejo de errores

### Formato de error

Todos los errores siguen el mismo formato:

```json
{
  "error": "Descripcion del error"
}
```

### Codigos de estado

| Codigo | Significado | Ejemplo |
|--------|-------------|---------|
| `400` | Datos invalidos o faltantes | Falta el titulo de la obra |
| `401` | Token JWT ausente o expirado | No se envio Authorization header |
| `404` | Recurso no encontrado | Obra con ese ID no existe |
| `500` | Error interno del servidor | Fallo en la conexion a BD |

---

## Middleware

### Cadena de middleware

El backend aplica los siguientes middleware a todas las peticiones, en orden:

| Middleware | Funcion |
|------------|---------|
| **Helmet** | Headers HTTP de seguridad (XSS, HSTS, etc.) |
| **CORS** | Control de origenes cruzados |
| **Morgan** | Logging de peticiones HTTP en consola |
| **express.json()** | Parsing de body JSON |
| **Multer** | Procesamiento de archivos (solo en `POST /api/obras`) |

### Helmet — headers de seguridad

Helmet configura automaticamente headers como:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security`

### CORS — origenes permitidos

CORS esta configurado para permitir peticiones desde el frontend desplegado y desde localhost en desarrollo.
