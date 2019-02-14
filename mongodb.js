const mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost:27017/crud-express', {useNewUrlParser: true});
var userSchema = new mongoose.Schema({
    nome: String,
    surname: String,
    endereco: String,
    bairro: String,
    idade: String
}, { collection: 'usercollection' }
);
 
module.exports = { Mongoose: mongoose, UserSchema: userSchema }