---
sidebar_position: 5
---

# Hoja de ruta — IA

:::caution Funcionalidad no disponible aún
El módulo de inteligencia artificial **no está implementado** en la versión actual. Esta página documenta lo que está planificado para fases futuras del proyecto.
:::

## Qué se tiene previsto

El objetivo es integrar un modelo de **estilización artística** (Neural Style Transfer) que procese las obras subidas por los niños y les aplique el estilo visual de pintores reconocidos del MAMB.

### Flujo esperado

```
Visitante sube imagen
        │
        ▼
  Moderación de contenido (ya existe)
        │
        ▼
  Selección de estilo artístico
  (ej: "estilo Obregón", "estilo Grau")
        │
        ▼
  TensorFlow.js aplica el estilo
        │
        ▼
  Imagen estilizada guardada y publicada
  en la galería de visitantes
```

### Tecnologías previstas

| Componente | Tecnología |
|------------|------------|
| Modelo base | TensorFlow.js (browser o Node) |
| Técnica | Neural Style Transfer / Arbitrary Style Transfer |
| Almacenamiento de imágenes procesadas | Por definir (Render Disk, Cloudinary, S3) |
| Base de datos | Por definir — necesaria para persistir imágenes procesadas |

## Por qué no está implementado aún

El módulo de IA requiere definir primero la capa de almacenamiento persistente (base de datos e imágenes), que actualmente no está en producción. Una vez se establezca esa infraestructura, el módulo de TensorFlow.js se integrará como middleware del backend.

## Estado actual

- ✅ Subida y moderación de imágenes operativa
- ✅ Galería funcional con obras del museo
- ⏳ Almacenamiento persistente en base de datos — pendiente
- ⏳ Integración TensorFlow.js — pendiente
- ⏳ Selección de estilos artísticos — pendiente
