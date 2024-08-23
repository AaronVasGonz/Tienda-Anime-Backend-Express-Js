class ProviderSaveService {
    constructor(providerRepository) {
        this.providerRepository = providerRepository;
    }

    async save(name, description, number, email, address, status) {
        try {
            return await this.providerRepository.saveProvider(name, description, number, email, address, status);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while saving provider: ${error.message}`);
        }
    }
}

module.exports = ProviderSaveService;