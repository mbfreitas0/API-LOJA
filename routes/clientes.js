const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const clientesController = require('../controllers/clientes-controller');
const login = require('../middleware/login');


//RETORNA TODOS OS CLIENTES
router.get('/', clientesController.getClientes); 
   
//RETORNA PELO ID DO CLIENTE
router.get('/:id', clientesController.getUmCliente);


//INSERE UM CLIENTE
router.post('/',clientesController.cadastroCliente); 

//UPDATE NO CLIENTE
router.patch('/:id',clientesController.updateCliente);

//DELETA UM CLIENTE
router.delete('/',clientesController.deleteCliente);   


module.exports = router;

