// API & Router
const express = require('express');
const router = express.Router();
const connection = require("../db_connection");

// 암호화
const bcrypt = require("bcrypt");
const saltRounds = 10;

// 업로더
const multer = require('multer');

// MyBatis
const myBatisMapper = require('mybatis-mapper');
myBatisMapper.createMapper(['./db/xml/Register/RegisterUser.xml']);
const format = require('../config/MyBatisFormat');

// 실제 클라이언트 요청 경로
const requestDir = 'static\\avatars\\items\\';

const avatarStorage = multer({
    storage: multer.diskStorage({
        // 실제 업로드 경로
        destination: `uploads\\avatars\\items\\`,
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
                resultMessage : "패스워드 암호화 실패 #1"
            });
        }

        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
                console.log(err);

                return res.status(500).send({
                    result: {},
                    resultCode : -1,
                    resultMessage : "패스워드 암호화 실패 #2"
                });
            };

            const TEMP = myBatisMapper.getStatement('Agency', 'getAgcyList', params, format);

            let SQL =
                `INSERT INTO tb_member (avatar_name, avatar_path, id, password, first_name, last_name, full_name, nickName, phone, rank_no, dept_no, reg_date, upd_date, reg_ip, upd_ip, country_name, country_code) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            let params = [
                !req.file ? "default.png" : req.file.filename,
                !req.file ? `${requestDir}default.png` : `${requestDir}` + req.file.filename,
                req.body.id,
                hash,
                req.body.first_name,
                req.body.last_name,
                req.body.first_name + req.body.last_name,
                req.body.nickName,
                req.body.phone,
                req.body.rank_no,
                req.body.dept_no,
                new Date(),
                new Date(),
                req.body.reg_ip,
                req.body.upd_ip,
                req.body.country_name,
                req.body.country_code
            ];

            connection.query(SQL, params, (err, rows, fields) => {
                if (err) {
                    return res.status(400).send({ resultCode: '-1', result: false });
                } else {
                    return res.status(200).send({ resultCode: '1', result: true });
                }
            });
        });
    });
});

router.post('/duplicateCheckId', (req, res) => {
    const SQL = "SELECT tb_member.id FROM tb_member WHERE tb_member.id = ?"
    const param = req.body.id;

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