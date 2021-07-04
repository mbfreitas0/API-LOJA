const usercontrollers = {}
//import model and sequelize
var sequelize = require('../model/database');
var User = require('../model/Users');
//var Funcao = require('../model/funcao');

sequelize.sync();

 controllers.delete = async (req,res) => {

    // parameter post
    const { id } = req.body;
    // delete sequelize
    const del = await Users.destroy({
      where: { id: id }
    })
    res.json({success:true, deleted:del, message:"Deleted successful"});
  
  }
  
  controllers.update = async (req, res) => {
    // parameter id get
    const { id } = req.params;
    // parameter post
    const { username, password} = req.body;
    // update data
    const data = await User.update({
      username: username,
      password: password,
      
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
    const data = await User.findAll({
        where: { id: id },
        
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
    const data = await User.findAll({
        
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
  const {username, password} = req.body;
  //console.log("Usuarios é ==>"+Users)
  
  //create
  const data = await User.create({
    username:username,
    password:password
    
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
 

module.exports = usercontrollers;