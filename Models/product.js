const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');
const Collection = require('./Collection');
const categories = require('./categories');

const Product = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    Nombre_producto: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    Descripcion_Producto: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    Precio_Produtos: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    id_coleccion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Collection,
            key: 'id'
        }
    },

    id_tipo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: categories,
            key: 'id_tipo'
        }
    },

    status: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'Activo'
    },
},
 {
    tableName: 'Producto',
    timestamps: false,
 }
);


Product.belongsTo(Collection,{foreignKey: 'id_coleccion',  as: 'coleccion'});
Product.belongsTo(categories, {foreignKey: 'id_tipo',  as: 'tipo'});


module.exports  = Product;

