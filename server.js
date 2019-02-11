const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:3000/teste', {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.listen(3000, function () {
    console.log('tô cumeno tícolé')
})
app.get('/',(req,res)=> {
    res.render('../Crud/crud.ejs')
})
app.set('view engine','ejs')

app.post('/show',(req,res)=> {
    console.log(req.body)
})