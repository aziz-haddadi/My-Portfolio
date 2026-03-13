const express = require('express');
const router = express.Router();
const writeupsController = require('../controllers/writeupsController');

router.get('/', writeupsController.index);
router.get('/:slug', writeupsController.show);

module.exports = router;
