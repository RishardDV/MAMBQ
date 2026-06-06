---
sidebar_position: 4
---

# Alojamiento en Render

La aplicación PWA y la API REST están desplegadas en **[Render](https://render.com)**, una plataforma cloud que permite hospedar servicios Node.js con despliegue automático desde GitHub.

**URL de producción:** [mamb-qsi0.onrender.com](https://mamb-qsi0.onrender.com/)

---

## Cómo está estructurado el despliegue

Render sirve tanto el **frontend estático** como el **backend Express** desde el mismo servicio. El servidor Express detecta si una ruta es de la API (`/api/*`) o del frontend, y responde en consecuencia.

```
Cliente (navegador)
       │
       ▼
  Render (Web Service)
       │
       ├── /api/*  → Express (Node.js)
       └── /*      → Sirve frontend/index.html
```

---

## Pasos para desplegar

### 1. Preparar el repositorio

Asegúrate de que el `.gitignore` excluye `node_modules/`, `.env` y archivos de build.

### 2. Crear el Web Service en Render

1. Entra a [dashboard.render.com](https://dashboard.render.com) y haz clic en **New → Web Service**
2. Conecta tu repositorio de GitHub (`risharddv/MAMBQ`)
3. Configura el servicio:

| Campo | Valor |
|-------|-------|
| **Name** | `mamb` |
| **Region** | Oregon (US West) u otra disponible |
| **Branch** | `main` |
| **Build Command** | `npm install` |
| **Start Command** | `node backend/server.js` |
| **Instance Type** | Free |

### 3. Variables de entorno

En la sección **Environment** del servicio, agrega:

```
PORT=10000
DATABASE_URL=postgresql://...   # cuando tengas la BD
JWT_SECRET=tu_clave_secreta
NODE_ENV=production
```

:::caution Puerto en Render
Render asigna el puerto dinámicamente. El backend debe leer `process.env.PORT`:
```js
const PORT = process.env.PORT || 3000;
app.listen(PORT);
```
:::

### 4. Primer despliegue

Una vez guardada la configuración, Render ejecuta automáticamente el build y arranca el servidor. Cada `git push` a `main` dispara un nuevo despliegue.

---

## Plan gratuito — consideraciones

- Los servicios gratuitos de Render **se duermen** tras 15 minutos de inactividad.
- La primera petición después del reposo puede tardar **20–30 segundos** mientras el servicio despierta.
- No tiene límite de peticiones por mes, pero sí de horas de cómputo (750 h/mes en la capa gratuita).

---

## Logs y monitoreo

Desde el dashboard de Render puedes acceder a los logs en tiempo real del servicio. Si el despliegue falla, el log muestra el error exacto del proceso de build o arranque.
