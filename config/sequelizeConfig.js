const { Sequelize } = require('sequelize');

// Configura tu conexión aquí
const sequelize = new Sequelize('Tienda_Anime', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', 
  logging: false,  
});

module.exports = sequelize;