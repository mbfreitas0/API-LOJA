const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const pedidosController = require('../controllers/pedidos-controller');

//RETORNA TODOS OS PEDIDOS
router.get('/', pedidosController.getPedidos); 
   
//RETORNA PELO ID DO PEDIDO
router.get('/:id_pedido', pedidosController.getUmpedido);


//INSERE UM PEDIDO
router.post('/',pedidosController.postPedidos); 

//UPDATE DOS PEDIDOS
router.patch('/',pedidosController.updatePedidos);

//DELETA UM PEDIDO
router.delete('/',login.obrigatorio,pedidosController.deletePedidos);   


module.exports = router;

