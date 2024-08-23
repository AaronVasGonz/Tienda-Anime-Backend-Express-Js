const express = require('express');
const cors = require('cors');
const { authAdmin } = require('../middlewares/jwtServices');
const {CategoryService ,CategorySaveService, CategoryRepository, CategoryUpdateService, CategoryDeleteService } = require('../services/index');

//Services
const categoryRepository = new CategoryRepository();
const categoryService = new  CategoryService(categoryRepository);
const categoryUpdateService = new CategoryUpdateService(categoryRepository);
const categorySaveService = new CategorySaveService(categoryRepository);
const categoryDeleteService = new CategoryDeleteService(categoryRepository);

//Controllers
const CategoryController = require('../controllers/categoriesController');
const categoryController = new CategoryController(categoryService, categorySaveService, categoryUpdateService, categoryDeleteService);

const routerCategoriesAdmin = express.Router();
routerCategoriesAdmin.use(cors());

/*Protected categories routes */
routerCategoriesAdmin.use(express.json());
routerCategoriesAdmin.get('/categoriesAdmin', categoryController.getCategories);
routerCategoriesAdmin.post('/categoriesAdmin', authAdmin, categoryController.saveCategory);
routerCategoriesAdmin.get('/categoriesAdmin/:id', categoryController.getCategory);
routerCategoriesAdmin.put('/categoriesAdmin/:id', categoryController.updateCategory)
routerCategoriesAdmin.delete('/categoriesAdmin/:id', authAdmin, categoryController.deleteCategory);

module.exports = routerCategoriesAdmin;
