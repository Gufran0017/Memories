const express = require('express');
const controllers = require('../controllers/authController');

const router = express.Router();

router.route('/register').post(controllers.register);
router.route('/login').post(controllers.login);

module.exports = router;