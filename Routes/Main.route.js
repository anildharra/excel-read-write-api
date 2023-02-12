const express = require('express')
const router = express.Router()
const mainController = require('../Controllers/Main.Controller')

const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({
  storage: multerStorage
});
function validate(req, res, next) {
    if (!req.file) {
      return res.send({
        errors: {
          message: 'file cant be empty'
        }
      });
    }
    next();
  }
router.get('/testapi', mainController.testapi);
router.post('/readprocessexcelfile', upload.single('file'), validate, mainController.readProcessExcelFile);

module.exports = router
