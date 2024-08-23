const {DataTypes} = require('sequelize');
const sequelize = require('../config/sequelizeConfig');


const Invoice = require('./invoice');
const Product = require('./product');

const InvoiceDetails = sequelize.define('Detalle_Factura', {
    id_detallefactura:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    id_factura: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Invoice,
            key: 'id_factura'
        }
    },

    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },

    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    precio: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }

},{
    tableName: 'Detalle_Factura',
    timestamps: false
});

InvoiceDetails.belongsTo(Invoice, {foreignKey: 'id_factura'});
InvoiceDetails.belongsTo(Product, {foreignKey: 'id_producto'});

module.exports = InvoiceDetails;