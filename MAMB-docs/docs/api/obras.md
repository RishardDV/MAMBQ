---
sidebar_position: 2
---

# Obras

Endpoints para gestionar las obras de arte del museo y de visitantes.

## Listar obras

```http
GET /api/obras
```

**Parámetros opcionales (query string):**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `search` | string | Filtra por título o descripción |
| `autorApodo` | string | Filtra por apodo del autor |
| `page` | number | Página (paginación) |
| `limit` | number | Resultados por página |

**Respuesta `200 OK`:**

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
    "created_at": "2026-05-29T14:00:00Z"
  }
]
```

## Obtener obra por ID

```http
GET /api/obras/:id
```

**Respuesta `200 OK`:** objeto obra (mismo esquema que arriba).

**Respuesta `404`:**
```json
{ "error": "Obra no encontrada" }
```

## Crear nueva obra

```http
POST /api/obras
Content-Type: multipart/form-data
```

**Campos:**

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `image` | File | ✅ | Imagen de la obra |
| `titulo` | string | ✅ | Título |
| `descripcion` | string | — | Descripción libre |
| `autorApodo` | string | ✅ | Apodo del visitante |
| `avatarIndex` | number | — | Índice del avatar |

:::info Restricciones de imagen
- Tamaño máximo: **20 MB**
- Formatos aceptados: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
:::

**Respuesta `201 Created`:** objeto obra creado.

## Actualizar obra

```http
PATCH /api/obras/:id
Content-Type: application/json
```

```json
{
  "titulo": "Nuevo título",
  "descripcion": "Nueva descripción"
}
```

**Respuesta `200 OK`:** obra actualizada.

## Eliminar obra

```http
DELETE /api/obras/:id
```

**Respuesta `200 OK`:**
```json
{ "message": "Obra eliminada" }
```

## Dar like

```http
POST /api/obras/:id/like
```

**Respuesta `200 OK`:**
```json
{ "likes_count": 6 }
```

## Calificar obra

```http
POST /api/obras/:id/rate
Content-Type: application/json
```

```json
{ "rating": 4 }
```

El `rating` debe ser un entero entre **1** y **5**.

**Respuesta `200 OK`:**
```json
{
  "rating_total": 16,
  "rating_count": 4
}
```
