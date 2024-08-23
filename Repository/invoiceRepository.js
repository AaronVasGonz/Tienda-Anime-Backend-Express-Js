const sequelize = require('../config/sequelizeConfig');

class InvoiceRepository {

    async getInvoice(id) {
        try {
            return await sequelize.query('SELECT * FROM ObtenerFactura WHERE id_factura = ?', { replacements: [id], type: sequelize.QueryTypes.SELECT })
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}
module.exports = InvoiceRepository;

