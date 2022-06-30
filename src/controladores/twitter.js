const axios = require('axios').default;
const knex = require('../conexao');

const listarTweets = async (id) => {

    try {
         const {data} = await axios.get(`https://api.twitter.com/2/lists/${id}/tweets?tweet.fields=author_id%2Clang%2Ccreated_at&max_results=15`, {
            headers: { 
                'Authorization': 'Bearer ' + process.env.TOKEN
            }
        }); 

        return data;
    } catch (error) {
        console.log(error);
        throw {message: error.message}
    }     
}

const listarMembros = async (id) => {
    try {
        const {data} = await axios.get(`https://api.twitter.com/2/lists/1541520243729858560/members?user.fields=id%2Cprofile_image_url%2Clocation%2Curl%2Cverified%2Cpublic_metrics&max_results=20`, {
            headers: { 
                'Authorization': 'Bearer ' + process.env.TOKEN
            }
        });

        return data;
    } catch (error) {
        throw {message: error.message}
    }
};

const teste = async (req, res) => {
    const {id} = req.params;

    try {
        const palavrasChave = await knex('palavras_chave').select('chave');

        const chave = palavrasChave.map(chave => {
            return chave.chave;
        })

        console.log(chave);

        const tweets = await listarTweets(id);
        const membros = await listarMembros(id);
        
        return res.status(200).json({tweets, membros});
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

module.exports = teste;