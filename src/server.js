//Importação das dependencias
const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
const path = require("path");
const connection = require('./config/db');

//Configurações do servidor
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "..", "public")));
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

//Rotas
app.get("/", (req, res) => {
  res.render("home");
});

app.get('/doctors', (req, res) => {
  res.render('doctors')  
})

app.get('/patients', (req, res) => {
  connection.query('SELECT * FROM tb_patients;', (err, results, fields) => {
    if(err){
      console.log("Erro na consulta: " + err)
      res.status(500)
      return;
    }
    res.status(200).render('patients', {obj_patients: results})
  })
})

app.get("/registerPatients", (req, res) => {
  res.render("registerPatient");
});

app.get("/registerDoctors", (req, res) => {
  res.render("registerDoctor");
});

app.get("/agendamento", (req, res) => {
  res.render("agendamento");
});

app.post('/doctor', (req, res) => {
  const {first_name, last_name, crm, email, password} = req.body;
  console.log(`Data received: ${first_name} - ${last_name} - ${crm} - ${email} - ${password}`);
  const doctor = {first_name, last_name, crm, email, password};
  const query = connection.query('INSERT INTO tb_doctors SET ?', doctor, (err, result) => {
    if(err){
      console.log(err);
      res.status(500).send("Erro ao realizar insert!")
      return;
    }
    console.log("Doutor cadastrado com sucesso!");
  })
  res.send('OK')
})

app.post('/patient', (req, res) => {
  const {first_name, last_name, cpf, gender, date_of_birth, cellphone} = req.body;
  console.log(`Data received: Nome: ${first_name} - Sobrenome: ${last_name} - CPF: ${cpf} - Genero: ${gender} - Data de nascimento: ${date_of_birth} - Telefone: ${cellphone} `);
  const patient = {first_name, last_name, cpf, gender, date_of_birth, cellphone};
  const query = connection.query('INSERT INTO tb_patients SET ?', patient, (err, result) => {
    if(err){
      console.log(err);
      res.status(500).send("Erro ao realizar insert!")
      return;
    }
    console.log("Paciente cadastrado com sucesso!");
  })
  res.send('OK')
})