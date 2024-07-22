const { pool } = require('../config');
const Card = require('../entities/Card');

const getCardsDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT c.codigo, c.pergunta, c.resposta, c.deck_id, d.nome as deck_nome
                                           FROM cards c
                                           JOIN decks d ON c.deck_id = d.codigo
                                           ORDER BY c.codigo`);
        return rows.map((card) => new Card(card.codigo, card.pergunta, card.resposta, card.deck_id, card.deck_nome));
    } catch (err) {
        throw "Erro: " + err;
    }
};

const addCardDB = async (body) => {
    try {
        const { pergunta, resposta, deck_id } = body;

        if (!deck_id) {
            throw "ID do Deck não informado";
        }

        const deck = await pool.query('SELECT * FROM decks WHERE codigo = $1', [deck_id]);

        if (deck.rowCount === 0) {
            throw "ID do Deck inválido";
        }

        const results = await pool.query(`INSERT INTO cards (pergunta, resposta, deck_id) 
                                          VALUES ($1, $2, $3)
                                          RETURNING codigo, pergunta, resposta, deck_id`,
                                          [pergunta, resposta, deck_id]);

        const card = results.rows[0];
        return new Card(card.codigo, card.pergunta, card.resposta, card.deck_id, "");
    } catch (err) {
        throw "Erro ao inserir o card: " + err;
    }
};

const updateCardDB = async (body) => {
    try {
        const { codigo, pergunta, resposta, deck_id } = body;
        const results = await pool.query(`UPDATE cards SET pergunta = $2, resposta = $3, deck_id = $4 
                                          WHERE codigo = $1 
                                          RETURNING codigo, pergunta, resposta, deck_id`,
                                          [codigo, pergunta, resposta, deck_id]);
        if (results.rowCount === 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const card = results.rows[0];
        return new Card(card.codigo, card.pergunta, card.resposta, card.deck_id, "");
    } catch (err) {
        throw "Erro ao alterar o card: " + err;
    }
};

const deleteCardDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM cards WHERE codigo = $1`, [codigo]);
        if (results.rowCount === 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Card removido com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover o card: " + err;
    }
};

const getCardPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT c.codigo, c.pergunta, c.resposta, c.deck_id, d.nome as deck_nome
                                          FROM cards c
                                          JOIN decks d ON c.deck_id = d.codigo
                                          WHERE c.codigo = $1`,
                                          [codigo]);
        if (results.rowCount === 0) {
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const card = results.rows[0];
            return new Card(card.codigo, card.pergunta, card.resposta, card.deck_id, card.deck_nome);
        }
    } catch (err) {
        throw "Erro ao recuperar o card: " + err;
    }
};

module.exports = {
    getCardsDB, addCardDB, updateCardDB, deleteCardDB, getCardPorCodigoDB
};