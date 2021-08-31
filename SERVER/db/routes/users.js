const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
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
                console.log(`req.id is undefined`);
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
    
    connection.query(
        "SELECT * FROM TB_MEMBER_INFO where MEM_PK = 10;",
        (err, rows, fields) => {
            if (err) console.log(err);
            
            res.status(200).send(rows[0]);
        }
    );

});

router.get('/project/work', (req, res) => {
    const SQL =
        `SELECT
    TB_MEMBER_INFO.MEM_PK AS id,
    TB_MEMBER_INFO.MEM_DEPT_NO,
    TB_DEPART_LIST.DEPART_NAME,
    TB_MEMBER_INFO.MEM_USERID,
    TB_MEMBER_INFO.MEM_NAME,
    TB_MEMBER_INFO.MEM_EMAIL,
    TB_MEMBER_INFO.MEM_IMAGE,
    TB_MEMBER_INFO.MEM_INSIDE_YN
    FROM TB_DEPART_LIST
    INNER JOIN TB_MEMBER_INFO
    ON TB_MEMBER_INFO.MEM_DEPT_NO = TB_DEPART_LIST.DEPART_PK
    WHERE TB_MEMBER_INFO.MEM_DEL_YN = 'N';`
    connection.query(SQL, (err, rows, fields) => {
        if (err) console.log(err);

        res.status(200).send(rows);
    });
});

module.exports = router;