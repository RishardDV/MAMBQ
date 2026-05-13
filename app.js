/**
 * MAMB – Museo de Arte Moderno de Barranquilla
 * app.js – navegación, interacciones y lógica de la app
 */

/* ============================================================
   ESTADO GLOBAL
   ============================================================ */
const state = {
  currentScreen: 'screen-inicio',
  previousScreen: null,
  selectedAvatar: null,
  artworkLiked: false,
  artworkFollowed: false,
  artworkFaved: false,
  artworks: {
    crepusculo: {
      title: 'Crepúsculo Caribe',
      artist: 'Jorge Cepeda Samudio',
      initials: 'J',
      count: 48,
      type: 'PINTURA · ÓLEO',
      likes: 248,
      desc: 'Una obra que captura la majestuosidad del atardecer caribeño. Los tonos cálidos del óleo evocan la luz dorada del ocaso sobre las aguas del mar Caribe, creando una atmósfera de nostalgia y belleza tropical.',
      bg: 'bg-rust'
    },
    sierra: {
      title: 'Sierra Nevada',
      artist: 'Jorge Cepeda Samudio',
      initials: 'J',
      count: 48,
      type: 'PINTURA · ACUARELA',
      likes: 104,
      desc: 'Representación acuarelada de la Sierra Nevada de Santa Marta. Las capas translúcidas de pintura recrean la neblina permanente que corona las cumbres nevadas, símbolo sagrado del Caribe colombiano.',
      bg: 'bg-green'
    },
    rio: {
      title: 'Río Magdalena',
      artist: 'Jorge Cepeda Samudio',
      initials: 'J',
      count: 48,
      type: 'PINTURA · ACRÍLICO',
      likes: 67,
      desc: 'El gran río que da vida a Colombia, retratado con técnica acrílica en tonos azules y grises. Una meditación sobre el tiempo y el fluir de la historia a través de sus aguas.',
      bg: 'bg-navy'
    },
    noche: {
      title: 'Noche Azul',
      artist: 'M. Álvarez',
      initials: 'M',
      count: 22,
      type: 'PINTURA · ACRÍLICO',
      likes: 89,
      desc: 'Una exploración de la noche caribeña a través de tonos azules profundos. La obra transmite la serenidad y el misterio de las noches tropicales.',
      bg: 'bg-navy-soft'
    },
    fuego: {
      title: 'Fuego Vivo',
      artist: 'L. Torres',
      initials: 'L',
      count: 31,
      type: 'PINTURA · MIXTA',
      likes: 156,
      desc: 'Una celebración de la energía y el fuego como símbolo de vida. Técnica mixta que combina acrílico y óleo para capturar la danza de las llamas.',
      bg: 'bg-rust-soft'
    },
    selva: {
      title: 'Selva Viva',
      artist: 'R. Guerrero',
      initials: 'R',
      count: 19,
      type: 'PINTURA · ÓLEO',
      likes: 73,
      desc: 'La biodiversidad de la selva caribeña colombiana plasmada en óleo. Cada pincelada evoca la densidad y vitalidad del ecosistema tropical.',
      bg: 'bg-green-soft'
    },
    misterio: {
      title: 'Misterio',
      artist: 'A. Pérez',
      initials: 'A',
      count: 14,
      type: 'PINTURA · ACRÍLICO',
      likes: 42,
      desc: 'Una obra abstracta que invita a la contemplación. Los tonos violetas profundos crean un espacio de misterio y espiritualidad.',
      bg: 'bg-purple'
    }
  }
};

/* ============================================================
   NAVEGACIÓN ENTRE PANTALLAS
   ============================================================ */
function navigate(screenId, btn) {
  // Esconder pantalla actual
  const current = document.getElementById(state.currentScreen);
  if (current) current.classList.remove('active');

  // Mostrar nueva pantalla
  const next = document.getElementById(screenId);
  if (next) next.classList.add('active');

  // Guardar historial
  state.previousScreen = state.currentScreen;
  state.currentScreen = screenId;

  // Actualizar botón activo en nav
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // Scroll al tope
  const scroll = next?.querySelector('.screen-scroll');
  if (scroll) scroll.scrollTop = 0;
}

