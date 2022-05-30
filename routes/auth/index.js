const express = require('express');
const router = express.Router();
// Controller
const authController = require('../../controllers/authController');

router.route('/').get(authController.render);
router.route('/').post(authController.post);

module.exports = router;