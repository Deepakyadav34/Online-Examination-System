const mysql = require('mysql2');

const  pool = mysql.createPool({
    host: 'localhost',
    user: 'exam_user',
    password: 'strong_password',
    database: 'online_exam'
  });
  
const checkConnection = () => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Database connection successful');
    connection.release(); // Release the connection back to the pool
  });
};

module.exports = { pool, checkConnection };
