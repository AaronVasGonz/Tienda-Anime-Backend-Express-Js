

const sequelize = require('../config/sequelizeConfig');

class ValorationRepository {

    async getValorationsByProduct(id) {
        try {
            const result = await sequelize.query('SELECT AVG(puntuacion) AS Valoration FROM valoracion WHERE id_producto = ?', { replacements: [id], type: sequelize.QueryTypes.SELECT });
            return result;
        } catch (error) {
            console.error('Error fetching average valoration:', error);
            throw error;
        }
    };
}

module.exports = ValorationRepository;