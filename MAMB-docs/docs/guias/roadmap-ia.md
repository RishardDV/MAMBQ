---
sidebar_position: 5
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# Hoja de ruta — IA

:::caution Funcionalidad planificada
El modulo de inteligencia artificial **no esta implementado** en la version actual. Esta pagina documenta la funcionalidad prevista para fases futuras.
:::

## Objetivo

Integrar un modelo de **estilizacion artistica** (Neural Style Transfer) que permita a los visitantes aplicar estilos de artistas reconocidos del MAMB a sus propias obras.

---

## Flujo previsto

### Proceso del usuario

1. El visitante sube una imagen de su obra
2. La imagen pasa por moderacion de contenido (ya implementada)
3. El visitante selecciona un estilo artistico
4. TensorFlow.js procesa la imagen
5. La imagen estilizada se publica en la galeria

### Diagrama de flujo

```
Visitante sube imagen
        |
        v
  Moderacion de contenido (ya implementada)
        |
        v
  Seleccion de estilo artistico
  (ej: "estilo Obregon", "estilo Grau")
        |
        v
  TensorFlow.js aplica el estilo
        |
        v
  Imagen estilizada publicada en la galeria
```

---

## Tecnologias planificadas

### Modelo de IA

| Componente | Tecnologia |
|------------|------------|
| Modelo base | TensorFlow.js (browser o Node.js) |
| Tecnica | Neural Style Transfer / Arbitrary Style Transfer |

### Almacenamiento

| Opcion | Ventaja |
|--------|---------|
| Render Disk | Integrado, sin configuracion extra |
| Cloudinary | CDN global, transformaciones de imagen |
| Amazon S3 | Escalable, bajo costo por GB |

---

## Estado actual del proyecto

### Componentes implementados

| Componente | Estado |
|------------|--------|
| Subida de imagenes | Implementado |
| Moderacion de contenido | Implementado |
| Galeria funcional | Implementado |
| Base de datos PostgreSQL | Implementado |
| API REST completa | Implementado |

### Componentes pendientes

| Componente | Estado |
|------------|--------|
| Integracion TensorFlow.js | Pendiente |
| Seleccion de estilos artisticos | Pendiente |
| Almacenamiento de imagenes procesadas | Pendiente |

---

## Requisitos para la implementacion

### Modelos pre-entrenados

Seleccionar y optimizar modelos de style transfer para ejecucion en el navegador. Los modelos deben ser lo suficientemente ligeros para funcionar en dispositivos moviles.

### Galeria de estilos

Recopilar obras de referencia de artistas del MAMB para usar como estilos base. Cada estilo necesita una imagen de referencia de alta calidad.

### Infraestructura de almacenamiento

Definir servicio para persistir las imagenes procesadas. Las imagenes originales ya se almacenan en Render, pero las procesadas requieren almacenamiento adicional.
