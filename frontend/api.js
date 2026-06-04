// API module — connects frontend to backend
const API_BASE = '/api';

function getLocalObras() {
  try {
    return JSON.parse(window.localStorage.getItem('mamb_local_obras') || '[]');
  } catch (e) {
    return [];
  }
}

function saveLocalObras(obras) {
  try {
    window.localStorage.setItem('mamb_local_obras', JSON.stringify(obras));
  } catch (e) {
    // ignore
  }
}

function buildLocalObra(data) {
  return {
    _id: data._id || 'local_' + Date.now() + '_' + Math.random().toString(36).slice(2),
    titulo: data.titulo || 'Obra sin título',
    descripcion: data.descripcion || '',
    autorApodo: data.autorApodo || 'Artista',
    avatarIndex: data.avatarIndex || 0,
    imageUrl: data.imageUrl || data.image || '',
    likes: data.likes || 0,
    ratingTotal: data.ratingTotal || 0,
    ratingCount: data.ratingCount || 0,
    createdAt: data.createdAt || new Date().toISOString()
  };
}

function getFallbackObras({ limit } = {}) {
  var obras = getLocalObras();
  if (limit && obras.length > limit) {
    return obras.slice(0, limit);
  }
  return obras;
}

const API = {
  // GET all obras (with optional search/filter)
  async getObras({ search, autorApodo, page, limit } = {}) {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (autorApodo) params.set('autorApodo', autorApodo);
    if (page) params.set('page', page);
    if (limit) params.set('limit', limit);
    const qs = params.toString();
    try {
      const res = await fetch(`${API_BASE}/obras${qs ? '?' + qs : ''}`);
      if (!res.ok) throw new Error('Error al obtener obras');
      const data = await res.json();
      return getFallbackObras({ limit }).concat(data || []);
    } catch (err) {
      return getFallbackObras({ limit });
    }
  },

  // GET single obra by id
  async getObra(id) {
    try {
      const res = await fetch(`${API_BASE}/obras/${id}`);
      if (!res.ok) throw new Error('Obra no encontrada');
      return res.json();
    } catch (err) {
      const obras = getLocalObras();
      var obra = obras.find(function (item) { return item._id === id; });
      if (obra) return obra;
      throw new Error('Obra no encontrada');
    }
  },

  // POST new obra (multipart: image file + fields)
  async createObra({ titulo, descripcion, autorApodo, avatarIndex, imageFile }) {
    try {
      const form = new FormData();
      form.append('image', imageFile);
      form.append('titulo', titulo);
      form.append('descripcion', descripcion || '');
      form.append('autorApodo', autorApodo || 'Artista');
      form.append('avatarIndex', String(avatarIndex || 0));
      const res = await fetch(`${API_BASE}/obras`, { method: 'POST', body: form });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Error al publicar obra');
      }
      const text = await res.text();
      console.log('Respuesta createObra:', text);

      try {
        return JSON.parse(text);
      } catch (e) {
        console.error('JSON inválido:', text);
        throw e;
      }
    } catch (err) {
      return new Promise(function (resolve, reject) {
        if (!imageFile || !window.FileReader) {
          return reject(new Error('No se pudo publicar la obra'));
        }
        var reader = new FileReader();
        reader.onload = function (event) {
          var newObra = buildLocalObra({
            titulo: titulo,
            descripcion: descripcion,
            autorApodo: autorApodo,
            avatarIndex: avatarIndex,
            imageUrl: event.target.result,
            likes: 0,
            ratingTotal: 0,
            ratingCount: 0,
            createdAt: new Date().toISOString()
          });
          var obras = getLocalObras();
          obras.unshift(newObra);
          saveLocalObras(obras);
          resolve(newObra);
        };
        reader.onerror = function () {
          reject(new Error('No se pudo leer la imagen para publicar la obra'));
        };
        reader.readAsDataURL(imageFile);
      });
    }
  },

  // POST like
  async likeObra(id) {
    try {
      const res = await fetch(`${API_BASE}/obras/${id}/like`, { method: 'POST' });
      if (!res.ok) throw new Error('Error al dar like');
      return res.json();
    } catch (err) {
      var obras = getLocalObras();
      var obra = obras.find(function (item) { return item._id === id; });
      if (obra) {
        obra.likes = (obra.likes || 0) + 1;
        saveLocalObras(obras);
        return obra;
      }
      throw err;
    }
  },

  // POST rate (1-5 stars)
  async rateObra(id, value) {
    try {
      const res = await fetch(`${API_BASE}/obras/${id}/rate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value }),
      });
      if (!res.ok) throw new Error('Error al calificar obra');
      return res.json();
    } catch (err) {
      var obras = getLocalObras();
      var obra = obras.find(function (item) { return item._id === id; });
      if (obra) {
        obra.ratingTotal = (obra.ratingTotal || 0) + value;
        obra.ratingCount = (obra.ratingCount || 0) + 1;
        saveLocalObras(obras);
        return obra;
      }
      throw err;
    }
  },

  // DELETE obra
  async deleteObra(id) {
    try {
      const res = await fetch(`${API_BASE}/obras/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar obra');
      return res.json();
    } catch (err) {
      var obras = getLocalObras().filter(function (item) { return item._id !== id; });
      saveLocalObras(obras);
      return { success: true };
    }
  },

  // Health check
  async health() {
    const res = await fetch(`${API_BASE}/health`);
    return res.json();
  }
};

window.API = API;
