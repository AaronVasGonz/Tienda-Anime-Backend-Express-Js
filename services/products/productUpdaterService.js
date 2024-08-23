

class ProductUpdater  {

    constructor(productRepository, storageService, imageManager) {
        this.productRepository = productRepository; 
        this.imageManager = imageManager;
        this.storageService = storageService;
    } 

     /**
     * Updates a product based on its category and provided data.
     * @param {string} id - The product ID.
     * @param {Object} formData - The product data.
     * @param {Array} textImages - Array of text-based image information.
     * @param {Array} imagesUrl - Array of image URLs.
     * @returns {Object} - Result of the update operation.
     * @throws {Error} - Throws error if the update fails.
     */

    async updateProduct(id, formData, textImages, imagesUrl) {
        const images = this.imageManager.manageImages(textImages, imagesUrl);
        try {

            await this.updateProductData(id, formData, images, imagesUrl);

            return { success: true, message: 'Has been updated successfully' };

        } catch (error) {

            this.storageService.deleteFilesFromFirebase(imagesUrl, "products")
            throw new Error(`Update failed: ${error.message}`);
        }
    }

    async updateProductData(id, formData, images, imagesUrl) {
        const { category } = formData;
        if (category === '1') {
            await this.updateClothingProduct(id, formData, images, imagesUrl);
        } else {
            await this.updateGeneralProduct(id, formData, images, imagesUrl);
        }
    }

    async updateGeneralProduct(id, formData, images, imagesUrl) {
        const { Nombre_Producto, Descripcion, Precio, Cantidad, category, provider, collection, status } = formData;
        try {
            const result = await this.productRepository.updateProduct(id, Nombre_Producto, Descripcion, Precio, Cantidad, category, provider, collection, images, status, imagesUrl);

            if (!result) {
                throw new Error('Error trying to update product');
            }
        } catch (error) {
            this.storageService.deleteFilesFromFirebase(imagesUrl, "products")
            throw new Error(`Update failed: ${error.message}`);
        }
    }

    async updateClothingProduct(id, formData, images, imagesUrl) {
        const { Nombre_Producto, Descripcion, Precio, collection, category, provider, Cantidad, gender, sizes, status } = formData;
        try {
            const sizesStr = Array.isArray(sizes) ? sizes.join(',') : sizes;
            const result = await this.productRepository.updateClothingProduct(id, Nombre_Producto, Descripcion, Precio, collection, category, provider, Cantidad, gender, sizesStr, status, images, imagesUrl);

            if (!result) {
                throw new Error('Error trying to update clothing product');
            }
        } catch (error) {
            this.storageService.deleteFilesFromFirebase(imagesUrl, "products")
            throw new Error(`Update failed: ${error.message}`);
        }
    }

}

module.exports = ProductUpdater