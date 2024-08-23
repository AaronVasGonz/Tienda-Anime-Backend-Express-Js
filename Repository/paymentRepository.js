const sequelize = require('../config/sequelizeConfig');
class PaymentRepository {

    async savePayment(userId, productsId, holderName, id, address, date, total, quintities, prices) {
        try {
            await sequelize.query('CALL Insertar_Factura_Pago(?,?,?,?,?,?,?,?,?, @New_Factura_Id);', {
                replacements: [userId, productsId, holderName, id, address, date, total, quintities, prices],
                type: sequelize.QueryTypes.RAW
            });

            const results = await sequelize.query('SELECT @New_Factura_Id AS id_factura;', {
                type: sequelize.QueryTypes.SELECT
            });

            if (results.length === 0) {
                throw new Error('No se pudo obtener el ID de la nueva factura');
            }
            const facturaId = results[0].id_factura;   
            return { results: results[0], id_factura: facturaId };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = PaymentRepository;