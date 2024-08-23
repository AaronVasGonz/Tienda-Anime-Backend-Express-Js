const { QueryTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');
const { deleteFilePath, deleteFileFromFirebase } = require('../utils/actions');
const User = require('../Models/user');
const Phone = require('../Models/phone');
const Address = require('../Models/address');
const Role = require('../Models/role');

class UserDetailsRepository {
    constructor(storageService) {
        this.storageService = storageService;
    }

    async getUserDetailsById(id) {
       
        try {
            const results = await sequelize.query(
                'SELECT * FROM DetalleUsuario WHERE id_Usuario = :id LIMIT 1',
                {
                    replacements: { id: id },
                    type: QueryTypes.SELECT
                }
            );
            return results;
        } catch (error) {
            console.error('Error while getting user details:', error);
            throw error;
        }
    }

    async getUserPhoneById(id) {
        try {
            return await Phone.findAll({ where: { id_usuario: id } });
        } catch (error) {
            console.error('Error while getting user phone:', error);
            throw error;
        }
    }

    async getUserAddressById(id) {
        try {
            return await Address.findAll({ where: { id_usuario: id } });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateUserDetails(id, Nombre, Apellido, Apellido2, correo, PhoneData, AddressData, fileName) {
        try {
            // Update the user details in the database
            await sequelize.query(
                'CALL UpdateUserDetails(?, ?, ?, ?, ?, ?, ?, ?, @success)',
                {
                    replacements: [id, Nombre, Apellido, Apellido2, correo, PhoneData, AddressData, fileName],
                    type: QueryTypes.RAW
                }
            );

            //Get the value of @success
            const [results] = await sequelize.query(
                'SELECT @success AS success',
                {
                    type: QueryTypes.SELECT
                }
            );

            const success = results.success;

            return success === 1;

        } catch (error) {
            console.error('Error in updateUserDetails:', error);

            this.storageService.deleteFileFromFirebase(fileName, 'avatar');

        }
        return false;
    }

    async savePhone(phone, userId) {
        try {
            return await Phone.create({ id_usuario: userId, Numero: phone });
        } catch (error) {
            console.log(error);
        }
    }

    async updatePhone(id, phone) {
        try {
            return await Phone.update({ Numero: phone }, { where: { id_usuario: id } });
        } catch (error) {
            console.log(error);
        }
    }

    async saveAddress(id, address) {
        
        try {
            return await Address.create({ id_usuario: id, direccion: address });
        } catch (error) {
            console.log(error);
        }
    }

    async updateAddress(id, address) {
        try {
            return await Address.update({ direccion: address }, { where: { id_usuario: id } });
        } catch (error) {
            console.log(error);
        }
    }

    async getUserOldImage(id) {
        try {
            const results = sequelize.query(
                'SELECT Imagen FROM DetalleUsuario WHERE id_Usuario = :id',
                {
                    replacements: { id: id },
                    type: QueryTypes.SELECT
                }
            );

            return results;

        } catch (error) {
            console.log(error);
        }
    }

    async updatePassword(id, password) {
        try {
            return await User.update({ password: password }, { where: { id: id } });
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAccount(id) {
        try {
            return await Role.update({ status: 'Inactivo' }, { where: { id_usuario: id } });
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = UserDetailsRepository;
