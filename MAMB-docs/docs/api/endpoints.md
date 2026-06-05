---
sidebar_position: 1
---

# Endpoints — Vista General

Todos los endpoints retornan y aceptan **JSON**. El servidor escucha en `http://localhost:3000` por defecto.

## Base URL

| Entorno | URL |
|---------|-----|
| Producción | `https://mamb-qsi0.onrender.com/api` |
| Local | `http://localhost:3000/api` |

## Resumen

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/health` | Estado del servidor |
| `GET` | `/api/obras` | Listar todas las obras |
| `GET` | `/api/obras/:id` | Obtener obra por ID |
| `POST` | `/api/obras` | Crear nueva obra |
| `PATCH` | `/api/obras/:id` | Actualizar obra |
| `DELETE` | `/api/obras/:id` | Eliminar obra |
| `POST` | `/api/obras/:id/like` | Dar like a una obra |
| `POST` | `/api/obras/:id/rate` | Calificar una obra |

## Autenticación

Los endpoints protegidos requieren un **JWT Bearer token** en el header:

```http
Authorization: Bearer <token>
```

## Health Check

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
