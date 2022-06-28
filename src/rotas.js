const express = require('express');
const rotasTwitter = require('./controladores/rotasTwitter');

const rotas = express();

rotas.get('/api/:id', rotasTwitter)

module.exports = rotas;