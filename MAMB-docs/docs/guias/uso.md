---
sidebar_position: 2
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# Guia de uso

La aplicacion MAMB cuenta con **9 pantallas** principales. A continuacion se describe cada una con su funcionalidad.

![Pantalla principal de MAMB](/img/app/app1.jpeg)

---

## Inicio

Pantalla de bienvenida donde el visitante ingresa su nombre para comenzar la experiencia.

### Elementos de la pantalla

- Campo de texto para ingresar nombre de visitante
- Accesos directos a la galeria y a subir una obra
- Carrusel de obras destacadas

![Pantalla de inicio](/img/app/app3.jpg)

---

## Galeria

Vista principal con todas las obras del museo y de los visitantes.

### Busqueda y filtros

- Buscar por titulo o nombre del artista
- Filtrar por tecnica artistica:
  - Oleo
  - Acuarela
  - Acrilico
  - Mixta
  - Escultura

### Interacciones en la galeria

- Dar like a una obra con un toque
- Ver contador de likes acumulados
- Acceder al detalle completo de cada pieza

![Galeria de obras](/img/app/app5.jpeg)

---

## Subir obra

Formulario para que los visitantes publiquen su propia obra.

### Pasos para subir

1. Selecciona o toma una fotografia de la obra
2. Ingresa titulo y descripcion
3. Selecciona la tecnica artistica
4. Elige un avatar y apodo de visitante
5. Envia el formulario

### Moderacion automatica

El sistema filtra automaticamente nombres inapropiados antes de publicar, usando:

- Deteccion de leet-speak (ej: `h4ck3r`)
- Deteccion de homoglifos Unicode
- Lista de palabras prohibidas

![Formulario de subida](/img/app/app6.jpeg)

---

## Juego de memoria

Mini-juego de cartas con datos curiosos sobre pinturas famosas del MAMB.

### Como jugar

1. Se muestran cartas boca abajo
2. Voltea dos cartas por turno
3. Encuentra los pares para desbloquear datos de cada obra
4. Completa el tablero para ganar

### Objetivo educativo

Cada par desbloqueado revela informacion sobre una pintura famosa: autor, tecnica, ano y datos curiosos.

![Juego de memoria](/img/app/app8.jpeg)

---

## Perfil

Gestiona tu informacion de visitante.

### Datos del perfil

- Apodo (nombre de usuario)
- Ciudad de origen
- Avatar seleccionado

### Seleccion de avatar

8 opciones de avatar disponibles, generados con la API de DiceBear.

### Historial de obras

Lista de todas las obras que el visitante ha subido a la plataforma.

![Pantalla de perfil](/img/app/app9.jpeg)

---

## Colecciones

Explora las colecciones permanentes del museo.

### Organizacion

Las colecciones estan organizadas por sala o artista. Puedes guardar tus obras favoritas para acceder rapidamente.

---

## Acerca del museo

Informacion sobre el Museo de Arte Moderno de Barranquilla.

### Contenido

- Historia del museo
- Mision y vision cultural
- Equipo detras del proyecto
- Informacion de contacto

---

## Detalle de obra

Vista expandida de una obra especifica.

### Informacion mostrada

| Elemento | Descripcion |
|----------|-------------|
| **Imagen** | Vista ampliada de la obra |
| **Titulo** | Nombre de la obra |
| **Autor** | Apodo del visitante o artista |
| **Tecnica** | Tipo de tecnica artistica |
| **Descripcion** | Texto descriptivo de la obra |

### Sistema de interaccion

- **Likes** — contador de corazones acumulados
- **Calificacion** — promedio de estrellas (1-5)
- **Boton calificar** — permite asignar 1 a 5 estrellas

![Detalle de una obra](/img/app/app7.jpeg)

---

## Autenticacion

Sistema de registro e inicio de sesion.

### Registro

- Nombre de usuario (apodo)
- Ciudad
- Seleccion de avatar
- Contrasena

### Inicio de sesion

- Login con apodo y contrasena
- Token JWT almacenado de forma segura

### Sesion y offline

- Token con expiracion automatica
- Sincronizacion con `localStorage` para soporte offline
- Si el token expira, se solicita nuevo login
