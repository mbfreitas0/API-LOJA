const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const fornecedorController = require('../controllers/fornecedor-controller');

//RETORNA TODOS OS FORNECEDORES
router.get('/', fornecedorController.getFornecedor); 
   
//RETORNA PELO ID DO FORNECEDOR
router.get('/:id', fornecedorController.getUmFornecedor);


//INSERE UM FORNECEDOR
router.post('/',fornecedorController.cadastroFornecedor); 

//UPDATE NO FORNECEDOR
router.patch('/',fornecedorController.updateFornecedor);

//DELETA UM FORNECEDOR
router.delete('/',fornecedorController.deleteFornecedor);   


module.exports = router;

