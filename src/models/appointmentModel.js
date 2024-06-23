const connection = require('../config/db');

const getAllAppointments = (callback) => {
    const query = `
    SELECT a.id, a.appointment_date, a.appointment_time,
           p.id as patient_id, p.first_name as patient_first_name, p.last_name as patient_last_name,
           d.id as doctor_id, d.first_name as doctor_name
    FROM tb_appointments a
    INNER JOIN tb_patients p ON a.patient_id = p.id
    INNER JOIN tb_doctors d ON a.doctor_id = d.id
  `;
    connection.query(query, callback);
};

const checkAppointmentConflict = (doctor_id, appointmentDateTime, callback) => {
  const query = 'SELECT * FROM tb_appointments WHERE doctor_id = ? AND appointment_date = ?';
  connection.query(query, [doctor_id, appointmentDateTime], callback);
};

const registerAppointment = (appointment, callback) => {
  const query = 'INSERT INTO tb_appointments SET ?';
  connection.query(query, appointment, callback);
};

const deleteAppointmentById = (id, callback) => {
  const query = 'DELETE FROM tb_appointments WHERE id = ?';
  connection.query(query, [id], callback);
}

const getAppointmentById = (id, callback) => {
  const query = 'SELECT p.first_name AS patient_first_name, p.last_name AS patient_last_name, p.cpf AS patient_cpf, p.cellphone AS patient_cellphone, d.first_name AS doctor_first_name, d.last_name AS doctor_last_name, d.crm AS doctor_crm, d.email AS doctor_email, a.id, a.appointment_date, a.appointment_time FROM tb_appointments a INNER JOIN tb_patients p ON a.patient_id = p.id INNER JOIN tb_doctors d ON a.doctor_id = d.id WHERE a.id = ?;';
  connection.query(query, [id], callback)
}

module.exports = {
    getAllAppointments,
    checkAppointmentConflict,
    registerAppointment,
    deleteAppointmentById,
    getAppointmentById
};