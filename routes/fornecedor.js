const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const fornecedorController = require('../controllers/fornecedor-controller');
const login = require('../middleware/login');

//RETORNA TODOS OS FORNECEDORES
router.get('/', fornecedorController.getFornecedor); 
   
//RETORNA PELO ID DO FORNECEDOR
router.get('/:id', fornecedorController.getUmFornecedor);


//INSERE UM FORNECEDOR
router.post('/', login.obrigatorio,fornecedorController.cadastroFornecedor); 

//UPDATE NO FORNECEDOR
router.patch('/', login.obrigatorio, fornecedorController.updateFornecedor);

//DELETA UM FORNECEDOR
router.delete('/', login.obrigatorio,fornecedorController.deleteFornecedor);   


module.exports = router;

