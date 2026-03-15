const express = require('express');
const router = express.Router();
const ipController = require('../controllers/ipController');
const ipMiddleware = require('../middlewares/ipMiddleware');

router.get('/my-ip', ipMiddleware.extractIp, ipController.getMyIp);

module.exports = router;