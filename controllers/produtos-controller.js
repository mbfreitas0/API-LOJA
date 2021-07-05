const mysql = require('../mysql').pool;

exports.getProdutos = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error:error })}
        conn.query(
            'SELECT * FROM produtos;',
            (error, result, fields) => {
                if(error){return res.status(500).send({ error : error })}
                const response = {
                 
                 produtos: result.map(prod =>{
                     return {
                         id: prod.id,
                         id_grupo: prod.id_grupo,
                         id_marca: prod.id_marca,
                         id_locacao: prod.id_locacao,
                         status:prod.status,
                         descricao: prod.descricao,
                         estoque_min: prod.estoque_min,
                         estoque_max: prod.estoque_max,
                                                   
                        }
                   })   
                }
                return res.status(200).send(response);
            }
        )
    });
}

exports.getUmproduto = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error:error })}
        conn.query(
            'SELECT * FROM produtos WHERE id = ?;',
            [req.params.id],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}

                    if (result.length == 0) {
                        return res.status(404).send({
                          mensagem: 'Não foi encontrado produto com este ID'
                        })
                        
                    }                
                const response = {
                    mensagem: 'Produto inserido com sucesso',
                    produto:{
                        id: result[0].id,
                        id_grupo:result[0].id_grupo,
                        id_marca:result[0].id_marca,
                        id_locacao:result[0].id_locacao,
                        descricao: result[0].descricao,
                        estoque_min: result[0].estoque_min,
                        estoque_max: result[0].estoque_max,                      
                            request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os produtos',
                            url: 'http://localhost:3000/produtos/'
                        }
                    }
                            
                }
                return res.status(201).send(response);
            }
        )
    });
}

exports.postProduto = (req, res, next) =>{
    console.log(req.file);
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'INSERT INTO produtos(id_grupo, id_marca, id_locacao, descricao, estoque_min, estoque_max) VALUES (?, ?, ?, ?, ?, ?)',
            [req.body.id_grupo, req.body.id_marca, req.body.id_locacao, req.body.descricao, req.body.estoque_min, req.body.estoque_max],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'Produto inserido com sucesso',
                    produtoCriado:{
                        id: result.id,
                        id_grupo: req.body.id_grupo,
                        id_marca: req.body.id_marca,
                        id_locacao: req.body.id_locacao,
                        descricao: req.body.descricao,
                        estoque_min: req.body.estoque_min,
                        estoque_max: req.body.estoque_max,
                        
                        
                        request: {
                            tipo: 'POST',
                            descricao: 'Insere um produto',
                            url: 'http://localhost:3000/produtos/'
                        }
                    }
                            
                }
                return res.status(201).send(response);
            }
        )   
    });
}

exports.updateProduto = (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'UPDATE produtos SET id_grupo = ?, id_marca = ?, id_locacao = ?, descricao = ?, estoque_min = ?, estoque_max = ?  WHERE id = ?',
           [req.body.id_grupo, req.body.id_marca, req.body.id_locacao, req.body.descricao, req.body.estoque_max, req.body.estoque_min, req.body.qtd_estoque, req.body.imagem_produto],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'Produto atualizado com sucesso',
                    produtoAtualizado:{
                        id: req.body.id,
                        id_grupo: req.body.id_grupo,
                        id_marca: req.body.id_marca,
                        id_locacao: req.body.id_locacao,
                        descricao: req.body.descricao,                        
                        estoque_min: req.body.estoque_min,
                        estoque_max: req.body.estoque_max,
                        
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna os detalhes de um produto específico',
                            url: 'http://localhost:3000/produtos/' + req.body.id
                        }
                    }
                            
                }
                return res.status(202).send(response);
            }
        )   
    });
}

exports.deleteProduto = (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'DELETE FROM produtos WHERE id = ?',
            [req.body.id],
            (error, resultado, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'produto removido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um produto',
                        url: 'http://localhost:3000/produtos/',
                        body:{
                            id_grupo: 'Number',
                            id_marca: 'Number',
                            id_locacao: 'Number',
                            descricao: 'String',
                            estoque_min: 'Number',
                            estoque_max: 'Number',
                            
                            
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )   
    });
}