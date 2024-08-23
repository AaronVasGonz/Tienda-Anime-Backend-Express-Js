class UserSaveService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async save(nombre, apellido, apellido2, email, password, roles) {
        try {
            return await this.userRepository.insertUserAdmin(nombre, apellido, apellido2, email, password, roles);
        } catch (error) {
            console.error('Error while saving user:', error);
            throw new Error(`Error while saving user: ${error.message}`);
        }
    }
}

module.exports = UserSaveService;