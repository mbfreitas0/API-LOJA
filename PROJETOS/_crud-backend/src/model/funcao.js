const Sequelize = require ('sequelize');
var sequelize = require('./database');
var nametable = 'funcao';
var Funcao = sequelize.define(nametable,{
    funcao: Sequelize.STRING
},
{
    //remove createat and updateat
    timestamps:false,
});
module.exports = Funcao;  