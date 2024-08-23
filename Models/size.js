const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Size = sequelize.define('Talla', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    Detalle_Talla:{
        type: DataTypes.STRING(8),
        allowNull: false
    },
    Detalle_Num: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    tableName: 'Talla',
    timestamps:false
});


module.exports = Size;

