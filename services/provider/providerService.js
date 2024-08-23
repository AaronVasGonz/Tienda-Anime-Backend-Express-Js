class ProviderService {

    constructor(providerRepository) {
        this.providerRepository = providerRepository;
    }

    async getProviders() {
        return await this.providerRepository.getProviders();
    }

    async getProviderById(id) {
        return await this.providerRepository.getProviderById(id);
    }
}

module.exports = ProviderService;