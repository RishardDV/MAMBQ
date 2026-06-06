---
sidebar_position: 3
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# Landing Page

La landing page es el sitio web informativo del proyecto MAMB. Esta alojada en **GitHub Pages** y sirve como punto de entrada para que los visitantes conozcan el museo antes de acceder a la aplicacion principal.

**URL:** [risharddv.github.io/MAMBQ](https://risharddv.github.io/MAMBQ/)

![Landing page del proyecto MAMB](/img/app/landing1.png)

---

## Proposito

La landing page cumple tres funciones principales:

### Presentar el museo

Informacion sobre el MAMB, su mision cultural y su importancia para la comunidad artistica de Barranquilla.

### Mostrar el proyecto

Descripcion de la aplicacion web, sus funcionalidades principales y las tecnologias utilizadas.

### Redirigir a la app

Enlace directo a la PWA en [mamb.online](https://www.mamb.online/) para que los visitantes accedan rapidamente.

---

## Estructura del codigo

La landing se encuentra en la carpeta `Landing MAMB/` del repositorio:

### Archivos principales

```
Landing MAMB/
├── index.html    # Estructura HTML de la pagina
├── index.js      # Interacciones y animaciones
├── styles.css    # Estilos visuales
└── img/          # Imagenes y recursos graficos
```

### Descripcion de archivos

| Archivo | Funcion |
|---------|---------|
| `index.html` | Estructura semantica de la pagina (~398 lineas) |
| `index.js` | Animaciones, scroll suave e interacciones (~200 lineas) |
| `styles.css` | Diseno visual responsive |
| `img/` | Imagenes del museo y del proyecto |

---

## Tecnologias

| Tecnologia | Uso |
|------------|-----|
| HTML5 | Estructura semantica |
| CSS3 | Diseno visual y responsive |
| JavaScript | Animaciones e interacciones |
| GitHub Pages | Hosting gratuito |

---

## Despliegue

### GitHub Pages

La landing se despliega automaticamente desde la rama `main` del repositorio mediante **GitHub Pages**. Cualquier cambio que se suba a `main` se refleja en produccion en minutos.

### Configuracion en GitHub

1. Ve a **Settings > Pages** en el repositorio
2. Selecciona la rama `main` como source
3. La URL publica sera `https://risharddv.github.io/MAMBQ/`

### Actualizaciones

Cada `git push` a la rama `main` actualiza automaticamente la landing page sin necesidad de configuracion adicional.

![Vista de la landing page](/img/app/landing2.png)
