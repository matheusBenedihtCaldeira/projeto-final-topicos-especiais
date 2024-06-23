const model = require('../models/patientModel.js');

const index = (req, res) => {
    model.getAllPatients((err, results) => {
        if(err) {
            console.error("Erro na consulta:", err);
            res.status(500).send('Erro ao buscar pacientes');
            return;
        }
        res.status(200).render('patients', { obj_patients: results });
    });
};

const register = async (req, res) => {
    const {first_name, last_name, cpf, gender, date_of_birth, cellphone} = req.body;
    const patient = {first_name, last_name, cpf, gender, date_of_birth, cellphone};
    try{
        await model.registerPatient(patient);
        res.status(200).render('home');
        return;
    }catch(err){
        console.error(err);
        res.status(500).send(`Error: ${err}`);
        return;
    }
}

const deletePatientById = async(req, res) => {
    const id = req.params.id;
    try{
        await model.deletePatientById(id);
        res.status(200).render('home');
        return;
    }catch(err){
        console.error(err);
        res.status(500).send(`Error: ${err}`);
        return;
    }
}

const findPatientById = async (req, res) => {
    try {
        const id = req.params.id;
        await model.getPatientById(id, (err, result) => {
            if (err) {
                throw err;
            }
            if (result.length === 0) {
                res.status(404).send("Paciente não encontrado");
                return;
            }
            res.status(200).render('patient', { patient: result[0] });
            return
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
    }
};

const editForm = async(req, res) => {
    try{
        const id = req.params.id;
        await model.getPatientById(id, (err, result) => {
            if (err) {
                throw err;
            }
            if (result.length === 0) {
                res.status(404).send("Paciente não encontrado");
                return;
            }
            res.status(200).render('editPatient', { patient: result[0] });
            return
        })
    }catch(err){
        console.log(err)
        res.status(500).send(`Error: ${err}`)
        return;
    }
}

const update = async(req, res) => {
    const {first_name, last_name, cpf, gender, date_of_birth, cellphone} = req.body;
    const patient = {first_name, last_name, cpf, gender, date_of_birth, cellphone};
    try{
        await model.updatePatientById(req.params.id, patient);
        res.status(200).render('home');
        return;
    }catch(err){
        console.log(err);
        res.status(500).send(`Error: ${err}`);
        return;
    }
}

module.exports = {
    index,
    register,
    deletePatientById,
    findPatientById,
    editForm,
    update
}