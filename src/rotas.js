const express = require('express');
const twitterQuery = require('./controladores/twitter')

const rotas = express();

rotas.get('/api/:id', twitterQuery);

module.exports = rotas;