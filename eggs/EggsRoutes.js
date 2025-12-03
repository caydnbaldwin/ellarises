const express = require('express');
const router = express.Router();
const eggsController = require('./EggsController');

router.get('/teapot', eggsController.getTeapot);

module.exports = router;