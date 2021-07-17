const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const connection = require("../db_connection");

router.post('/login', (req, res) => {
    const item = req.body;
    let result = Boolean;
    connection.query(
        `SELECT * FROM TB_MEMBER_INFO WHERE MEM_USERID = '${item.user_id}'`,
        (err, rows, fields) => {
            if(err) console.log(err);

            // ID 없음
            if(Array.isArray(rows) && rows.length === 0 && rows[0] === undefined)
            {
                console.log('9999');
                return res.send();
            } 
            
            // 비밀번호 확인
            else
            {
                if(rows.length !== 0) {
                    if(err) console.log(err);

                    result = bcrypt.compareSync(item.user_password, rows[0].MEM_PASSWORD);

                    // 성공
                    if(result){
                        return res.send(rows[0]);
                    }else{
                        return res.send();
                    }
                }
            };
        }
    )

});

router.get('/login/dev', (req, res) => {
    let is = null;
    connection.query(
        "SELECT * FROM TB_MEMBER_INFO where MEM_PK = 1;",
        (err, rows, fields) => {
            if (err) console.log(err);
            
            res.status(200).send(rows[0]);
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