const state = {
  currentScreen: 'screen-inicio',
  previousScreen: null,
  selectedAvatar: null,
  artworkLiked: false,
  artworkFollowed: false,
  artworkFaved: false,
  activeFilter: 'all',
  artworks: {
    crepusculo: {
      title: 'Crepúsculo Caribe',
      artist: 'Álvaro Cepeda Samudio',
      initials: 'A',
      count: 48,
      type: 'PINTURA · ÓLEO',
      likes: 248,
      desc: 'Una obra que captura la atmósfera cálida del Caribe con énfasis en luz, horizonte y memoria visual.',
      bg: 'bg-rust',
      year: '2019',
      medium: 'Óleo',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/%22Violence%22_.webp/1200px-%22Violence%22_.webp.png',
      imagePosition: 'center center'
    },
    sierra: {
      title: 'Sierra Nevada',
      artist: 'Álvaro Cepeda Samudio',
      initials: 'A',
      count: 48,
      type: 'PINTURA · ACUARELA',
      likes: 104,
      desc: 'Interpretación del paisaje desde capas suaves de color y profundidad atmosférica.',
      bg: 'bg-green',
      year: '2021',
      medium: 'Acuarela',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Don_Sim%C3%B3n_en_San_Pedro_Alejandrino._Alejandro_Obreg%C3%B3n.Quinta_de_San_Pedro_Alejandrino.JPG/1280px-Don_Sim%C3%B3n_en_San_Pedro_Alejandrino._Alejandro_Obreg%C3%B3n.Quinta_de_San_Pedro_Alejandrino.JPG',
      imagePosition: 'center center'
    },
    rio: {
      title: 'Río Magdalena',
      artist: 'R. Guerrero',
      initials: 'R',
      count: 24,
      type: 'PINTURA · ACRÍLICO',
      likes: 143,
      desc: 'Paisaje fluvial de lectura contemporánea, con dirección cromática controlada y ritmo horizontal.',
      bg: 'bg-navy',
      year: '2022',
      medium: 'Acrílico',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/MuralObregon.JPG/1280px-MuralObregon.JPG',
      imagePosition: 'center center'
    },
    noche: {
      title: 'Noche Azul',
      artist: 'M. Álvarez',
      initials: 'M',
      count: 22,
      type: 'PINTURA · ACRÍLICO',
      likes: 189,
      desc: 'Composición nocturna apoyada en azules profundos y silencios visuales.',
      bg: 'bg-navy-soft',
      year: '2020',
      medium: 'Acrílico',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Museo_de_Arte_Moderno_de_Barranquilla.jpg/1200px-Museo_de_Arte_Moderno_de_Barranquilla.jpg',
      imagePosition: 'center center'
    },
    fuego: {
      title: 'Fuego Vivo',
      artist: 'L. Torres',
      initials: 'L',
      count: 31,
      type: 'PINTURA · MIXTA',
      likes: 76,
      desc: 'Trabajo visual de alta energía, con color saturado y sensación de movimiento interno.',
      bg: 'bg-rust-soft',
      year: '2018',
      medium: 'Mixta',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/La_langosta_azul.jpg/800px-La_langosta_azul.jpg',
      imagePosition: 'center center'
    },
    selva: {
      title: 'Selva Viva',
      artist: 'R. Guerrero',
      initials: 'R',
      count: 19,
      type: 'PINTURA · ÓLEO',
      likes: 312,
      desc: 'Paisaje de densidad vegetal con predominio de masa cromática y profundidad orgánica.',
      bg: 'bg-green-soft',
      year: '2023',
      medium: 'Óleo',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Alvaro_Cepeda_Samudio.jpg/800px-Alvaro_Cepeda_Samudio.jpg',
      imagePosition: 'top center'
    },
    misterio: {
      title: 'Misterio',
      artist: 'A. Pérez',
      initials: 'A',
      count: 14,
      type: 'ESCULTURA · MIXTA',
      likes: 95,
      desc: 'Pieza de lenguaje abstracto que enfatiza tensión espacial, volumen y pausa visual.',
      bg: 'bg-purple',
      year: '2022',
      medium: 'Escultura',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/La_casa_grande%2C_primera_edici%C3%B3n.jpg/800px-La_casa_grande%2C_primera_edici%C3%B3n.jpg',
      imagePosition: 'center center'
    }
  },
  collections: {
    curatorial: ['crepusculo', 'sierra', 'noche', 'fuego', 'selva', 'misterio'],
    publicaciones: ['crepusculo', 'sierra', 'rio', 'misterio', 'selva', 'noche'],
    artista: ['crepusculo', 'sierra', 'rio'],
    favoritas: ['noche', 'fuego', 'selva'],
    galeria: ['crepusculo', 'rio', 'misterio', 'noche', 'fuego', 'selva']
  }
};

