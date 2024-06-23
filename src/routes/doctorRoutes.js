const express = require('express');
const route = express.Router();
const controller = require('../controllers/doctorController.js');

route.get('/', controller.index);

module.exports = route;