const mysql = require('mysql');

module.exports = (() => {
    const data = require('./db_config');
    const connection = mysql.createConnection({
        host : data.host,
        port : data.port,
        user : data.user,
        password : data.password,
        database : data.database,
    });
    
    connection.connect((err) => {
        if(err) console.log(`connection err, ${err}`);
        else{
            console.log(`${data.database} is Connected`);
        }
    });

    return connection;
})();