function navigate(screenId, btn) {
  const current = document.getElementById(state.currentScreen);
  if (current) current.classList.remove('active');

  const next = document.getElementById(screenId);
  if (next) next.classList.add('active');

  state.previousScreen = state.currentScreen;
  state.currentScreen = screenId;

  document.querySelectorAll('.nav-btn').forEach((b) => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const scroll = next?.querySelector('.screen-scroll');
  if (scroll) scroll.scrollTop = 0;
}

function goBack() {
  if (!state.previousScreen) return;
  const prev = state.previousScreen;
  const btn = document.querySelector(`[data-screen="${prev}"]`);
  navigate(prev, btn);
}

function applyArtworkHeroStyle(el, data) {
  const gradients = {
    'bg-rust': 'linear-gradient(160deg, #9B3309 0%, #C1440E 40%, #E8845C 80%, #4B2A0E 100%)',
    'bg-green': 'linear-gradient(160deg, #1A4A2E 0%, #2D6A4F 40%, #52B788 80%, #1B3A1E 100%)',
    'bg-navy': 'linear-gradient(160deg, #0A1E35 0%, #1B3A5C 40%, #2A5880 80%, #0A1A2E 100%)',
    'bg-navy-soft': 'linear-gradient(160deg, #1A3A5C 0%, #2A5880 40%, #3E7AB5 80%, #1B2C40 100%)',
    'bg-rust-soft': 'linear-gradient(160deg, #A03020 0%, #D4622A 40%, #E8A87C 80%, #5C2A1A 100%)',
    'bg-green-soft': 'linear-gradient(160deg, #1A3A2E 0%, #2D6A4F 40%, #74C69D 80%, #1A3A20 100%)',
    'bg-purple': 'linear-gradient(160deg, #3A1050 0%, #7B2D8B 40%, #AB47BC 80%, #2A0A3C 100%)',
    'bg-teal': 'linear-gradient(160deg, #003840 0%, #006064 40%, #00838F 80%, #003840 100%)',
    'bg-slate': 'linear-gradient(160deg, #2E3C43 0%, #546E7A 40%, #78909C 80%, #1A2B33 100%)',
    'bg-magenta': 'linear-gradient(160deg, #7B0030 0%, #C2185B 40%, #E91E63 80%, #4A001F 100%)'
  };
  const gradient = gradients[data.bg] || gradients['bg-rust'];
  el.style.background = `${gradient}, url('${data.image}')`;
  el.style.backgroundSize = 'cover';
  el.style.backgroundPosition = data.imagePosition || 'center center';
  el.style.backgroundBlendMode = 'multiply';
}

function openArtwork(id) {
  const data = state.artworks[id];
  if (!data) return;

  state.artworkLiked = false;
  state.artworkFollowed = false;
  state.artworkFaved = false;

  document.getElementById('artwork-title').textContent = data.title;
  document.getElementById('artwork-artist').textContent = data.artist;
  document.getElementById('artist-initials').textContent = data.initials;
  document.getElementById('artwork-count').textContent = data.count;
  document.getElementById('artwork-desc').textContent = data.desc;
  document.getElementById('cta-like-count').textContent = data.likes;
  document.querySelector('.artwork-type-tag').textContent = data.type;
  applyArtworkHeroStyle(document.getElementById('artwork-hero-bg'), data);

  document.getElementById('art-heart-btn').classList.remove('liked');
  document.getElementById('cta-like').classList.remove('active');
  document.getElementById('follow-btn').textContent = 'Seguir';
  document.getElementById('follow-btn').classList.remove('following');

  const favBtn = document.getElementById('cta-fav');
  favBtn.classList.remove('added');
  favBtn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>Agregar a favoritos';

  const current = document.getElementById(state.currentScreen);
  if (current) current.classList.remove('active');
  document.getElementById('screen-artwork').classList.add('active');
  state.previousScreen = state.currentScreen;
  state.currentScreen = 'screen-artwork';
  document.querySelectorAll('.nav-btn').forEach((b) => b.classList.remove('active'));
}

function toggleLike(btn) {
  const liked = btn.classList.toggle('liked');
  const countEl = btn.querySelector('span');
  if (!countEl) return;
  const count = parseInt(countEl.textContent, 10) || 0;
  countEl.textContent = liked ? count + 1 : Math.max(0, count - 1);
}

function toggleArtLike() {
  state.artworkLiked = !state.artworkLiked;
  document.getElementById('art-heart-btn').classList.toggle('liked', state.artworkLiked);
}

function toggleCTALike(btn) {
  state.artworkLiked = !state.artworkLiked;
  btn.classList.toggle('active', state.artworkLiked);
  document.getElementById('art-heart-btn').classList.toggle('liked', state.artworkLiked);
  const countEl = document.getElementById('cta-like-count');
  const count = parseInt(countEl.textContent, 10) || 0;
  countEl.textContent = state.artworkLiked ? count + 1 : Math.max(0, count - 1);
}

function addToFavs(btn) {
  if (state.artworkFaved) return;
  state.artworkFaved = true;
  btn.classList.add('added');
  btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>Añadido a favoritos';
  showToast('Obra añadida a favoritos');
}

function toggleFollow(btn) {
  state.artworkFollowed = !state.artworkFollowed;
  btn.textContent = state.artworkFollowed ? 'Siguiendo' : 'Seguir';
  btn.classList.toggle('following', state.artworkFollowed);
}

function shareArtwork() {
  const title = document.getElementById('artwork-title').textContent;
  if (navigator.share) {
    navigator.share({ title: `${title} - MAMB`, text: `Descubre ${title} en el MAMB`, url: location.href }).catch(() => {});
    return;
  }
  navigator.clipboard?.writeText(location.href).catch(() => {});
  showToast('Enlace copiado');
}

function triggerFileInput() {
  document.getElementById('file-input').click();
}

function handleFileSelect(input) {
  const file = input.files?.[0];
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
  const hasFile = !document.getElementById('upload-preview').classList.contains('hidden');
  if (!titulo) return showToast('Ingresa un título para la obra');
  if (!hasFile) return showToast('Selecciona una imagen');
  showToast('Propuesta temporal registrada');
}

function openAvatarModal() {
  document.getElementById('avatar-overlay').classList.remove('hidden');
}

function closeAvatarModal() {
  document.getElementById('avatar-overlay').classList.add('hidden');
  document.querySelectorAll('.av-opt').forEach((av) => av.classList.remove('selected'));
  state.selectedAvatar = null;
}

function selectAvatar(img) {
  document.querySelectorAll('.av-opt').forEach((av) => av.classList.remove('selected'));
  img.classList.add('selected');
  state.selectedAvatar = img.src;
}

function confirmAvatar() {
  if (!state.selectedAvatar) return showToast('Selecciona un avatar');
  const mainAvatar = document.getElementById('perfil-main-avatar');
  const headerAvatar = document.getElementById('header-avatar');
  if (mainAvatar) mainAvatar.src = state.selectedAvatar;
  if (headerAvatar) headerAvatar.src = state.selectedAvatar;
  closeAvatarModal();
  showToast('Avatar actualizado');
}

function buildCollectionCards(ids) {
  return ids.map((id) => {
    const art = state.artworks[id];
    return `
      <div class="art-card collection-card" onclick="openArtwork('${id}')">
        <div class="art-card-img real-art-image" style="background-image:linear-gradient(rgba(0,0,0,.08), rgba(0,0,0,.18)), url('${art.image}'); background-position:${art.imagePosition || 'center center'}">
          <span class="badge-dest">${art.medium.toUpperCase()}</span>
        </div>
        <div class="art-card-info">
          <h3>${art.title}</h3>
          <p>${art.artist}</p>
          <div class="art-card-footer">
            <span class="tag">${art.medium} · ${art.year}</span>
            <button class="arrow-btn">→</button>
          </div>
        </div>
      </div>`;
  }).join('');
}

function openCollectionView(key, title) {
  const ids = state.collections[key] || [];
  const target = document.getElementById('collection-grid');
  const titleEl = document.getElementById('collection-title');
  if (!target || !titleEl) return;
  titleEl.textContent = title;
  target.innerHTML = buildCollectionCards(ids);

  const current = document.getElementById(state.currentScreen);
  if (current) current.classList.remove('active');
  document.getElementById('screen-collection').classList.add('active');
  state.previousScreen = state.currentScreen;
  state.currentScreen = 'screen-collection';
  document.querySelectorAll('.nav-btn').forEach((b) => b.classList.remove('active'));
}

function applyGalleryFilter() {
  const query = (document.getElementById('gallery-search')?.value || '').trim().toLowerCase();
  const filter = state.activeFilter;
  document.querySelectorAll('.gallery-item').forEach((card) => {
    const title = (card.dataset.title || '').toLowerCase();
    const artist = (card.dataset.artist || '').toLowerCase();
    const medium = card.dataset.medium || '';
    const matchesQuery = !query || title.includes(query) || artist.includes(query) || medium.toLowerCase().includes(query);
    const matchesFilter = filter === 'all' || medium === filter;
    card.classList.toggle('is-hidden', !(matchesQuery && matchesFilter));
  });
}

function applyRealArtworkImages() {
  Object.entries(state.artworks).forEach(([id, art]) => {
    document.querySelectorAll(`[onclick*="${id}"]`).forEach((card) => {
      const visual = card.querySelector('.art-card-img, .top-card-img, .fav-img, .gallery-img');
      if (!visual) return;
      visual.classList.add('real-art-image');
      visual.style.backgroundImage = `linear-gradient(rgba(0,0,0,.08), rgba(0,0,0,.18)), url('${art.image}')`;
      visual.style.backgroundSize = 'cover';
      visual.style.backgroundPosition = art.imagePosition || 'center center';
      visual.style.backgroundRepeat = 'no-repeat';
    });
  });
}
function initDotsAnimation() {
  const scrollContainers = document.querySelectorAll('.cards-scroll, .top-obras-scroll, .fav-scroll, .gallery-scroll');
  scrollContainers.forEach((container) => {
    const section = container.closest('.home-section');
    if (!section) return;
    const dots = section.querySelectorAll('.dot');
    if (!dots.length) return;
    container.addEventListener('scroll', () => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const progress = maxScroll > 0 ? container.scrollLeft / maxScroll : 0;
      const activeIndex = Math.round(progress * (dots.length - 1));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
    }, { passive: true });
  });
}

