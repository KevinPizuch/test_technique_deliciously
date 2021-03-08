const path = require('path');
const express = require('express');
const multer  = require('multer')
const url = require('url');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({storage: storage})

const router = express.Router();

router.get('/image', function (req, res) {
    res.sendFile(path.join(__dirname, `../../public/uploads/`, url.parse(req.url,true).query.name))
})

// Upload Image
router.post("/photo", upload.single('photo'), (req, res, next) => {
    return res.json({
        image: req.file.path
    });
});

module.exports = router;