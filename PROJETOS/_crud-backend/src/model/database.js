var Sequelize = require('sequelize');

const sequelize = new Sequelize (
    'mydb',// database
    'admin',// usuario
    'mbf190377',// password
    {
        host: 'localhost',
        dialect: 'mysql'
}    
);
module.exports = sequelize;