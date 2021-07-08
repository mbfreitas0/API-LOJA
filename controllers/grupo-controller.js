const mysql = require('../mysql').pool;

exports.getGrupo = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error:error })}
        conn.query(
            'SELECT * FROM grupo;',
            (error, result, fields) => {
                if(error){return res.status(500).send({ error : error })}
                const response = {
                 quantidade: result.length,
                 grupo: result.map(grup =>{
                     return {
                         id: grup.id,
                         grupo: grup.grupo,
                         request: {
                             tipo: 'GET',
                             descricao: 'Retorna os detalhes de um grupo específico',
                             url: 'http://localhost:3000/grupo/' + grup.id
                           }   
                        }
                   })   
                }
                return res.status(200).send(response);
            }
        )
    });
}

exports.getUmGrupo = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error:error })}
        conn.query(
            'SELECT * FROM grupo WHERE id = ?;',
            [req.params.id],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}

                    if (result.length == 0) {
                        return res.status(404).send({
                          mensagem: 'Não foi encontrado grupo com este ID'
                        })
                        
                    }                
                const response = {
                    mensagem: 'Grupo inserido com sucesso',
                    produto:{
                        id:result[0].id,
                        grupo: result[0].grupo,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os grupos',
                            url: 'http://localhost:3000/grupos/'
                        }
                    }
                            
                }
                return res.status(201).send(response);
            }
        )
    });
}

exports.postGrupo = (req, res, next) =>{
    console.log(req.file);
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'INSERT INTO grupo(grupo) VALUES (?);',
            [req.body.grupo, req.file.path],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'Grupo inserido com sucesso',
                    grupoCriado:{
                        id: req.body.id,
                        grupo: req.body.grupo,
                        request: {
                            tipo: 'POST',
                            descricao: 'Insere um grupo',
                            url: 'http://localhost:3000/grupo/'
                        }
                    }
                            
                }
                return res.status(201).send(response);
            }
        )   
    });
}

exports.updateGrupo = (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'UPDATE grupo SET grupo = ? WHERE id = ?;',
            [req.body.grupo,],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'Grupo atualizado com sucesso',
                    grupoAtualizado:{
                        id: req.body.id,
                        grupo: req.body.grupo,                        
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

exports.deleteGrupo = (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'DELETE FROM grupo WHERE id = ?;',
            [req.body.id],
            (error, resultado, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'grupo removido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um grupo',
                        url: 'http://localhost:3000/grupo/',
                        body:{
                            id: 'Number',
                            grupo: 'String',
                            
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )   
    });
}