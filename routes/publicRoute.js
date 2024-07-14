const express = require('express');
const router = express.Router();
const controller = require('../controller/publicController');

router.get('/execute-query', controller.goSleep);

module.exports = router;