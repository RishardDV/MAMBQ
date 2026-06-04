(function () {
'use strict';

/* ── STATE ───────────────────────────────────────────── */

const state = {
  currentScreen: 'screen-inicio',
  previousScreen: null,
  selectedAvatar: null,
  artworkLiked: false,
  artworkFollowed: false,
  artworkFaved: false,
  activeFilter: 'all',
  currentArtworkId: null,
  apiObras: [],
  artworks: {
    crepusculo: {
      title: 'La noche estrellada',
      artist: 'Vincent van Gogh',
      initials: 'V',
      count: 75,
      type: 'PINTURA . OLEO',
      likes: 248,
      desc: 'Una escena nocturna vibrante donde el cielo parece ondular en espirales de luz y color.',
      bg: 'bg-rust',
      year: '1889',
      medium: 'Oleo',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
      imagePosition: 'center center'
    },
    sierra: {
      title: 'El grito',
      artist: 'Edvard Munch',
      initials: 'E',
      count: 32,
      type: 'PINTURA . TEMPERA',
      likes: 104,
      desc: 'Una figura angustiada bajo un cielo rojo incandescente, icono del expresionismo moderno.',
      bg: 'bg-green',
      year: '1893',
      medium: 'Tempera',
      image: 'https://www.todocuadros.com.co/cdn/shop/files/munch-el-grito-ver4.jpg?v=1753186131&width=812',
      imagePosition: 'center center'
    },
    rio: {
      title: 'La joven de la perla',
      artist: 'Johannes Vermeer',
      initials: 'J',
      count: 19,
      type: 'PINTURA . OLEO',
      likes: 143,
      desc: 'El retrato íntimo de una joven con un pendiente de perla, famoso por su luz y su misterio.',
      bg: 'bg-navy',
      year: '1665',
      medium: 'Oleo',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Meisje_met_de_parel.jpg/500px-Meisje_met_de_parel.jpg',
      imagePosition: 'center center'
    },
    noche: {
      title: 'Las señoritas de Avignon',
      artist: 'Pablo Picasso',
      initials: 'P',
      count: 27,
      type: 'PINTURA . OLEO',
      likes: 189,
      desc: 'Una obra revolucionaria del cubismo donde tres figuras femeninas retan la geometría y la perspectiva.',
      bg: 'bg-navy-soft',
      year: '1907',
      medium: 'Oleo',
      image: 'https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvbGVzLWRlbW9pc2VsbGVzLWQtYXZpZ25vbi5qcGciLCJyZXNpemUsMTUwMHxmb3JtYXQsd2VicCJdfQ.FMxSGG8oEgVFUT0nk8kJm2IK82wjFhYNrnPiqG_ofSc.webp',
      imagePosition: 'center center'
    },
    fuego: {
      title: 'El beso',
      artist: 'Gustav Klimt',
      initials: 'G',
      count: 41,
      type: 'PINTURA . ORO',
      likes: 76,
      desc: 'Una pareja envuelta en un abrazo dorado, símbolo del amor y la decoración modernista.',
      bg: 'bg-rust-soft',
      year: '1907',
      medium: 'Oleo',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/960px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg',
      imagePosition: 'center center'
    },
    misterio: {
      title: 'La persistencia de la memoria',
      artist: 'Salvador Dalí',
      initials: 'S',
      count: 22,
      type: 'PINTURA . OLEO',
      likes: 95,
      desc: 'Relojes derretidos en un paisaje onírico, una metáfora del tiempo en el surrealismo.',
      bg: 'bg-purple',
      year: '1931',
      medium: 'Oleo',
      image: 'https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvbnljLTItMjY4LmpwZyIsInJlc2l6ZSwxNTAwfGZvcm1hdCx3ZWJwIl19.QS0RudqedbRUixY0Z0mD5kka__rAwLVT2U4XTH-dgFk.webp',
      imagePosition: 'center center'
    },
    selva: {
      title: 'La libertad guiando al pueblo',
      artist: 'Eugène Delacroix',
      initials: 'E',
      count: 18,
      type: 'PINTURA . OLEO',
      likes: 312,
      desc: 'Una mujer personificando la libertad lidera a la multitud revolucionaria bajo la bandera tricolor.',
      bg: 'bg-green-soft',
      year: '1830',
      medium: 'Oleo',
      image: 'https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvbGF2YW5ndWFyZGlhLWctMTc2NDc0NjA5MTkuanBnIiwicmVzaXplLDE1MDB8Zm9ybWF0LHdlYnAiXX0.QHN_tSslKa_aZVLQTzTkhn9HSZ52SEaAMzw7fwvqm5w.webp',
      imagePosition: 'center center'
    },
    monalisa: {
      title: 'Mona Lisa',
      artist: 'Leonardo da Vinci',
      initials: 'L',
      count: 40,
      type: 'PINTURA . OLEO',
      likes: 198,
      desc: 'El retrato de sonrisa enigmática que se convirtió en uno de los cuadros más célebres del Renacimiento.',
      bg: 'bg-teal',
      year: '1503',
      medium: 'Oleo',
      image: 'https://m.media-amazon.com/images/I/7119saZHzLL._AC_SY879_.jpg',
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

/* ── NAVIGATION ─────────────────────────────────────── */

function navigate(screenId, btn) {
  var current = document.getElementById(state.currentScreen);
  if (current) current.classList.remove('active');

  var next = document.getElementById(screenId);
  if (next) next.classList.add('active');

  state.previousScreen = state.currentScreen;
  state.currentScreen = screenId;

  document.querySelectorAll('.nav-btn').forEach(function (b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');

  var scroll = next ? next.querySelector('.screen-scroll') : null;
  if (scroll) scroll.scrollTop = 0;

  if (screenId === 'screen-memoria') setTimeout(mgRestart, 100);
  if (screenId === 'screen-galeria') loadObrasFromAPI();
}
window.navigate = navigate;

function goBack() {
  if (!state.previousScreen) return;
  var prev = state.previousScreen;
  var btn = document.querySelector('[data-screen="' + prev + '"]');
  navigate(prev, btn);
}
window.goBack = goBack;

function loadObrasFromAPI() {
  // No-op placeholder: si no existe un backend real, no se interrumpe la navegación.
  // Si en el futuro se agrega una API activa, aquí puede actualizarse la galería dinámica.
}

/* ── ARTWORK DETAIL ─────────────────────────────────── */

var gradients = {
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

function applyArtworkHeroStyle(el, data) {
  if (data.image) {
    var g = gradients[data.bg] || gradients['bg-rust'];
    el.style.background = g + ", url('" + data.image + "')";
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = data.imagePosition || 'center center';
    el.style.backgroundBlendMode = 'multiply';
  } else if (data.imageUrl) {
    el.style.background = "linear-gradient(160deg, rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('" + data.imageUrl + "')";
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = 'center center';
  } else {
    el.style.background = gradients['bg-rust'];
  }
}

function openArtwork(id) {
  var data = state.artworks[id];
  if (data) {
    state.currentArtworkId = id;
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
  } else {
    var apiObra = state.apiObras.find(function (o) { return o._id === id; });
    if (!apiObra) return;
    state.currentArtworkId = id;
    state.artworkLiked = false;
    state.artworkFollowed = false;
    state.artworkFaved = false;

    document.getElementById('artwork-title').textContent = apiObra.titulo;
    document.getElementById('artwork-artist').textContent = apiObra.autorApodo;
    document.getElementById('artist-initials').textContent = (apiObra.autorApodo || 'A')[0].toUpperCase();
    document.getElementById('artwork-count').textContent = '1';
    document.getElementById('artwork-desc').textContent = apiObra.descripcion || 'Obra subida por un visitante del museo.';
    document.getElementById('cta-like-count').textContent = apiObra.likes || 0;
    document.querySelector('.artwork-type-tag').textContent = 'OBRA DE VISITANTE';
    applyArtworkHeroStyle(document.getElementById('artwork-hero-bg'), apiObra);
  }

  document.getElementById('art-heart-btn').classList.remove('liked');
  document.getElementById('cta-like').classList.remove('active');
  document.getElementById('follow-btn').textContent = 'Seguir';
  document.getElementById('follow-btn').classList.remove('following');

  var favBtn = document.getElementById('cta-fav');
  if (favBtn) {
    favBtn.classList.remove('added');
  }

  var current = document.getElementById(state.currentScreen);
  if (current) current.classList.remove('active');
  document.getElementById('screen-artwork').classList.add('active');
  state.previousScreen = state.currentScreen;
  state.currentScreen = 'screen-artwork';
  document.querySelectorAll('.nav-btn').forEach(function (b) { b.classList.remove('active'); });
}
window.openArtwork = openArtwork;

/* ── LIKES ──────────────────────────────────────────── */

function toggleLike(btn) {
  var liked = btn.classList.toggle('liked');
  var countEl = btn.querySelector('span');
  if (!countEl) return;
  var count = parseInt(countEl.textContent, 10) || 0;
  countEl.textContent = liked ? count + 1 : Math.max(0, count - 1);
  var card = btn.closest('[data-api-id]');
  if (card && liked && window.API) {
    API.likeObra(card.dataset.apiId).catch(function () {});
  }
}
window.toggleLike = toggleLike;

function toggleArtLike() {
  state.artworkLiked = !state.artworkLiked;
  document.getElementById('art-heart-btn').classList.toggle('liked', state.artworkLiked);
}
window.toggleArtLike = toggleArtLike;

function toggleCTALike(btn) {
  state.artworkLiked = !state.artworkLiked;
  btn.classList.toggle('active', state.artworkLiked);
  document.getElementById('art-heart-btn').classList.toggle('liked', state.artworkLiked);
  var countEl = document.getElementById('cta-like-count');
  var count = parseInt(countEl.textContent, 10) || 0;
  countEl.textContent = state.artworkLiked ? count + 1 : Math.max(0, count - 1);
  if (state.artworkLiked && state.currentArtworkId && window.API) {
    var apiObra = state.apiObras.find(function (o) { return o._id === state.currentArtworkId; });
    if (apiObra) API.likeObra(apiObra._id).catch(function () {});
  }
}
window.toggleCTALike = toggleCTALike;

function rateApiObra(id, value) {
  if (!window.API) return;
  API.rateObra(id, value).then(function (result) {
    var obra = state.apiObras.find(function (o) { return o._id === id; });
    if (obra) {
      obra.ratingTotal = result.ratingTotal;
      obra.ratingCount = result.ratingCount;
    }
    loadObrasFromAPI();
    showToast('Calificacion enviada: ' + value + ' estrella' + (value > 1 ? 's' : ''));
  }).catch(function () {
    showToast('Error al calificar');
  });
}
window.rateApiObra = rateApiObra;

function addToFavs(btn) {
  if (state.artworkFaved) return;
  state.artworkFaved = true;
  btn.classList.add('added');
  btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>Anadido a favoritos';
  showToast('Obra anadida a favoritos');
}
window.addToFavs = addToFavs;

function toggleFollow(btn) {
  state.artworkFollowed = !state.artworkFollowed;
  btn.textContent = state.artworkFollowed ? 'Siguiendo' : 'Seguir';
  btn.classList.toggle('following', state.artworkFollowed);
}
window.toggleFollow = toggleFollow;

function shareArtwork() {
  var title = document.getElementById('artwork-title').textContent;
  if (navigator.share) {
    navigator.share({ title: title + ' - MAMB', text: 'Descubre ' + title + ' en el MAMB', url: location.href }).catch(function () {});
    return;
  }
  if (navigator.clipboard) navigator.clipboard.writeText(location.href).catch(function () {});
  showToast('Enlace copiado');
}
window.shareArtwork = shareArtwork;

/* ── DOWNLOAD ARTWORK ───────────────────────────────── */

function downloadArtwork() {
  var data = state.artworks[state.currentArtworkId];
  var imageUrl = data ? data.image : null;

  if (!imageUrl) {
    var apiObra = state.apiObras.find(function (o) { return o._id === state.currentArtworkId; });
    if (apiObra) imageUrl = apiObra.imageUrl;
  }

  if (!imageUrl) {
    showToast('No hay imagen para descargar');
    return;
  }

  var link = document.createElement('a');
  link.href = imageUrl;
  link.download = (document.getElementById('artwork-title').textContent || 'obra').replace(/\s+/g, '_') + '.jpg';
  link.target = '_blank';
  link.click();
  showToast('Descargando imagen...');
}
window.downloadArtwork = downloadArtwork;

/* ── FILE UPLOAD ────────────────────────────────────── */

var selectedFile = null;

function triggerFileInput() {
  document.getElementById('file-input').click();
}
window.triggerFileInput = triggerFileInput;

function handleFileSelect(input) {
  var file = input.files ? input.files[0] : null;
  if (!file) return;
  selectedFile = file;
  var preview = document.getElementById('upload-preview');
  var inner = document.getElementById('upload-zone-inner');
  var reader = new FileReader();
  reader.onload = function (e) {
    preview.src = e.target.result;
    preview.classList.remove('hidden');
    inner.classList.add('hidden');
  };
  reader.readAsDataURL(file);
}
window.handleFileSelect = handleFileSelect;

function submitObra() {
  var titulo = document.getElementById('obra-titulo').value.trim();
  var autorApodo = (document.getElementById('obra-describe') ? document.getElementById('obra-describe').value.trim() : '') || 'Artista';
  var descripcion = (document.getElementById('obra-desc') ? document.getElementById('obra-desc').value.trim() : '') || '';

  // Validate with moderation
  var validator = window.UsernameModeration;
  if (validator) {
    var nameCheck = validator.validateUsername(autorApodo, {
      minLength: 2, maxLength: 20, blacklist: validator.DEFAULT_BLACKLIST
    });
    if (!nameCheck.valid) {
      showToast(nameCheck.reason);
      return;
    }
  }

  if (!titulo) return showToast('Ingresa un titulo para la obra');
  if (!selectedFile) return showToast('Selecciona una imagen');

  var submitBtn = document.querySelector('.submit-obra-btn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'PUBLICANDO...';
  }

  navigate('screen-cargando');

  if (window.API) {
    API.createObra({
      titulo: titulo,
      descripcion: descripcion,
      autorApodo: autorApodo,
      avatarIndex: 0,
      imageFile: selectedFile
    }).then(function () {
      showToast('Obra publicada exitosamente!');
      document.getElementById('obra-titulo').value = '';
      if (document.getElementById('obra-describe')) document.getElementById('obra-describe').value = '';
      if (document.getElementById('obra-desc')) document.getElementById('obra-desc').value = '';
      document.getElementById('upload-preview').classList.add('hidden');
      document.getElementById('upload-zone-inner').classList.remove('hidden');
      selectedFile = null;
      setTimeout(function () {
        var galleryBtn = document.querySelector('.nav-btn[data-screen="screen-galeria"]');
        if (galleryBtn) navigate('screen-galeria', galleryBtn);
        else navigate('screen-galeria');
      }, 500);
    }).catch(function (err) {
      showToast(err.message || 'Error al publicar la obra');
      navigate('screen-subir', document.querySelector('[data-screen="screen-subir"]'));
    }).finally(function () {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'PUBLICAR OBRA';
      }
    });
  } else {
    showToast('Error: API no disponible');
    navigate('screen-subir', document.querySelector('[data-screen="screen-subir"]'));
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'PUBLICAR OBRA'; }
  }
}
window.submitObra = submitObra;

/* ── API INTEGRATION ────────────────────────────────── */

var BG_CLASSES = ['bg-rust', 'bg-green', 'bg-navy', 'bg-navy-soft', 'bg-rust-soft', 'bg-green-soft', 'bg-purple', 'bg-teal', 'bg-slate', 'bg-magenta'];

function getRatingAvg(obra) {
  return obra.ratingCount > 0 ? obra.ratingTotal / obra.ratingCount : 0;
}

function formatRating(obra) {
  var avg = getRatingAvg(obra);
  return avg ? avg.toFixed(1) : '0.0';
}

function buildStarRow(obraId) {
  var stars = '';
  for (var s = 1; s <= 5; s++) {
    stars += '<button class="rating-star" type="button" onclick="event.stopPropagation(); rateApiObra(\'' + obraId + '\',' + s + ')" aria-label="Puntuar ' + s + ' estrellas">\u2605</button>';
  }
  return stars;
}

function buildApiCard(obra, index) {
  var bgClass = BG_CLASSES[index % BG_CLASSES.length];
  var avg = getRatingAvg(obra);
  var filledStars = Math.max(1, Math.round(avg || 1));
  return '<div class="art-card gallery-item" data-title="' + obra.titulo + '" data-artist="' + obra.autorApodo + '" data-medium="Visitante" data-api-id="' + obra._id + '" onclick="openArtwork(\'' + obra._id + '\')">' +
    '<div class="art-card-img ' + bgClass + '" style="background-image: linear-gradient(rgba(0,0,0,.08), rgba(0,0,0,.25)), url(\'' + obra.imageUrl + '\'); background-size: cover; background-position: center center;">' +
      '<span class="badge-dest">VISITANTE</span>' +
      '<button class="like-btn" onclick="event.stopPropagation(); toggleLike(this)">' +
        '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
        '<span>' + (obra.likes || 0) + '</span>' +
      '</button>' +
    '</div>' +
    '<div class="art-card-info">' +
      '<h3>' + obra.titulo + '</h3>' +
      '<p>' + obra.autorApodo + '</p>' +
      '<div class="obra-rating-display">' +
        '<span class="obra-rating-stars">' + '\u2605'.repeat(filledStars) + '\u2606'.repeat(5 - filledStars) + '</span>' +
        '<span class="obra-rating-text">' + formatRating(obra) + ' (' + (obra.ratingCount || 0) + ')</span>' +
      '</div>' +
      '<div class="obra-rating-actions">' + buildStarRow(obra._id) + '</div>' +
      '<div class="art-card-footer">' +
        '<span class="tag">' + new Date(obra.createdAt).toLocaleDateString('es-CO') + '</span>' +
        '<button class="arrow-btn">\u2192</button>' +
      '</div>' +
    '</div>' +
  '</div>';
}



function loadObrasForInicio() {
  if (!window.API) return;
  var container = document.getElementById('api-inicio-obras');
  if (!container) return;

  API.getObras({ limit: 6 }).then(function (obras) {
    state.apiObras = obras;
    if (obras.length === 0) { container.innerHTML = ''; return; }
    container.innerHTML = obras.map(function (o, i) {
      var bgClass = BG_CLASSES[i % BG_CLASSES.length];
      return '<div class="top-card" onclick="openArtwork(\'' + o._id + '\')">' +
        '<div class="top-card-img ' + bgClass + '" style="background-image: linear-gradient(rgba(0,0,0,.08), rgba(0,0,0,.25)), url(\'' + o.imageUrl + '\'); background-size: cover; background-position: center center;">' +
          '<span class="rank-num">' + (i + 1) + '</span>' +
        '</div>' +
        '<p class="top-card-name">' + o.titulo + '</p>' +
        '<p class="top-card-meta">' + o.autorApodo + '</p>' +
      '</div>';
    }).join('');
  }).catch(function () {});
}

function loadObrasFamosas() {
  const container = document.getElementById('api-inicio-obras');
  if (!container) return;

  container.innerHTML = topObrasFamosos.map((obra, i) => `
    <div class="top-card">
      <div class="top-card-img"
           style="
             background-image:url('${obra.imagen}');
             background-size:cover;
             background-position:center;
           ">
        <span class="rank-num">${i + 1}</span>
      </div>

      <p class="top-card-name">${obra.titulo}</p>
      <p class="top-card-meta">${obra.artista}</p>
    </div>
  `).join('');
}

const topObrasFamosos = [
  {
    titulo: "La Noche Estrellada",
    artista: "Vincent van Gogh",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/e/ea/The_Starry_Night.jpg"
  },
  {
    titulo: "La Mona Lisa",
    artista: "Leonardo da Vinci",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa.jpg"
  },
  {
    titulo: "Guernica",
    artista: "Pablo Picasso",
    imagen: "https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg"
  },
  {
    titulo: "La Persistencia de la Memoria",
    artista: "Salvador Dalí",
    imagen: "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg"
  }
];
function loadObrasFamosas() {

  const container = document.getElementById('api-inicio-obras');

  container.innerHTML = topObrasFamosos.map((obra, i) => `
    <div class="top-card">
      <div class="top-card-img"
           style="
             background-image:url('${obra.imagen}');
             background-size:cover;
             background-position:center;
           ">
        <span class="rank-num">${i + 1}</span>
      </div>

      <p class="top-card-name">${obra.titulo}</p>
      <p class="top-card-meta">${obra.artista}</p>
    </div>
  `).join('');
}


/* ── AVATAR ─────────────────────────────────────────── */

function openAvatarModal() { document.getElementById('avatar-overlay').classList.remove('hidden'); }
window.openAvatarModal = openAvatarModal;

function closeAvatarModal() {
  document.getElementById('avatar-overlay').classList.add('hidden');
  document.querySelectorAll('.av-opt').forEach(function (av) { av.classList.remove('selected'); });
  state.selectedAvatar = null;
}
window.closeAvatarModal = closeAvatarModal;

function selectAvatar(img) {
  document.querySelectorAll('.av-opt').forEach(function (av) { av.classList.remove('selected'); });
  img.classList.add('selected');
  state.selectedAvatar = img.src;
}
window.selectAvatar = selectAvatar;

function confirmAvatar() {
  if (!state.selectedAvatar) return showToast('Selecciona un avatar');

  // Actualiza TODOS los avatares del header y el de perfil
  document.querySelectorAll('.avatar-header-img, #perfil-main-avatar')
    .forEach(function(img) {
      img.src = state.selectedAvatar;
    });

  closeAvatarModal();
  showToast('Avatar actualizado');
}
window.confirmAvatar = confirmAvatar;

/* ── COLLECTIONS ────────────────────────────────────── */

function buildCollectionCards(ids) {
  return ids.map(function (id) {
    var art = state.artworks[id];
    if (!art) return '';
    return '<div class="art-card collection-card" onclick="openArtwork(\'' + id + '\')">' +
      '<div class="art-card-img real-art-image" style="background-image:linear-gradient(rgba(0,0,0,.08), rgba(0,0,0,.18)), url(\'' + art.image + '\'); background-position:' + (art.imagePosition || 'center center') + '">' +
        '<span class="badge-dest">' + art.medium.toUpperCase() + '</span>' +
      '</div>' +
      '<div class="art-card-info"><h3>' + art.title + '</h3><p>' + art.artist + '</p>' +
        '<div class="art-card-footer"><span class="tag">' + art.medium + ' . ' + art.year + '</span><button class="arrow-btn">→</button></div>' +
      '</div></div>';
  }).join('');
}

function openCollectionView(key, title) {
  var ids = state.collections[key] || [];
  var target = document.getElementById('collection-grid');
  var titleEl = document.getElementById('collection-title');
  if (!target || !titleEl) return;
  titleEl.textContent = title;
  target.innerHTML = buildCollectionCards(ids);

  var current = document.getElementById(state.currentScreen);
  if (current) current.classList.remove('active');
  document.getElementById('screen-collection').classList.add('active');
  state.previousScreen = state.currentScreen;
  state.currentScreen = 'screen-collection';
  document.querySelectorAll('.nav-btn').forEach(function (b) { b.classList.remove('active'); });
}

/* ── GALLERY FILTER ─────────────────────────────────── */

function applyGalleryFilter() {
  var query = (document.getElementById('gallery-search') ? document.getElementById('gallery-search').value : '').trim().toLowerCase();
  var filter = state.activeFilter;
  document.querySelectorAll('.gallery-item').forEach(function (card) {
    var title = (card.dataset.title || '').toLowerCase();
    var artist = (card.dataset.artist || '').toLowerCase();
    var medium = card.dataset.medium || '';
    var matchesQuery = !query || title.includes(query) || artist.includes(query) || medium.toLowerCase().includes(query);
    var matchesFilter = filter === 'all' || medium === filter;
    card.classList.toggle('is-hidden', !(matchesQuery && matchesFilter));
  });
}

function applyRealArtworkImages() {
  Object.entries(state.artworks).forEach(function (entry) {
    var id = entry[0], art = entry[1];
    document.querySelectorAll('[onclick*="' + id + '"]').forEach(function (card) {
      var visual = card.querySelector('.art-card-img, .top-card-img, .fav-img, .gallery-img');
      if (!visual) return;
      visual.classList.add('real-art-image');
      visual.style.backgroundImage = "linear-gradient(rgba(0,0,0,.08), rgba(0,0,0,.18)), url('" + art.image + "')";
      visual.style.backgroundSize = 'cover';
      visual.style.backgroundPosition = art.imagePosition || 'center center';
      visual.style.backgroundRepeat = 'no-repeat';
    });
  });
}

function initDotsAnimation() {
  document.querySelectorAll('.cards-scroll, .top-obras-scroll, .fav-scroll, .gallery-scroll').forEach(function (container) {
    var section = container.closest('.home-section');
    if (!section) return;
    var dots = section.querySelectorAll('.dot');
    if (!dots.length) return;
    container.addEventListener('scroll', function () {
      var maxScroll = container.scrollWidth - container.clientWidth;
      var progress = maxScroll > 0 ? container.scrollLeft / maxScroll : 0;
      var activeIndex = Math.round(progress * (dots.length - 1));
      dots.forEach(function (dot, i) { dot.classList.toggle('active', i === activeIndex); });
    }, { passive: true });
  });
}

/* ── TOAST ──────────────────────────────────────────── */

var toastTimeout = null;
function showToast(message) {
  var toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(function () { toast.classList.remove('show'); }, 2600);
}
window.showToast = showToast;

/* ── STARTUP FLOW (with moderation) ─────────────────── */

function showStartupFlow() {
  var overlay = document.getElementById('startup-overlay');
  var splash = document.getElementById('startup-splash');
  var entry = document.getElementById('name-entry');
  overlay.classList.remove('hidden');
  splash.classList.remove('hidden');
  entry.classList.add('hidden');

  function showNameEntry() {
    var loadBar = document.querySelector('.loading-bar');
    if (loadBar) loadBar.style.display = 'none';
    if (splash) splash.classList.add('hidden');
    if (entry) entry.classList.remove('hidden');
    var nameInput = document.getElementById('visitor-name');
    if (nameInput) nameInput.focus();
  }

  setTimeout(showNameEntry, 2000);
  setTimeout(function () {
    if (entry && entry.classList.contains('hidden')) {
      showNameEntry();
    }
  }, 2600);
}

function completeStartup(name) {
  // Validate with moderation
  var validator = window.UsernameModeration;
  if (validator) {
    var result = validator.validateUsername(name, {
      minLength: 2, maxLength: 40, blacklist: validator.DEFAULT_BLACKLIST
    });
    if (!result.valid) {
      showToast(result.reason);
      return;
    }
    name = result.value;
  }

  document.querySelector('.perfil-user-name').textContent = name.toUpperCase();
  var fullNameRow = document.querySelector('.perfil-data-row span:last-child');
  if (fullNameRow) fullNameRow.textContent = name;
  document.getElementById('startup-overlay').classList.add('hidden');
  navigate('screen-inicio', document.querySelector('[data-screen="screen-inicio"]'));
}

/* ── AUTO-HIDE BOTTOM NAV ON SCROLL ─────────────────── */

function initAutoHideNav() {
  var nav = document.getElementById('bottom-nav');
  if (!nav) return;
  var lastY = 0, direction = 0, moved = 0, threshold = 40;

  function canScroll() {
    return document.documentElement.scrollHeight - window.innerHeight > 2;
  }

  // Attach to each screen-scroll
  document.querySelectorAll('.screen-scroll').forEach(function (scroller) {
    var scrollLastY = 0;
    scroller.addEventListener('scroll', function () {
      if (!canScroll.call(null) && scroller.scrollHeight - scroller.clientHeight < 3) {
        nav.classList.remove('nav-hidden');
        return;
      }
      var y = scroller.scrollTop;
      var delta = y - scrollLastY;
      var newDir = delta === 0 ? 0 : (delta > 0 ? 1 : -1);
      if (newDir !== 0) {
        if (newDir === direction) { moved += Math.abs(delta); }
        else { direction = newDir; moved = Math.abs(delta); }
        if (moved >= threshold) {
          if (direction > 0) nav.classList.add('nav-hidden');
          else nav.classList.remove('nav-hidden');
          moved = 0;
        }
      }
      scrollLastY = y;
    }, { passive: true });
  });
}

/* ── PWA INSTALL BANNER ─────────────────────────────── */

var deferredPrompt = null;
var INSTALL_DISMISSED_KEY = 'mamb_install_dismissed';

function injectInstallBanner() {
  if (localStorage.getItem(INSTALL_DISMISSED_KEY) === '1') return;
  if (document.getElementById('install-banner')) return;

  var div = document.createElement('div');
  div.innerHTML =
    '<div class="install-banner" id="install-banner">' +
      '<div class="install-banner-row">' +
        '<p>Instala MAMB!</p>' +
        '<button class="install-btn-no" id="install-no">✕</button>' +
      '</div>' +
      '<small>Agrega la app a tu pantalla de inicio para usarla en cualquier momento</small>' +
      '<button class="install-btn-yes" id="install-yes">Instalar ahora</button>' +
    '</div>';
  document.body.appendChild(div.firstElementChild);

  document.getElementById('install-no').addEventListener('click', function () {
    localStorage.setItem(INSTALL_DISMISSED_KEY, '1');
    var b = document.getElementById('install-banner');
    if (b) b.classList.remove('show');
  });
  
  document.getElementById('install-yes').addEventListener('click', function () {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(function () {
      deferredPrompt = null;

      var b = document.getElementById('install-banner');
      if (b) b.classList.remove('show');
    });
  });
}

window.addEventListener('beforeinstallprompt', function (e) {
  e.preventDefault();
  if (localStorage.getItem(INSTALL_DISMISSED_KEY) === '1') return;
  deferredPrompt = e;
  setTimeout(function () {
    var b = document.getElementById('install-banner');
    if (b) b.classList.add('show');
  }, 2000);
});

/* ── TOUCH GESTURES ─────────────────────────────────── */

var touchStartX = 0, touchStartY = 0;
document.addEventListener('touchstart', function (e) {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', function (e) {
  if (['screen-artwork', 'screen-collection'].indexOf(state.currentScreen) === -1) return;
  var deltaX = e.changedTouches[0].clientX - touchStartX;
  var deltaY = Math.abs(e.changedTouches[0].clientY - touchStartY);
  if (deltaX > 60 && deltaY < 50) goBack();
}, { passive: true });

/* ── IA POSES ───────────────────────────────────────── */

var IA_MODEL_URL = 'https://teachablemachine.withgoogle.com/models/dyyi3qHP7/';
var IA_LABEL_MAP = { 'class 7': 'pensando', 'class 8': 'sorprendido' };
var iaState = { model: null, webcam: null, ctx: null, maxPredictions: 0, running: false };

function iaGetDisplayName(rawName) {
  var name = (rawName || '').trim().toLowerCase();
  if (name === 'class 7' || name === '7') return 'pensando';
  if (name === 'class 8' || name === '8') return 'sorprendido';
  return IA_LABEL_MAP[rawName] || rawName;
}

function iaInit() {
  if (iaState.running) return;
  var btnStart = document.getElementById('ia-btn-start');
  var canvasWrap = document.getElementById('ia-canvas-wrap');
  var placeholder = document.getElementById('ia-placeholder');
  var topCard = document.getElementById('ia-top-card');
  var labelContainer = document.getElementById('ia-label-container');
  btnStart.disabled = true;
  iaSetStatus('loading', 'Cargando modelo...');

  tmPose.load(IA_MODEL_URL + 'model.json', IA_MODEL_URL + 'metadata.json').then(function (model) {
    iaState.model = model;
    iaState.maxPredictions = model.getTotalClasses();
    iaState.webcam = new tmPose.Webcam(260, 260, true);
    return iaState.webcam.setup().then(function () { return iaState.webcam.play(); });
  }).then(function () {
    var canvas = document.getElementById('ia-canvas');
    canvas.width = 260; canvas.height = 260;
    iaState.ctx = canvas.getContext('2d');
    iaBuildBars(labelContainer);
    iaState.running = true;
    placeholder.classList.add('hidden');
    canvasWrap.classList.add('active');
    topCard.classList.add('visible');
    iaSetStatus('online', 'Deteccion activa');
    window.requestAnimationFrame(iaLoop);
  }).catch(function (error) {
    console.error(error);
    iaSetStatus('', 'No se pudo iniciar');
    btnStart.disabled = false;
    showToast('No se pudo iniciar la camara');
  });
}
window.iaInit = iaInit;

function iaLoop() {
  if (!iaState.running) return;
  iaState.webcam.update();
  iaPredict().then(function () { window.requestAnimationFrame(iaLoop); });
}

function iaPredict() {
  return iaState.model.estimatePose(iaState.webcam.canvas).then(function (result) {
    return iaState.model.predict(result.posenetOutput).then(function (predictions) {
      var best = predictions.reduce(function (a, b) { return a.probability > b.probability ? a : b; });
      predictions.forEach(function (prediction, i) {
        var pct = (prediction.probability * 100).toFixed(1);
        var dominant = prediction.className === best.className;
        document.getElementById('ia-name-' + i).textContent = iaGetDisplayName(prediction.className);
        var pctEl = document.getElementById('ia-pct-' + i);
        var fillEl = document.getElementById('ia-fill-' + i);
        pctEl.textContent = pct + '%';
        pctEl.classList.toggle('high', dominant);
        fillEl.style.width = pct + '%';
        fillEl.classList.toggle('dominant', dominant);
      });
      document.getElementById('ia-top-name').textContent = iaGetDisplayName(best.className);
      document.getElementById('ia-top-pct').textContent = (best.probability * 100).toFixed(0) + '%';
      iaDraw(result.pose);
    });
  });
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
  for (var i = 0; i < iaState.maxPredictions; i++) {
    var item = document.createElement('div');
    item.className = 'ia-bar-item';
    item.innerHTML = '<div class="ia-bar-header"><span class="ia-bar-name" id="ia-name-' + i + '">Clase ' + (i + 1) + '</span><span class="ia-bar-pct" id="ia-pct-' + i + '">0%</span></div><div class="ia-bar-track"><div class="ia-bar-fill" id="ia-fill-' + i + '"></div></div>';
    container.appendChild(item);
  }
}

function iaSetStatus(cls, text) {
  var el = document.getElementById('ia-status');
  el.className = 'ia-status-badge' + (cls ? ' ' + cls : '');
  el.textContent = text;
}

/* ── DOMContentLoaded ───────────────────────────────── */

document.addEventListener('DOMContentLoaded', function () {

  document.querySelectorAll('.filter-chips .chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      document.querySelectorAll('.filter-chips .chip').forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      state.activeFilter = chip.dataset.filter || 'all';
      applyGalleryFilter();
    });
  });

  document.querySelectorAll('.artist-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var wasActive = chip.classList.contains('active');
      document.querySelectorAll('.artist-chip').forEach(function (c) { c.classList.remove('active'); });
      if (!wasActive) chip.classList.add('active');
    });
  });

  var gallerySearch = document.getElementById('gallery-search');
  if (gallerySearch) gallerySearch.addEventListener('input', applyGalleryFilter);

  var avatarOverlay = document.getElementById('avatar-overlay');
  if (avatarOverlay) {
    avatarOverlay.addEventListener('click', function (e) {
      if (e.target.id === 'avatar-overlay') closeAvatarModal();
    });
  }

  document.querySelectorAll('.ver-todo').forEach(function (link, index) {
    var mappings = [
      ['curatorial', 'Seleccion curatorial'],
      ['publicaciones', 'Ultimas publicaciones'],
      ['artista', 'Obras por artista'],
      ['favoritas', 'Tus favoritas'],
      ['galeria', 'Tu galeria'],
      ['galeria', 'Coleccion completa']
    ];
    var config = mappings[index];
    if (!config) return;
    link.addEventListener('click', function (e) {
      e.preventDefault();
      openCollectionView(config[0], config[1]);
    });
  });

  var uploadZone = document.getElementById('upload-zone');
  if (uploadZone) {
    uploadZone.addEventListener('dragover', function (e) {
      e.preventDefault();
      uploadZone.style.background = 'rgba(160,82,45,0.12)';
    });
    uploadZone.addEventListener('dragleave', function () {
      uploadZone.style.background = '';
    });
    uploadZone.addEventListener('drop', function (e) {
      e.preventDefault();
      uploadZone.style.background = '';
      var file = e.dataTransfer.files ? e.dataTransfer.files[0] : null;
      if (!file || !file.type.startsWith('image/')) return;
      selectedFile = file;
      var preview = document.getElementById('upload-preview');
      var inner = document.getElementById('upload-zone-inner');
      var reader = new FileReader();
      reader.onload = function (ev) {
        preview.src = ev.target.result;
        preview.classList.remove('hidden');
        inner.classList.add('hidden');
      };
      reader.readAsDataURL(file);
    });
  }

  var nameForm = document.getElementById('name-form');
  if (nameForm) {
    nameForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('visitor-name').value.trim();
      if (!name) return;
      completeStartup(name);
    });
  }

  var logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) logoutBtn.remove();

  applyRealArtworkImages();
  applyGalleryFilter();
  initDotsAnimation();
  initAutoHideNav();
  injectInstallBanner();
  showStartupFlow();
  loadObrasFamosas();
});

