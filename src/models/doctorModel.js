const connection = require('../config/db');

const getAllDoctors = (callback) => {
    const query = 'SELECT * FROM tb_doctors';
    connection.query(query, callback);
}

const registerDoctor = (doctor, callback) => {
    const query = 'INSERT INTO tb_doctors SET ?';
    connection.query(query, doctor, callback)
}

const deleteDoctorById = (id, callback) => {
    const query = 'DELETE FROM tb_doctors WHERE id = ?';
    connection.query(query, [id], callback);
}

const getDoctorById = (id, callback) => {
    const query = 'SELECT * FROM tb_doctors WHERE id = ?';
    connection.query(query, [id], callback)
}

const updateDoctorById = (id, doctor, callback) => {
    const query = 'UPDATE tb_doctors SET? WHERE id = ?';
    connection.query(query, [doctor, id], callback)
}

module.exports = {
    getAllDoctors,
    registerDoctor,
    deleteDoctorById,
    getDoctorById,
    updateDoctorById
}