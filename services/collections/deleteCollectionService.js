class CollectionDeleteService {

    constructor(collectionRepository) {
        this.collectionRepository = collectionRepository;
    }

    async deleteCollection(id) {
        try {
            return await this.collectionRepository.deleteCollection(id);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while deleting collection: ${error.message}`);
        }
    }
}

module.exports = CollectionDeleteService