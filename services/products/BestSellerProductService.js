const ProductService = require('./productService');
class BestSellerProductService extends ProductService {
    constructor() {
        super();
    }

    async getBestSellers() {
        try {
            return await this.productRepository.getBestSellers();
        } catch (error) {
            console.log(error);
            throw new Error("Error while getting bestsellers");
        }
    }
}

module.exports = BestSellerProductService;