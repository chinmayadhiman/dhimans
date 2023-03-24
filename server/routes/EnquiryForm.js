const express = require('express');
const { SubmitEnquiry } = require('../controllers/EnquiryController');
const router = express.Router();

router.route('/').post(SubmitEnquiry);

module.exports = router;