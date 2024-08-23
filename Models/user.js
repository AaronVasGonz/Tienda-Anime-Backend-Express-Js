const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');



const User = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
        Nombre: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        Apellido: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        Apellido2: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        correo: {
            type: DataTypes.STRING(250),
            allowNull: false
        },

        password: {
            type: DataTypes.STRING(60),
            allowNull: false
        }
    },

    {
        tableName: 'Usuario',
        timestamps: false
    });

  


module.exports  = User;
