const { deleteMultipleFiles, deleteFilesFromFirebase } = require('../utils/actions');
const { path } = require('path');
const sequelize = require('../config/sequelizeConfig');


class SizesRepository {
    async getSizes() {
        try {
            return await sequelize.query('select *from Vista_Talla', { type: sequelize.QueryTypes.SELECT });
        } catch (error) {
            console.log(error);
        }
    }
    async getSizesById(id) {
        try {
            return await sequelize.query('select Tallas from Vista_Productos_Ropa_Talla where Id = ?', { replacements: [id], type: sequelize.QueryTypes.SELECT });
        } catch (error) {
            console.log(error);
        }
    }

}

 module.exports = SizesRepository;


