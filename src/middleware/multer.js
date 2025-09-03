const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        const timestamp = new Date().getTime();
        const originalname = file.originalname;
        const fileName = file.filename
        const extension = path.extname(file.originalname);
        //cb(null, Date.now() + '-' + file.originalname)


        cb(null, `${timestamp}-${originalname}`)
    }
})

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 3 * 1024 * 1024, // 3 MB
        files: 1
    }
});

module.exports = upload;