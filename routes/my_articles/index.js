const express = require('express');
const router = express.Router();
// Middleware
const protect = require('../../middlewares/protect');
// Controller
const myArticlesController = require('../../controllers/myArticlesController');


router.route('/').get(protect, myArticlesController.get);

module.exports = router;