const ProductRepository = require('../../Repository/productRepository');

const ProductDeleterService = require('./ProductDeleterService');
class ProductService {
    constructor() {
        this.productRepository = new ProductRepository();
        this.ProductDeleterService = new ProductDeleterService(this.productRepository);
    }

    async getAllProductsAdmin() {
        try {
            return await this.productRepository.getAllProductsAdmin();
        } catch (error) {
            console.log("Error in the service while getting all products for admin", error);
            throw new Error("Cannot obtain all products for admin from the service");
        }
    }

    async getProductByIdAdmin(id) {
        try {

            const product = await this.productRepository.getProductById(id);

            if (!product) throw new Error("Product not found");

            return { product };

        } catch (error) {
            console.error("Error in ProductService:", error);
            throw new Error("Error retrieving product");
        }
    }

    async getImagesByProductId(id) {
        try {
            const images = await this.productRepository.getProductImagesById(id);
            if (!images) throw new Error("Product images not found");

            return images;

        } catch (error) {
            console.error("Error in ProductService:", error);
            throw new Error("Error retrieving product images");
        } 
    }
    
}


module.exports = ProductService