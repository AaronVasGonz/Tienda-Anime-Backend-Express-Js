

class ProductDeleterService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    
    async deleteProduct(id) {
        const result = await this.productRepository.deleteProduct(id);
        if (!result) {
            throw new Error('Error deleting product');
        }
    }
}

module.exports = ProductDeleterService;