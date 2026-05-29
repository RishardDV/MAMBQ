const getRequiredEnv = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`La variable de entorno ${name} es obligatoria.`);
  }
  return value;
};

module.exports = { getRequiredEnv };
