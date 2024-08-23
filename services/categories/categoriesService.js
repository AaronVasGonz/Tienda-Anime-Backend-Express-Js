
class CategoriesService {

    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async getCategories() {
        
        try {
            return await this.categoryRepository.getCategories()
        } catch (error) {
            console.log(error);
            throw new Error(`Error while getting categories: ${error.message}`);
        }
    }

    async getCategoryById(id) {
        try {
            return await this.categoryRepository.getCategoryById(id)
        } catch (error) {
            console.log(error);
            throw new Error(`Error while getting category by id: ${error.message}`);
        }
    }

    async getCategoryNameById(id) {
        try {
            return await this.categoryRepository.getCategoryNameById(id)
        } catch (error) {
            console.log(error);
            throw new Error(`Error while getting category name by id: ${error.message}`);
        }
    }

}

module.exports = CategoriesService