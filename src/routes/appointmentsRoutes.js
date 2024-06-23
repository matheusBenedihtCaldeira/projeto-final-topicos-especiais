const express = require('express');
const route = express.Router();
const controller = require('../controllers/appointmentController.js');

route.get('/', controller.index);
route.post('/', controller.register)
route.get('/:id', controller.findAppointmentById);
route.delete('/delete/:id', controller.deleteAppointmentById);

module.exports = route