

class CategoryController {
    constructor
        (
            categoryService,
            categorySaveService,
            categoryUpdateService,
            categoryDeleteService
        ) {
        this.categoryService = categoryService;
        this.categorySaveService = categorySaveService;
        this.categoryUpdateService = categoryUpdateService;
        this.categoryDeleteService = categoryDeleteService;
    }

    getCategories = async (req, res) => {
        try {
            
            const categories = await this.categoryService.getCategories();
            if (categories.length === 0) {
                return res.status(404).json({ error: 'No categories found' });
            }
           
            res.json({ categories: categories });
        } catch (error) {
            res.status(500).json({ error: 'Error while getting categories' });
            //console.log(error);
        }
    }

    getCategory = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.categoryService.getCategoryById(id);
            if (result.length === 0) {
                res.status(404).json({ error: 'Category not found' });
            }
            res.status(200).json({ category: result.dataValues });
        } catch (error) {
            //console.log(error);
            res.status(500).json({ error: 'Error while getting category' });
        }
    }

    saveCategory = async (req, res) => {
        const { Detalle, status } = req.body;
        try {
            const result = await this.categorySaveService.saveCategory(Detalle, status);
            if (!result) {
                return res.status(500).json({ error: 'Error al insertar en la base de datos' });
            }
            res.status(200).json({ message: 'Categoría insertada correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al insertar en la base de datos' });
            throw error;
        }
    }

    updateCategory = async (req, res) => {
        const { id } = req.params;

        const { Detalle, status } = req.body;

        try {
            const result = await this.categoryUpdateService.updateCategory(id, Detalle, status);
            if (!result) {
                return res.status(500).json({ error: 'Error al insertar en la base de datos' });
            }
            res.status(200).json({ message: 'Categoría actualizada correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al insertar en la base de datos' });
            //console.log(error);
        }
    }

    deleteCategory = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.categoryDeleteService.deleteCategory(id);
            if (!result) {
                return res.status(500).json({ error: 'Error al insertar en la base de datos' });
            }
            res.status(200).json({ message: 'Categoría eliminada correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al insertar en la base de datos' });
            //console.log(error);
        }
    }

}


module.exports = CategoryController