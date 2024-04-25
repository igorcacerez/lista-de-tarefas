/**
 * Método para converter uma string em slug 
 * @param {string} str 
 * @returns {string}
 */
const stringToSlug = async (str) => {
    // Converte a string em minusculo
    str = str.toLowerCase();

    // Remove acentos/diacríticos
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Substitui caracteres especiais por hífen (-)
    str = str.replace(/[\s\W-]+/g, "-");

    // Remove os hífens extras no início ou no final
    str = str.replace(/^-+|-+$/g, "");

    return str;
}

module.exports = stringToSlug;