class ImageManager {
    manageImages(textImages, fileImages) {

        let images = [];

        const fileImagesStr = fileImages.length > 0 ? fileImages.join(',') : '';

        const textImagesStr = Array.isArray(textImages) ? textImages.join(',') : textImages || '';

        if (fileImagesStr && textImagesStr) {
            images = `${fileImagesStr},${textImagesStr}`;
        } else {

            images = fileImagesStr || textImagesStr;
        }

        return images;
    }

    manageImage(req) {
        var image = "";
        if (req.fileUrl) {
            image = req.fileUrl

        }
        else if (req.body.avatarText) {
            image = req.body.avatarText
        }
        else {
            image = null
        }
        return image;
    }


}

module.exports = ImageManager;