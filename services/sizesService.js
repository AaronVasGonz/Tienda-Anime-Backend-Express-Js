const SizeRepository = require('../Repository/sizesRepository');
class SizesService {

    constructor() {
        this.sizeRepository = new SizeRepository();
    }
    async getSizes() {
        try {
            return await this.sizeRepository.getSizes();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getSizeById(id) {
        try {
            return await this.sizeRepository.getSizesById(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = SizesService;