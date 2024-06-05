import express from 'express';
import { UserController } from './controllers/userController';
const app = express()
const port = 5500

const userController = new UserController(app);

userController.listenMethods();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// controller - responsavel por entender os pedidos do rest api
// service - responsavel por decidir as regras de negocio
// repository - responsavel por salvar e recolher informacoes salvas