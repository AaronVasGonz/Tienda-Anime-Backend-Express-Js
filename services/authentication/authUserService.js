

class AuthUserService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }

    async confirmAccount(email) {
        try {
            const user = await this.roleRepository.confirmEmailById(email);
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getUserRole(id){
        try {
            return await this.roleRepository.getAdminRoleFromDb(id);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while getting user role: ${error.message}`);
        }
    }

    async getAdminRoleById(id){
        try {
            return await this.roleRepository.getAdminRoleFromDb(id);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while getting admin role: ${error.message}`);
        }
    }

}

module.exports = AuthUserService;