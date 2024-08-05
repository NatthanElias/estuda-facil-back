const { Router } = require('express');

const { deckRoutes } = require('./deckRoutes');
const { cardRoutes } = require('./cardRoutes');
const { login } = require('../controllers/segurancaController');

const rotas = new Router();

rotas.route("/login").post(login) 

rotas.use(deckRoutes);
rotas.use(cardRoutes);

module.exports = rotas;