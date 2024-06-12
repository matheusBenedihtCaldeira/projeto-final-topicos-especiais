//Importação das dependencias
const express = require('express')
const app = express()
const port = 8080;
const bodyParser = require('body-parser')
const path = require('path')

//Configurações do servidor
app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, '..', 'public')))
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})

//Rotas
app.get('/', (req, res) => {
    res.send('Ta rodando')
})