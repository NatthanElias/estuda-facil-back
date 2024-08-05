const { pool } = require('../config')
const Usuario = require('../entities/Usuario')

const autenticaUsuarioDB = async (body) => {
    try {           
        const { apelido, senha } = body
        const results = await pool.query(`SELECT * FROM usuarios WHERE apelido = $1 AND senha = $2`,
        [apelido, senha]);
        
        if (results.rowCount == 0) {
            throw "Apelido ou Senha inválidos";
        }
        const usuario = results.rows[0];
        return new Usuario(usuario.email, usuario.apelido, usuario.tipo, usuario.telefone, usuario.nome);
    } catch (err) {
        throw "Erro ao autenticar o usuário: " + err;
    }    
}

module.exports = {
    autenticaUsuarioDB
}