const express = require('express');
const cors = require('cors');
//Importing Middlewares
const { authAdmin } = require('../middlewares/jwtServices');
const { uploadFiles, uploadFileProductsToFirebase } = require("../middlewares/files");
//Importing Controllers

 const ProductController = require('../controllers/productController');
const {ProductService, ProductUpdater, ClothingProductService, SizesService, CollectionProductService,
       BestSellerProductService, ValorationService, PublicProductService, StorageService, ProductRepository, 
       ImageManager, ProductAdderService, ProductDeleterService, CategoryService, CategoryRepository
} = require('../services/index')


//categories Services
const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);

//Product Services
const productService = new ProductService();
const clothingProductService = new ClothingProductService();
const collectionProductService = new CollectionProductService();
const bestSellerProductService = new BestSellerProductService();
const sizesService = new SizesService();
const storageService = new StorageService();
const productRepository = new ProductRepository();
const valorationService = new ValorationService(); 
const imageManager = new ImageManager();
const publicProductService = new PublicProductService();
const productUpdaterService = new ProductUpdater(productRepository, storageService, imageManager);
const productAdderService = new ProductAdderService( productRepository, storageService, categoryService);
const productDeleterService = new ProductDeleterService(productRepository);

const productController = new ProductController(
    productService, productUpdaterService,clothingProductService,
    sizesService,collectionProductService,bestSellerProductService,
    valorationService,publicProductService,storageService,
    productRepository,imageManager, productAdderService,
    productDeleterService
)

const routerProducts = express.Router();
routerProducts.use(cors());
routerProducts.use(express.json());
/*Protected products routes */
routerProducts.get('/productsAdmin', authAdmin,productController.getProducts);
routerProducts.post('/productsAdmin', authAdmin, uploadFiles, uploadFileProductsToFirebase, productController.addProduct);
routerProducts.get('/productsAdmin/:id', authAdmin, productController.getProduct);
routerProducts.put('/productsAdmin/:id', authAdmin, uploadFiles, uploadFileProductsToFirebase, productController.updateProduct);
routerProducts.delete('/productsAdmin/:id', authAdmin, productController.deleteProduct);

/*routing clothes products */
routerProducts.get('/clothesAdmin', authAdmin, productController.getClothes);
routerProducts.get('/clothesAdmin/sizes', authAdmin ,productController.getSizes);

routerProducts.get('/clothesAdmin/:id', authAdmin, productController.getClothe);
/*Public products */
routerProducts.get('/public/products', productController.getPublicProducts);
routerProducts.get('/public/products/:id', productController.getPublicProduct);
routerProducts.get('/public/products-collection/:id', productController.getProductsByCollection);

/* Best Sellers */
routerProducts.get('/bestSellers', productController.getBestSellers);

module.exports = routerProducts;