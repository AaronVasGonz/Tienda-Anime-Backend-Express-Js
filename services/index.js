

//Importing Storage Services
const StorageService = require('./storageService');
const ImageManager = require('./imageManager');

//Importing repositories
const ProductRepository = require('../Repository/productRepository');
const CategoryRepository = require('../Repository/categoryRepository');
const CollectionRepository = require('../Repository/collectionRepository');
const ProviderRepository = require('../Repository/providerRepository');
const RoleRepository = require('../Repository/roleRepository');
const UserRepository = require('../Repository/userRepository');
const UserDetailsRepository = require('../Repository/userDetailsRepository');
const LoginRepository = require('../Repository/loginRepository');
const RoleLoginRepository = require('../Repository/roleLoginRepository');
const SignUpRepository = require('../Repository/signUpRepository');
const PaymentRepository = require('../Repository/paymentRepository');
const InvoiceRepository = require('../Repository/invoiceRepository');

//importing products Services
const ProductService = require('./products/productService');
const ProductUpdater = require('./products/productUpdaterService');
const ClothingProductService = require('./products/clothingProductService');
const SizesService = require('./sizesService');
const CollectionProductService = require('./products/collectionProductService');
const BestSellerProductService = require('./products/BestSellerProductService');
const ValorationService = require('./valorationService');
const PublicProductService = require('./products/PublicProductService');
const ProductAdderService = require('./products/productAdderService');
const ProductDeleterService = require('./products/ProductDeleterService');


//Importing categories Services
const CategoryService = require('./categories/categoriesService');
const CategorySaveService = require('./categories/saveCategoryService');
const CategoryUpdateService = require('./categories/updateCategoryService');
const CategoryDeleteService = require('./categories/deleteCategoryService');

//Importing Collection Services

const CollectionService = require('./collections/collectionService');
const CollectionSaveService = require('./collections/saveCollectionService');
const CollectionUpdateService = require('./collections/updateCollectionService');
const CollectionDeleteService = require('./collections/deleteCollectionService');

//Importing Provider Services
const ProviderService = require('./provider/providerService');
const ProviderSaveService = require('./provider/saveProviderService');
const ProviderUpdateService = require('./provider/updateProviderService');
const ProviderDeleteService = require('./provider/deleteProviderService');


//Importing Authentication Services
const AuthenticationService = require('./authentication/authUserService');

//Importing Login Services
const LoginService = require('./authentication/loginService');

//Importing Sign Up Service
const SignUpService = require('./authentication/signUpService');

//Importing User Services
const UserService = require('./users/userService');
const UserSaveService = require('./users/saveUserService');
const UserUpdateService = require('./users/updateUserService');
const UserDeleteService = require('./users/deleteUserService');

//Importing UserDetails Services
const UserDetailsService = require('./userDetails/userDetailsService');

//Importing Contact Services
const ContactService = require('./contact/contactService');

//Importing Countries Services
const CountryService = require('./countries/countriesService');

//Importing Invoice Services
const InvoiceService = require('./invoices/invoiceService');
//Importing Payment Services
const PaymentService = require('./payment/paymentService');


module.exports = {
    ProductService,
    ProductUpdater,
    ClothingProductService,
    SizesService,
    CollectionProductService,
    BestSellerProductService,
    ValorationService,
    PublicProductService,
    StorageService,
    ProductRepository,
    ImageManager,
    ProductAdderService,
    ProductDeleterService,
    CategoryService,
    CategoryRepository,
    CategorySaveService,
    CategoryUpdateService,
    CategoryDeleteService,
    CollectionService,
    CollectionRepository,
    CollectionSaveService,
    CollectionUpdateService,
    CollectionDeleteService,
    ProviderService,
    ProviderRepository,
    ProviderSaveService,
    ProviderUpdateService,
    ProviderDeleteService,
    RoleRepository,
    UserRepository,
    UserService,
    UserSaveService,
    UserUpdateService,
    UserDeleteService,
    UserDetailsRepository,
    UserDetailsService,
    LoginRepository,
    RoleLoginRepository,
    LoginService,
    SignUpRepository,
    SignUpService,
    ContactService,
    CountryService,
    PaymentRepository,
    PaymentService,
    InvoiceRepository,
    InvoiceService,
    AuthenticationService
};