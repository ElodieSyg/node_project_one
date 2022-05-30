const express = require('express');
const router = express.Router();
// Controller
const logoutController = require('../../controllers/logoutController');

router.route('/').get(logoutController.post);

module.exports = router;