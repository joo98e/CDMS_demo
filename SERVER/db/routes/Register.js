// API & Router
const express = require('express');
const router = express.Router();
const connection = require("../db_connection");

// 암호화
const bcrypt = require("bcrypt");
const saltRounds = 10;

// 파일 관련
const fs = require('fs');
const CURRENT_DIR = __dirname;
const multer = require('multer');
const path = require('path');
const avatarTargetDIR = `uploads\\avatars\\items\\`;

const avatarDIR = multer({ dest: avatarTargetDIR });

const avatarStorage = multer({
    storage: multer.diskStorage({
        destination: `uploads\\avatars\\items\\`,
        filename: function (req, file, cb) {
            cb(null, `avatar_${Date.now()}_${file.originalname}`);
        }
    }),
});

router.post('/signUp', avatarStorage.single('avatar_file'), (req, res) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err) console.log(err);

            let SQL = 
            `INSERT INTO tb_member (avatar_name, avatar_path, id, password, first_name, last_name, nickName, phone, rank_no, dept_no, reg_date, upd_date, reg_ip, upd_ip, country_name, country_code) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            
            let params = [
                !req.file ? "default.png" : req.file.filename,
                !req.file ? `${avatarTargetDIR}default.png` : `${avatarTargetDIR}` + req.file.filename,
                req.body.id,
                hash,
                req.body.first_name,
                req.body.last_name,
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
            
            console.log(`${params}`);

            connection.query(SQL, params, (err, rows, fields) => {
                if (err) console.log(err);
            });

            res.status(200).json(req.body);
        });
    });
});

module.exports = router;




const checkDirectory = (dir) => {
    const _target = `${avatarTargetDIR}\\${dir}`;

    if (!fs.existsSync(_target)) {
        fs.mkdirSync(_target);
        console.log(`folder created, ${dir}`);
    } else {
        console.log(`폴더가 이미 존재하여 다음 차례를 진행합니다, ${avatarTargetDIR}\\items\\${dir}`);
    }
}
