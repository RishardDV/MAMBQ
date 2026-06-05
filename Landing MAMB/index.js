// CONFIGURACIÓN: URL de descarga de la aplicación
const APP_DOWNLOAD_URL = '/frontend/app.html';

// Registrar service worker para habilitar instalación PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(() => console.log('Service Worker registrado en landing.'))
        .catch((err) => console.error('Error registrando SW en landing:', err));
}

// Obtener elementos del DOM
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const appModal = document.getElementById('app-modal');
const modalCancel = document.getElementById('modal-cancel');
const modalClose = document.getElementById('modal-close');

// Botones de descarga (hay múltiples en la página)
const downloadBtns = document.querySelectorAll(
    '#nav-download-btn, #hero-download-btn, #app-download-btn, #footer-download-btn'
);

function escapeSvgText(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function createFallbackImage(mainLabel, subLabel, isLogo) {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${isLogo ? '960 260' : '800 500'}" role="img" aria-label="${escapeSvgText(mainLabel)}">
            <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="${isLogo ? '#f4eee8' : '#efedea'}"/>
                    <stop offset="100%" stop-color="${isLogo ? '#dbc4ab' : '#d7d3cf'}"/>
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" rx="28" fill="url(#g)"/>
            <text x="50%" y="${isLogo ? '48%' : '45%'}" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-size="${isLogo ? '88' : '54'}" font-weight="700" fill="#3a3a3a">${escapeSvgText(mainLabel)}</text>
            ${subLabel ? `<text x="50%" y="${isLogo ? '68%' : '58%'}" text-anchor="middle" font-family="Jost, Arial, sans-serif" font-size="${isLogo ? '24' : '22'}" fill="#6a6a6a">${escapeSvgText(subLabel)}</text>` : ''}
        </svg>`;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function applyImageFallback(img) {
    const isLogo = img.classList.contains('nav-logo-img');
    const altText = (img.alt || '').trim();
    const mainLabel = isLogo
        ? 'MAMB'
        : (altText ? altText.split(' - ')[0].split(/\s+/).slice(0, 3).join(' ') : 'Imagen no disponible');
    const subLabel = isLogo ? 'Museo de Arte Moderno de Barranquilla' : 'Imagen local no encontrada';

    const setFallback = () => {
        if (img.dataset.fallbackApplied === '1') return;
        img.dataset.fallbackApplied = '1';
        img.src = createFallbackImage(mainLabel, subLabel, isLogo);
        img.classList.add('is-fallback');
        if (isLogo) {
            img.alt = 'Museo de Arte Moderno de Barranquilla';
        }
    };

    if (img.complete && img.naturalWidth === 0) {
        setFallback();
        return;
    }

    img.addEventListener('error', setFallback);
}

document.querySelectorAll('img').forEach(applyImageFallback);

// FUNCIONALIDAD: Hamburger menu toggle
hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú cuando se hace clic en un link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// FUNCIONALIDAD: Modal de descarga de app
function openAppModal() {
    appModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeAppModal() {
    appModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners para abrir modal
downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        openAppModal();
    });
});

// Event listeners para cerrar modal
modalCancel.addEventListener('click', closeAppModal);
modalClose.addEventListener('click', closeAppModal);

// Instalación PWA
let deferredPrompt = null;
let awaitingInstall = false;

function isAppInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true || localStorage.getItem('mamb_pwa_installed') === '1';
}

function redirectToApp() {
    window.location.href = APP_DOWNLOAD_URL;
}

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

window.addEventListener('appinstalled', () => {
    localStorage.setItem('mamb_pwa_installed', '1');
    awaitingInstall = false;
    closeAppModal();
    redirectToApp();
});

document.getElementById('modal-install').addEventListener('click', (e) => {
    e.preventDefault();
    if (isAppInstalled()) {
        redirectToApp();
        return;
    }

    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                awaitingInstall = true;
                closeAppModal();
                console.log('Prompt aceptado, esperando instalación...');
            } else {
                awaitingInstall = false;
                console.log('Usuario rechazó la instalación');
            }
            deferredPrompt = null;
        });
        return;
    }

    // Si no hay prompt disponible y la app no está instalada, no redirigir hasta la instalación.
    closeAppModal();
    console.log('No hay prompt PWA disponible. Esperando instalación manual.');
});

// Cerrar modal al hacer clic fuera
appModal.addEventListener('click', (e) => {
    if (e.target === appModal) {
        closeAppModal();
    }
});

// FUNCIONALIDAD: Animación de fade-up en scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todas las tarjetas y secciones
document.querySelectorAll(
    '.artista-card, .obra-card, .servicio-card, section'
).forEach(el => {
    observer.observe(el);
});

// Cerrar modal con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && appModal.style.display === 'flex') {
        closeAppModal();
    }
});