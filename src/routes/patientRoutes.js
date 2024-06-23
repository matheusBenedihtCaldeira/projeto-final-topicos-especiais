const express = require('express');
const route = express.Router();
const patientController = require('../controllers/patientController.js');

route.get('/', patientController.index);
route.post('/register', patientController.register);
route.delete('/delete/patient/:id', patientController.deletePatientById);

module.exports = route;