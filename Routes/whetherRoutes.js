const express = require('express');
const router = express.Router();
const whetherController = require('./../controller/whetherController')
router.route('/requestRoute').get(whetherController.getWhetherByCityName);

module.exports = router;