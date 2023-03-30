const path = require('path');
const multer = require('multer');

var Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // b(null, path.resolve(__dirname, 'uploads'))
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
})

var upload = multer({
    storage: Storage,
    fileFilter: function (req, file, callback) {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            callback(null, true)
        }
        else {
            console.log("Only jpg and png file supported!")
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = upload;