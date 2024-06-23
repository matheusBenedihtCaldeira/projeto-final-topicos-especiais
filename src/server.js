//Importação das dependencias
const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
const path = require("path");
const connection = require('./config/db');

const patientRoutes = require('./routes/patientRoutes.js')
const doctorRoutes = require('./routes/doctorRoutes.js')

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
app.use('/patients', patientRoutes);
app.get("/registerPatients", (req, res) => {
  res.render("registerPatient");
});

//Rotas relacionadas aos doutores
app.use('/doctors', doctorRoutes);
//Rota para o formulario de cadastro dos doutores
app.get("/registerDoctors", (req, res) => {
  res.render("registerDoctor");
});


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


// Rota de POST para inserir agendamento no banco de dados
app.post('/appointment', (req, res) => {
  const {doctor_id, patient_id, appointment_date, appointment_time} = req.body;
  console.log(`Data received: Id do doutor: ${doctor_id} - Id do paciente: ${patient_id} - Data da consulta: ${appointment_date} - Hora da consulta: ${appointment_time}`);

  // Combinar a data e a hora da consulta em um único objeto Date
  const appointmentDateTime = new Date(`${appointment_date}T${appointment_time}`);

  // Verificar se já existe um agendamento para o mesmo doutor na mesma data e hora
  const query = 'SELECT * FROM tb_appointments WHERE doctor_id = ? AND appointment_date = ?';
  connection.query(query, [doctor_id, appointmentDateTime], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao verificar conflitos de agendamento!");
      return;
    }

    if (results.length > 0) {
      // Se existir um agendamento na mesma data e hora para o mesmo doutor
      res.status(400).send("Já existe um agendamento para este doutor nesta data e hora!");
      return;
    }

    // Se não houver conflito, insere o novo agendamento
    const appointment = {doctor_id, patient_id, appointment_date: appointmentDateTime};
    connection.query('INSERT INTO tb_appointments SET ?', appointment, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erro ao realizar insert!");
        return;
      }
      console.log("Consulta agendada com sucesso!");
      res.render('agendamentos');
    });
  });
});

app.get("/agendamentos", (req, res) => {
  // Consulta SQL para buscar os dados de agendamentos com dados de doutores e pacientes
  const query = `
    SELECT a.id, a.appointment_date, a.appointment_time,
           p.id as patient_id, p.first_name as patient_first_name, p.last_name as patient_last_name,
           d.id as doctor_id, d.first_name as doctor_name
    FROM tb_appointments a
    INNER JOIN tb_patients p ON a.patient_id = p.id
    INNER JOIN tb_doctors d ON a.doctor_id = d.id
  `;
  connection.query(query, (err, appointments) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao buscar agendamentos!");
      return;
    }
    // Renderiza a página 'agendamento.ejs' e passa os dados dos agendamentos
    res.render("agendamentos", { obj_appointments: appointments });
  });
});

app.get('/diagnostico', (req, res) => {
  res.render('diagnostico')
})
