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
const avatarTargetDIR = `uploads\\avatars\\items\\`;
// dest : 목적지 데스티네이션 
const avatarDIR = multer({ dest: avatarTargetDIR });

const avatarStorage = multer({
    storage : multer.diskStorage({
        destination : `uploads\\avatars\\items\\`,
        filename : function(req, file, cb){
            cb(null, "imgfile" + Date.now() + '_' + path.extname(file.originalname));
        }
    })
})

router.get('/test', (req, res) => {
    console.log(avatarTargetDIR);
    res.status(200).send('123');
});

const checkDirectory = (dir) => {
    const _target = `${avatarTargetDIR}\\${dir}`;

    if (!fs.existsSync(_target)) {
        fs.mkdirSync(_target);
        console.log(`folder created, ${dir}`);
    } else {
        console.log(`폴더가 이미 존재하여 다음 차례를 진행합니다, ${avatarTargetDIR}\\items\\${dir}`);
    }
}

router.post('/signUp', avatarStorage.single('MEM_IMAGE'), (req, res) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(req.body.MEM_PASSWORD, salt, (err, hash) => {
            if(err) console.log(err);

            let SQL = "INSERT INTO TB_MEMBER_INFO(MEM_IMAGE, MEM_IMAGE_NAME, MEM_USERID, MEM_PASSWORD, MEM_NAME, MEM_NICKNAME, MEM_DEPT_NO, MEM_EMAIL, MEM_PHONE, MEM_EMPNO, MEM_HIREDATE, MEM_BIRTHDAY) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            let params = [
                req.file.filename === undefined ? `${avatarTargetDIR}\\items\\default.png` : `${avatarTargetDIR}\\items\\` + req.file.filename,
                req.body.MEM_IMAGE_NAME,
                req.body.MEM_USERID,
                hash,
                req.body.MEM_NAME,
                req.body.MEM_NICKNAME,
                req.body.MEM_DEPT_NO,
                req.body.MEM_EMAIL,
                req.body.MEM_PHONE,
                req.body.MEM_EMPNO,
                req.body.MEM_HIREDATE,
                req.body.MEM_BIRTHDAY,
            ];

            connection.query(SQL, params, (err, rows, fields) => {
                if (err) console.log(err);
            });
            res.status(200).json(req.body);
        });
    });
});

module.exports = router;