function goBack() {
  if (state.previousScreen) {
    const prev = state.previousScreen;
    // Buscar el botón de nav correspondiente
    const btn = document.querySelector(`[data-screen="${prev}"]`);
    navigate(prev, btn);
  }
}

/* ============================================================
   ABRIR OBRA DE ARTE (detalle)
   ============================================================ */
function openArtwork(id) {
  const data = state.artworks[id];
  if (!data) return;

  // Resetear estados
  state.artworkLiked = false;
  state.artworkFollowed = false;
  state.artworkFaved = false;

  // Actualizar contenido
  document.getElementById('artwork-title').textContent = data.title;
  document.getElementById('artwork-artist').textContent = data.artist;
  document.getElementById('artist-initials').textContent = data.initials;
  document.getElementById('artwork-count').textContent = data.count;
  document.getElementById('artwork-desc').textContent = data.desc;
  document.getElementById('cta-like-count').textContent = data.likes;

  // Actualizar tipo
  const typeTag = document.querySelector('.artwork-type-tag');
  if (typeTag) typeTag.textContent = data.type;

  // Actualizar colores del hero
  const hero = document.getElementById('artwork-hero-bg');
  const heroes = ['bg-rust', 'bg-green', 'bg-navy', 'bg-navy-soft', 'bg-rust-soft', 'bg-green-soft', 'bg-purple', 'bg-teal', 'bg-slate', 'bg-magenta'];
  heroes.forEach(c => hero.classList.remove(c));
  // Usar gradientes CSS dinámicos según tipo
  applyArtworkHeroStyle(hero, data.bg);

  // Resetear botones UI
  const heartBtn = document.getElementById('art-heart-btn');
  heartBtn.classList.remove('liked');

  const ctaLike = document.getElementById('cta-like');
  ctaLike.classList.remove('active');

  const ctaFav = document.getElementById('cta-fav');
  ctaFav.classList.remove('added');
  ctaFav.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>Agregar a favoritos`;

  const followBtn = document.getElementById('follow-btn');
  followBtn.textContent = 'Seguir';
  followBtn.classList.remove('following');

  // Navegar a la pantalla de detalle
  state.previousScreen = state.currentScreen;
  const current = document.getElementById(state.currentScreen);
  if (current) current.classList.remove('active');

  const artScreen = document.getElementById('screen-artwork');
  artScreen.classList.add('active');
  state.currentScreen = 'screen-artwork';

  // Desactivar nav buttons (pantalla de detalle no tiene nav activo)
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
}

function applyArtworkHeroStyle(el, bgClass) {
  const gradients = {
    'bg-rust':      'linear-gradient(160deg, #9B3309 0%, #C1440E 40%, #E8845C 80%, #4B2A0E 100%)',
    'bg-green':     'linear-gradient(160deg, #1A4A2E 0%, #2D6A4F 40%, #52B788 80%, #1B3A1E 100%)',
    'bg-navy':      'linear-gradient(160deg, #0A1E35 0%, #1B3A5C 40%, #2A5880 80%, #0A1A2E 100%)',
    'bg-navy-soft': 'linear-gradient(160deg, #1A3A5C 0%, #2A5880 40%, #3E7AB5 80%, #1B2C40 100%)',
    'bg-rust-soft': 'linear-gradient(160deg, #A03020 0%, #D4622A 40%, #E8A87C 80%, #5C2A1A 100%)',
    'bg-green-soft':'linear-gradient(160deg, #1A3A2E 0%, #2D6A4F 40%, #74C69D 80%, #1A3A20 100%)',
    'bg-purple':    'linear-gradient(160deg, #3A1050 0%, #7B2D8B 40%, #AB47BC 80%, #2A0A3C 100%)',
    'bg-teal':      'linear-gradient(160deg, #003840 0%, #006064 40%, #00838F 80%, #003840 100%)',
    'bg-slate':     'linear-gradient(160deg, #2E3C43 0%, #546E7A 40%, #78909C 80%, #1A2B33 100%)',
    'bg-magenta':   'linear-gradient(160deg, #7B0030 0%, #C2185B 40%, #E91E63 80%, #4A001F 100%)',
  };
  el.style.background = gradients[bgClass] || gradients['bg-rust'];
}

/* ============================================================
   LIKES EN CARDS DE LISTA
   ============================================================ */
function toggleLike(btn) {
  const isLiked = btn.classList.toggle('liked');
  const countEl = btn.querySelector('span');
  const currentCount = parseInt(countEl.textContent);
  countEl.textContent = isLiked ? currentCount + 1 : currentCount - 1;
}

/* ============================================================
   PANTALLA ARTWORK – ACCIONES
   ============================================================ */
function toggleArtLike() {
  state.artworkLiked = !state.artworkLiked;
  const btn = document.getElementById('art-heart-btn');
  btn.classList.toggle('liked', state.artworkLiked);

  // Animar
  btn.style.transform = 'scale(1.3)';
  setTimeout(() => { btn.style.transform = ''; }, 200);
}

function toggleCTALike(btn) {
  state.artworkLiked = !state.artworkLiked;
  btn.classList.toggle('active', state.artworkLiked);
  const countEl = document.getElementById('cta-like-count');
  const current = parseInt(countEl.textContent);
  countEl.textContent = state.artworkLiked ? current + 1 : current - 1;

  // Sincronizar con botón de hero
  document.getElementById('art-heart-btn').classList.toggle('liked', state.artworkLiked);
}

function addToFavs(btn) {
  if (state.artworkFaved) return;
  state.artworkFaved = true;
  btn.classList.add('added');
  btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>¡Añadido a favoritos!`;
  showToast('Obra añadida a favoritos ♥');
}

