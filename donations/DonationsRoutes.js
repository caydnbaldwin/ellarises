const express = require('express');
const router = express.Router();
const donationsController = require('./DonationsController');

router.get('/donate', donationsController.getDonatePage);
router.post('/donate', donationsController.postDonate);
router.get('/donations', donationsController.getDonationsPage);

module.exports = router;