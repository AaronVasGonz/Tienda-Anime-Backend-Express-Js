class UserUpdateService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async update(id, nombre, apellido, apellido2, email, roles) {

        try {
            return await this.userRepository.updateUser(id, nombre, apellido, apellido2, email, roles);
        } catch (error) {
            console.error('Error while updating user:', error);
            throw new Error(`Error while updating user: ${error.message}`);
        }
    }
}

module.exports = UserUpdateService;