function toggleFollow(btn) {
  state.artworkFollowed = !state.artworkFollowed;
  if (state.artworkFollowed) {
    btn.textContent = 'Siguiendo';
    btn.classList.add('following');
    showToast('¡Ahora sigues a este artista!');
  } else {
    btn.textContent = 'Seguir';
    btn.classList.remove('following');
  }
}

function shareArtwork() {
  const title = document.getElementById('artwork-title').textContent;
  if (navigator.share) {
    navigator.share({
      title: `${title} – MAMB`,
      text: `Descubre "${title}" en el Museo de Arte Moderno de Barranquilla`,
      url: window.location.href
    }).catch(() => {});
  } else {
    showToast('Enlace copiado al portapapeles');
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
  }
}

/* ============================================================
   SUBIR OBRA
   ============================================================ */
function triggerFileInput() {
  document.getElementById('file-input').click();
}

function handleFileSelect(input) {
  const file = input.files[0];
  if (!file) return;

  const preview = document.getElementById('upload-preview');
  const inner = document.getElementById('upload-zone-inner');
  const reader = new FileReader();

  reader.onload = (e) => {
    preview.src = e.target.result;
    preview.classList.remove('hidden');
    inner.classList.add('hidden');
  };
  reader.readAsDataURL(file);
}

function submitObra() {
  const titulo = document.getElementById('obra-titulo').value.trim();
  const describe = document.getElementById('obra-describe').value.trim();
  const desc = document.getElementById('obra-desc').value.trim();
  const hasFile = !document.getElementById('upload-preview').classList.contains('hidden');

  if (!titulo) {
    showToast('Por favor ingresa un título para tu obra');
    document.getElementById('obra-titulo').focus();
    return;
  }
  if (!hasFile) {
    showToast('Por favor selecciona una imagen de tu obra');
    return;
  }

  // Simular envío
  showToast('¡Obra publicada exitosamente! 🎨');

  // Reset del formulario
  setTimeout(() => {
    document.getElementById('obra-titulo').value = '';
    document.getElementById('obra-describe').value = '';
    document.getElementById('obra-desc').value = '';
    document.getElementById('upload-preview').classList.add('hidden');
    document.getElementById('upload-zone-inner').classList.remove('hidden');
    document.getElementById('file-input').value = '';

    // Ir a galería
    navigate('screen-galeria', document.querySelector('[data-screen="screen-galeria"]'));
  }, 1800);
}

