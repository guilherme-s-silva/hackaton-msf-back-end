const express = require('express');
const twitterQuery = require('./controladores/twitter');

const rotas = express();

/* rotas.get('/tweets/:id', twitterQuery.listarTweets);
rotas.get('/membros/:id', twitterQuery.listarMembros); */

rotas.get('/teste/:id', twitterQuery);

module.exports = rotas;