const mongoose = require('mongoose')

async function conectaBancoDeDados(){
    try{
    console.log('Conexão com o banco de dados iniciada...')

    await mongoose.connect('mongodb+srv://nandavilassa:Ur1BKYo432BzbX7T@cluster0.arcclwz.mongodb.net/?retryWrites=true&w=majority')

    console.log('Conexão com o banco de dados feita com sucesso!')
} catch(erro){
    console.log(erro)
}
}

module.exports = conectaBancoDeDados