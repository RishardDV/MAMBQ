---
sidebar_position: 3
---

# Base de datos

El backend usa **PostgreSQL** como base de datos relacional.

## Tabla `obras`

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | `SERIAL PRIMARY KEY` | ID autoincremental |
| `titulo` | `VARCHAR(255)` | Título de la obra |
| `descripcion` | `TEXT` | Descripción libre |
| `image_url` | `TEXT` | Ruta relativa al archivo subido |
| `autor_apodo` | `VARCHAR(100)` | Apodo del visitante |
| `avatar_index` | `INTEGER` | Índice del avatar seleccionado (0–N) |
| `likes_count` | `INTEGER DEFAULT 0` | Total de likes |
| `rating_total` | `INTEGER DEFAULT 0` | Suma de calificaciones |
| `rating_count` | `INTEGER DEFAULT 0` | Número de calificaciones |
| `created_at` | `TIMESTAMPTZ` | Fecha de creación |

## Tabla `usuarios`

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | `SERIAL PRIMARY KEY` | ID autoincremental |
| `apodo` | `VARCHAR(100) UNIQUE` | Nombre de usuario único |
| `ciudad` | `VARCHAR(100)` | Ciudad del visitante |
| `avatar_index` | `INTEGER` | Avatar elegido |
| `password_hash` | `TEXT` | Hash bcrypt de la contraseña |
| `created_at` | `TIMESTAMPTZ` | Fecha de registro |

## Conexión

La cadena de conexión se pasa como variable de entorno `DATABASE_URL`:

```env
DATABASE_URL=postgresql://usuario:contraseña@host:5432/mamb
```
