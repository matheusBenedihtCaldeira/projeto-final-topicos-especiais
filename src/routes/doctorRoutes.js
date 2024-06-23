const express = require('express');
const route = express.Router();
const controller = require('../controllers/doctorController.js');

route.get('/', controller.index);
route.get('/:id', controller.findDoctorById);
route.get('/edit/:id', controller.editForm);
route.post('/register', controller.register);
route.delete('/delete/:id', controller.deleteDoctorById);
route.post('/edit/:id', controller.update);

module.exports = route; 