const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises; // Cambiado a fs.promises
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

const bucket = admin.storage().bucket();

const memoryStorage = multer.memoryStorage();

const fileUpload = multer({
    storage: memoryStorage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
}).single('imagen');

const uploadAvatar = multer({
    storage: memoryStorage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
}).single('avatar');

const diskstorageMultFiles = multer.diskStorage({
    destination: path.join(__dirname, '../images/products'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-Product-' + file.originalname)
    },
})

const uploadFiles = multer({
    storage: memoryStorage,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50 MB (límite por archivo)
        fieldSize: 200 * 1024 * 1024 // 200 MB (límite para todos los campos de texto/datos combinados)
    }
}).array('fileImages');

const upploadFileAvatarToFirebase = async (req, res, next) => {
    if (!req.file) {
        req.fileUrl = null;
        return next();
    }

    try {
        const filename = `${uuidv4()}${path.extname(req.file.originalname)}`;
        const processedImageBuffer = await sharp(req.file.buffer)
            .resize(800)
            .toFormat('webp')
            .toBuffer();

        const tempLocalFile = path.join(__dirname, '../images/avatar', filename);

        await fs.writeFile(tempLocalFile, processedImageBuffer);

        await bucket.upload(tempLocalFile, {
            destination: `images/avatar/${filename}`,
            metadata: {
                contentType: 'image/webp',
            },
        });


        const [url] = await bucket.file(`images/avatar/${filename}`).getSignedUrl({
            action: 'read',

            expires: '03-09-2491',
        });

        await fs.unlink(tempLocalFile);

        req.fileUrl = url;

        next();

    } catch (error) {
        console.error('Error uploading file to Firebase:', error);
        res.status(500).send('Error uploading file');
    }
};


const uploadFileCollectionsToFirebase = async (req, res, next) => {
    if (!req.file) {
        console.log('No file uploaded');
        return next();
    }

    try {
        const fileName = `${Date.now()}-Collection-${uuidv4()}${path.extname(req.file.originalname)}`;

        const processedImageBuffer = await sharp(req.file.buffer)
            .resize(800)
            .toFormat('webp')
            .toBuffer();

        const tempLocalFile = path.join(__dirname, '../images/collections', fileName);

        await fs.writeFile(tempLocalFile, processedImageBuffer);

        await bucket.upload(tempLocalFile, {
            destination: `images/collections/${fileName}`,
            metadata: {
                contentType: 'image/webp',
            },
        });

        const [url] = await bucket.file(`images/collections/${fileName}`).getSignedUrl({
            action: 'read',
            expires: '03-09-2491',
        });
        await fs.unlink(tempLocalFile);

        req.fileUrl = url;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading file' });
    }
};

const uploadFileProductsToFirebase = async (req, res, next) => {
    if (!req.files || req.files.length === 0) {
        console.log('No files uploaded');
        req.fileUrls = [];
        return next();
    }

    try {
        const filesNames = req.files.map(file => `${uuidv4()}${path.extname(file.originalname)}`);
        let imagesUrls = [];

        await Promise.all(req.files.map(async (file, index) => {

            const filename = filesNames[index];

            const processedImageBuffer = await sharp(file.buffer)
                .resize(800)
                .toFormat('webp')
                .toBuffer();

            const tempLocalFile = path.join(__dirname, '../images/products', filename);

            await fs.writeFile(tempLocalFile, processedImageBuffer);

            await bucket.upload(tempLocalFile, {
                destination: `images/products/${filename}`,
                metadata: {
                    contentType: 'image/webp',
                },
            });

            const [url] = await bucket.file(`images/products/${filename}`).getSignedUrl({
                action: 'read',
                expires: '03-09-2491',
            });
            await fs.unlink(tempLocalFile);

            imagesUrls.push(url);
        }));

        req.fileUrls = imagesUrls;
        next();

    } catch (error) {
        console.error('Error uploading files to Firebase:', error);
        res.status(500).json({ message: 'Error uploading files' });
    }
};


const processImages = async (req, res, next) => {

    const maxWidth = 200; // HD max width
    const maxHeight = 200; // HD max height

    try {
        if (!req.files || req.files.length === 0) {
            return next(); // Continuar si no hay archivos para procesar
        }

        const originalFilePaths = req.files.map(file => path.join(__dirname, '../images/products', file.filename));
        const tempFilePaths = originalFilePaths.map(filename => path.join(__dirname, '../images/products', `${path.basename(filename, path.extname(filename))}-temp.webp`));

        // Usamos Promise.all para manejar múltiples promesas en paralelo
        await Promise.all(
            req.files.map((file, index) => {
                const originalFilePath = originalFilePaths[index];
                const tempFilePath = tempFilePaths[index];

                return sharp(originalFilePath)
                    .resize({
                        fit: sharp.fit.inside,
                        width: maxWidth,
                        height: maxHeight,
                        withoutEnlargement: true
                    })
                    .toFormat('webp')
                    .toBuffer()
                    .then(data => {
                        return sharp(data).toFile(tempFilePath);
                    })
                    .then(() => {
                        return new Promise((resolve, reject) => {
                            fs.rename(tempFilePath, originalFilePath, err => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve();
                                }
                            });
                        });
                    });
            })
        );
        next();
    } catch (error) {

        next(error);
    }
};



module.exports = { uploadFileCollectionsToFirebase,uploadFileProductsToFirebase ,fileUpload, uploadFiles, upploadFileAvatarToFirebase, uploadAvatar, processImages };