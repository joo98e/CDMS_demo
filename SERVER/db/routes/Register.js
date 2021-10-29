//

const express = require('express');
const router = express.Router();
const connection = require("../db_connection");
const getDest = require("../common/getDest");
// 암호화
const bcrypt = require("bcrypt");
const saltRounds = 10;

// 업로더
const multer = require('multer');

// MyBatis
const myBatisMapper = require('mybatis-mapper');
myBatisMapper.createMapper(['./db/xml/Register/RegisterMember.xml']);
const format = require('../config/MyBatisFormat');

const getNow = require("../func/getNow");

// 실제 클라이언트 요청 경로
const requestDir = '/static/avatars/items/';

const avatarStorage = multer({
    storage: multer.diskStorage({
        // 실제 업로드 경로
        destination: `${getDest}/avatars/items/user/`,
        filename: function (req, file, cb) {
            cb(null, `avatar_${Date.now()}_${file.originalname}`);
        }
    }),
});

router.post('/signUp', avatarStorage.single('avatar_file'), (req, res) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            return res.status(500).send({
                result: {},
                resultCode: -1,
                resultMessage: "패스워드 암호화 실패 #1"
            });
        }

        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
                console.log(err);

                return res.status(500).send({
                    result: {},
                    resultCode: -1,
                    resultMessage: "패스워드 암호화 실패 #2"
                });
            };
            
            console.log(req.body.email);
            const params = {
                avatar_name: !req.file ? req.body.avatar_name : req.file.filename,
                avatar_path: !req.file ? `${requestDir}default/${req.body.avatar_name}` : `${requestDir}${req.file.filename}`,
                id: req.body.id,
                email : req.body.email,
                password: hash,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                full_name: req.body.first_name + req.body.last_name,
                nickName: req.body.nickName,
                phone: req.body.phone,
                rank_no: req.body.rank_no,
                dept_no: req.body.dept_no,
                reg_date: getNow(),
                upd_date: getNow(),
                reg_ip: req.body.reg_ip,
                upd_ip: req.body.upd_ip,
                country_name: req.body.country_name,
                country_code: req.body.country_code
            }

            const SQL = myBatisMapper.getStatement('RegisterMember', 'insertMember', params, format);

            connection.query(SQL, params, (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({
                        result: false,
                        resultCode: -1,
                        resultMessage : "쿼리 오류"
                    }
                    );
                } else {
                    return res.status(200).send({
                        result: true,
                        resultCode: 1,
                        resultMessage : "회원가입 성공"
                    });
                }
            });
        });
    });
});

router.post('/duplicateCheckId', (req, res) => {
    const SQL = "SELECT tb_member.id FROM tb_member WHERE tb_member.id = ?"
    const param = `${req.body.id}@${req.body.email}`;

    connection.query(SQL, param, (err, rows) => {
        if (err) {
            console.log(err.status);
            console.log(err);
        }

        if (rows.length === 0) {
            return res.status(200).send({
                result: true,
                resultCode: 1,
                resultMessage: "가입 가능한 아이디입니다."
            });
        } else {
            return res.status(200).send({
                result: false,
                resultCode: -1,
                resultMessage: "이미 존재하는 아이디입니다."
            });
        }
    });

});

module.exports = router;