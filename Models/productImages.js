const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');


const  Product  = require('./product');

const ProductImages = sequelize.define('Imagen', {
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

    imagen: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'Imagen',
    timestamps: false
});

ProductImages.belongsTo(Product, { foreignKey: 'id_producto', as: 'Product' });


module.exports  = ProductImages