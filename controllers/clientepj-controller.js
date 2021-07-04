const mysql = require('../mysql').pool;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.cadastroClientePJ = (req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query('SELECT * FROM clientepj WHERE nome = ?, endereco = ?, cep = ?, cidade = ?, uf = ?, telefone = ?, cnpj = ?, ie = ?, email = ?',
        [req.body.nome, req.body.endereco, req.body.cep, req.body.cidade, req.body.uf, req.body.telefone, req.body.cnpj, req.body.ie, req.body.email],(error, results)=>{
            if(error){return res.status(500).send({error:error})}
                if(results.length > 0){
                    res.status(409).send({mensagem: 'Cliente já cadastrado'})
                    }else{
                         conn.query(
                            'INSERT INTO clientes (nome, endereco, cidade, uf, cep, telefone, cnpj, ie, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                            [req.body.nome, req.body.endereco, req.body.cidade, req.body.uf, req.body.cep, req.body.telefone, req.body.cnpj, req.body.ie, req.body.email],
                            (error, results)=>{
                                conn.release();
                                if(error){return res.status(500).send({error:error})}
                                response = {
                                    mensagem: 'Cliente PJ criado com sucesso !',
                                    clienteCriado: {
                                        id: results.id,
                                        nome: req.body.nome,
                                        endereco: req.body.endereco,
                                        cidade: req.body.cidade,
                                        uf: req.body.uf,
                                        cep: req.body.cep,
                                        telefone: req.body.telefone,
                                        cnpj: req.body.cnpj,
                                        ie: req.body.ie,
                                        email: req.body.email,                                    }
                                }
                                return res.status(201).send(response);
                            }
                        ) 
                    
                }
        })
        
        
    });
}

exports.getClientesPJ = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error:error })}
        conn.query(
            'SELECT * FROM clientepj;',
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
                         cnpj:cli.cnpj,
                         ie:cli.ie,
                         email: cli.email,
                                                                           
                        }
                   })   
                }
                return res.status(200).send(response);
            }
        )
    });
}

exports.getUmClientePJ = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error:error })}
        conn.query(
            'SELECT * FROM clientepj WHERE id = ?;',
            [req.params.id],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}

                    if (result.length == 0) {
                        return res.status(404).send({
                          mensagem: 'Não foi encontrado cliente PJ com este ID'
                        })
                        
                    }                
                const response = {
                    mensagem: 'Cliente PJ inserido com sucesso',
                    usuario:{
                        id: result[0].id,
                        nome:result[0].nome,
                        endereco:result[0].endereco,
                        cidade:result[0].cidade,
                        uf:result[0].uf,
                        cep:result[0].cep,
                        telefone:result[0].telefone,
                        cnpj:result[0].cnpj,
                        ie:result[0].ie,
                        email:result[0].email,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os clientes PJ',
                            url: 'http://localhost:3000/clientespj/'
                        }
                    }
                            
                }
                return res.status(201).send(response);
            }
        )
    });
}

exports.updateClientePJ = (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'UPDATE clientepj SET nome = ? WHERE id = ?',
            [req.body.nome,],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'Cliente PJ atualizado com sucesso',
                    grupoAtualizado:{
                        id: req.body.id,
                        nome: req.body.nome,
                        endereco: req.body.endereco,
                        cidade: req.body.cidade,
                        uf: req.body.uf,
                        cep: req.body.cep,
                        telefone: req.body.telefone,
                        cnpj: req.body.cnpj,
                        ie: req.body.ie,
                        email: req.body.email,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna os detalhes de um cliente PJ específico',
                            url: 'http://localhost:3000/clientepj/' + req.body.id
                        }
                    }
                            
                }
                return res.status(202).send(response);
            }
        )   
    });
}

exports.deleteClientePJ = (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'DELETE FROM clientepj WHERE id = ?',
            [req.body.id],
            (error, resultado, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'clientepj removido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um cliente PJ',
                        url: 'http://localhost:3000/clientepj/',
                        body:{
                            nome: 'String',
                            endereco: 'String',
                            cep: 'String',
                            cidade: 'String',
                            uf: 'String',
                            telefone: 'String',
                            cnpj: 'String',
                            ie: 'String',
                            email: 'String',                                                
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )   
    });
}

