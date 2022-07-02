const axios = require('axios').default;
const knex = require('../conexao');
const fs = require('fs/promises');

const listarTweets = async () => {

    try {
         const {data} = await axios.get(`https://api.twitter.com/2/lists/1541520243729858560/tweets?tweet.fields=author_id%2Clang%2Ccreated_at&max_results=100`, {
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

const listarMembros = async () => {
    try {
        const {data} = await axios.get(`https://api.twitter.com/2/lists/1541520243729858560/members?user.fields=id%2Cprofile_image_url%2Clocation%2Curl%2Cverified%2Cpublic_metrics&max_results=100`, {
            headers: { 
                'Authorization': 'Bearer ' + process.env.TOKEN
            }
        });

        return data;
    } catch (error) {
        throw {message: error.message}
    }
};

const proximosTweets = async (token) => {
    try {
        const {data} = await axios.get(`https://api.twitter.com/2/lists/1541520243729858560/tweets?tweet.fields=author_id%2Clang%2Ccreated_at&pagination_token=${token}&max_results=100`, {
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

const tweetsGerais = async (req, res) => {

    try {
        const palavrasChave = JSON.parse(await fs.readFile('./src/categorias/chaves.json'));

        const tweets = await listarTweets();
        const membros = await listarMembros();

        const tweetsCombinados = [];

        for(const tweet of tweets.data) {
            for(const membro of membros.data) {
                let tweetTratado = {};

                if (tweet.author_id === membro.id){
                    tweetTratado = {...tweet, ...membro}
                    tweetsCombinados.push(tweetTratado);
                }
            }
        }

        const tweetsTratados = [];

        tweetsCombinados.forEach(tweet => {
            for(const item of palavrasChave){
                if (tweet.text.toLowerCase().includes(item.toLowerCase())){
                    return tweetsTratados.push(tweet);
                }
            } 
        });

        let token = tweets.meta.next_token;
        while(tweetsTratados.length < 50){
            const novosTweets = await proximosTweets(token);
            
            token = novosTweets.meta.next_token;
            const tweetsAtuais = [];

            for(const tweet of novosTweets.data) {
                for(const membro of membros.data) {
                    let tweetTratado = {};

                    if (tweet.author_id === membro.id){
                        tweetTratado = {...tweet, ...membro}
                        tweetsAtuais.push(tweetTratado);
                    }
                }
            }

            tweetsAtuais.forEach(tweet => {
                for(const item of palavrasChave){
                    if (tweet.text.toLowerCase().includes(item.toLowerCase())){
                        return tweetsTratados.push(tweet);
                    }
                }
            });
        }
         
        return res.status(200).json(tweetsTratados);
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

module.exports = tweetsGerais;