let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2600);
}

function showStartupFlow() {
  const overlay = document.getElementById('startup-overlay');
  const splash = document.getElementById('startup-splash');
  const entry = document.getElementById('name-entry');
  overlay.classList.remove('hidden');
  splash.classList.remove('hidden');
  entry.classList.add('hidden');
  setTimeout(() => {
    splash.classList.add('hidden');
    entry.classList.remove('hidden');
    document.getElementById('visitor-name')?.focus();
  }, 1500);
}

function completeStartup(name) {
  document.querySelector('.perfil-user-name').textContent = name.toUpperCase();
  const fullNameRow = document.querySelector('.perfil-data-row span:last-child');
  if (fullNameRow) fullNameRow.textContent = name;
  document.getElementById('startup-overlay').classList.add('hidden');
  navigate('screen-inicio', document.querySelector('[data-screen="screen-inicio"]'));
}

let touchStartX = 0;
let touchStartY = 0;
document.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  if (!['screen-artwork', 'screen-collection'].includes(state.currentScreen)) return;
  const deltaX = e.changedTouches[0].clientX - touchStartX;
  const deltaY = Math.abs(e.changedTouches[0].clientY - touchStartY);
  if (deltaX > 60 && deltaY < 50) goBack();
}, { passive: true });

const IA_MODEL_URL = 'https://teachablemachine.withgoogle.com/models/dyyi3qHP7/';
const IA_LABEL_MAP = { 'class 7': 'pensando', 'class 8': 'sorprendido' };
const iaState = { model: null, webcam: null, ctx: null, maxPredictions: 0, running: false };

