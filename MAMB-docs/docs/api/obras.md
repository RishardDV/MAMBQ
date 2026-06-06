---
sidebar_position: 2
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# Obras — Referencia completa

Documentacion detallada de todos los endpoints relacionados con obras de arte.

---

## Listar obras

### Endpoint

```http
GET /api/obras
```

### Parametros de consulta

| Parametro | Tipo | Descripcion | Ejemplo |
|-----------|------|-------------|---------|
| `search` | string | Filtra por titulo o descripcion | `?search=paisaje` |
| `autorApodo` | string | Filtra por apodo del autor | `?autorApodo=Carlos` |
| `page` | number | Numero de pagina | `?page=2` |
| `limit` | number | Resultados por pagina | `?limit=10` |

### Respuesta exitosa

**`200 OK`:**

```json
[
  {
    "id": 1,
    "titulo": "Paisaje Costero",
    "descripcion": "Vista del Caribe desde el malecon",
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

---

## Obtener obra por ID

### Endpoint

```http
GET /api/obras/:id
```

### Respuesta exitosa

**`200 OK`:** objeto obra (mismo esquema que el listado).

### Respuesta de error

**`404`:**

```json
{ "error": "Obra no encontrada" }
```

---

## Crear nueva obra

### Endpoint

```http
POST /api/obras
Content-Type: multipart/form-data
```

### Campos del formulario

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `image` | File | Si | Imagen de la obra |
| `titulo` | string | Si | Titulo de la obra |
| `descripcion` | string | No | Descripcion libre |
| `autorApodo` | string | Si | Apodo del visitante |
| `avatarIndex` | number | No | Indice del avatar (0-7) |

### Restricciones de imagen

:::info
- **Tamano maximo:** 20 MB
- **Formatos aceptados:** `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
:::

### Respuesta exitosa

**`201 Created`:** objeto obra creado con todos los campos.

### Ejemplo con curl

```bash
curl -X POST https://www.mamb.online/api/obras \
  -F "image=@mi-obra.jpg" \
  -F "titulo=Mi primera obra" \
  -F "descripcion=Pintura al oleo" \
  -F "autorApodo=Carlos" \
  -F "avatarIndex=3"
```

---

## Actualizar obra

### Endpoint

```http
PATCH /api/obras/:id
Content-Type: application/json
```

### Body de la peticion

```json
{
  "titulo": "Nuevo titulo",
  "descripcion": "Nueva descripcion"
}
```

### Respuesta exitosa

**`200 OK`:** obra actualizada con los nuevos valores.

---

## Eliminar obra

### Endpoint

```http
DELETE /api/obras/:id
```

### Respuesta exitosa

**`200 OK`:**

```json
{ "message": "Obra eliminada" }
```

### Comportamiento

Elimina la obra de la base de datos y el archivo de imagen del disco.

---

## Dar like

### Endpoint

```http
POST /api/obras/:id/like
```

### Comportamiento

Incrementa en 1 el contador de likes de la obra.

### Respuesta exitosa

**`200 OK`:**

```json
{ "likes_count": 6 }
```

---

## Calificar obra

### Endpoint

```http
POST /api/obras/:id/rate
Content-Type: application/json
```

### Body de la peticion

```json
{ "rating": 4 }
```

### Validacion

El valor de `rating` debe ser un entero entre **1** y **5**.

### Respuesta exitosa

**`200 OK`:**

```json
{
  "rating_total": 16,
  "rating_count": 4
}
```

### Calcular promedio

:::tip
Para obtener el rating promedio: `rating_total / rating_count` = `16 / 4` = **4.0 estrellas**.
:::

---

## Esquema completo de una obra

### Objeto obra

```json
{
  "id": 1,
  "titulo": "Paisaje Costero",
  "descripcion": "Vista del Caribe desde el malecon",
  "image_url": "/uploads/obra_1717000000000.jpg",
  "autor_apodo": "Carlos",
  "avatar_index": 2,
  "likes_count": 12,
  "rating_total": 35,
  "rating_count": 8,
  "created_at": "2026-05-29T14:00:00.000Z"
}
```

### Descripcion de campos

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| `id` | number | Identificador unico |
| `titulo` | string | Titulo de la obra |
| `descripcion` | string | Descripcion textual |
| `image_url` | string | Ruta relativa a la imagen |
| `autor_apodo` | string | Apodo del autor |
| `avatar_index` | number | Indice del avatar (0-7) |
| `likes_count` | number | Total de likes recibidos |
| `rating_total` | number | Suma de todas las calificaciones |
| `rating_count` | number | Numero de calificaciones |
| `created_at` | string (ISO 8601) | Fecha de creacion |