/* ── DATO CURIOSO ─────────────────────────────────────── */

var datosCuriosos = [
  { icon: '💡', question: 'Los artistas mezclan colores para crear emociones', body: 'El azul evoca calma y tristeza, el rojo pasion o peligro, y el amarillo alegria. Esto se llama psicologia del color.', tag: 'Color' },
  { icon: '🏛️', question: 'Por que los museos tienen luz tenue?', body: 'La luz ultravioleta dana los pigmentos con el tiempo. Los museos usan LED especial sin UV para proteger el color original de cada obra.', tag: 'Conservacion' },
  { icon: '🖌️', question: 'El oleo tarda semanas en secarse completamente', body: 'A diferencia del acrilico que seca en minutos, el oleo puede tardar meses. Eso permitia a los maestros corregir y mezclar directamente sobre el lienzo.', tag: 'Tecnica' },
  { icon: '🗺️', question: 'El Caribe colombiano tiene su propio lenguaje visual', body: 'Artistas como Alejandro Obregon desarrollaron un estilo unico que mezcla colores tropicales, fauna local y la luz caracteristica del Caribe.', tag: 'Caribe' },
  { icon: '✨', question: 'Que es el sfumato, la tecnica secreta de Da Vinci?', body: 'Leonardo aplicaba capas de pintura tan finas que no dejaba trazos. El resultado son transiciones suaves entre luz y sombra, como si los bordes se disolvieran en humo.', tag: 'Tecnica' },
  { icon: '🎨', question: 'La acuarela es la tecnica mas dificil de corregir', body: 'Una vez que el pigmento toca el papel humedo, se expande solo y casi no se puede borrar. Por eso los acuarelistas planifican cada pincelada antes de darla.', tag: 'Acuarela' }
];
var dcCurrent = 0;

