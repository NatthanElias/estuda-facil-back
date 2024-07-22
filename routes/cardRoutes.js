const { Router } = require('express');

const { getCards, addCard, updateCard,
    deleteCard, getCardPorCodigo } = require('../controllers/cardController');

const cardRoutes = new Router();

cardRoutes.get('/cards', getCards);
cardRoutes.post('/cards', addCard);
cardRoutes.put('/cards', updateCard);

cardRoutes.delete('/cards/:codigo', deleteCard);
cardRoutes.get('/cards/:codigo', getCardPorCodigo);

module.exports = { cardRoutes };