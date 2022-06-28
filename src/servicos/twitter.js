const axios = require('axios');

const instaciaAxios = axios.create({
    baseURL: 'https://api.twitter.com',
    params: {
        api_key: process.env.API_KEY,
        api_keysecret: process.env.API_SECRET
    },
    headers: {
        Authorization: 'Bearer ' + 'AAAAAAAAAAAAAAAAAAAAAJOdeAEAAAAAGanq%2BtBY9sv4khJYfeftry3%2BsmM%3DAzlW4QJGgyfSKMgHN3TiJbWUvMMy7UDpyvh0Zgsn2W4tqPmAth'
    }
})

module.exports = instaciaAxios;