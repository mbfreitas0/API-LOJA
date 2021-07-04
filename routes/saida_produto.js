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

 
 const saidaprodutoController = require('../controllers/saidaproduto-controller');

//RETORNA TODOS OS PRODUTOS
router.get('/', saidaprodutoController.getSaidaProdutos);

//INSERE UM PRODUTO
//router.post('/',login.obrigatorio, upload.single('imagem_produto'),produtosController.postProduto);  

//RETORNA OS DADOS DE UM PRODUTO
router.get('/:id', saidaprodutoController.getSaidaDeUmProduto);

//ALTERA UM PRODUTO
router.patch('/',login.obrigatorio, saidaprodutoController.updateSaidaProduto);

//DELETA UM PRODUTO
router.delete('/', login.obrigatorio, saidaprodutoController.deleteSaidaProduto);   


module.exports = router;
