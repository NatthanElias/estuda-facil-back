const { Router } = require('express');
const { verificaJWT } = require('../controllers/segurancaController')

const { getDecks, addDeck, updateDeck, deleteDeck, getDeckPorCodigo } = require('../controllers/deckController');

const deckRoutes = new Router();

deckRoutes.get('/decks', getDecks);
deckRoutes.post('/decks', verificaJWT, addDeck);
deckRoutes.put('/decks', verificaJWT, updateDeck);

deckRoutes.delete('/decks/:codigo', verificaJWT, deleteDeck);
deckRoutes.get('/decks/:codigo', getDeckPorCodigo);

module.exports = { deckRoutes };