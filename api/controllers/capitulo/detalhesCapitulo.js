const CapituloService = require('../../services/capitulo.service');

const detalhesCapitulo = async (req, res) => {
    const { id } = req.params;

    try {
        // Busca o capitulo pelo id
        const capitulo = await CapituloService.detalhesCapitulo(id);

        res.status(200).json({
            error: false,
            data: capitulo
        })

    } catch (error) {
        res.status(400).json({
            error: error.message,
            data: false
        })
    }
}

module.exports = detalhesCapitulo;