function dcBuildDots() {
  var container = document.getElementById('dc-dots');
  if (!container) return;
  container.innerHTML = '';
  datosCuriosos.forEach(function (_, i) {
    var d = document.createElement('span');
    d.className = 'dc-dot' + (i === dcCurrent ? ' active' : '');
    container.appendChild(d);
  });
}

function dcUpdateDots() {
  document.querySelectorAll('.dc-dot').forEach(function (d, i) {
    d.classList.toggle('active', i === dcCurrent);
  });
}

function verMas() {
  dcCurrent = (dcCurrent + 1) % datosCuriosos.length;
  var dato = datosCuriosos[dcCurrent];
  var card = document.getElementById('dc-card');
  card.classList.remove('dc-fade');
  void card.offsetWidth;
  card.classList.add('dc-fade');
  document.getElementById('dc-icon').textContent = dato.icon;
  document.getElementById('dc-question').textContent = dato.question;
  document.getElementById('dc-body').textContent = dato.body;
  document.getElementById('dc-tag').textContent = dato.tag;
  dcUpdateDots();
}
window.verMas = verMas;

/* ── MEMORIA ARTISTICA ───────────────────────────────── */

var MG_CARDS = [
  { id:'ml', emoji:'🖼️', name:'Mona Lisa', dato:'La Mona Lisa no tiene cejas — era moda en Italia depilarlas completamente.' },
  { id:'ng', emoji:'🌙', name:'Noche estrellada', dato:'Van Gogh pinto la Noche Estrellada desde la ventana de un manicomio.' },
  { id:'gr', emoji:'😱', name:'El grito', dato:'Munch se inspiro en un cielo rojo — posiblemente ceniza del volcan Krakatoa.' },
  { id:'gi', emoji:'🌻', name:'Girasoles', dato:'Van Gogh pinto sus Girasoles para decorar el cuarto de su amigo Gauguin.' },
  { id:'pe', emoji:'🎭', name:'Picasso', dato:'Picasso fue pionero del collage: pegar objetos reales sobre el lienzo.' },
  { id:'da', emoji:'🔵', name:'Punto azul', dato:'Kandinsky creia que el azul era el color mas espiritual: representaba el infinito.' }
];
var MG_LEVELS = [
  { pairs:2, cols:'cols4' },
  { pairs:4, cols:'cols4' },
  { pairs:6, cols:'cols3' }
];
var mgLevel=0, mgFlipped=[], mgMatched=[], mgLocked=false, mgTries=0, mgTimer=0, mgTimerID=null, mgStarted=false;

