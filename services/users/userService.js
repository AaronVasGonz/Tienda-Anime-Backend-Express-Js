
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getUsers() {
        try {
            ;
            return await this.userRepository.getUsers()
        } catch (error) {
            console.log(error);
            throw new Error(`Error while getting users: ${error.message}`);
        }
    }

    async getUserByEmail(email) {
        try {
            return await this.userRepository.getUserByEmail(email);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while getting user: ${error.message}`);
        }
    }

    async getUserById(id) {
        try {
            return await this.userRepository.getUserById(id);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while getting user: ${error.message}`);
        }
    }

    async checkExistingEmail(email) {
        try {
            return await this.userRepository.checkExistingEmail(email);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while checking email: ${error.message}`);
        }
    }
}

module.exports = UserService