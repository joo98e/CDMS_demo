const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const connection = require("../db_connection");

// MyBatis
const myBatisMapper = require('mybatis-mapper');
myBatisMapper.createMapper(['./db/xml/Member/Member.xml']);
const format = require('../config/MyBatisFormat');
const MybatisMapper = require('mybatis-mapper');

router.post('/login', (req, res) => {
    const item = req.body;
    const condition = {
        id: req.body.id,
        password: req.body.password,
        delete_yn: 'N'
    }
    const SQL = myBatisMapper.getStatement("Member", "getCompareId", condition, format);

    let result = Boolean;
    connection.query(SQL, (err, rows, fields) => {
        if (err) {
            console.log(err);
            return res.status(400).send({
                result: false,
                resultCode: -1,
                resultMessage: "알 수 없는 오류입니다."
            });
        }
        // ID 없음
        if (Array.isArray(rows) && rows.length === 0 && rows[0] === undefined) {
            return res.status(200).send({
                result: false,
                resultCode: -2,
                resultMessage: "일치하는 아이디가 없습니다."
            });
        }
        
        // 비밀번호 확인
        else {
            if (rows.length !== 0) {
                if (err) {
                    console.log(err);
                    return res.status(400).send({
                        result: false,
                        resultCode: -1,
                        resultMessage: "알 수 없는 오류입니다."
                    });
                }

                result = bcrypt.compareSync(condition.password, rows[0].password);

                // 성공
                if (result) {
                    if (rows[0].ref_auth_id === 0) {
                        return res.status(200).send({
                            resultCode: -1,
                            resultMessage: "권한을 부여받지 못한 아이디입니다."
                        });
                    } else {
                        return res.status(200).send(rows[0]);
                    }
                } else {
                    return res.status(200).send({
                        result: false,
                        resultCode: -3,
                        resultMessage: "패스워드 컴페어 실패"
                    });
                }
            }
        };
    }
    )

});

router.get('/login/dev', (req, res) => {
    const condition = {
        id : 'dev',
        delete_yn : 'N'
    }
    const SQL = MybatisMapper.getStatement('Member', 'devLogin', condition, format);
    connection.query(SQL, (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.status(400).send({
                result: false,
                resultCode: -1,
                resultMessage: "알 수 없는 오류"
            })
        };

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
        if (err) {
            console.log(err)
            res.status(400).send({
                result: false,
                resultCode: -1,
                resultMessage: "알 수 없는 오류"
            })
        };

        res.status(200).send(rows);
    });
});

module.exports = router;