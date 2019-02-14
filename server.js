const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app . use ( bodyParser . json ())
app.listen(4000,()=> {
    console.log('conexão estabelecida com sucesso')
})

app.get('/',(req,res)=> {
 res.render('../Crud/crud.ejs')
})
app.set('view engine','ejs')

app.post('/show',(req,res)=> {
    console.log(req.body)
    res.render('../Crud/cadastro.ejs')
})

const router = express.Router()
router.use((req,res,next) =>{
    console.log('verificação')
    next();
})
router.get('/user', (req, res)=> {
    var db = require("../mongodb.js");
    var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
    Users.find({}).lean().exec((e, docs)=>{
          res.render('cadastro.ejs', { "cadastro.ejs": docs });
        console.log('Conectado ao banco')
        });
 });
router.post('/add',(req,res)=>{
    var db= require('../mongodb.js');    
    var nome = req.body.nome;
    var sobrenome= req.body.sobrenome;
    var endereco=req.body.endereco;
    var bairro = req.body.bairro;
    var idade= req.body.idade;
    var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
    var user = new Users({ username: nome, surname: sobrenome, Endereco: endereco,Bairro:bairro,idade:idade});
    user.save((err)=> {
        if (err) {
            console.log("Error! " + err.message);
            return err;
        }
        else {
            console.log("Post saved");
            res.redirect("registro.ejs");
        }
    });
});
router.route('/registro/:cliente_id')
.put((req,res)=>{
    cliente.findById(req.params.cliente_id,(cliente,error)=>{
        if(error)
        res.send(`Id não encontrado erro: ${error}`);
         var nome = req.body.nome;
        var sobrenome = req.body.sobrenome;
        var endereco = req.body.endereco;
        var bairro= req.body.bairro;
        var idade = req.body.sobrenome;

        cliente.save((error)=>{
            if (error)
                res.send(`Erro ao atualizar ${error}`)
            res.json({ message: 'Sucesso!' });
        });
    });
})
.delete((req,res)=>{
    Cliente.remove({
        _id:req.params.cliente_id},
        function (error) {
            if(error){
                res.send(`Id não foi encontrado: ${error}`);
                res.json({message:'Deletado com sucesso'});
            }}
        )
})
app.use('/',router);

module.exports = router;