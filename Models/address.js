const { DataTypes } = require('sequelize');
 const sequelize = require('../config/sequelizeConfig');

 const User = require('./user');

 const Address = sequelize.define('Direccion', {
    id_direccion: {
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
    direccion: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
 },
{
    tableName: 'Direccion',
    timestamps: false
});

Address.belongsTo(User, {foreignKey: 'id_usuario', as : 'user'});

module.exports  = Address;

