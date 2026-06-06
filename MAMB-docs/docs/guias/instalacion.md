---
sidebar_position: 1
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# Instalacion

Guia para poner en marcha el proyecto MAMB en tu maquina local.

## Requisitos previos

### Software necesario

| Requisito | Version minima |
|-----------|----------------|
| [Node.js](https://nodejs.org/) | v18+ |
| [PostgreSQL](https://www.postgresql.org/) | v14+ |
| [Git](https://git-scm.com/) | cualquier version reciente |

### Verificar instalacion

```bash
node -v    # debe mostrar v18 o superior
psql --version
git --version
```

---

## Clonar el repositorio

```bash
git clone https://github.com/risharddv/MAMBQ.git
cd MAMBQ
```

---

## Configurar el backend

### Variables de entorno

Crea un archivo `.env` en la carpeta `backend/`:

```env
PORT=3000
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/mamb
JWT_SECRET=tu_clave_secreta_aqui
NODE_ENV=development
```

:::caution Seguridad
Nunca subas el archivo `.env` al repositorio. Ya esta incluido en `.gitignore`.
:::

### Descripcion de variables

| Variable | Descripcion |
|----------|-------------|
| `PORT` | Puerto donde escucha el servidor (default: 3000) |
| `DATABASE_URL` | Cadena de conexion a PostgreSQL |
| `JWT_SECRET` | Clave secreta para firmar tokens JWT |
| `NODE_ENV` | Entorno de ejecucion (`development` o `production`) |

### Instalar dependencias

```bash
cd backend
npm install
```

### Arrancar el servidor

```bash
npm run start
```

El servidor quedara disponible en `http://localhost:3000`.

---

## Ejecutar el frontend

### Con servidor local

El frontend es una SPA estatica que no necesita build ni dependencias adicionales:

```bash
cd frontend
npx http-server -p 8080
```

Abre [http://localhost:8080](http://localhost:8080) en tu navegador.

### Sin servidor (modo rapido)

Tambien puedes abrir `frontend/index.html` directamente en el navegador.

:::tip
Algunas funciones de red (API calls) requieren que el backend este corriendo para funcionar correctamente.
:::

---

## Base de datos PostgreSQL

### Crear la base de datos

Asegurate de tener PostgreSQL corriendo y crea la base de datos:

```sql
CREATE DATABASE mamb;
```

### Creacion automatica de tablas

El backend crea las tablas automaticamente al arrancar si no existen. No necesitas ejecutar migraciones manualmente.

### Verificar conexion

Puedes probar que la base de datos esta conectada visitando:

```
http://localhost:3000/api/health
```

Deberia responder:

```json
{ "status": "ok", "museo": "MAMB", "db": "PostgreSQL" }
```

---

## Instalar como PWA

### En dispositivo movil

Una vez que la app este corriendo (local o en produccion):

1. Abre la app en **Chrome** o un navegador compatible
2. Busca el icono de instalacion en la barra de direcciones
3. Selecciona **"Instalar"** o **"Anadir a pantalla de inicio"**

### En escritorio (Chrome)

1. Abre la app en Chrome
2. Haz clic en el icono de instalacion en la barra de URL
3. Confirma la instalacion

La app se instalara como aplicacion nativa en tu dispositivo.

![App MAMB en dispositivo movil](/img/app/responsive1.png)

---

## Resolucion de problemas

### El backend no arranca

- Verifica que PostgreSQL este corriendo
- Revisa que `DATABASE_URL` en `.env` sea correcta
- Asegurate de haber ejecutado `npm install`

### La app no se conecta al backend

- Verifica que el backend este corriendo en el puerto correcto
- Revisa la consola del navegador para errores de CORS
- En modo local, el frontend debe apuntar a `http://localhost:3000`
