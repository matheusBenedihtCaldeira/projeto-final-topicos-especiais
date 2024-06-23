const { call } = require('body-parser');
const connection = require('../config/db');

const getAllPatients = (result) => {
    const query = 'SELECT * FROM tb_patients';
    connection.query(query, result);
}

const registerPatient = (patient, result) => {
    const query = 'INSERT INTO tb_patients SET ?';
    connection.query(query, patient, result);
}

const deletePatientById = (id, callback) => {
    const query = 'DELETE FROM tb_patients WHERE id = ?'
    connection.query(query, [id], callback)
}

module.exports = {
    getAllPatients,
    registerPatient,
    deletePatientById
};