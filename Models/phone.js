const { DataTypes } = require('sequelize');

const sequelize = require('../config/sequelizeConfig');

const User = require('./user');

const Phone = sequelize.define('Telefono', {
    id: {
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

    Numero: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
},{
    tableName: 'Telefono',
    timestamps: false
}
);

Phone.belongsTo(User, { foreignKey: 'id_usuario' , as: 'user' });


module.exports = Phone;

