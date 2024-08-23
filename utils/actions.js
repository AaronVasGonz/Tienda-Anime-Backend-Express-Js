

const fs = require('fs-extra');
const admin = require('firebase-admin');

const bucket = admin.storage().bucket();


const deleteFilePath = (fileNamePath) => {
    if (fileNamePath) {
        fs.unlink(fileNamePath, (err) => {
            if (err) {
                console.error('Error al eliminar el archivo:', err);
            } else {
                //console.log('Archivo eliminado correctamente');
            }
        });
    } else {
        console.log('No se cargó ningún archivo');
    }
}


const deleteFileFromFirebase = async (fireBaseURL, filePath) => {
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

const deleteFilesFromFirebase = async (fireBaseURLS, filePath) => {
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


const deleteMultipleFiles = (filePaths) => {
    filePaths.forEach(filePath => {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error al eliminar el archivo:', err);
            } else {
                //console.log('Archivo eliminado correctamente');
            }
        });
    });
}

const manageImages = (textImages, fileImages) => {
    var images = [];
    if (fileImages.length === 0) {
        images = textImages instanceof Array ? textImages.join(',') : textImages;
    } else if (textImages === undefined) {

        images = fileImages.map(file => file).join(',');
    }
    else if (Array.isArray(textImages) && textImages.length > 1) {

        var images1 = fileImages.map(file => file).join(',');

        var images2 = textImages.join(',');

        images = `${images1},${images2}`;

    } else {

        var images1 = fileImages.map(file => file).join(',');

        var images2 = textImages;

        images = `${images1},${images2}`;

    }

    return images;
}

module.exports = { deleteFileFromFirebase, deleteFilesFromFirebase, deleteFilePath, deleteMultipleFiles, manageImages };


