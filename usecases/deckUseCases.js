const { pool } = require('../config');
const Deck = require('../entities/Deck');

const getDecksDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM decks ORDER BY nome');
        return rows.map((deck) => new Deck(deck.codigo, deck.nome, deck.descricao));
    } catch (err) {
        throw "Erro: " + err;
    }
};

const addDeckDB = async (body) => {
    try {
        const { nome, descricao } = body;
        const results = await pool.query(
            `INSERT INTO decks (nome, descricao) VALUES ($1, $2) returning codigo, nome, descricao`,
            [nome, descricao]
        );
        const deck = results.rows[0];
        return new Deck(deck.codigo, deck.nome, deck.descricao);
    } catch (err) {
        throw "Erro ao inserir o deck: " + err;
    }
};

const updateDeckDB = async (body) => {
    try {
        const { codigo, nome, descricao } = body;
        const results = await pool.query(
            `UPDATE decks SET nome = $2, descricao = $3 WHERE codigo = $1 returning codigo, nome, descricao`,
            [codigo, nome, descricao]
        );
        if (results.rowCount === 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const deck = results.rows[0];
        return new Deck(deck.codigo, deck.nome, deck.descricao);
    } catch (err) {
        throw "Erro ao alterar o deck: " + err;
    }
};

const deleteDeckDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM decks WHERE codigo = $1`, [codigo]);
        if (results.rowCount === 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Deck removido com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover o deck: " + err;
    }
};

const getDeckPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM decks WHERE codigo = $1`, [codigo]);
        if (results.rowCount === 0) {
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const deck = results.rows[0];
            return new Deck(deck.codigo, deck.nome, deck.descricao);
        }
    } catch (err) {
        throw "Erro ao recuperar o deck: " + err;
    }
};

module.exports = {
    getDecksDB, addDeckDB, updateDeckDB, deleteDeckDB, getDeckPorCodigoDB
};