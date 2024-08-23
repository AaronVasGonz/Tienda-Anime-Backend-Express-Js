const categories = require("../Models/categories");

class CategoryRepository {
    async getCategoryById(id) {
        try {
            return await categories.findOne({ where: { id_tipo: id } });
        } catch (error) {
            console.log(error);
        }
    }

    async getCategories() {
        try {
            return await categories.findAll();
        } catch (error) {
            console.log(error);
        }
    }

    async saveCategory(Detalle, status) {
        try {
            return await categories.create({ Detalle, status });
        } catch (error) {
            console.log(error);
        }
    }

    async updateCategory(id, Detalle, status) {
        try {
            return await categories.update({ Detalle, status }, { where: { id_tipo: id } });
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCategory(id) {
        try {
            return await categories.update({ status: 'Inactivo' }, { where: { id_tipo: id } });
        } catch (error) {
            console.log(error);
        }
    }

    async getCategoryNameById(id) {
        try {
            return await categories.findOne({ attributes: ['Detalle'], where: { id_tipo: id } });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CategoryRepository;