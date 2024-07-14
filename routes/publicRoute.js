const express = require('express');
const router = express.Router();
const controller = require('../controller/publicController');
const {abortMiddleware} = require('../middleware/abortMiddleware');


router.get('/execute-query', controller.goSleep);
router.get('/execute-query2',abortMiddleware(5000), controller.goSleep2nd);

module.exports = router;