const ValorationRepository = require('../Repository/valorationRepository');
class ValorationService {
    constructor() {
        this.valorationRepository = new ValorationRepository();
    }

    async getValorationByProduct(id) {
        try {
            return await this.valorationRepository.getValorationsByProduct(id);
        } catch (error) {
            console.log(error);
            throw new Error("Error while getting valoration by product");
        }
    }    
}

module.exports = ValorationService;


