
class ProductController {
    constructor(
        productService,
        productUpdaterService,
        clothingProductService,
        sizesService,
        collectionProductService,
        bestSellerProductService,
        valorationService,
        publicProductService,
        storageService,
        productRepository,
        imageManager,
        productAdderService,
        productDeleterService
    ) {
        this.productService = productService;
        this.productUpdaterService = productUpdaterService;
        this.clothingProductService = clothingProductService;
        this.sizesService = sizesService;
        this.collectionProductService = collectionProductService;
        this.bestSellerProductService = bestSellerProductService;
        this.valorationService = valorationService;
        this.publicProductService = publicProductService;
        this.storageService = storageService;
        this.productRepository = productRepository;
        this.imageManager = imageManager;
        this.productAdderService = productAdderService;
        this.productDeleterService = productDeleterService;
    }

    getProducts = async (req, res) => {
        try {
            const result = await this.productService.getAllProductsAdmin();
            return res.status(200).json({ products: result });
        } catch (error) {
            console.log("Error in GetProducts:", error);
            res.status(500).json({ error: 'Server Error' });
        }
    };

    getProduct = async (req, res) => {
        const { id } = req.params;
        try {
            const { product } = await this.productService.getProductByIdAdmin(id);
            if (!product) return res.status(404).json({ error: 'Product does not exist' });

            const images = await this.productService.getImagesByProductId(id);
            if (!images || images.length === 0) return res.status(404).json({ error: 'Product does not have images' });

            const result = { product, images };
            return res.status(200).json({ product: result });

        } catch (error) {
            res.status(500).json({ error: 'Error while getting product' });
            console.error(error);
        }
    }

    addProduct = async (req, res) => {

        const formData = JSON.parse(req.body.data);
        const images = req.fileUrls.join(',');
        const imagesUrl = req.fileUrls;
        formData.sizes = req.body.selectedSizes;

        try {
            const result = await this.productAdderService.addProduct(formData, images, imagesUrl);
            if (!result) return res.status(500).json({ error: 'Insert error' });

            return res.status(200).json({ message: 'Product was added successfully' });

        } catch (error) {
            
            res.status(500).json({ error: 'Error while adding product' });
        }
    };

    updateProduct = async (req, res) => {
        const { id } = req.params;
        const formData = JSON.parse(req.body.data);
        const textImages = req.body.textImages;
        const imagesUrl = req.fileUrls;

        formData.sizes = req.body.selectedSizes;

        try {
            const result = await this.productUpdaterService.updateProduct(id, formData, textImages, imagesUrl);
            if (!result) return res.status(500).json({ error: 'Update error' });

            res.status(200).json({ message: 'Product was updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Update error' });
            console.error(error);
        }
    }

    deleteProduct = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.productDeleterService.deleteProduct(id);
            if (!result) return res.status(500).json({ error: 'Delete error' });

            res.status(200).json({ message: 'Product was deleted successfully' });
        } catch (error) {
            console.log(error);
        }
    }

    getClothes = async (req, res) => {
        try {
            const result = await this.clothingProductService.getClothesProducts();
            if (!result) {
                res.status(404).json({ error: 'Products not found' });
            }

            res.status(200).json({ clothes: result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server Error' });
        }
    }

    getClothe = async (req, res) => {
        const { id } = req.params;
        try {

            const result = await this.clothingProductService.getClotheById(id);
            if (result.length === 0) {
                return res.status(404).json({ error: 'No se encontraron productos' });
            }
            return res.status(200).json({ product: result });

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server Error' });
        }
    }

    getSizes = async (req, res) => {
        try {
            const result = await this.sizesService.getSizes();
            if (!result) return res.status(404).json({ error: 'Sizes not found' });

            return res.status(200).json({ sizes: result });

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server Error' });
        }
    }

    getPublicProducts = async (req, res) => {
        try {
            const result = await this.publicProductService.getPublicProducts();

            if (result.length === 0) {
                return res.status(404).json({ error: 'Products not found' });
            }

            const valorationsPromises = result.map(product =>
                this.valorationService.getValorationByProduct(product.Id)
            );

            const valorationsResults = await Promise.all(valorationsPromises);

            result.forEach((product, index) => {
                const valorationResult = valorationsResults[index];
                product.valoracion = valorationResult.length > 0 ? valorationResult[0].Valoration : 0;
                product.images = product.images.map(image => image.dataValues?.imagen || '');
            });

            return res.status(200).json({ products: result });

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server Error' });
        }
    }

    getPublicProduct = async (req, res) => {
        const { id } = req.params;

        try {
            const result = await this.publicProductService.getPublicProduct(id);
            if (result.length === 0) {
                return res.status(404).json({ error: 'No se encontraron productos' });
            }

            const valorationsPromises = result.map(product =>
                this.valorationService.getValorationByProduct(product.Id)
            );

            const valorationsResults = await Promise.all(valorationsPromises);

            result.forEach((product, index) => {
                const valorationResult = valorationsResults[index];
                product.valoracion = valorationResult.length > 0 ? valorationResult[0].Valoration : 0;
                product.images = product.images.map(image => image.dataValues?.imagen || '');
            });

            if (result[0].Categoria === 1) {
                const sizes = await SizesService.getSizeById(result[0].Id);
                result[0].sizes = sizes.length > 0 ? sizes[0].Tallas.split(',') : [];
            }

            return res.status(200).json({ product: result });

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server Error' });
        }
    }

    getProductsByCollection = async (req, res) => {
        const { id } = req.params;

        try {
            const result = await this.collectionProductService.getProductsByCollection(id);
            if (result.length === 0) {
                return res.status(404).json({ error: 'No se encontraron productos' });
            }

            for (const product of result) {

                const valorationResult = await this.valorationService.getValorationByProduct(product.Id);
                product.valoracion = valorationResult.length > 0 ? valorationResult[0].Valoration : 0;

                if (product.images) {
                    product.images = product.images.map(image => image.dataValues.imagen);
                }
            }

            return res.status(200).json({ products: result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server Error' });
        }
    }


    getBestSellers = async (req, res) => {
        try {
            const results = await this.bestSellerProductService.getBestSellers();
            if (!results) return res.status(404).json({ error: 'No se encontraron productos' });

            for (const product of results) {
                const valorationResult = await this.valorationService.getValorationByProduct(product.Id);

                if (!valorationResult) res.status(400).json({ error: 'Valoration not found' });

                product.valoracion = valorationResult.length > 0 ? valorationResult[0].Valoration : 0;

                product.images = product.images.map(image => image.dataValues.imagen);
            }

            return res.status(200).json({ products: results });

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server Error' });
        }
    }

}

module.exports = ProductController;