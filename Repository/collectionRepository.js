const Collection = require('../Models/Collection');
const { deleteFileFromFirebase } = require('../utils/actions');
class CollectionRepository {

    async getCollections() {
        try {
            return await Collection.findAll();
        } catch (error) {
            console.log(error);
        }
    }

    async getCollectionByName(name, fileNamePath) {
        const nametoLowerCase = name.toLowerCase();
        try {
            return await Collection.findAll({ where: { Nombre_Coleccion: nametoLowerCase } });
        } catch (error) {
            deleteFileFromFirebase(fileNamePath, 'collections');
            console.log(error);
        }
    }

    async getCollectionById(id) {
        try {
            return await Collection.findOne({ where: { id: id } });
        } catch (error) {
            console.log(error);
        }
    }

    async saveCollection(Nombre_Coleccion, Descripcion, status, fileName) {
        try {
            return await Collection.create({ Nombre_Coleccion, Descripcion, status, imagen: fileName });
        } catch (error) {
            deleteFileFromFirebase(fileName, 'collections');
            console.log(error);
        }
    }

    async updateCollection(id, Nombre_Coleccion, Descripcion, status, imagen) {
        try {
            //obtain previous image path
            const result = await Collection.findOne({ where: { id: id } });
            const previousImagePath = result.dataValues.imagen;
            
            if (imagen != null) {
                if (previousImagePath) {
                    //delete previous image
                    deleteFileFromFirebase(previousImagePath, 'collections');
                }
            } else {
                imagen = previousImagePath
            }
            return await Collection.update({ Nombre_Coleccion, Descripcion, status, imagen }, { where: { id: id } });

        } catch (error) {
            deleteFileFromFirebase(imagen, 'collections');
            console.log(error);
        }
    }

    async deleteCollection(id) {
        try {
            return await Collection.update({ status: 'Inactivo' }, { where: { id: id } });
        } catch (error) {
            console.log(error);
        }

    }
}

module.exports = CollectionRepository;