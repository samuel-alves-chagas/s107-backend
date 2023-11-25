const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let port = 5000;

const cors=require('cors');

const mongoose = require('mongoose');
const uri = `mongodb://root:example@0.0.0.0:27017`;
mongoose.connect(uri);

mongoose.connection.on('connected', function () {
  console.log('Connected to Database');
});

mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});

app.use(bodyParser.json());
app.use(cors())

const Schema = mongoose.Schema;
const LoginSchema = new Schema({
  registro: {
      type: String,
      required: [true,'*Campo obrigatório!']
  },
  senha: {
      type: String,
      required: [true,'*Campo obrigatório!']
  },
});

const Login = mongoose.model('Login', LoginSchema);

app.post('/login', async function(req, res, next){
  await Login.create(req.body).then(function(login){
    res.send({id: login['_id']});
  }).catch((err) => {
    console.log(err)
    next()
  });
});

app.get('/verificacao/:id', async function(req, res, next){
  await Login.find({_id: req.params.id}).then(function(login){
    res.send(login);
  }).catch(next);
});

app.listen(port, () => {
  console.log('Servidor em execução na porta: '+ port);
});