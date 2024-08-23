
class UserDeleteService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async delete(id) {
        try {
            return await this.userRepository.deleteUserAdmin(id);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while deleting user: ${error.message}`);
        }
    }
}

module.exports = UserDeleteService;