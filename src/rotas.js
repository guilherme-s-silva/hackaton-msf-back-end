const express = require('express');
const twitterQuery = require('./controladores/twitter');

const rotas = express();

rotas.get('/geral/:id', twitterQuery);

module.exports = rotas;