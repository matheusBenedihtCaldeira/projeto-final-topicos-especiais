const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    //TROCAR SENHA
    password: '',
    database: 'db_projeto_dalva'
});

connection.connect((err) => {
    if(err){
        console.error("Erro ao conectar: " + err);
        return;
    }
    console.log("Connected with MySQL!");
})

module.exports = connection;