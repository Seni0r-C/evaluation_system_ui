export const API_URL = "http://localhost:3000";

export const RutaRaiz = "/";

export const VERSION = "0.0.1";

export function capitalizeWords(str) {
    str = str.toLowerCase();
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
}