const mysql = require('mysql');


const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'qlks_update',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection success ');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mysqlConnection;