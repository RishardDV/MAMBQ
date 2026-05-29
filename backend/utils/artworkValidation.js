const { AppError } = require('./AppError');

const validateArtworkPayload = (payload, partial = false) => {
  const errors = [];

  if (!partial && (!payload.titulo || !payload.titulo.trim())) {
    errors.push('El campo titulo es obligatorio.');
  }

  if (payload.titulo && payload.titulo.length > 100) {
    errors.push('El titulo no puede exceder 100 caracteres.');
  }

  if (payload.descripcion && payload.descripcion.length > 500) {
    errors.push('La descripcion no puede exceder 500 caracteres.');
  }

  if (payload.autorApodo && payload.autorApodo.length > 20) {
    errors.push('El apodo no puede exceder 20 caracteres.');
  }

  if (errors.length > 0) {
    throw new AppError(errors.join(' '), 400);
  }

  if (partial) {
    const updates = {};
    if (payload.titulo !== undefined) updates.titulo = payload.titulo.trim();
    if (payload.descripcion !== undefined) updates.descripcion = payload.descripcion.trim();
    if (payload.autorApodo !== undefined) updates.autorApodo = payload.autorApodo.trim();
    if (payload.avatarIndex !== undefined) updates.avatarIndex = parseInt(payload.avatarIndex) || 0;
    return updates;
  }

  return {
    titulo: payload.titulo.trim(),
    descripcion: (payload.descripcion || '').trim(),
    autorApodo: (payload.autorApodo || 'Artista').trim(),
    avatarIndex: parseInt(payload.avatarIndex) || 0,
  };
};

module.exports = { validateArtworkPayload };
