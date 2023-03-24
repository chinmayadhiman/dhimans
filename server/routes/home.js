const express = require('express');
const { home } = require('../controllers/Home');
const router = express.Router();

router.route('/').get(home);

module.exports = router;