const express = require('express');
const router = express.Router();
// Controller
const registerController = require('../../controllers/registerController');

router.route('/').get(registerController.render);

module.exports = router;