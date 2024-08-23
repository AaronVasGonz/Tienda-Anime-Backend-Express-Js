
class CategoryUpdateService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async updateCategory(id, Detalle, status) {
        try {
            return await this.categoryRepository.updateCategory(id, Detalle, status);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while updating category: ${error.message}`);
        }
    }
}

module.exports = CategoryUpdateService;