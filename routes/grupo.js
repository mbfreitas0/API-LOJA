const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const grupoController = require('../controllers/grupo-controller');
const login = require('../middleware/login');


//RETORNA TODOS OS PEDIDOS
router.get('/', grupoController.getGrupo); 
   
//RETORNA PELO ID DO PEDIDO
router.get('/:id', login.obrigatorio, grupoController.getUmGrupo);


//INSERE UM PEDIDO
router.post('/', login.obrigatorio, grupoController.postGrupo); 

//UPDATE DOS PEDIDOS
router.patch('/:id', login.obrigatorio, grupoController.updateGrupo);

//DELETA UM PEDIDO
router.delete('/', login.obrigatorio, grupoController.deleteGrupo);   


module.exports = router;

