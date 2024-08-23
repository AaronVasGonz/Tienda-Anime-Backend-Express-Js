const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const ClotheInventory = require('./clotheInventory');

const Size = require('./size');


const ClotheSizing = sequelize.define('Inventario_Ropa_Talla', {
    id_Inventario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: ClotheInventory,
            key: 'id'
        }
    },

    id_talla: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Size,
            key: 'id'
        }
    },
},{
    timestamps: false,
    tableName: 'Inventario_Ropa_Talla'
});

ClotheSizing.belongsTo(ClotheInventory, { foreignKey: 'id_Inventario' });
ClotheSizing.belongsTo(Size, { foreignKey: 'id_talla' });

module.exports = ClotheSizing;

