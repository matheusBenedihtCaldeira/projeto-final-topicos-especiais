const express = require('express');
const route = express.Router();
const patientController = require('../controllers/patientController.js');

route.get('/', patientController.index);
route.get('/edit/:id', patientController.editForm);
route.get('/:id', patientController.findPatientById);
route.post('/register', patientController.register);
route.delete('/delete/:id', patientController.deletePatientById);
route.post('/edit/:id', patientController.update);

module.exports = route;