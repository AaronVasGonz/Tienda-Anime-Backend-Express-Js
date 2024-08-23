const {DataTypes} = require('sequelize');

const sequelize = require('../config/sequelizeConfig');

const Provider = require('./provider');

const Product = require('./product');


const ProductProvides = sequelize.define('Producto_Proovedor', {

    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Product,
            key: 'id'
        }
    },

    id_proovedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Provider,
            key: 'id'
        }
    }
},
{
    tableName: 'Producto_Proovedor',
    timestamps: false
});

ProductProvides.belongsTo(Provider, {foreignKey: 'id_proovedor'});
ProductProvides.belongsTo(Product, {foreignKey: 'id_producto'});

module.exports = ProductProvides;

