export const API_URL = process.env.API_URL??"http://localhost:3000";
// export const API_URL =  "http://172.29.33.226:3000";

export const RutaRaiz = "/";

export const VERSION = "0.6.5";

/**
 * Convierte la primera letra de cada palabra a mayúscula
 * @param {string} str
 * @returns {string} 
 */
export function capitalizeWords(str) {
    str = str.toLowerCase();
    return str.replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
}

/**
 * Convierte una fecha MySQL a formato "dd/MM/yyyy, HH:mm"
 * @param {string} date - Fecha en formato ISO de MySQL (ej. "2025-01-15T05:00:00.000Z")
 * @returns {string} Fecha formateada como "15/01/2025, 05:00"
 */
export const hourAndDateFromDateTimeMySQL = (date) => {
    try {
        const parts = date.split(",");
        const dtparts = parts[0].trim().split("/");
        const day = dtparts[0];
        const month = dtparts[1];
        const year = dtparts[2];
        const time = parts[1].trim();
        return `${year}-${month}-${day}T${time}`;
    } catch (Exception) {
        console.log(Exception);
        return '';
    }
};
