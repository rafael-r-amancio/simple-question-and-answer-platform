const Sequelize = require('sequelize');
const connection = require('./server');

const Perguntas = connection.define('perguntas', { // perguntas será o nome da tabela criada no banco
    titulo: {
        type: Sequelize.STRING, // String para textos curtos 
        allowNull: false // Serve para não aceitar valores nulos e vazios
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}); // Aqui ainda tem um segundo objeto que é opcional

Perguntas.sync({ force: false }) // Não ficara tentando criar tabelas que já estão criadas com false
    .then(() => console.log("Tabela pergunta criada com sucesso"))
 
module.exports = Perguntas;