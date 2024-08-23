

const { DataTypes } = require('sequelize');

const sequelize = require('../config/sequelizeConfig');

const Product = require('./product');

const ClotheInventory = sequelize.define('Inventario_Ropa', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },

    Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    Genero: {
        type: DataTypes.STRING(6),
        allowNull: false
    }
}, {
    tableName: 'Inventario_Ropa',
    timestamps: false
});

ClotheInventory.belongsTo(Product, { foreignKey: 'id_producto', as: 'product' });


module.exports = ClotheInventory;

