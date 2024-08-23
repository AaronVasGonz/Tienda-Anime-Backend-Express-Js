// RoleRepository.js
const Role = require('../Models/role');

class RoleRepository {
    async getRoles(id) {
        try {
            return await Role.findAll({ where: { id_usuario: id }, raw: true });
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async getAdminRoleFromDb(id) {
        try {
            const role = await Role.findOne({
                where: {
                    id_usuario: id,
                    Rol: 'ADMIN'
                },
                raw: true
            });
            return role || null;
        } catch (error) {
            console.error('Error while getting admin role:', error);
            throw new Error(`Error while getting admin role: ${error.message}`);
        }
    }

    async getUserRoleFromDb(id) {
        try {
            const role = await Role.findOne({
                where: {
                    id_usuario: id,
                    Rol: 'USER'
                },
                raw: true
            });
            return role || null;
        } catch (error) {
            console.error('Error al obtener el rol de usuario:', error);
            throw new Error(`Error al obtener el rol de usuario: ${error.message}`);
        }
    }

    async insertRolAdmin(idUser, roles) {
        try {
            if (Array.isArray(roles) && roles.length === 0) {
                await Role.create({ id_usuario: idUser, status: 'Activo', Rol: 'USER' });
                return true;
            } else if (Array.isArray(roles)) {
                const defaultRole = 'USER';
                roles.unshift(defaultRole);
                for (const rol of roles) {
                    await Role.create({ id_usuario: idUser, status: 'Activo', Rol: rol });
                }
                return true;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async confirmEmailById(id) {
        try {
            return await Role.update({ status: 'Activo' }, { where: { id_usuario: id } });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    async inactiveUserById(id) {
        try {
            return await Role.update({ status: 'Inactivo' }, { where: { id_usuario: id } });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteRolesByUserId(id) {
        try {
            return await Role.destroy({ where: { id_usuario: id } });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

   
}

module.exports = RoleRepository;
