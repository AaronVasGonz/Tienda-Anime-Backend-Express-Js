// UserRepository.js

const User = require('../Models/user');
const sequelize = require('../config/sequelizeConfig');
const { literal } = require('sequelize');

class UserRepository {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }

    async getUsers() {
        try {
            const users = await User.findAll({
                attributes: [
                    'id',
                    'Nombre',
                    'correo',
                    [literal(`COALESCE(
                        (SELECT MAX(CASE WHEN r.Rol = 'ADMIN' THEN 'Activo' ELSE r.status END)
                         FROM Rol r
                         WHERE r.id_usuario = Usuario.id),
                        'Inactivo'
                    )`), 'status'],
                    [literal(`COALESCE(
                        (SELECT MAX(r.Rol)
                         FROM Rol r
                         WHERE r.id_usuario = Usuario.id AND r.Rol = 'ADMIN'),
                        'USER'
                    )`), 'Rol']
                ],
                raw: true
            });
            return users;
        } catch (error) {
            console.error('Error while getting users:', error);
            throw new Error(`Error while getting users: ${error.message}`);
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await User.findOne({
                where: { correo: email },
            });
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            return user;
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            throw new Error(`Error al obtener el usuario: ${error.message}`);
        }
    }

    async getUserById(id) {
        try {
            const user = await User.findOne({
                attributes: ['id', 'Nombre', 'Apellido', 'Apellido2', 'correo', 'password'],
                where: { id: id },
                raw: true
            });
            if (!user) {
                throw new Error('User not found');
            }
            const roles = await this.roleRepository.getRoles(id);
            user.roles = roles.map(role => role.Rol);
            return user;
        } catch (error) {
            console.error('Error while getting user:', error);
            throw new Error(`Error while getting user: ${error.message}`);
        }
    }

    async checkExistingEmail(email) {
        try {
            const user = await User.findOne({
                where: { correo: email },
                raw: true
            });
            const exists = !!user;
            return {
                exists,
                message: exists ? 'User already exists' : null
            };
        } catch (error) {
            console.error('Error al verificar el correo electrónico:', error);
            throw new Error(`Error al verificar el correo electrónico: ${error.message}`);
        }
    }

    async updateUser(id, nombre, apellido, apellido2, email, roles) {
    
        try {
            const updated = await sequelize.query(
                'UPDATE Usuario SET Nombre = :nombre, Apellido = :apellido, Apellido2 = :apellido2, correo = :email WHERE id = :id',
                { replacements: { id, nombre, apellido, apellido2, email } }
            )

            if (updated[0] === 0) {
                
                return false;
            }
            if (roles) {
                await this.roleRepository.deleteRolesByUserId(id);
                await this.roleRepository.insertRolAdmin(id, roles);
            } else {
                console.log("No hay roles para actualizar");
            }
            return true;
        } catch (error) {
            throw new Error(`Error al actualizar usuario: ${error.message}`);
        }
    }

    async deleteUserAdmin(id) {
        try {
            const user = await User.findOne({ where: { id } });
            if (!user) {
                console.log("Error al inactivar usuario: el usuario no fue encontrado");
                return false;
            }
            await this.roleRepository.inactiveUserById(id);
            return true;
        } catch (error) {
            console.error('Error al borrar usuario:', error);
            throw error;
        }
    }
    
    async insertUserAdmin(nombre, apellido, apellido2, email, password, roles) {
        try {
            const userId = Math.floor(Math.random() * 1000000);
            const user = await User.create({ id: userId, Nombre: nombre, Apellido: apellido, Apellido2: apellido2, correo: email, password: password });
            if (userId) {
                const roleInserted = await this.roleRepository.insertRolAdmin(userId, roles);
                if (!roleInserted) {
                    console.error('Error al insertar el rol del usuario');
                }
            }
            return user;
        } catch (error) {
            console.error('Error al insertar el usuario:', error);
            throw error;
        }
    }
}

module.exports = UserRepository;