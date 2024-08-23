const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const User = require('./user');

const Product = require('./product');


const Valoration = sequelize.define('Valoracion', {
     id_valoracion : {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false
     },

     id_usuario :{
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
             model: User,
             key: 'id'
         }
     },

     id_producto :{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Product,
            key: 'id'
        }
     },

     puntuacion: {
         type: DataTypes.INTEGER,
         allowNull: false
     },

     comentario: {
         type: DataTypes.STRING(255),
         allowNull: false
     }
},{
    tableName: 'Valoracion',
    timestamps: false
});

Valoration.belongsTo(User, {foreignKey: 'id_usuario', as: 'user'});

Valoration.belongsTo(Product, {foreignKey: 'id_producto', as: 'product'});


module.exports  = Valoration;
