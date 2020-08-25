const Sequelize = require('sequelize');

// Crie o banco primeiro para se conectar
const connection = new Sequelize('guiaperguntas', 'root', '#Selminha220864', {
    hots: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;