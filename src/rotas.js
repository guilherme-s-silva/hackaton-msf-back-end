const express = require('express');
const twitterQuery = require('./controladores/twitter');

const rotas = express();

rotas.get('/geral/', twitterQuery.tweetsGerais);
rotas.get('/filtro/:categoria', twitterQuery.filtroTweets);
rotas.get('/membros', twitterQuery.previewMembros);
rotas.get('/busca/:termo', twitterQuery.buscaPorTermo)
rotas.get('/filtro/:categoria/:start/:end', twitterQuery.filtroTweetsData)

module.exports = rotas;