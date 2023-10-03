const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestion_blog'
});

connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à MySQL : ' + err.stack);
        return;
    }
    console.log('Connecté à MySQL en tant qu\'id ' + connection.threadId);
});

module.exports = connection;
