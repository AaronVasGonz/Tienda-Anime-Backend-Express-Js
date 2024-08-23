const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');


const categories = sequelize.define('Tipo', {
    id_tipo:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Detalle: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(8),
        allowNull: false
    }
}, {
    tableName: 'Tipo',
    timestamps: false
});


module.exports  = categories;
