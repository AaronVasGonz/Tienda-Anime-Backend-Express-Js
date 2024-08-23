class CollectionUpdateService {
    constructor(collectionRepository) {
        this.collectionRepository = collectionRepository;
    }

    async updateCollection(id, Nombre_Coleccion, Descripcion, status, imagen) {
        try {
            return await this.collectionRepository.updateCollection(id, Nombre_Coleccion, Descripcion, status, imagen);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while updating collection: ${error.message}`);
        }
    }
}

module.exports = CollectionUpdateService