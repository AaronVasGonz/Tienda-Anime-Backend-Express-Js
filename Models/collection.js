const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');


const Collection = sequelize.define('Coleccion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    Nombre_Coleccion: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    Descripcion: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    status: {
        type: DataTypes.STRING(8),
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING(255),
        allowNull: false
    }

}, {
    tableName: 'Coleccion',
    timestamps: false
});




module.exports = Collection;