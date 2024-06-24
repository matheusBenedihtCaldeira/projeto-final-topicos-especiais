const model = require("../models/doctorModel.js");

const index = (req, res) => {
  model.getAllDoctors((err, results) => {
    if (err) {
      console.log("Erro na consulta");
      res.status(500).send("Erro ao buscar paciente");
      return;
    }
    res.status(200).render("doctors", { obj_doctors: results });
  });
};

const register = async (req, res) => {
  const { first_name, last_name, crm, email, cellphone } = req.body;
  const doctor = { first_name, last_name, crm, email, cellphone };
  try {
    await model.registerDoctor(doctor);
    res.status(200).render("home");
    return;
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error: ${err}`);
    return;
  }
};

const deleteDoctorById = async (req, res) => {
  const id = req.params.id;
  try {
    await model.deleteDoctorById(id);
    res.status(200).render("home");
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error: ${err}`);
    return;
  }
};

const findDoctorById = async (req, res) => {
  try {
    const id = req.params.id;
    await model.getDoctorById(id, (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length === 0) {
        res.status(404).send("Doutor não encontrado");
        return;
      }
      res.status(200).render("doctor", { doctor: result[0] });
      return;
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error: ${err}`);
  }
};

const editForm = async (req, res) => {
  try {
    const id = req.params.id;
    await model.getDoctorById(id, (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length === 0) {
        res.status(404).send("Não encontrado");
        return;
      }
      res.status(200).render("editDoctor", { doctor: result[0] });
      return;
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error: ${err}`);
    return;
  }
};

const update = async (req, res) => {
  const { first_name, last_name, crm, email, cellphone } = req.body;
  const doctor = { first_name, last_name, crm, email, cellphone };
  try {
    await model.updateDoctorById(req.params.id, doctor);
    res.status(200).render("home");
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error: ${err}`);
    return;
  }
};

module.exports = {
  index,
  register,
  findDoctorById,
  deleteDoctorById,
  update,
  editForm,
};
