const express = require('express');
const route = express.Router();
const controller = require('../controllers/doctorController.js');

route.get('/', controller.index);
route.post('/register', controller.register);
route.delete('/delete/:id', controller.deleteDoctorById);

module.exports = route;