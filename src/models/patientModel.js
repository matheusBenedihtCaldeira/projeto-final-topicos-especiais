const connection = require("../config/db");

const getAllPatients = (callback) => {
  const query = "SELECT * FROM tb_patients";
  connection.query(query, callback);
};

const registerPatient = (patient, result) => {
  const query = "INSERT INTO tb_patients SET ?";
  connection.query(query, patient, result);
};

const deletePatientById = (id, callback) => {
  const query = "DELETE FROM tb_patients WHERE id = ?";
  connection.query(query, [id], callback);
};

const getPatientById = (id, callback) => {
  const query = "SELECT * FROM tb_patients WHERE id = ?";
  connection.query(query, [id], callback);
};

const updatePatientById = (id, patient, callback) => {
  const query = "UPDATE tb_patients SET ? WHERE id = ?";
  connection.query(query, [patient, id], callback);
};

const updateDiagnosisById = (id, diagnostic, callback) => {
  const query = "UPDATE tb_patients SET diagnosis = ? WHERE id = ?";
  connection.query(query, [diagnostic, id], callback);
};

const findPatientByCpf = (cpf, callback) => {
  const query = "SELECT * FROM tb_patients WHERE cpf = ?";
  connection.query(query, [cpf], callback);
};

module.exports = {
  getAllPatients,
  registerPatient,
  deletePatientById,
  getPatientById,
  updatePatientById,
  updateDiagnosisById,
  findPatientByCpf,
};
