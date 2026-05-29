(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.UsernameModeration = api;
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  const DEFAULT_MIN_LENGTH = 3;
  const DEFAULT_MAX_LENGTH = 20;
  const ALLOWED_CHARACTERS = /^[A-Za-z0-9_ ]+$/;

  const LEET_MAP = Object.freeze({
    0: "o", 1: "i", 3: "e", 4: "a", 5: "s", 7: "t",
  });

  const HOMOGLYPHS = Object.freeze({
    "@": "a", "$": "s", "!": "i", "|": "i",
    "ñ": "n", "ç": "c", "ø": "o", "ß": "ss", "æ": "ae", "œ": "oe",
    "а": "a", "е": "e", "о": "o", "р": "p", "с": "s", "у": "y", "х": "x",
  });

  const DEFAULT_BLACKLIST = Object.freeze([
    "puta", "puto", "mierda", "sexo", "sexual", "porn", "porno", "xxx",
    "nude", "naked", "violence", "violento", "kill", "matar", "asesinar",
    "bomba", "terror", "terrorista", "racista", "nazi", "odio", "hate",
    "abuse", "abuso", "drugs", "drogas", "suicide", "suicidio",
    "gore", "bully", "bullying", "idiota", "estupido", "stupid",
    // Colombianas/costenas
    "monda", "caremonda", "careverga", "careculo", "carechimba",
    "malparido", "malparida", "hijueputa", "hijuepta", "hpta", "hp", "hdp",
    "gonorrea", "gonorreita", "marica", "maricon",
    "pirobo", "piroba", "jueputa", "jueputica",
    "culiao", "culiado", "culicagado", "culo",
    "verga", "vergon", "chimba", "chimbo",
    "comemierda", "comemonda", "comeverga",
    "mamaguevo", "mamagüevo", "mamon",
    "perra", "zorra", "putita", "putazo",
    "cacorro", "nojoda", "jodete",
    "arrecho", "soplamonda", "lambemonda", "lameculo",
    "pichurria", "picha", "chupamonda", "soplapene",
    "pene", "semen",
  ]);

  function normalizeForComparison(value) {
    const normalized = String(value ?? "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    const tokens = normalized.split(/[^a-z0-9]+/g).filter(Boolean);
    const cleaned = [];

    for (const token of tokens) {
      if (!/[a-z]/.test(token)) continue;
      let compact = "";
      for (const character of token) {
        compact += LEET_MAP[character] ?? HOMOGLYPHS[character] ?? character;
      }
      cleaned.push(compact);
    }
    return cleaned.join("");
  }

  function validateCharacters(value, options = {}) {
    const minLength = options.minLength ?? DEFAULT_MIN_LENGTH;
    const maxLength = options.maxLength ?? DEFAULT_MAX_LENGTH;
    const candidate = String(value ?? "").trim();

    if (!candidate) {
      return { valid: false, code: "empty", reason: "Escribe tu nombre." };
    }
    if (candidate.length < minLength) {
      return { valid: false, code: "too_short", reason: `El nombre debe tener al menos ${minLength} caracteres.` };
    }
    if (candidate.length > maxLength) {
      return { valid: false, code: "too_long", reason: `El nombre debe tener maximo ${maxLength} caracteres.` };
    }
    if (!ALLOWED_CHARACTERS.test(candidate)) {
      return { valid: false, code: "invalid_characters", reason: "Solo se permiten letras, numeros, espacios y guion bajo." };
    }
    return { valid: true, code: "ok", reason: "", value: candidate };
  }

  function containsBadWords(value, blacklist = DEFAULT_BLACKLIST) {
    const normalized = normalizeForComparison(value);
    if (!normalized) {
      return { valid: true, code: "ok", reason: "", normalized, matchedWord: "" };
    }

    const normalizedBL = [...new Set(
      blacklist.map(w => normalizeForComparison(w)).filter(Boolean)
    )].sort((a, b) => b.length - a.length);

    const matchedWord = normalizedBL.find(word => normalized.includes(word));

    if (matchedWord) {
      return {
        valid: false, code: "blacklisted",
        reason: "Ese nombre no esta permitido. Prueba otro mas amigable.",
        normalized, matchedWord,
      };
    }
    return { valid: true, code: "ok", reason: "", normalized, matchedWord: "" };
  }

  function validateUsername(value, options = {}) {
    const charResult = validateCharacters(value, options);
    if (!charResult.valid) {
      return { ...charResult, normalized: normalizeForComparison(value) };
    }

    const blResult = containsBadWords(value, options.blacklist);
    if (!blResult.valid) return blResult;

    return {
      valid: true, code: "ok", reason: "",
      normalized: blResult.normalized,
      value: charResult.value,
    };
  }

  return {
    DEFAULT_BLACKLIST,
    DEFAULT_MIN_LENGTH,
    DEFAULT_MAX_LENGTH,
    normalizeForComparison,
    validateCharacters,
    containsBadWords,
    validateUsername,
  };
});
