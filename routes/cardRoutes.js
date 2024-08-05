const { Router } = require('express');

const { getCards, addCard, updateCard,
    deleteCard, getCardPorCodigo } = require('../controllers/cardController');

    
const { verificaJWT } = require('../controllers/segurancaController');

const cardRoutes = new Router();

cardRoutes.get('/cards', getCards);
cardRoutes.post('/cards', verificaJWT, addCard);
cardRoutes.put('/cards', verificaJWT, updateCard);

cardRoutes.delete('/cards/:codigo', verificaJWT, deleteCard);
cardRoutes.get('/cards/:codigo', getCardPorCodigo);

module.exports = { cardRoutes };