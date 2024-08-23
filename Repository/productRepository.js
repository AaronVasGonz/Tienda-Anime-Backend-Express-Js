const sequelize = require('../config/sequelizeConfig');
const { deleteFilesFromFirebase } = require('../utils/actions');
const ProductImages = require('../Models/productImages');
class ProductRepository {

    async getAllProductsAdmin() {
        try {
            return await sequelize.query('SELECT * FROM Vista_Productos', { type: sequelize.QueryTypes.SELECT });
        } catch (error) {
            console.log("Error while getting all products for admin", error);
            throw new Error("Error while getting all products for admin");
        }
    }

    async getProductById(id) {
        try {
            return await sequelize.query('SELECT * FROM vista_productos_general WHERE id = ?', { replacements: [id], type: sequelize.QueryTypes.SELECT });
        } catch (error) {
            console.log("Error while getting product by id", error);
            throw new Error("Error while getting product by id");
        }
    }

    async getProductImagesById(id) {
        try {
            return await ProductImages.findAll({ where: { id_Producto: id } });
        } catch (error) {
            console.log("Error while getting product images", error);
            throw new Error("Error while getting product images");
        }
    }

    async updateClothingProduct(id, Nombre_Producto, Descripcion, Precio, collection, category, provider, Cantidad, gender, sizes, status, images, filePaths) {


        try {
            const result = await sequelize.query('CALL ActualizarProductoRopa  (?,?,?,?,?,?,?,?,?,?,?,?)', {
                replacements: [id, Nombre_Producto, Descripcion, Precio, collection, category, provider, Cantidad, gender, sizes, images, status],
                type: sequelize.QueryTypes.RAW
            });
            return true;
        } catch (error) {
            deleteFilesFromFirebase(filePaths, 'products');
            console.log("Error while updating clothing product", error);
            throw new Error("Error while updating clothing product");
        }
    }

    async updateProduct(id, Nombre_Producto, Descripcion_Producto, Precio, Cantidad, category, provider, collection, images, status, fireBasePath) {

        try {
            const results = await sequelize.query(
                'CALL ActualizarProductoInventario(?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
                {
                    replacements: [id, Nombre_Producto, Descripcion_Producto, Precio, collection, category, provider, Cantidad, images, status],
                    type: sequelize.QueryTypes.RAW
                }
            );
            return true;
        } catch (error) {
            deleteFilesFromFirebase(images, 'products');
            console.log("Error while updating product", error);
            throw error;
        }
    }

    async saveProduct(Nombre_Producto, Descripcion, Precio, collection, category, provider, Cantidad, images, filePaths, status) {
        try {
            const results = await sequelize.query(
                'CALL InsertarProductoInventario(:Nombre_Producto, :Descripcion, :Precio, :collection, :category, :provider, :Cantidad, :images, :status)',
                {
                    replacements: { Nombre_Producto, Descripcion, Precio, collection, category, provider, Cantidad, images, status },
                    type: sequelize.QueryTypes.RAW
                }
            );
            return true;
        } catch (error) {
            deleteFilesFromFirebase(filePaths, 'products');
            console.log("Error while saving product", error);
            throw error;
        }
    }

    async saveClothingProduct(Nombre_Producto, Descripcion, Precio, collection, category, provider, Cantidad, gender, sizes, status, images, filePaths) {

        try {
            const result = await sequelize.query('CALL InsertarProductoRopa (?,?,?,?,?,?,?,?,?,?,?)', {
                replacements: [Nombre_Producto, Descripcion, Precio, collection, category, provider, Cantidad, gender, sizes, status, images],
                type: sequelize.QueryTypes.RAW
            });
            return true;

        } catch (error) {
            deleteFilesFromFirebase(filePaths, 'products');
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try {
            const results = await sequelize.query(
                'CALL DeleteProductLogical (?)', {
                replacements: [id], type: sequelize.QueryTypes.RAW
            }
            )

            return true;

        } catch (error) {
            console.log(error);
        }
    }

    //CLOTHES

    async getClothesProducts() {
        try {
            const products = await sequelize.query('Select *from Vista_Productos_Ropa_Talla', { type: sequelize.QueryTypes.SELECT });
            return products;

        } catch (error) {
            console.log(error);
        }
    }

    //Products BY Collection
    async getProductsByCollection(id_collection) {
        try {
            const product = await sequelize.query('Select *from Vista_Productos_General WHERE Id_Coleccion = ?', { replacements: [id_collection], type: sequelize.QueryTypes.SELECT });
            const imagesPerProduct = await Promise.all(product.map(async (prod) => {
                const images = await ProductImages.findAll({ where: { id_Producto: prod.Id } });
                return { product: prod, images };
            }));

            return imagesPerProduct.map(({ product, images }) => {
                product.images = images;
                return product;
            });

        } catch (error) {
            console.log(error);
        }
    }

    async getClotheById(id) {
        try {
            const product = await sequelize.query('SELECT * FROM Vista__Ropa_Talla WHERE id = ?', { replacements: [id], type: sequelize.QueryTypes.SELECT });
            const images = await ProductImages.findAll({ where: { id_Producto: id } });
            return { product: product, images: images };
        } catch (error) {
            console.log(error);
        }
    }

    //PUBLIC PRODUCTS

    async getPublicProducts() {
        try {
            const products = await sequelize.query('Select *from Vista_Productos_General', { type: sequelize.QueryTypes.SELECT });

            const imagesPerProduct = await Promise.all(products.map(async (product) => {
                const images = await ProductImages.findAll({ where: { id_Producto: product.Id } });
                return { product, images };
            }));

            return imagesPerProduct.map(({ product, images }) => {
                product.images = images;
                return product;
            });

        } catch (error) {
            console.log(error);
        }
    }

    //Best Sellers
    async getBestSellers() {
        try {
            result = await sequelize.query('SELECT * FROM bestsellers', { type: sequelize.QueryTypes.SELECT });

            const imagesPerProduct = await Promise.all(result.map(async (product) => {
                const images = await ProductImages.findAll({ where: { id_Producto: product.Id } });
                return { product, images };
            }));

            return imagesPerProduct.map(({ product, images }) => {
                product.images = images;
                return product;
            });

        } catch (error) {
            console.log(error);
        }
    }


    async getPublicProductById(id) {
        try {
            const product = await sequelize.query('Select *from Vista_Productos_General WHERE id = ?', { replacements: [id], type: sequelize.QueryTypes.SELECT });

            const imagesPerProduct = await Promise.all(product.map(async (prod) => {
                const images = await ProductImages.findAll({ where: { id_Producto: prod.Id } });

                return { product: prod, images };
            }));

            return imagesPerProduct.map(({ product, images }) => {
                product.images = images;
                return product;
            })

        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = ProductRepository