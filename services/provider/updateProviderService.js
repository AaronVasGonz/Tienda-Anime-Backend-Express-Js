
class ProviderUpdateService {
    constructor(providerRepository) {
        this.providerRepository = providerRepository;
    }

    async update(id, name, description, number, email, address, status) {
        try {
            return await this.providerRepository.updateProvider(id, name, description, number, email, address, status);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while updating provider: ${error.message}`);
        }
    }
}
module.exports = ProviderUpdateService;