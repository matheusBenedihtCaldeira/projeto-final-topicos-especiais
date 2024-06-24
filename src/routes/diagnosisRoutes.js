const express = require('express');
const route = express.Router();
const patientController = require('../controllers/patientController.js');

route.post('/:id', patientController.updateDiagnosis)
route.get('/:id', patientController.diagnosisForm)

module.exports = route;