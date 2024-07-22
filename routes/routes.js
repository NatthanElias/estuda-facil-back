const { Router } = require('express');

const { deckRoutes } = require('./deckRoutes');
const { cardRoutes } = require('./cardRoutes');

const rotas = new Router();

rotas.use(deckRoutes);
rotas.use(cardRoutes);

module.exports = rotas;