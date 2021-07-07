const express = require('express');
const app = express();
const cors = require('cors');
const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');
const rotaUsuarios = require('./routes/usuarios');
const rotaGrupo = require('./routes/grupo');
const rotaMarca = require('./routes/marca');
const rotaLocacao = require('./routes/locacao');
const rotaCliente = require('./routes/clientes');
const rotaClientePJ = require('./routes/clientepj');
const rotaFornecedores = require('./routes/fornecedor');
const rotaEntradaProduto = require('./routes/entrada_produtos');
const rotaSaidaProduto = require('./routes/saida_produto');
const morgan = require('morgan');

app.use(cors());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({extended: false}));//ENTRADA DE DADOS SIMPLES
app.use(express.json());//ENTRADA DO EXPRESS.URLENCODED EM FORMATO JSON

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Header', '*');
    res.header('Origin, x-Requested-With, Content-Type, Access, Authorization');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
}  
    
);
 
app.use('/produtos', rotaProdutos);
app.use('/entradaprodutos',rotaEntradaProduto);
app.use('/saidaproduto',rotaSaidaProduto);
app.use('/pedidos', rotaPedidos);
app.use('/usuarios', rotaUsuarios);
app.use('/grupo', rotaGrupo);
app.use('/marca', rotaMarca);
app.use('/locacao', rotaLocacao);
app.use('/cliente', rotaCliente);
app.use('/clientepj', rotaClientePJ);
app.use('/fornecedores', rotaFornecedores);

//QUANDO NÃO É ENCONTRADA A ROTA
app.use((req, res, next) =>{
    const erro = new Error('Não encontrado !');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    return res.send({
        erro: {mensagem: error.message}
    })
});



module.exports = app;