/* ============================================================
   AVATAR MODAL
   ============================================================ */
function openAvatarModal() {
  document.getElementById('avatar-overlay').classList.remove('hidden');
}

function closeAvatarModal() {
  document.getElementById('avatar-overlay').classList.add('hidden');
  // Limpiar selección si no se confirmó
  document.querySelectorAll('.av-opt').forEach(av => av.classList.remove('selected'));
  state.selectedAvatar = null;
}

function selectAvatar(img) {
  document.querySelectorAll('.av-opt').forEach(av => av.classList.remove('selected'));
  img.classList.add('selected');
  state.selectedAvatar = img.src;
}

function confirmAvatar() {
  if (!state.selectedAvatar) {
    showToast('Selecciona un avatar primero');
    return;
  }

  // Actualizar avatar en perfil y header
  document.getElementById('perfil-main-avatar').src = state.selectedAvatar;
  document.getElementById('header-avatar').src = state.selectedAvatar;

  closeAvatarModal();
  showToast('Avatar actualizado ✓');
}

/* ============================================================
   CERRAR SESIÓN
   ============================================================ */
function confirmLogout() {
  const confirmed = confirm('¿Deseas cerrar sesión?');
  if (confirmed) {
    showToast('Has cerrado sesión. ¡Hasta pronto!');
    setTimeout(() => {
      navigate('screen-inicio', document.querySelector('[data-screen="screen-inicio"]'));
    }, 1500);
  }
}

/* ============================================================
   FILTRO DE CHIPS
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Chips de filtro
  document.querySelectorAll('.filter-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chips .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  // Chips de artista
  document.querySelectorAll('.artist-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const wasActive = chip.classList.contains('active');
      document.querySelectorAll('.artist-chip').forEach(c => c.classList.remove('active'));
      if (!wasActive) chip.classList.add('active');
    });
  });

  // Dots (simulación de scroll horizontal sincronizado)
  initDotsAnimation();

  // Cerrar modal con clic fuera
  document.getElementById('avatar-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('avatar-overlay')) {
      closeAvatarModal();
    }
  });

  // Upload zone drag & drop
  const uploadZone = document.getElementById('upload-zone');
  if (uploadZone) {
    uploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadZone.style.background = 'rgba(160,82,45,0.12)';
    });
    uploadZone.addEventListener('dragleave', () => {
      uploadZone.style.background = '';
    });
    uploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadZone.style.background = '';
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        const preview = document.getElementById('upload-preview');
        const inner = document.getElementById('upload-zone-inner');
        const reader = new FileReader();
        reader.onload = (ev) => {
          preview.src = ev.target.result;
          preview.classList.remove('hidden');
          inner.classList.add('hidden');
        };
        reader.readAsDataURL(file);
      }
    });
  }
});

/* ============================================================
   ANIMACIÓN DE DOTS AL HACER SCROLL EN SECCIONES
   ============================================================ */
function initDotsAnimation() {
  const scrollContainers = document.querySelectorAll(
    '.cards-scroll, .top-obras-scroll, .fav-scroll, .gallery-scroll'
  );

  scrollContainers.forEach(container => {
    const section = container.closest('.home-section');
    if (!section) return;
    const dots = section.querySelectorAll('.dot');
    if (!dots.length) return;

    container.addEventListener('scroll', () => {
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      const activeIndex = Math.round(progress * (dots.length - 1));

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
      });
    }, { passive: true });
  });
}

/* ============================================================
   TOAST NOTIFICATIONS
   ============================================================ */
let toastTimeout = null;

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ============================================================
   SWIPE PARA VOLVER ATRÁS (opcional – gestos touch)
   ============================================================ */
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  if (state.currentScreen !== 'screen-artwork') return;

  const deltaX = e.changedTouches[0].clientX - touchStartX;
  const deltaY = Math.abs(e.changedTouches[0].clientY - touchStartY);

  // Swipe derecha > 60px y sin scroll vertical significativo
  if (deltaX > 60 && deltaY < 50) {
    goBack();
  }
}, { passive: true });