const express = require('express');
const controllers = require('../controllers/memoryController');
const upload = require('../middlewares/multer.js');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/memories').post(authMiddleware, upload.array('images', 10) ,controllers.createMemory);
router.route('/memories').get(authMiddleware, controllers.getAllMemories);
router.route('/memories/:id').get(authMiddleware, controllers.getMemoryById);
router.route('/memories/:id').put(authMiddleware, controllers.updateMemory);
router.route('/memories/:id').delete(authMiddleware, controllers.deleteMemory);

module.exports = router;