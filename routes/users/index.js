var express = require('express');
var router = express.Router();
// Controllers
const usersController = require('../../controllers/usersController');

router.route('/').post(usersController.post);
router.route('/').get(usersController.get);
router.route('/:id').get(usersController.get_by_id);

module.exports = router;