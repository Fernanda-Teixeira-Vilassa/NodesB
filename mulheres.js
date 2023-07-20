const express = require ('express') //Iniciando o Express
const router = express.Router() //Configuração a primeira parte da Rota
//const { v4: uuidv4 } = require('uuid') //Chamando a biblioteca uuid

//Importando as configuração do Banco de Dados
const conectaBancoDeDados = require('./bancoDeDados')
conectaBancoDeDados()

//Importando as configuração do Model
const Mulher = require('./model')

const app = express() //Inciando o app
app.use(express.json())
const porta = 3333 // Criando a porta

//Criando Lista Incial de Mulheres
/* const listaDeMulheres = [
    {
        id:'1',
        nome: 'Simara Conceição',
        imagem: 'https://bit.ly/3LJIyOF',
        minibio: 'Desenvolvedora e instrutora',
      },
      {
        id:'2',
        nome: 'Iana Chan',
        imagem: 'https://bit.ly/3JCXBqP',
        minibio: 'CEO & Founder da PrograMaria',
      },
      {
        id:'3',
        nome: 'Luana Pimentel',
        imagem: 'https://bit.ly/3FKpFaz',
        minibio: 'Senior Staff Software Engineer',
      }
] */

//GET
async function mostrarMulheres(request, response){
  try{
      const mulheresVindasdoBD = await Mulher.find()
      response.json(mulheresVindasdoBD)
  } catch(erro) {
  } 
  //response.json(ListaDeMulheres)
}

//POST
async function criaMulher(request, response) {
  const novaMulher = new Mulher({
    //id: uuidv4(),
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio,
    citacao: request.body.citacao
  })

  try{
      const mulherCriada = await novaMulher.save()
      response.status(201).json(mulherCriada)
    } catch(erro){
      console.log(erro)
  }
  /*  listaDeMulheres.push(novaMulher)
  response.json(listaDeMulheres) */
 }

//PATCH
async function corrigeMulher(request, response) {
/*   function encontraMulher(mulher) {
     if (mulher.id === request.params.id) {
       return mulher
     }
   } */
  try{
      const mulherEncontrada = await Mulher.findById(request.params.id)
      //const mulherEncontrada = listaDeMulheres.find(encontraMulher)
       if (request.body.nome) {
        mulherEncontrada.nome = request.body.nome
     }
       if (request.body.minibio) {
        mulherEncontrada.minibio = request.body.minibio
     }
       if (request.body.imagem) {
        mulherEncontrada.imagem = request.body.imagem
     }
       if (request.body.citacao) {
      mulherEncontrada.citacao = request.body.citacao
   }

      const mulherAtualizadaBD = await mulherEncontrada.save()
      response.json(mulherAtualizadaBD)

  } catch(erro) {
      console.log(erro)
  }
  //response.json(listaDeMulheres)
 }

 //DELETE
async function deletaMulher(request, response) {
 /* function todasMenosEla(mulher) {
   if (mulher.id !== request.params.id) {
     return mulher
   }
 } 
  const mulheresQueFicaram = listaDeMulheres.filter(todasMenosEla)
  response.json(mulheresQueFicaram) */
    try {
      await Mulher.findByIdAndDelete(request.params.id)
      response.json({messagem: 'Mulher deletada com sucesso!'})
    } catch(erro){
      console.log(erro)
    }
 
}

//Informações das rotas
app.use(router.get('/mulheres', mostrarMulheres)) // Configuração da rota GET Mulheres
app.use(router.post('/mulheres', criaMulher)) //Configuração POST Mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) //Configuração da rota PATCH Mulheres
app.use(router.delete('/mulheres/:id', deletaMulher))

//PORTA
function mostraPorta(){
    console.log('Servidor criado e rodando na porta ', porta)
}

app.listen(porta, mostraPorta) //Ouvindo a porta
