const express = require('express');
const twitterQuery = require('./controladores/twitter');

const rotas = express();

rotas.get('/geral/', twitterQuery.tweetsGerais);
rotas.get('/filtro/:categoria', twitterQuery.filtroTweets)

module.exports = rotas;