function mgShuffle(arr) { return arr.slice().sort(function () { return Math.random() - 0.5; }); }

function mgSetLevel(lvl, btn) {
  mgLevel = lvl;
  document.querySelectorAll('.mg-lvl-btn').forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');
  mgRestart();
}
window.mgSetLevel = mgSetLevel;

function mgRestart() {
  clearInterval(mgTimerID);
  mgFlipped=[]; mgMatched=[]; mgLocked=false; mgTries=0; mgTimer=0; mgStarted=false;
  var timerEl = document.getElementById('mg-timer');
  if (timerEl) timerEl.textContent = '0s';
  var winEl = document.getElementById('mg-win');
  if (winEl) winEl.classList.add('hidden');
  mgSetDato('Encuentra una pareja para descubrir un dato curioso.');
  mgRender();
}
window.mgRestart = mgRestart;

function mgRender() {
  var board = document.getElementById('mg-board');
  if (!board) return;
  var level = MG_LEVELS[mgLevel];
  var pool = mgShuffle(MG_CARDS).slice(0, level.pairs);
  var cards = mgShuffle([].concat(pool, pool).map(function (c, i) { return Object.assign({}, c, { uid: i }); }));
  board.className = 'mg-board ' + level.cols;
  document.getElementById('mg-pairs').textContent = '0/' + level.pairs + ' pares';
  board.innerHTML = cards.map(function (c) {
    return '<div class="mg-card" id="mgc-' + c.uid + '" data-id="' + c.id + '" data-uid="' + c.uid + '" data-dato="' + c.dato + '" onclick="mgFlip(this)">' +
      '<div class="mg-card-inner"><div class="mg-card-front">🎴</div><div class="mg-card-back"><span class="mg-emoji">' + c.emoji + '</span><span class="mg-name">' + c.name + '</span></div></div></div>';
  }).join('');
}

