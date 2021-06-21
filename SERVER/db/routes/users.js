const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const connection = require("../db_connection");

router.get('/', (req, res) => {
    let is = null;
    connection.query(
        "SELECT * FROM TB_MEMBER_INFO where MEM_PK = 1;",
        (err, rows, fields) => {
            if (err) console.log(err);
            is = bcrypt.compareSync('12345', rows[0].MEM_PASSWORD);
            
            res.status(200).send(is);
        }
    );

    // return is;
});

router.post('/register', (req, res) => {
    return res.status(200).send(req.body)
    // bcrypt.genSalt(saltRounds, (err, salt) => {
    //     bcrypt.hash(req.body.password, salt, (err, hash) => {
    //         let SQL = "INSERT INTO TB_MEMBER_INFO(MEM_USERID, MEM_PASSWORD, MEM_NAME, MEM_EMAIL) VALUES(?, ?, ?, ?)"
    //         let name = req.body.name;
    //         let id = req.body.id;
    //         let password = hash;
    //         let email = req.body.email;

    //         let params = [id, password, name, email];

    //         connection.query(SQL, params,
    //             (err, rows) => {
    //                 if (err) console.log(err);
    //                 console.log(req.body);
    //                 console.log(rows);

    //                 return res.status(200).json(req.body);
    //             }
    //         );
    //     });
    // });

});

module.exports = router;