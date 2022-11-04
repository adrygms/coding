const mongoose = require('mongoose')

const Pessoa = mongoose.model('Pessoa', {

    nome: String,
    idade: Number,
    genero: String,
    salario: Number,
    aprovaçao: Boolean,

})

module.exports = Pessoa

