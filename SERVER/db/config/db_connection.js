const mysql = require('mysql');

module.exports = (() => {
    const data = require('./db_config');
    const connection = mysql.createConnection({
        host     : data.host,
        port     : data.port,
        user     : data.user,
        password : data.password,
        database : data.database
    });
    
    connection.connect((err) => {
        if(err) console.log(`MySQL 커넥션 에러, ${err}`);
        else{
            console.log(`${data.database} is Connected`);
        }
    });

    return connection;
})();