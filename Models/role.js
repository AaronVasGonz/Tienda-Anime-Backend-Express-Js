const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const User = require('./user');

const Role = sequelize.define('Rol', {
    id_rol: {
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

    status: {
        type: DataTypes.STRING(8),
        allowNull: false
    },

    Rol:{
        type: DataTypes.STRING(11),
    }
},{
    tableName: 'Rol',
    timestamps: false
});

 Role.belongsTo(User, { foreignKey: 'id_usuario', as : 'user' });


 module.exports  = Role