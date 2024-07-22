const { getCardsDB, addCardDB, updateCardDB,
    deleteCardDB, getCardPorCodigoDB } = require('../usecases/cardUseCases');

const getCards = async (request, response) => {
    await getCardsDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os cards: ' + err
        }));
}

const addCard = async (request, response) => {
    await addCardDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Card criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateCard = async (request, response) => {
    await updateCardDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Card alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteCard = async (request, response) => {
    await deleteCardDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getCardPorCodigo = async (request, response) => {
    await getCardPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
    getCards, addCard, updateCard, deleteCard, getCardPorCodigo
};