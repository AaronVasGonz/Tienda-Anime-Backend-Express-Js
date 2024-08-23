class ProviderDeleteService {
    constructor(providerRepository) {
        this.providerRepository = providerRepository;
    }

    async delete(id) {
        try {
            return await this.providerRepository.deleteProvider(id);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while deleting provider: ${error.message}`);
        }
    }
}

module.exports = ProviderDeleteService;