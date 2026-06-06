---
sidebar_position: 2
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# Frontend

El frontend es una **Single Page Application (SPA)** desarrollada en JavaScript vanilla, sin frameworks. Es instalable como PWA y esta disenada con enfoque mobile-first.

---

## Modulos principales

### Tabla de archivos

| Archivo | Lineas | Responsabilidad |
|---------|--------|----------------|
| `index.html` | ~1018 | Estructura HTML de las 9 pantallas |
| `app.js` | ~1188 | Logica de navegacion, renderizado, juego, perfiles |
| `style.css` | ~2509 | Diseno responsive, variables CSS, animaciones |
| `api.js` | ~192 | Llamadas a la API REST con fallback offline |
| `usernameModeration.js` | ~132 | Filtro de apodos inapropiados |
| `manifest.json` | ~34 | Metadatos PWA |
| `sw.js` | ~76 | Service Worker para cache offline |

### index.html

Archivo HTML unico que contiene las 9 pantallas como secciones `<section>`. Solo una seccion es visible a la vez, controlada por CSS y JavaScript.

### app.js

Modulo principal que maneja:
- Navegacion entre pantallas
- Renderizado de tarjetas de obras
- Logica del juego de memoria
- Gestion de perfiles y avatares
- Manejo de eventos de usuario

### style.css

Estilos mobile-first con:
- Variables CSS para temas
- Grid y Flexbox para layout responsive
- Animaciones y transiciones
- Soporte para modo oscuro

### api.js

Cliente HTTP que encapsula todas las llamadas al backend con fallback automatico a localStorage cuando no hay conexion.

---

## Pantallas de la app

### Tabla de pantallas

| ID | Pantalla | Funcion |
|----|----------|---------|
| `screen-inicio` | Inicio | Splash + ingreso de nombre |
| `screen-galeria` | Galeria | Listado de obras con busqueda y filtros |
| `screen-subir` | Subir obra | Formulario de publicacion |
| `screen-memory` | Juego | Juego de memoria con datos de arte |
| `screen-perfil` | Perfil | Configuracion del visitante |
| `screen-colecciones` | Colecciones | Obras favoritas guardadas |
| `screen-about` | Acerca de | Info del museo |
| `screen-detalle` | Detalle | Vista ampliada de una obra |
| `screen-juego` | Juegos | Actividades interactivas |

---

## Navegacion SPA

### Mecanismo de navegacion

No usa rutas del navegador. Cada pantalla es una seccion con `display: none` por defecto. `app.js` controla la visibilidad:

```js
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}
```

### Ventajas de este enfoque

- Sin dependencia de router externo
- Transiciones instantaneas entre pantallas
- Compatible con cualquier navegador
- Sin recarga de pagina

---

## Cliente API (`api.js`)

### Endpoints consumidos

| Metodo | Endpoint | Funcion |
|--------|----------|---------|
| `GET` | `/api/obras` | Listar obras con filtros |
| `GET` | `/api/obras/:id` | Obtener obra por ID |
| `POST` | `/api/obras` | Crear obra (multipart) |
| `DELETE` | `/api/obras/:id` | Eliminar obra |
| `POST` | `/api/obras/:id/like` | Dar like |
| `POST` | `/api/obras/:id/rate` | Calificar (1-5) |

### Fallback offline

Cuando el backend no responde, `api.js` usa obras guardadas en `localStorage` bajo la clave `mamb_local_obras`, permitiendo navegar la galeria sin conexion.

### Manejo de errores

El cliente captura errores de red y muestra mensajes apropiados al usuario. En caso de fallo, los datos se persisten localmente para sincronizar despues.

---

## Service Worker

### Estrategias de cache

| Tipo de recurso | Estrategia | Comportamiento |
|-----------------|------------|----------------|
| Peticiones API (`/api/*`) | Network-first | Intenta red primero, cache como fallback |
| Assets estaticos (CSS, JS, imagenes) | Cache-first | Sirve desde cache, actualiza en background |

### Ciclo de vida

1. **Instalacion** — precachea assets criticos
2. **Activacion** — limpia caches antiguas
3. **Fetch** — intercepta peticiones y aplica estrategia segun tipo

---

## PWA

### Criterios de instalacion

La app cumple los requisitos minimos de PWA:

- `manifest.json` con `name`, `short_name`, `start_url`, `display: standalone`
- Service Worker registrado con estrategias de cache
- Iconos en formatos 192x192 y 512x512 px (SVG)
- Tema de color y color de fondo definidos

### Configuracion del manifest

| Campo | Valor |
|-------|-------|
| `name` | Museo de Arte Moderno |
| `short_name` | MAMB |
| `display` | standalone |
| `start_url` | `/` |
| `theme_color` | Definido en manifest |

![App MAMB responsive](/img/app/responsive1.png)

---

## Moderacion de contenido

### usernameModeration.js

Filtra apodos inapropiados del lado del cliente antes de enviarlos al servidor.

### Tecnicas de deteccion

- **Lista negra** — palabras prohibidas directas
- **Leet-speak** — detecta sustituciones como `h4ck3r`, `@dmin`
- **Homoglifos** — caracteres Unicode visualmente similares (ej: cirilico `а` vs latino `a`)
- **Normalizacion** — convierte a forma canonica para evitar evasiones
