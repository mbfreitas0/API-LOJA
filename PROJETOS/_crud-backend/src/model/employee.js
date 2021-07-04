const Sequelize = require ('sequelize');
var sequelize = require('./database');
const funcao = require('./funcao');
//import funcao for FK funcaoId
var nametable = 'empregado';
var Funcao = require('./funcao');

var Employee = sequelize.define(nametable,
    {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name:Sequelize.STRING,
        email:Sequelize.STRING,
        address:Sequelize.STRING,
        phone:Sequelize.BIGINT,
        //Chave estrangeira
        funcaoId:{
            type: Sequelize.INTEGER,
            //this is a refence to another model
            refences: {
                model: Funcao,
                key: 'id'
            }
        },

})
        Employee.belongsTo(Funcao);
        module.exports = Employee;