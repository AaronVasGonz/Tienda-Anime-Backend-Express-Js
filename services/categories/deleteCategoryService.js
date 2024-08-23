class CategoryDeleteService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async deleteCategory(id) {
        try {
            return await this.categoryRepository.deleteCategory(id);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while deleting category: ${error.message}`);
        }
    }
}

module.exports = CategoryDeleteService