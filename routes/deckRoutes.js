const { Router } = require('express');

const { getDecks, addDeck, updateDeck, deleteDeck, getDeckPorCodigo } = require('../controllers/deckController');

const deckRoutes = new Router();

deckRoutes.get('/decks', getDecks);
deckRoutes.post('/decks', addDeck);
deckRoutes.put('/decks', updateDeck);

deckRoutes.delete('/decks/:codigo', deleteDeck);
deckRoutes.get('/decks/:codigo', getDeckPorCodigo);

module.exports = { deckRoutes };