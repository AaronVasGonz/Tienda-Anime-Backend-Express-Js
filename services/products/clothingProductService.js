const ProductService = require("./productService");

class ClothingProductService extends ProductService {

    constructor() {
        super();
    }

    async getClothesProducts() {
        try {
            return await this.productRepository.getClothesProducts();
        } catch (error) {
            console.log(error);
            throw new Error("Cannot obtain clothes products from the service");
        }
    }

    async getClotheById(id) {
        try {
             return await this.productRepository.getClotheById(id);
        } catch (error) {
            console.log(error);
            throw new Error("Cannot obtain clothes products from the service");
        }
    }
}


module.exports = ClothingProductService;