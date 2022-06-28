const axios = require('axios');

const instaciaAxios = axios.create({
    baseURL: 'https://api.twitter.com/1.1/search/tweets.json',
    params: {
        api_key: process.env.API_KEY,
        api_keysecret: process.env.API_SECRET
    }
})
module.exports = instaciaAxios;