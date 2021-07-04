const mysql = require('../mysql').pool;

exports.getSaidaProdutos = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error:error })}
        conn.query(
            'SELECT * FROM saida_produto;',
            (error, result, fields) => {
                if(error){return res.status(500).send({ error : error })}
                const response = {
                 
                 produtos: result.map(prod =>{
                     return {
                         id: prod.id,
                         id_produto: prod.id_produto,
                         qtde: prod.qtde,
                         data_saida: prod.data_saida,
                         valor_unitario: prod.valor_unitario,
                                                                            
                        }
                   })   
                }
                return res.status(200).send(response);
            }
        )
    });
}

exports.getSaidaDeUmProduto = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error:error })}
        conn.query(
            'SELECT * FROM saida_produto WHERE id = ?;',
            [req.params.id],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}

                    if (result.length == 0) {
                        return res.status(404).send({
                          mensagem: 'Não foi encontrado saida de produto com este ID'
                        })
                        
                    }                
                const response = {
                    mensagem: 'Saida de Produto inserida com sucesso',
                    produto:{
                        id: result[0].id,
                        id_produto:result[0].id_produto,
                        qtde:result[0].qtde,
                        data_saida: result[0].data_saida,
                        valor_unitario:result[0].valor_unitario,
                        
                        
                            request: {
                            tipo: 'GET',
                            data_entrada: 'Retorna todos as saidas de produtos',
                            url: 'http://localhost:3000/saida_produto/s'
                        }
                    }
                            
                }
                return res.status(201).send(response);
            }
        )
    });
}

exports.postSaidaDeProduto = (req, res, next) =>{
    console.log(req.file);
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'INSERT INTO saida_produto(id_produto, qtde, data_saida, valor_unitario ) VALUES (?, ?, ?, ?)',
            [req.body.id_produto, req.body.qtde, req.body.data_saida, req.body.valor_unitario],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'Saida de produto inserida com sucesso',
                    saidaCriada:{
                        id: result.id,
                        id_produto: req.body.id_produto,
                        qtde: req.body.qtde,
                        data_saida: req.body.data_saida,
                        valor_unitario: req.body.valor_unitario,
                                                
                        request: {
                            tipo: 'POST',
                            data_saida: 'Insere uma saida de produto',
                            url: 'http://localhost:3000/saida_produto/'
                        }
                    }
                            
                }
                return res.status(201).send(response);
            }
        )   
    });
}

exports.updateSaidaProduto = (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'UPDATE saida_produto SET id_produto = ?, qtde = ?, data_saida = ?, valor_unitario = ?  WHERE id = ?',
           [req.body.id_produto, req.body.qtde, req.body.data_saida, req.body.valor_unitario],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'Saida de produto atualizada com sucesso',
                    saidaprodutoAtualizado:{
                        id: req.body.id,
                        id_produto: req.body.id_produto,
                        qtde: req.body.qtde,
                        data_saida: req.body.data_saida,
                        valor_unitario: req.body.valor_unitario,
                                                
                                                
                        request: {
                            tipo: 'GET',
                            data_entrada: 'Retorna os detalhes da saida de um produto específico',
                            url: 'http://localhost:3000/saida_produto/' + req.body.id
                        }
                    }
                            
                }
                return res.status(202).send(response);
            }
        )   
    });
}

exports.deleteSaidaProduto = (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'DELETE FROM saida_produto WHERE id = ?',
            [req.body.id],
            (error, resultado, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'Saida de produto removida com sucesso',
                    request: {
                        tipo: 'POST',
                        data_saida: 'Insere uma saida de produto',
                        url: 'http://localhost:3000/saida_produtos/',
                        body:{
                            id_produto: 'Number',
                            qtde: 'Number',
                            data_entrada: 'String',
                            valor_unitario: 'Number',
                            
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )   
    });
}