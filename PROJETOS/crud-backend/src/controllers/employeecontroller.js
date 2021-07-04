const controllers = {}
//import model and sequelize
var sequelize = require('../model/database');
var Employee = require('../model/employee');
var Funcao = require('../model/funcao');

 sequelize.sync();

 controllers.delete = async (req,res) => {

    // parameter post
    const { id } = req.body;
    // delete sequelize
    const del = await Employee.destroy({
      where: { id: id }
    })
    res.json({success:true, deleted:del, message:"Deleted successful"});
  
  }
  
  controllers.update = async (req, res) => {
    // parameter id get
    const { id } = req.params;
    // parameter post
    const { name, email, phone, address, funcao } = req.body;
    // update data
    const data = await Employee.update({
      name: name,
      email:email,
      address:address,
      phone:phone,
      funcaoId:funcao
    },{
      where: { id: id}
    })
    .then( function (data){
      return data;
    })
    .catch(error => {
      return error;
    })
  
    res.json({ success:true, data: data, message: "Updated successful"});
  
  }
 
 controllers.get = async(req, res) => {
    const { id } = req.params;
    const data = await Employee.findAll({
        where: { id: id },
        include: [ Funcao ]
    })
    .then(function(data){
      return data;
    })
    .catch(error =>{
      return error;
    })
    res.json({ success: true, data: data });
    
 }

controllers.list = async(req, res) => {
    const data = await Employee.findAll({
        include: [Funcao]
    })
     .then(function(data){
        return data;
    })
    .catch(error =>{    
        return error;
    })
    
    res.json({success: true, data:data});
}
controllers.create = async (req,res) => {

  // DATA parametros desde post
  const {name, email, address, phone, funcao } = req.body;
  console.log("Função é ==>"+funcao)
  //create
  const data = await Employee.create({
    name:name,
    email:email,
    address:address,
    phone:phone,
    funcaoId:funcao
  })
  .then(function(data){
    return data;
  })
  .catch(error=>{
    console.log(error)
    return error;
  })
  // return res
  res.status(200).json({
    success:true,
    message:"Salvo com Sucesso "+data.id,
    data:data
  })

}
 
 /* controllers.testdata = async (req, res) => {
     const response = await sequelize.sync().then(function(){

        //Create funcao
        Funcao.create({
            funcao: 'Admin'

        });
        //Create employee
        Employee.create({
            name: 'Melissa Leitao Fiuza de Freitas',
            email: 'melissaleitao@email.com',
            address: 'Itapetininga 18208720',
            phone: '1234567890',
            funcaoId: 1
        }); */

/*         //Busca todos os dados dos empregado 
        const data = Employee.findAll
        return data;
     })
     .catch(error => {
         return error;
     });
     
     res.json({success: true, data: response}); */



/* controllers.test = (req, res) => {
    const data = {
        name: 'John Smith',
        age: 24,
        city: 'Madrid'      
    }*/

    /*console.log("Execute from controllers employee")
    res.json(data)*/



module.exports = controllers;