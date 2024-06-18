//Importação das dependencias
const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
const path = require("path");

//Configurações do servidor
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "..", "public")));
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

//Rotas
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/patients", (req, res) => {
  res.render("patients");
});

app.get("/doctor", (req, res) => {
  res.render("doctor");
});

app.get("/agendamento", (req, res) => {
  res.render("agendamento");
});