function iaGetDisplayName(rawName) {
  const name = (rawName || '').trim().toLowerCase();
  if (name === 'class 7' || name === '7') return 'pensando';
  if (name === 'class 8' || name === '8') return 'sorprendido';
  return IA_LABEL_MAP[rawName] || rawName;
}

async function iaInit() {
  if (iaState.running) return;
  const btnStart = document.getElementById('ia-btn-start');
  const canvasWrap = document.getElementById('ia-canvas-wrap');
  const placeholder = document.getElementById('ia-placeholder');
  const topCard = document.getElementById('ia-top-card');
  const labelContainer = document.getElementById('ia-label-container');
  btnStart.disabled = true;
  iaSetStatus('loading', '● Cargando modelo...');

  try {
    iaState.model = await tmPose.load(IA_MODEL_URL + 'model.json', IA_MODEL_URL + 'metadata.json');
    iaState.maxPredictions = iaState.model.getTotalClasses();
    iaState.webcam = new tmPose.Webcam(260, 260, true);
    await iaState.webcam.setup();
    await iaState.webcam.play();
    const canvas = document.getElementById('ia-canvas');
    canvas.width = 260;
    canvas.height = 260;
    iaState.ctx = canvas.getContext('2d');
    iaBuildBars(labelContainer);
    iaState.running = true;
    placeholder.classList.add('hidden');
    canvasWrap.classList.add('active');
    topCard.classList.add('visible');
    iaSetStatus('online', '● Detección activa');
    window.requestAnimationFrame(iaLoop);
  } catch (error) {
    console.error(error);
    iaSetStatus('', '● No se pudo iniciar');
    btnStart.disabled = false;
    showToast('No se pudo iniciar la cámara');
  }
}

