const mysql = require('../mysql').pool;

exports.getEntradaProdutos = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error:error })}
        conn.query(
            'SELECT * FROM entrada_produtos;',
            (error, result, fields) => {
                if(error){return res.status(500).send({ error : error })}
                const response = {
                 
                 produtos: result.map(prod =>{
                     return {
                         id: prod.id,
                         id_produto: prod.id_produto,
                         qtde: prod.qtde,
                         valor_unitario: prod.valor_unitario,
                         data_entrada: prod.data_entrada,
                                                                            
                        }
                   })   
                }
                return res.status(200).send(response);
            }
        )
    });
}

exports.getEntradaDeUmProduto = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error:error })}
        conn.query(
            'SELECT * FROM entrada_produtos WHERE id = ?;',
            [req.params.id],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}

                    if (result.length == 0) {
                        return res.status(404).send({
                          mensagem: 'Não foi encontrado entrada de produto com este ID'
                        })
                        
                    }                
                const response = {
                    mensagem: 'Entrada de Produto inserida com sucesso',
                    produto:{
                        id: result[0].id,
                        id_produto:result[0].id_produto,
                        qtde:result[0].qtde,
                        valor_unitario:result[0].valor_unitario,
                        data_entrada: result[0].data_entrada,
                        
                            request: {
                            tipo: 'GET',
                            data_entrada: 'Retorna todos as etradas de produtos',
                            url: 'http://localhost:3000/entrada_produtos/'
                        }
                    }
                            
                }
                return res.status(201).send(response);
            }
        )
    });
}

exports.postEntradaDeProduto = (req, res, next) =>{
    console.log(req.file);
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'INSERT INTO entrada_produtos(id_produto, qtde, valor_unitario, data_entrada) VALUES (?, ?, ?, ?)',
            [req.body.id_produto, req.body.qtde, req.body.valor_unitario, req.body.data_entrada],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'Entrada de produto inserida com sucesso',
                    entradaCriada:{
                        id: result.id,
                        id_produto: req.body.id_produto,
                        qtde: req.body.qtde,
                        valor_unitario: req.body.valor_unitario,
                        data_entrada: req.body.data_entrada,
                        
                        request: {
                            tipo: 'POST',
                            data_entrada: 'Insere uma entrada de produto',
                            url: 'http://localhost:3000/entrada_produtos/'
                        }
                    }
                            
                }
                return res.status(201).send(response);
            }
        )   
    });
}

exports.updateEntradaProduto = (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'UPDATE entrada_produtos SET id_produto = ?, qtde = ?, valor_unitario = ?, data_entrada = ? WHERE id = ?',
           [req.body.id_produto, req.body.qtde, req.body.valor_unitario, req.body.data_entrada],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'Entrada de produto atualizada com sucesso',
                    entradaprodutoAtualizado:{
                        id: req.body.id,
                        id_produto: req.body.id_produto,
                        qtde: req.body.qtde,
                        valor_unitario: req.body.valor_unitario,
                        data_entrada: req.body.data_entrada,                        
                                                
                        request: {
                            tipo: 'GET',
                            data_entrada: 'Retorna os detalhes da entrada de um produto específico',
                            url: 'http://localhost:3000/entrada_produtos/' + req.body.id
                        }
                    }
                            
                }
                return res.status(202).send(response);
            }
        )   
    });
}

exports.deleteEntradaProduto = (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'DELETE FROM entrada_produtos WHERE id = ?',
            [req.body.id],
            (error, resultado, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'Entrada de produto removida com sucesso',
                    request: {
                        tipo: 'POST',
                        data_entrada: 'Insere uma entrada de produto',
                        url: 'http://localhost:3000/entrada_produtos/',
                        body:{
                            id_produto: 'Number',
                            qtde: 'Number',
                            valor_unitario: 'Number',
                            data_entrada: 'String',
                            
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )   
    });
}