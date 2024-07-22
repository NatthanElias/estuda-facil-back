class Card {
    constructor(codigo, pergunta, resposta, deck_id, deck_nome) {
        this.codigo = codigo;
        this.pergunta = pergunta;
        this.resposta = resposta;
        this.deck_id = deck_id;
        this.deck_nome = deck_nome;
    }
}

module.exports = Card;