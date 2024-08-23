
class ProductAdderService {
    constructor(productRepository, storageService, categoryService) {
        this.productRepository = productRepository;
        this.storageService = storageService;
        this.categoryService = categoryService;
    }

    async addProduct(formData, images, imagesUrl) {
        try {
            await this.addProductData(formData, images, imagesUrl);
            return { success: true, message: 'Product has been added successfully' };
        } catch (error) {
            this.storageService.deleteFilesFromFirebase(imagesUrl, "products");
            throw new Error(`Failed to add product: ${error.message}`);
        }
    }
    async addProductData(formData, images, imagesUrl) {
        const { category } = formData;
        if (category === '1') {
            await this.addClothingProduct(formData, images, imagesUrl);
        } else {
            await this.addGeneralProduct(formData, images, imagesUrl);
        }
    }

    async addGeneralProduct(formData, images, imagesUrl) {
        const { Nombre_Producto, Descripcion, Precio, Cantidad, category, provider, collection, status } = formData;

        let categoryName = await this.categoryService.getCategoryNameById(category);

        categoryName = categoryName.dataValues.Detalle;

        if (categoryName === "Ropas") {
            this.storageService.deleteFilesFromFirebase(imagesUrl, "products");
            throw new Error(`Category ${categoryName} does not support general products`);
        }
        console.log("aqui 3")
        const result = await this.productRepository.saveProduct(Nombre_Producto, Descripcion, Precio, collection, category, provider, Cantidad, images, imagesUrl, status);
        if (!result) {

            throw new Error('Error adding product');
        }
    }

    async addClothingProduct(formData, images, imagesUrl) {
        const { Nombre_Producto, Descripcion, Precio, collection, category, provider, Cantidad, gender, status, sizes } = formData;
        const sizesList = sizes.join(',');

        const result = await this.productRepository.saveClothingProduct(Nombre_Producto, Descripcion, Precio, collection, category, provider, Cantidad, gender, sizesList, status, images, imagesUrl);

        if (!result) {
            throw new Error('Error adding clothing product');
        }
    }
}

module.exports = ProductAdderService;
