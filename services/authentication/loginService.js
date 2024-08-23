

class LoginService {
    constructor(loginRepository, loginRoleRepository) {
        this.loginRepository = loginRepository;
        this.loginRoleRepository = loginRoleRepository;
    }

    async verifyUser(email) {
        try {
            return await this.loginRepository.verifyUser(email);

        } catch (error) {
            console.log(error);
            throw new Error(`Error while verifying user: ${error.message}`);
        }
    }

    async getUserRoles(userId) {
        try {
            return await this.loginRoleRepository.getUserRoles(userId);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while getting user roles: ${error.message}`);
        }
    }

}

module.exports = LoginService;