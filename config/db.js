import mysql from 'mysql2';

const conn = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: '', 
    database: 'agenda_medica'
});

conn.connect((err) => { 
    if (err) {
        console.error('Erro ao conectar com Banco de dados.', err);
        return;
    }
    console.log('Sucesso! Conectado ao Banco de dados.');
});

export default conn;