---
sidebar_position: 3
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# Base de datos

MAMB utiliza **PostgreSQL** como sistema de gestion de base de datos relacional. La conexion se configura mediante la variable de entorno `DATABASE_URL`.

---

## Modelo de datos

### Diagrama de entidades

```
+---------------------+       +---------------------+
|       obras         |       |      usuarios       |
+---------------------+       +---------------------+
| id (PK, SERIAL)     |       | id (PK, SERIAL)     |
| titulo              |       | apodo (UNIQUE)       |
| descripcion         |       | ciudad               |
| image_url           |       | avatar_index         |
| autor_apodo         |       | password_hash        |
| avatar_index        |       | created_at           |
| likes_count         |       +---------------------+
| rating_total        |
| rating_count        |
| created_at          |
+---------------------+
```

### Relaciones

Actualmente no hay claves foraneas entre tablas. La relacion entre obras y usuarios es implicita a traves del campo `autor_apodo`.

---

## Tabla `obras`

### Descripcion

Almacena las obras de arte del museo y de los visitantes.

### Columnas

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `id` | `SERIAL PRIMARY KEY` | ID autoincremental |
| `titulo` | `VARCHAR(255)` | Titulo de la obra (requerido) |
| `descripcion` | `TEXT` | Descripcion libre |
| `image_url` | `TEXT` | Ruta relativa al archivo subido en `/uploads` |
| `autor_apodo` | `VARCHAR(100)` | Apodo del visitante que subio la obra |
| `avatar_index` | `INTEGER` | Indice del avatar seleccionado (0-7) |
| `likes_count` | `INTEGER DEFAULT 0` | Contador de likes |
| `rating_total` | `INTEGER DEFAULT 0` | Suma total de calificaciones recibidas |
| `rating_count` | `INTEGER DEFAULT 0` | Numero de calificaciones recibidas |
| `created_at` | `TIMESTAMPTZ` | Fecha y hora de creacion |

### Calificacion promedio

:::tip
El rating promedio se calcula como `rating_total / rating_count`. Este diseno permite actualizar con un solo `UPDATE` sin subconsultas.
:::

---

## Tabla `usuarios`

### Descripcion

Almacena los perfiles de visitantes registrados.

### Columnas

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `id` | `SERIAL PRIMARY KEY` | ID autoincremental |
| `apodo` | `VARCHAR(100) UNIQUE` | Nombre de usuario unico |
| `ciudad` | `VARCHAR(100)` | Ciudad del visitante |
| `avatar_index` | `INTEGER` | Avatar elegido (0-7) |
| `password_hash` | `TEXT` | Hash bcrypt de la contrasena |
| `created_at` | `TIMESTAMPTZ` | Fecha de registro |

### Seguridad de contrasenas

Las contrasenas se almacenan como hash bcrypt, nunca en texto plano. El hashing se realiza en el backend antes de insertar en la base de datos.

---

## Conexion

### Configuracion del pool

El backend se conecta usando el paquete `pg`:

```js
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false
});
```

### Variable de entorno

```env
DATABASE_URL=postgresql://usuario:contraseña@host:5432/mamb
```

### SSL segun entorno

| Entorno | SSL |
|---------|-----|
| Produccion (Render) | Habilitado (`rejectUnauthorized: false`) |
| Desarrollo local | Deshabilitado |

---

## Migracion automatica

### Comportamiento

El backend crea las tablas automaticamente al arrancar si no existen. No se usa un sistema de migraciones formal — la creacion es declarativa en el codigo del servidor.

### Ventajas

- Sin pasos manuales de migracion
- El esquema siempre esta sincronizado con el codigo
- Despliegue simplificado

---

## Almacenamiento de imagenes

### Ubicacion

Las imagenes **no se guardan en la base de datos**. Se almacenan en el sistema de archivos bajo `backend/uploads/`. La BD solo guarda la ruta relativa en `image_url`.

### Restricciones

| Aspecto | Detalle |
|---------|---------|
| **Ubicacion** | `backend/uploads/` |
| **Tamano maximo** | 20 MB por imagen |
| **Formatos** | `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif` |
| **Procesamiento** | Multer (middleware de Express) |

### Disco efimero en Render

:::caution
En el plan gratuito de Render, el disco es efimero: las imagenes se pierden cuando el servicio se reinicia o se redespliega. Para persistencia permanente se recomienda un servicio externo (Cloudinary, S3, etc.).
:::
