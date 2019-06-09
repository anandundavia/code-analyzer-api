const express = require('express');
const validate = require('express-validation');

const controller = require('../../controllers/analyze.controller');
const validation = require('../../validations/analyze.validation');

const authenticated = require('../../middlewares/authenticated.middleware');
const upload = require('../../middlewares/multer.middleware');

const router = express.Router();

router.route('/raw').post(authenticated, validate(validation.raw), controller.raw);
router.route('/file').post(authenticated, validate(validation.file), upload, controller.file);

module.exports = router;
