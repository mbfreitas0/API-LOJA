module.exports = {
    development: {
        database: {
            host: 'localhost',
            port: 3306,
            name: 'mydb',
            dialect: 'mysql',
            user: 'admin',
            password: 'mbf190377'
        }
    },
    production: {
        database: {
            host: process.env.DB_HOST,
            host: process.env.DB_PORT
        }
    }
}