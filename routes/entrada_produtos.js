const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
//const multer = require('multer');
const login = require('../middleware/login');

/* const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});
const fileFilter = (req, file, cb)=>{
    if (file.mimetype === 'image/jpg' || file.mimetype ==='image/png' || file.mimetype ==='image/webp'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:fileFilter
 }); */

 
 const entradaprodutosController = require('../controllers/entradaprodutos_controller');

//RETORNA TODOS OS PRODUTOS
router.get('/', entradaprodutosController.getEntradaProdutos);

//INSERE UM PRODUTO
//router.post('/',login.obrigatorio, upload.single('imagem_produto'),produtosController.postProduto);  

//RETORNA OS DADOS DE UM PRODUTO
router.get('/:id', entradaprodutosController.getEntradaDeUmProduto);

//ALTERA UM PRODUTO
router.patch('/',login.obrigatorio, entradaprodutosController.updateEntradaProduto);

//DELETA UM PRODUTO
router.delete('/', login.obrigatorio, entradaprodutosController.deleteEntradaProduto);   


module.exports = router;
