import path from "path"
import multer from "multer"

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/jpg'
        ) { callback(null, true) } else {
            console.log("Only png and jpg file supported!");
            callback(null, false)
        }
    }, limits: {
        fileSize: 1024 * 1024 * 2
    }
})

export default upload