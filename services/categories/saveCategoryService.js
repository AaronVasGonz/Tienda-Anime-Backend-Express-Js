class CategorySaveService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async saveCategory(Detalle, status) {
        try {
            return await this.categoryRepository.saveCategory(Detalle, status);
        } catch (error) {
            console.log(error); // Corregido 'conole.log' a 'console.log'
            throw new Error(`Error while saving category: ${error.message}`); // Corregido 'throw' para incluir mensaje de error
        }
    }
}

module.exports = CategorySaveService;