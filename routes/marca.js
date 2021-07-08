const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const marcaController = require('../controllers/marca-controller');
const login = require('../middleware/login');


//RETORNA TODAS AS MARCAS
router.get('/', marcaController.getMarca); 
   
//RETORNA PELO ID DA MARCA
router.get('/:id', login.obrigatorio, marcaController.getUmaMarca);


//INSERE UMA MARCA
router.post('/', login.obrigatorio, marcaController.postMarca); 

//UPDATE DAS MARCAS
router.patch('/', login.obrigatorio, marcaController.updateMarca);

//DELETA UMA MARCA
router.delete('/', login.obrigatorio, marcaController.deleteMarca);   


module.exports = router;

