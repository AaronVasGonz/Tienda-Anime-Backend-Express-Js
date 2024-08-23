const RoleRepository = require("./roleRepository");
const Role = require("../Models/role");
class LoginRoleRepository extends RoleRepository {

    constructor() {
        super();
    }

    async getUserRoles(userId) {

        let roleUser = 'USER';
        let roleAdmin = null;
        try {
            const userRoles = await Role.findAll({ where: { id_Usuario: userId } });
            if (userRoles.length === 1) {

                roleUser = userRoles[0].Rol;
            }
            else if (userRoles.length > 1) {
                roleUser = userRoles[0].Rol;
                roleAdmin = userRoles[1].Rol;

            } else {
                roleUser = 'USER';
            }
            return { roleUser, roleAdmin };

        } catch (error) {
            console.log(error);
        }
    }

    async getLoginRole(id) {
        try {
            return await Role.findOne({ where: { id_Usuario: id } });
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = LoginRoleRepository;