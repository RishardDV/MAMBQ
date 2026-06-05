---
sidebar_position: 1
---

# Instalación

Cómo poner en marcha el proyecto MAMB localmente.

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- [PostgreSQL](https://www.postgresql.org/) v14 o superior (para el backend)
- Git

## 1. Clonar el repositorio

```bash
git clone https://github.com/risharddv/MAMBQ.git
cd MAMBQ
```

## 2. Ejecutar el frontend

El frontend es una SPA estática, no necesita instalación de dependencias:

```bash
cd frontend
npx http-server
```

Luego abre [http://localhost:8080](http://localhost:8080) en tu navegador.

:::tip Sin servidor
También puedes abrir `frontend/index.html` directamente en el navegador para una vista rápida, aunque algunas funciones de red pueden verse limitadas.
:::

## 3. Variables de entorno (backend)

Crea un archivo `.env` en la carpeta `backend/`:

```env
PORT=3000
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/mamb
JWT_SECRET=tu_clave_secreta_aqui
```

## 4. Instalar dependencias del backend

```bash
cd backend
npm install
npm run start
```

El servidor quedará disponible en `http://localhost:3000`.

## 5. Instalar como PWA

Una vez que la app esté corriendo, en móvil o Chrome verás la opción **"Añadir a pantalla de inicio"** para instalarla como app nativa.
