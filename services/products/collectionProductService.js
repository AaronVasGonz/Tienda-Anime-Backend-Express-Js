const ProductService = require('./productService');

class CollectionProductService extends ProductService {

    constructor() {
        super();
    }

    getProductsByCollection(id_collection) {
        try {
            return this.productRepository.getProductsByCollection(id_collection);
        } catch (error) {
            console.log(error);
            throw new Error("Error getting products by collection");
        }
    }
} 

module.exports = CollectionProductService;