const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Provider = sequelize.define('Proovedor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Nombre_Proovedor: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    Descripcion: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    Numero_Proovedor: {
        type: DataTypes.STRING(20),
        allowNull: true
    },

    Direccion_Proovedor: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    status_Proovedor: {
        type: DataTypes.STRING(8),
        allowNull: false
    },

    correo: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'Proovedor'
});


module.exports  = Provider;

