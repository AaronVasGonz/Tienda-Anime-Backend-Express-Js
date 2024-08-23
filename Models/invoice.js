const { DataTypes } = require('sequelize');

const sequelize = require('../config/sequelizeConfig');

const User = require('./user');


const Invoice = sequelize.define('Factura', {

    id_factura: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },

    titular: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    cedula: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    direccion_pago: {
        type: DataTypes.STRING(500),
        allowNull: false
    },

    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },

    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

},{
    tableName: 'Factura',
    timestamps: false
});

Invoice.belongsTo(User, {foreignKey: 'id_usuario'});

module.exports = Invoice;

