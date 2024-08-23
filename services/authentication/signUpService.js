
class SignUpService {
    constructor(signUpRepository) {
        this.signUpRepository = signUpRepository;
    }

    async signUp(nombre, apellido, apellido2, email, password) {
        try {
            return await this.signUpRepository.insertUser(nombre, apellido, apellido2, email, password);
        } catch (error) {
            console.error('Error while creating user:', error);
            throw error;
        }
    }
}

module.exports = SignUpService;