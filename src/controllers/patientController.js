const patientModel = require('../models/patientModel.js');

const index = (req, res) => {
    patientModel.getAllPatients((err, results) => {
        if(err){
            console.log("Erro na consulta")
            res.status(500).send('Erro ao buscar pacientes');
            return;
        }
        res.status(200).render('patients', {obj_patients: results})
    })
}

const register = (req, res) => {
    const {first_name, last_name, cpf, gender, date_of_birth, cellphone} = req.body;
    console.log(`Data received: Nome: ${first_name} - Sobrenome: ${last_name} - CPF: ${cpf} - Genero: ${gender} - Data de nascimento: ${date_of_birth} - Telefone: ${cellphone} `);
    const patient = {first_name, last_name, cpf, gender, date_of_birth, cellphone};
    patientModel.registerPatient(patient, (err, result) => {
        if(err){
            console.err(err);
            res.status(500).send("Erro ao realizar insert!");
            return;
        }
        console.log('Paciente cadastrado!');
        res.render('home')
    })
}

const deletePatientById = (req, res) => {
    const id = req.params.id;
    if(!id){
        res.status(400).send("ID não informado!");
        return;
    }
    patientModel.deletePatientById(id, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send("Erro ao realizar delete!");
            return;
        }
        res.render('home')
    })
}
module.exports = {
    index,
    register,
    deletePatientById,
}