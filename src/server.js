//Importação das dependencias
const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
const path = require("path");
const connection = require('./config/db');

const patientRoutes = require('./routes/patientRoutes.js')
const doctorRoutes = require('./routes/doctorRoutes.js')
const appointmentsRoutes = require('./routes/appointmentsRoutes.js')
const diagnosisRoutes = require('./routes/diagnosisRoutes.js');
const { getPatientById } = require("./models/patientModel.js");

//Configurações do servidor
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "..", "public")));
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

//Rotas do projeto
app.get('/', (req, res) => {
  res.render('home')
});
//Rotas relacionada aos pacientes
app.get('/patient', (req, res) => {
  res.render('patient')
})
app.use('/patients', patientRoutes);
app.get("/register/patient", (req, res) => {
  res.render("registerPatient");
});

//Rotas relacionadas aos doutores
app.use('/doctors', doctorRoutes);
//Rota para o formulario de cadastro dos doutores
app.get("/register/doctor", (req, res) => {
  res.render("registerDoctor");
});
//Rotas relacionadas aos agendamentos
app.use('/appointments', appointmentsRoutes);

app.use('/diagnosis', diagnosisRoutes)

// Rota para o formulario de agendamento de consultas
app.get("/agendamento", (req, res) => {
  // Buscar doutores e pacientes do banco de dados
  connection.query('SELECT id, first_name, last_name FROM tb_doctors', (err, doctors) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao buscar doutores!");
      return;
    }
    connection.query('SELECT id, first_name, last_name FROM tb_patients', (err, patients) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erro ao buscar pacientes!");
        return;
      }
      // Renderizar a página de agendamento com os dados dos doutores e pacientes
      res.render("agendamento", {obj_doctors: doctors, obj_patients: patients });
    });
  });
});

app.put('/patients/edit/:id', (req, res) => {
  const patientId = req.params.id;
  const updatedData = req.body;
  updatePatient(patientId, updatedData);
res.redirect('/patients'); // Redireciona para a lista de pacientes após a edição
});
