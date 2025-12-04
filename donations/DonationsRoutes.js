const express = require('express');
const router = express.Router();
const donationsController = require('./DonationsController');

router.get('/donate', donationsController.getDonatePage);
router.post('/donate', donationsController.postDonate);

module.exports = router;