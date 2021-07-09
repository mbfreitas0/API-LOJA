const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const locacaoController = require('../controllers/locacao-controller');
const login = require('../middleware/login');

//RETORNA TODAS AS LOCAÇÕES
router.get('/', locacaoController.getLocacao); 
   
//RETORNA PELO ID DA LOCACAO
router.get('/:id', locacaoController.getUmaLocacao);


//INSERE UMA LOCACAO
router.post('/', login.obrigatorio, login.obrigatorio, locacaoController.postLocacao); 

//UPDATE DAS LOCACAO
router.patch('/:id', login.obrigatorio, locacaoController.updateLocacao);

//DELETA UMA LOCACAO
router.delete('/', login.obrigatorio, locacaoController.deleteLocacao);   


module.exports = router;