async function iaLoop() {
  if (!iaState.running) return;
  iaState.webcam.update();
  await iaPredict();
  window.requestAnimationFrame(iaLoop);
}

async function iaPredict() {
  const { pose, posenetOutput } = await iaState.model.estimatePose(iaState.webcam.canvas);
  const predictions = await iaState.model.predict(posenetOutput);
  const best = predictions.reduce((a, b) => (a.probability > b.probability ? a : b));

  predictions.forEach((prediction, i) => {
    const pct = (prediction.probability * 100).toFixed(1);
    const dominant = prediction.className === best.className;
    document.getElementById(`ia-name-${i}`).textContent = iaGetDisplayName(prediction.className);
    const pctEl = document.getElementById(`ia-pct-${i}`);
    const fillEl = document.getElementById(`ia-fill-${i}`);
    pctEl.textContent = `${pct}%`;
    pctEl.classList.toggle('high', dominant);
    fillEl.style.width = `${pct}%`;
    fillEl.classList.toggle('dominant', dominant);
  });

  document.getElementById('ia-top-name').textContent = iaGetDisplayName(best.className);
  document.getElementById('ia-top-pct').textContent = `${(best.probability * 100).toFixed(0)}%`;
  iaDraw(pose);
}

function iaDraw(pose) {
  iaState.ctx.drawImage(iaState.webcam.canvas, 0, 0);
  if (pose) {
    tmPose.drawKeypoints(pose.keypoints, 0.5, iaState.ctx);
    tmPose.drawSkeleton(pose.keypoints, 0.5, iaState.ctx);
  }
}

function iaBuildBars(container) {
  container.innerHTML = '';
  for (let i = 0; i < iaState.maxPredictions; i += 1) {
    const item = document.createElement('div');
    item.className = 'ia-bar-item';
    item.innerHTML = `
      <div class="ia-bar-header">
        <span class="ia-bar-name" id="ia-name-${i}">Clase ${i + 1}</span>
        <span class="ia-bar-pct" id="ia-pct-${i}">0%</span>
      </div>
      <div class="ia-bar-track">
        <div class="ia-bar-fill" id="ia-fill-${i}"></div>
      </div>`;
    container.appendChild(item);
  }
}

function iaSetStatus(cls, text) {
  const el = document.getElementById('ia-status');
  el.className = `ia-status-badge${cls ? ` ${cls}` : ''}`;
  el.textContent = text;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.filter-chips .chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chips .chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      state.activeFilter = chip.dataset.filter || 'all';
      applyGalleryFilter();
    });
  });

  document.querySelectorAll('.artist-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const wasActive = chip.classList.contains('active');
      document.querySelectorAll('.artist-chip').forEach((c) => c.classList.remove('active'));
      if (!wasActive) chip.classList.add('active');
    });
  });

  document.getElementById('gallery-search')?.addEventListener('input', applyGalleryFilter);
  document.getElementById('avatar-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'avatar-overlay') closeAvatarModal();
  });

  document.querySelectorAll('.ver-todo').forEach((link, index) => {
    const mappings = [
      ['curatorial', 'Selección curatorial'],
      ['publicaciones', 'Últimas publicaciones'],
      ['artista', 'Obras por artista'],
      ['favoritas', 'Tus favoritas'],
      ['galeria', 'Tu galería'],
      ['galeria', 'Colección completa']
    ];
    const config = mappings[index];
    if (!config) return;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openCollectionView(config[0], config[1]);
    });
  });

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
      const file = e.dataTransfer.files?.[0];
      if (!file || !file.type.startsWith('image/')) return;
      handleFileSelect({ files: [file] });
    });
  }

  const nameForm = document.getElementById('name-form');
  nameForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('visitor-name').value.trim();
    if (!name) return;
    completeStartup(name);
  });

  document.querySelector('.logout-btn')?.remove();
  applyRealArtworkImages();
  applyGalleryFilter();
  initDotsAnimation();
  showStartupFlow();
});