function mgFlip(el) {
  if (mgLocked || el.classList.contains('flipped') || el.classList.contains('matched')) return;
  if (!mgStarted) {
    mgStarted = true;
    mgTimerID = setInterval(function () { mgTimer++; document.getElementById('mg-timer').textContent = mgTimer + 's'; }, 1000);
  }
  el.classList.add('flipped');
  mgFlipped.push(el);
  if (mgFlipped.length === 2) mgCheck();
}
window.mgFlip = mgFlip;

function mgCheck() {
  mgLocked = true; mgTries++;
  var a = mgFlipped[0], b = mgFlipped[1];
  if (a.dataset.id === b.dataset.id) {
    a.classList.add('matched'); b.classList.add('matched');
    mgMatched.push(a.dataset.id);
    mgSetDato(a.dataset.dato);
    var pairs = MG_LEVELS[mgLevel].pairs;
    document.getElementById('mg-pairs').textContent = mgMatched.length + '/' + pairs + ' pares';
    mgFlipped = []; mgLocked = false;
    if (mgMatched.length === pairs) setTimeout(mgWin, 500);
  } else {
    a.classList.add('wrong'); b.classList.add('wrong');
    setTimeout(function () {
      a.classList.remove('flipped', 'wrong');
      b.classList.remove('flipped', 'wrong');
      mgFlipped = []; mgLocked = false;
    }, 900);
  }
}

function mgSetDato(text) {
  var el = document.getElementById('mg-dato');
  el.style.opacity = 0;
  setTimeout(function () { document.getElementById('mg-dato-msg').textContent = text; el.style.opacity = 1; }, 200);
}

function mgWin() {
  clearInterval(mgTimerID);
  document.getElementById('mg-win-time').textContent = mgTimer + 's';
  document.getElementById('mg-win-tries').textContent = mgTries;
  document.getElementById('mg-win').classList.remove('hidden');
  showToast('Encontraste todas las parejas!');
}

})();
