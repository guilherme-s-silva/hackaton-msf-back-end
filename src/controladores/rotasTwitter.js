const instaciaAxios = require('../servicos/twitter');
const Authorization = instaciaAxios.header

const testeAPI = async(req, res) => {
    Authorization
    const {id} = req.params;
    try {
        const pedido = await instaciaAxios.get(`/2/lists/${id}`,  )
        res.status(200).json(pedido);
    } catch (error) {
        return res.status(404).json(error.message);
    }
};

module.exports = testeAPI;