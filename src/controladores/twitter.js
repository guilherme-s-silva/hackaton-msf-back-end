const axios = require('axios');

const teste = async (req, res) => {
    const {id} = req.params;

    try {
        let resposta, erro;

        const config = {
            method: 'get',
            url: `https://api.twitter.com/2/lists/${id}/tweets`,
            headers: { 
                'Authorization': 'Bearer ' + process.env.TOKEN
            }
        };

        axios(config)
            .then(function (response) {
                resposta = (response.data);
                return res.status(200).json(resposta);
            })
            .catch(function (error) {
                erro = (error);
                return res.status(400).json(error);
            });

        
    } catch (error) {
        return res.status(400).json(error.message)
    }

}

module.exports = teste