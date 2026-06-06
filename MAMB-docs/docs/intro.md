---
slug: /intro
sidebar_position: 1
toc_min_heading_level: 2
toc_max_heading_level: 4
displayed_sidebar: mambSidebar
---

# Museo de Arte Moderno de Barranquilla

**MAMB** es una aplicacion web progresiva (PWA) desarrollada para el Museo de Arte Moderno de Barranquilla. Permite a estudiantes y visitantes explorar la galeria del museo, subir sus propias obras y participar en juegos interactivos.

:::info Proyecto academico
Desarrollado en colaboracion con el **Museo de Arte Moderno de Barranquilla** y la **Universidad Simon Bolivar**, Barranquilla.
:::

![Vista de la aplicacion MAMB](/img/app/app5.jpeg)

## Descripcion general

El sistema busca fomentar la creatividad y la participacion artistica de ninos y visitantes del museo, ofreciendo una plataforma digital interactiva accesible desde cualquier dispositivo.

### Objetivos del proyecto

- Incentivar la creatividad infantil a traves del arte digital
- Facilitar la exposicion de obras artisticas de visitantes
- Crear una experiencia digital interactiva y educativa
- Acercar el museo a nuevas audiencias mediante tecnologia web
- Promover el aprendizaje mediante actividades ludicas

### Publico objetivo

- Estudiantes de primaria y secundaria en visitas escolares
- Visitantes del museo de todas las edades
- Comunidad artistica de Barranquilla

---

## Stack tecnologico

### Frontend

| Tecnologia | Uso |
|------------|-----|
| HTML5 | Estructura semantica de la SPA |
| CSS3 | Diseno visual responsive, mobile-first |
| JavaScript Vanilla | Logica de la app, sin frameworks |
| PWA / Service Worker | Instalacion nativa y cache offline |

### Backend

| Tecnologia | Uso |
|------------|-----|
| Node.js | Runtime del servidor |
| Express.js | Framework para la API REST |
| PostgreSQL | Base de datos relacional |
| JWT + bcryptjs | Autenticacion y hashing de contrasenas |
| Helmet | Headers HTTP de seguridad |
| CORS | Control de origenes cruzados |
| Multer | Subida de imagenes (hasta 20 MB) |
| Morgan | Logging de peticiones HTTP |

### Infraestructura

| Servicio | Uso |
|----------|-----|
| Render | Hosting del backend + frontend |
| Namecheap | Dominio mamb.online |
| GitHub Pages | Landing page estatica |

---

## Componentes del sistema

El proyecto esta compuesto por tres modulos principales:

### Landing Page

Sitio web informativo alojado en GitHub Pages donde los visitantes conocen el museo y acceden a la aplicacion principal.

- URL: [risharddv.github.io/MAMBQ](https://risharddv.github.io/MAMBQ/)
- Tecnologias: HTML, CSS, JavaScript
- Despliegue automatico desde la rama `main`

### Aplicacion Web (PWA)

Aplicacion principal con 9 pantallas interactivas:

- **Inicio** — splash + ingreso de nombre
- **Galeria** — listado de obras con busqueda y filtros
- **Subir obra** — formulario con moderacion automatica
- **Juego de memoria** — mini-juego con datos de arte
- **Perfil** — configuracion del visitante
- **Colecciones** — obras favoritas guardadas
- **Acerca de** — informacion del museo
- **Detalle** — vista ampliada de una obra
- **Autenticacion** — registro e inicio de sesion

### Backend API

API REST que gestiona toda la logica del servidor:

- **Obras** — CRUD completo con subida de imagenes
- **Interacciones** — likes y calificaciones (1-5 estrellas)
- **Usuarios** — registro, login, perfiles
- **Moderacion** — filtro de contenido inapropiado
- **Seguridad** — JWT, Helmet, CORS

---

## Caracteristicas principales

### Galeria virtual

Obras del museo y obras subidas por visitantes. Busqueda por titulo o artista, filtros por tecnica (Oleo, Acuarela, Acrilico, Mixta, Escultura).

### Subida de obras

Formulario con seleccion de imagen, titulo, descripcion, tecnica y avatar. Moderacion automatica de contenido antes de publicar.

### Juego de memoria

Mini-juego de cartas con datos curiosos sobre pinturas famosas del MAMB. Encuentra los pares para desbloquear informacion educativa.

### Sistema de interaccion

- **Likes** — contador de corazones por obra
- **Calificaciones** — sistema de 1 a 5 estrellas con promedio visible

### PWA instalable

Service Worker con estrategia de cache inteligente. Instalable en movil y escritorio como app nativa. Soporte offline con fallback a localStorage.

### Moderacion de contenido

Filtro automatico de apodos inapropiados con deteccion de leet-speak (ej: `h4ck3r`), homoglifos Unicode y lista de palabras prohibidas.

### Perfiles de visitante

Cada usuario tiene nombre, ciudad, avatar seleccionable (8 opciones) y historial de obras subidas.

---

## Enlaces del proyecto

| Entorno | URL |
|---------|-----|
| **Aplicacion (produccion)** | [mamb.online](https://www.mamb.online/) |
| **Render (directo)** | [mamb-qsi0.onrender.com](https://mamb-qsi0.onrender.com/) |
| **Landing page** | [risharddv.github.io/MAMBQ](https://risharddv.github.io/MAMBQ/) |
| **Repositorio** | [github.com/risharddv/MAMBQ](https://github.com/risharddv/MAMBQ) |
| **Documentacion** | Estas paginas |
