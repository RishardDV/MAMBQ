// API module — connects frontend to backend
const API_BASE = window.location.origin + '/api';

const API = {
  // GET all obras (with optional search/filter)
  async getObras({ search, autorApodo, page, limit } = {}) {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (autorApodo) params.set('autorApodo', autorApodo);
    if (page) params.set('page', page);
    if (limit) params.set('limit', limit);
    const qs = params.toString();
    const res = await fetch(`${API_BASE}/obras${qs ? '?' + qs : ''}`);
    if (!res.ok) throw new Error('Error al obtener obras');
    return res.json();
  },

  // GET single obra by id
  async getObra(id) {
    const res = await fetch(`${API_BASE}/obras/${id}`);
    if (!res.ok) throw new Error('Obra no encontrada');
    return res.json();
  },

  // POST new obra (multipart: image file + fields)
  async createObra({ titulo, descripcion, autorApodo, avatarIndex, imageFile }) {
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
    return res.json();
  },

  // POST like
  async likeObra(id) {
    const res = await fetch(`${API_BASE}/obras/${id}/like`, { method: 'POST' });
    if (!res.ok) throw new Error('Error al dar like');
    return res.json();
  },

  // POST rate (1-5 stars)
  async rateObra(id, value) {
    const res = await fetch(`${API_BASE}/obras/${id}/rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value }),
    });
    if (!res.ok) throw new Error('Error al calificar obra');
    return res.json();
  },

  // DELETE obra
  async deleteObra(id) {
    const res = await fetch(`${API_BASE}/obras/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error al eliminar obra');
    return res.json();
  },

  // Health check
  async health() {
    const res = await fetch(`${API_BASE}/health`);
    return res.json();
  }
};

window.API = API;
