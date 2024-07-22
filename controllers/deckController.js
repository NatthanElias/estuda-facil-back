const { getDecksDB, addDeckDB, updateDeckDB,
    deleteDeckDB, getDeckPorCodigoDB } = require('../usecases/deckUseCases');

const getDecks = async (request, response) => {
    await getDecksDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os decks: ' + err
        }));
}

const addDeck = async (request, response) => {
    await addDeckDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Deck criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateDeck = async (request, response) => {
    await updateDeckDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Deck alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteDeck = async (request, response) => {
    await deleteDeckDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getDeckPorCodigo = async (request, response) => {
    await getDeckPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
    getDecks, addDeck, updateDeck, deleteDeck, getDeckPorCodigo
};