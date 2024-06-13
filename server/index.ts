import express from 'express';
import { UserController } from './controllers/userController';
import bodyParser from 'body-parser';
import { GCardController } from './controllers/gcardController';
const app = express()
const port = 5500

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// parse various different custom JSON types as JSON
app.use(bodyParser.json())

app.use(express.static('public'))

const userController = new UserController(app);
const gcardController = new GCardController(app);

userController.listenMethods();
gcardController.listenMethods();


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// controller - responsavel por entender os pedidos do rest api
// service - responsavel por decidir as regras de negocio
// repository - responsavel por salvar e recolher informacoes salvas