const ProductService = require("./productService");
class PublicProductService extends ProductService {
    constructor() {
        super();
    }
    async getPublicProducts() {

        try {
            return await this.productRepository.getPublicProducts();
        } catch (error) {
            console.log(error);
            throw new Error("Error while getting public products");
        }
    }

    async getPublicProduct(id) {
        try {
            return await this.productRepository.getPublicProductById(id);
        } catch (error) {
            console.log(error);
            throw new Error("Error while getting public product");
        }
    }

}

module.exports = PublicProductService