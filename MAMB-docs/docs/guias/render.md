---
sidebar_position: 4
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# Despliegue en Render

La aplicacion MAMB (frontend + backend) esta desplegada en **[Render](https://render.com)**, una plataforma cloud con despliegue automatico desde GitHub.

**URL de produccion:** [mamb.online](https://www.mamb.online/) (redirige a Render)

---

## Arquitectura del despliegue

### Servicio unificado

Render sirve tanto el **frontend estatico** como el **backend Express** desde un unico servicio. El servidor detecta si la peticion es para la API o para el frontend.

### Diagrama de flujo

```
Cliente (navegador)
       |
       v
  mamb.online (Namecheap DNS)
       |
       v
  Render (Web Service)
       |
       |-- /api/*  --> Express (Node.js + PostgreSQL)
       +-- /*      --> Sirve frontend/index.html
```

![Dashboard de Render](/img/app/render1.png)

---

## Configuracion del servicio

### Crear Web Service en Render

1. Entra a [dashboard.render.com](https://dashboard.render.com)
2. Clic en **New > Web Service**
3. Conecta el repositorio de GitHub (`risharddv/MAMBQ`)

### Parametros del servicio

| Campo | Valor |
|-------|-------|
| **Name** | `mamb` |
| **Region** | Oregon (US West) |
| **Branch** | `main` |
| **Build Command** | `npm install` |
| **Start Command** | `node backend/server.js` |
| **Instance Type** | Free |

### Variables de entorno

En la seccion **Environment** del servicio:

```
PORT=10000
DATABASE_URL=postgresql://...
JWT_SECRET=tu_clave_secreta
NODE_ENV=production
```

#### Puerto dinamico

:::caution
Render asigna el puerto dinamicamente. El backend lee `process.env.PORT`:
```js
const PORT = process.env.PORT || 3000;
app.listen(PORT);
```
:::

### Despliegue automatico

Cada `git push` a la rama `main` dispara un nuevo despliegue automaticamente. Render ejecuta el build y arranca el servidor sin intervencion manual.

![Proceso de despliegue en Render](/img/app/render2.png)

---

## Dominio personalizado

### Registro del dominio

Se adquirio el dominio **[mamb.online](https://www.mamb.online/)** a traves de **Namecheap**.

### Configuracion DNS

Este dominio redirige automaticamente al servicio alojado en Render, proporcionando una URL profesional y facil de recordar.

### Flujo de redireccion

```
https://www.mamb.online/  -->  https://mamb-qsi0.onrender.com/
```

![Configuracion del dominio en Namecheap](/img/dominio.jpeg)

---

## Plan gratuito — consideraciones

### Limitaciones

| Aspecto | Detalle |
|---------|---------|
| **Hibernacion** | El servicio se duerme tras 15 min de inactividad |
| **Cold start** | Primera peticion tras reposo tarda 20-30 segundos |
| **Horas de computo** | 750 h/mes en la capa gratuita |
| **Peticiones** | Sin limite mensual |

### Recomendaciones

:::tip Rendimiento
Para evitar cold starts en demos o presentaciones, puedes hacer un ping al endpoint `/api/health` unos minutos antes.
:::

---

## Logs y monitoreo

### Acceso a logs

Desde el dashboard de Render se accede a los logs en tiempo real del servicio.

### Diagnostico de errores

Si el despliegue falla, el log muestra el error exacto del proceso de build o del arranque del servidor. Errores comunes:

- Variables de entorno faltantes
- Dependencias no instaladas
- Puerto ya en uso

![Dashboard de Render con logs](/img/app/Render3.png)
