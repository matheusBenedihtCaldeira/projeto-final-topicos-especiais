const model = require("../models/patientModel.js");

const index = async (req, res) => {
  await model.getAllPatients((err, results) => {
    if(err) {
      console.error("Erro na consulta:", err);
      res.status(500).send("Erro ao buscar pacientes");
      return;
    }
    res.status(200).render("patients", { obj_patients: results });
  });
}; 

const register = async (req, res) => {
  // Recupera os dados enviados a partir do formulário
  const { first_name, last_name, cpf, gender, date_of_birth, cellphone } = req.body;
  const patient = {
    first_name,
    last_name,
    cpf,
    gender,
    date_of_birth,
    cellphone,
  };
  try {
    // Verificar se o paciente já existe pelo CPF
    const existingPatient = await model.findPatientByCpf(cpf);
    if (existingPatient) {
      console.log("Paciente já existe");
      return res.status(400).render("home", { errorMessage: "Paciente já existe" });
    }

    // Se o paciente não existe, registrar o paciente
    try {
      await model.registerPatient(patient);
      return res.status(200).render("home");
    } catch (err) {
      console.error("Erro ao registrar paciente:", err);
      return res.status(500).render("register", {
        errorMessage: `Erro ao registrar paciente: ${err.message}`,
      });
    }
  } catch (err) {
    console.error("Erro ao buscar paciente:", err);
    return res
      .status(500)
      .render("register", { errorMessage: "Erro ao buscar paciente" });
  }
};


const deletePatientById = async (req, res) => {
  const id = req.params.id;
  try {
    await model.deletePatientById(id);
    res.status(200).render("home");
    return;
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error: ${err}`);
    return;
  }
};

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
      res.status(200).render("patient", { patient: result[0] });
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
    await model.getPatientById(id, (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length === 0) {
        res.status(404).send("Paciente não encontrado");
        return;
      }
      res.status(200).render("editPatient", { patient: result[0] });
      return;
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error: ${err}`);
    return;
  }
};

const diagnosisForm = async (req, res) => {
  try {
    const id = await req.params.id;
    await model.getPatientById(id, (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length === 0) {
        res.status(404).send("Paciente não encontrado");
        return;
      }
      res.status(200).render("diagnosis", { patient: result[0] });
      return;
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error: ${err}`);
    return;
  }
};

const update = async (req, res) => {
  const { first_name, last_name, cpf, gender, date_of_birth, cellphone } =
    req.body;
  const patient = {
    first_name,
    last_name,
    cpf,
    gender,
    date_of_birth,
    cellphone,
  };
  try {
    await model.updatePatientById(req.params.id, patient);
    res.status(200).render("home");
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error: ${err}`);
    return;
  }
};

const updateDiagnosis = async (req, res) => {
  try {
    const apiUrl = "http://127.0.0.1:5000/predict";
    const { gender, age, educ, ses, mmse, cdr, etiv, nwbv, asf } = req.body;
    const data = {
      SEX: gender === "M" ? 0 : 1,
      Age_N: parseFloat(age),
      EDUC_N: parseFloat(educ),
      SES_N: parseFloat(ses),
      MMSE_N: parseFloat(mmse),
      CDR_N: parseFloat(cdr),
      eTIV_N: parseFloat(etiv),
      nWBV_N: parseFloat(nwbv),
      ASF_N: parseFloat(asf),
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const responseData = await response.json();
      await model.updateDiagnosisById(
        req.params.id,
        responseData.result,
        (err, result) => {
          if (err) {
            res.status(500).send(`Error: ${err}`);
          } else {
            res.status(200).render("home");
            return;
          }
        }
      );
    } else {
      const errorMessage = `Erro ao enviar dados para a API: ${response.status} ${response.statusText}`;
      console.error(errorMessage);
      res.status(response.status).send(errorMessage);
    }
  } catch (error) {
    console.error("Erro ao enviar dados para a API:", error);
    res.status(500).send("Erro ao enviar dados para a API");
  }
};

module.exports = {
  index,
  register,
  deletePatientById,
  findPatientById,
  editForm,
  update,
  updateDiagnosis,
  diagnosisForm,
};
