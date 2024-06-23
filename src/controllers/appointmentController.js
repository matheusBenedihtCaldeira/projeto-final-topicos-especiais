const model = require('../models/appointmentModel.js')

const index = (req, res) => {
    model.getAllAppointments((err, result) => {
        if(err){
            console.log(err)
            res.status(500).send(err)
            return;
        }
        res.status(200).render('appointments', {obj_appointments: result})
    })
}

const register = async (req, res) => {
    const { doctor_id, patient_id, appointment_date, appointment_time } = req.body;
    console.log(`Data received: Id do doutor: ${doctor_id} - Id do paciente: ${patient_id} - Data da consulta: ${appointment_date} - Hora da consulta: ${appointment_time}`);
    const appointmentDateTime = new Date(`${appointment_date}T${appointment_time}`);
    try {
        model.checkAppointmentConflict(doctor_id, appointmentDateTime, (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send("Erro ao verificar conflitos de agendamento!");
                return;
            }
            if (results.length > 0) {
                // Se existir um agendamento na mesma data e hora para o mesmo doutor
                res.status(400).send("Já existe um agendamento para este doutor nesta data e hora!");
                return;
            }
            const appointment = { doctor_id, patient_id, appointment_date: appointmentDateTime };
            model.registerAppointment(appointment, (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("Erro ao realizar insert!");
                    return;
                }
                console.log("Consulta agendada com sucesso!");
                res.status(200).render('home');
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
    }
};

module.exports = {
    index,
    register
}