const getTodasAsTags = require('./tag/getTodasAsTags');
const inserirTag = require('./tag/inserirTag');
const alterarTag = require('./tag/alterarTag');
const buscarTagPorId = require('./tag/buscarTagPorId');
const deletarTag = require('./tag/deletarTag');

module.exports = {
    getTodasAsTags,
    inserirTag,
    alterarTag,
    buscarTagPorId,
    deletarTag
}