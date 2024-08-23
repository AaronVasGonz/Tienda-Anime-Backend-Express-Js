
class CollectionService {

    constructor(collectionRepository) {
        this.collectionRepository = collectionRepository;
    }

    async getCollections() {
        try {
            return await this.collectionRepository.getCollections();
        } catch (error) {
            console.log(error);
            throw new Error(`Error while getting collections: ${error.message}`);
        }
    }

    async getCollectionByName(name, fileNamePath) {
        try {
            return await this.collectionRepository.getCollectionByName(name);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while getting collection by name: ${error.message}`);
        }
    }

    async getCollectionById(id) {
        try {
            return await this.collectionRepository.getCollectionById(id);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while getting collection by id: ${error.message}`);

        }
    }
}

module.exports = CollectionService