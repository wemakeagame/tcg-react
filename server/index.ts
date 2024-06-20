import express from 'express';
import bodyParser from 'body-parser';
import { UserController } from './controllers/userController';
import { GCardController } from './controllers/gcardController';
import { LobbyController } from './controllers/lobbyController';

const app = express();
const port = 5500;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

// parse various different custom JSON types as JSON
app.use(bodyParser.json());

app.use(express.static('public'));

const userController = new UserController(app);
const gcardController = new GCardController(app);
const lobbyController = new LobbyController(app);

userController.listenMethods();
gcardController.listenMethods();
lobbyController.listenMethods();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// controller - responsavel por entender os pedidos do rest api
// service - responsavel por decidir as regras de negocio
// repository - responsavel por salvar e recolher informacoes salvas
