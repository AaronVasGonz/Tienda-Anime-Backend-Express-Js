

class CollectionSaveService {

    constructor(collectionRepository) {
        this.collectionRepository = collectionRepository;
    }

    async saveCollection(Nombre_Coleccion, Descripcion, status, fileName) {
        try {
            return await this.collectionRepository.saveCollection(Nombre_Coleccion, Descripcion, status, fileName);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while saving collection: ${error.message}`);
        }
    }
}

module.exports = CollectionSaveService