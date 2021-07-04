const mysql = require('../mysql').pool;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.cadastroCliente = (req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query('SELECT * FROM clientes WHERE nome = ?, endereco = ?, cep = ?, cidade = ?, uf = ?, telefone = ?',
        [req.body.nome, req.body.endereco, req.body.cep, req.body.cidade, req.body.uf, req.body.telefone],(error, results)=>{
            if(error){return res.status(500).send({error:error})}
                if(results.length > 0){
                    res.status(409).send({mensagem: 'Cliente já cadastrado'})
                    }else{
                         conn.query(
                            'INSERT INTO clientes (nome, endereco, cidade, uf, cep, telefone) VALUES (?, ?, ?, ?, ?, ?)',
                            [req.body.nome, req.body.endereco, req.body.cidade, req.body.uf, req.body.cep, req.body.telefone],
                            (error, results)=>{
                                conn.release();
                                if(error){return res.status(500).send({error:error})}
                                response = {
                                    mensagem: 'Cliente criado com sucesso !',
                                    clienteCriado: {
                                        id: results.id,
                                        nome: req.body.nome,
                                        endereco: req.body.endereco,
                                        cidade: req.body.cidade,
                                        uf: req.body.uf,
                                        cep: req.body.cep,
                                        telefone: req.body.telefone
                                    }
                                }
                                return res.status(201).send(response);
                            }
                        ) 
                    
                }
        })
        
        
    });
}

exports.getClientes = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error:error })}
        conn.query(
            'SELECT * FROM clientes;',
            (error, result, fields) => {
                if(error){return res.status(500).send({ error : error })}
                const response = {
                 
                 clientes: result.map(cli =>{
                     return {
                         id: cli.id,
                         nome: cli.nome,
                         endereco: cli.endereco,
                         cidade: cli.cidade,
                         uf: cli.uf,
                         cep: cli.cep,
                         telefone: cli.telefone,
                                                                           
                        }
                   })   
                }
                return res.status(200).send(response);
            }
        )
    });
}

exports.getUmCliente = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error:error })}
        conn.query(
            'SELECT * FROM clientes WHERE id = ?;',
            [req.params.id],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}

                    if (result.length == 0) {
                        return res.status(404).send({
                          mensagem: 'Não foi encontrado cliente com este ID'
                        })
                        
                    }                
                const response = {
                    mensagem: 'Cliente inserido com sucesso',
                    usuario:{
                        id: result[0].id,
                        nome:result[0].nome,
                        endereco:result[0].endereco,
                        cidade:result[0].cidade,
                        uf:result[0].uf,
                        cep:result[0].cep,
                        telefone:result[0].telefone,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os clientes',
                            url: 'http://localhost:3000/clientes/'
                        }
                    }
                            
                }
                return res.status(201).send(response);
            }
        )
    });
}

exports.updateCliente = (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'UPDATE clientes SET nome = ? WHERE id = ?',
            [req.body.nome,],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'Cliente atualizado com sucesso',
                    grupoAtualizado:{
                        id: req.body.id,
                        nome: req.body.nome,
                        endereco: req.body.endereco,
                        cidade: req.body.cidade,
                        uf: req.body.uf,
                        cep: req.body.cep,
                        telefone: req.body.telefone,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna os detalhes de um cliente específico',
                            url: 'http://localhost:3000/cliente/' + req.body.id
                        }
                    }
                            
                }
                return res.status(202).send(response);
            }
        )   
    });
}

exports.deleteCliente = (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'DELETE FROM clientes WHERE id = ?',
            [req.body.id],
            (error, resultado, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'cliente removido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um cliente',
                        url: 'http://localhost:3000/clientes/',
                        body:{
                            nome: 'String',
                            endereco: 'String',
                            cep: 'String',
                            cidade: 'String',
                            uf: 'String',
                            telefone: 'String',                                                
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )   
    });
}

