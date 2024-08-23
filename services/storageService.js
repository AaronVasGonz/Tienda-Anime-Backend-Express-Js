const { deleteFilesFromFirebase } = require("../utils/actions");
const  {bucket} = require('../config/firebaseConfig');

class StorageService {
    constructor(storage) {
        this.storage = storage;
    }

    async deleteFileFromFirebase(fireBaseURL, filePath) {
        if (!fireBaseURL) {
            return;
        }
        try {
            const fileName = fireBaseURL.split(`/images/${filePath}/`)[1].split('?')[0];

            //create a reference to the file to delete
            const file = bucket.file(`images/${filePath}/${fileName}`);

            await file.delete();

        } catch (error) {
            console.log(error);
        }
    };

    async deleteFilesFromFirebase(fireBaseURLS, filePath) {
        if (!fireBaseURLS) {
            return;
        }

        try {
            for (const fireBaseURL of fireBaseURLS) {
                const fileName = fireBaseURL.split(`/images/${filePath}/`)[1].split('?')[0];

                const file = bucket.file(`images/${filePath}/${fileName}`);

                await file.delete();
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = StorageService;
