
class CollectionController {

    constructor(collectionService, collectionSaveService, collectionUpdateService, collectionDeleteService, storageService) {
        this.collectionService = collectionService;
        this.collectionSaveService = collectionSaveService;
        this.collectionUpdateService = collectionUpdateService;
        this.collectionDeleteService = collectionDeleteService;
        this.storageService = storageService;
    }

    getCollections = async (req, res) => {
        try {
            const collections = await this.collectionService.getCollections();
            const collectionsWithImages = collections.map((collection) => {
                return { ...collection.dataValues, imageUrl: collection.dataValues.imagen };
            });

            res.json({ collections: collectionsWithImages });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error while getting collections' });
        }
    }

    getCollection = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.collectionService.getCollectionById(id);

            if (result.length === 0) {
                return res.status(404).json({ error: 'Collection not found' });
            }

            return res.status(200).json({ collection: result.dataValues });
        } catch (error) {
            console.error("Error while getting collection:", error);

        }
    }

    saveCollection = async (req, res) => {
        const { Nombre_Coleccion, Descripcion, status } = req.body;

        const fileUrl = req.fileUrl || null;

        if (!Nombre_Coleccion) {
            this.storageService.deleteFileFromFirebase(fileUrl, 'collections');
            return res.status(400).json({ error: 'The collection name is required' });
        }
        try {
            const results = await this.collectionService.getCollectionByName(Nombre_Coleccion, fileUrl);

            if (results.length > 0) {
                this.storageService.deleteFileFromFirebase(fileUrl, 'collections');
                return res.status(400).json({ error: 'The collection already exists' });
            }
            const result = await this.collectionSaveService.saveCollection(Nombre_Coleccion, Descripcion, status, fileUrl);

            if (!result) {
                this.storageService.deleteFileFromFirebase(fileUrl, 'collections');
                return res.status(500).json({ error: 'Error while inserting collection in the database' });
            }
            //console.log('Colección insertada correctamente en la base de datos');
            return res.status(200).json({ message: 'Collection inserted successfully' });

        } catch (error) {
            this.storageService.deleteFileFromFirebase(fileUrl, 'collections');
            console.error("Error al obtener colecciones:", error);
            return res.status(500).json({ error: 'Error while getting collections' });
        }
    }

    updateCollection = async (req, res) => {
        const fileUrl = req.fileUrl || null;
        try {
            const { id, Nombre_Coleccion, Descripcion, status } = req.body;
            
            const result = await this.collectionUpdateService.updateCollection(id, Nombre_Coleccion, Descripcion, status, fileUrl);
            if (!result) {
        
                return res.status(500).json({ error: 'Error while updating collection in the database' });
            }

            res.status(200).json({ message: 'Collection updated successfully' });
        } catch (error) {
            this.storageService.deleteFileFromFirebase(fileUrl, 'collections');
            console.error("Error al actualizar coleccion", error);
        }
    }

    deleteCollection = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.collectionDeleteService.deleteCollectionToDb(id);
            if (!result) {
                return res.status(500).json({ error: 'Error while deleting collection in the database' });
            }
            res.status(200).json({ message: 'Collection deleted successfully' });
        } catch (error) {
            console.error("Error al borrar coleccion", error);
            res.status(500).json({ error: 'Error while deleting collection' });
        }
    }

}

module.exports = CollectionController;