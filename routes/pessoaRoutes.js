const router = require('express').Router()
const Pessoa = require('../models/Pessoa')

// rota API

router.post('/', async (req, res) => {

       
//CRUD
    //Create
    //req.body

        const {nome, idade, genero, salario, aprovaçao} = req.body

        if(!nome){
            res.status(422).json({ error: 'O nome é obrigatório'})
        }
    
        const pessoa = {
            nome,
            idade,
            genero,
            salario,
            aprovaçao
        }



    try {
        await Pessoa.create(pessoa)
    
        res.status(201).json({message: 'Pessoa inserida no sistema com sucesso!'})
      } catch (error) {
        res.status(500).json({error: error})
      }

})

    //Read
    // todas as pessoas do sistema
    router.post('/', async (req, res) => {

        try {
            
            const pessoas = await pessoa.find()
            res.status(201).json({pessoas})

        } catch (error) {
            res.status(500).json({error: error})
        }
    })

    //usuário específico
    router.post('/:id', async (req, res) => {
        console.log(req)

        //extração
        const id = req.params.id

        try {

            const pessoa = await pessoa.findOne({_id: id})

            if(!pessoa) {
                res.status(422).json({message: 'Usuário não encontrado'})
                return
            }

            res.status(200).json({pessoas})

        } catch (error) {
            res.status(500).json({error: error})
        }
    })


    //Update (usando o patch para ser mais específico)
    router.patch('./:id', async(req, res)=>{
        const id = req.params.id
        const {nome, idade, genero, salario, aprovaçao} = req.body

        const pessoa = {
        nome,
        idade,
        genero,
        salario,
        aprovaçao
        }

        try {
            const UpdatePessoa = await Pessoa.updateOne({_id: id}, pessoa)

            console.log(UpdatePessoa)

            if(UpdatePessoa.matchedCount === 0) {
                res.status(422).json({message: 'Usuário não encontrado'})
            }
            res.status(200).json({pessoa})

        } catch (error) {
            res.status(500).json({error: error})
        }

    })

    //Delete
    router.delete('/:id', async (req, res) =>{

        const id = req.params.id

         const pessoa = await pessoa.findOne({_id: id})

            if(!pessoa) {
                res.status(422).json({message: 'Usuário não encontrado'})
                return
            }
            
    try {
        await Pessoa.deleteOne ({_id: id})
        res.status(200).json({message: 'Usuário removido com sucesso'})
    } catch (error) {
        res.status(500).json({error: error})
    }

    })

module.exports = router