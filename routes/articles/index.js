const express = require('express');
const router = express.Router();
// Controllers
const articleController = require('../../controllers/articleController');
// Middleware
const protect = require('../../middlewares/protect');

router.route('/').get(articleController.render);
router.route('/').post(protect, articleController.post);
router.route('/:id').get(articleController.get_by_id);
router.route('/:id').patch(protect, articleController.patch);
router.route('/:id').post(protect, articleController.delete);

module.exports = router;