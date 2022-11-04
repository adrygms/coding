//dbuser e dbpassword
require('dotenv').config()

const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const app = express()

const mongoose = require('mongoose')
const { required } = require('nodemon/lib/config')

// forma de ler JSON / middlewares

app.use(
    express.urlencoded({
      extended: true,
    }),
  )
// rota API
 
const pessoaRoutes = require('./routes/pessoaRoutes')
app.use('/pessoa', pessoaRoutes)

// rota inicial / endpoint

app.get('/', (req, res) =>{

    //mostrar requisição
    res.json({message: 'Olá Express!'})

})

// entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

//conectando ao banco de dados MONGODB

mongoose
.connect
(
 `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.h6id3zv.mongodb.net/bancodaapi?retryWrites=true&w=majority`
)

.then (() => {
    console.log('Conectamos ao MONGODB')
    app.listen(3000)
})
.catch ((err) => console.log('MONGODB não conectado'))
