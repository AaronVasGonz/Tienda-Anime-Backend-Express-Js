
const Provider = require('../Models/provider');

class providerRepository {
    async getProviders()  {
        try {
            return await Provider.findAll({ attributes: ['id', 'Nombre_Proovedor', 'Numero_Proovedor', 'Direccion_Proovedor', 'correo', 'status_Proovedor'] });
        } catch (error) {
            console.log(error);
        }
    }

    async getProviderById  (id)  {
        try {
            return await Provider.findOne({ where: { id: id } });
        } catch (error) {
            console.log(error);
        }
    }

    async saveProvider (name, description, number, email, address, status)  {
        try {
            return await Provider.create({ Nombre_Proovedor: name, Descripcion: description, Numero_Proovedor: number, Direccion_Proovedor: address, correo: email, status_Proovedor: status });
        } catch (error) {
            console.log(error);
        }
    }


    async updateProvider  (id, name, description, number, email, address, status)  {
        try {
            return await Provider.update({ Nombre_Proovedor: name, Descripcion: description, Numero_Proovedor: number, Direccion_Proovedor: address, correo: email, status_Proovedor: status }, { where: { id: id } });
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProvider  (id)  {
        try {
            return await Provider.update({ status_Proovedor: 'Inactivo' }, { where: { id: id } });
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = providerRepository;