const User = require('../Models/user');
const Role = require('../Models/role');

class SignUpRepository {
    async insertUser(nombre, apellido, apellido2, email, password) {
        try {
            const user = await User.create({ Nombre: nombre, Apellido: apellido, Apellido2: apellido2, correo: email, password: password });
            const rol = await this.defaultRole(user.id);
            return { user, rol };
        } catch (error) {
            console.error('Error while inserting user:', error);
            throw error; 
        }
    }

    async defaultRole(userId) {
        const status = "Inactivo";
        const Rol = "USER";
        try {
            return await Role.create({ id_usuario: userId, status: status, Rol: Rol });
        } catch (error) {
            console.error('Error while creating default role:', error);
            throw error; 
        }
    }
}

module.exports = SignUpRepository;