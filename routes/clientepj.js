const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const clientepjController = require('../controllers/clientepj-controller');
const login = require('../middleware/login');


//RETORNA TODOS OS CLIENTES
router.get('/', clientepjController.getClientesPJ); 
   
//RETORNA PELO ID DO CLIENTE
router.get('/:id', clientepjController.getUmClientePJ);


//INSERE UM CLIENTE
router.post('/',clientepjController.cadastroClientePJ); 

//UPDATE NO CLIENTE
router.patch('/',clientepjController.updateClientePJ);

//DELETA UM CLIENTE
router.delete('/',clientepjController.deleteClientePJ);   


module.exports = router;

