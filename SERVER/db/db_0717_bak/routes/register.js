
const express = require('express');
const multer = require('multer');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const router = express.Router();
const upload = multer({ dest: '../Users/UsersProfile' });
const connection = require("../db_connection");

router.get('/', (req, res) => {

    let is = Boolean;
    connection.query(
        "SELECT * FROM TB_MEMBER_INFO where MEM_PK = 2;",
        (err, rows, fields) => {
            if (err) console.log(err);
            is = bcrypt.compareSync('dkssudgktpody1!', rows[0].MEM_PASSWORD);
            return res.status(200).send(is);
        }
    );

})

router.post('/signUp', upload.single('image'), (req, res) => {

    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(req.body.MEM_PASSWORD, salt, (err, hash) => {
            let SQL = "INSERT INTO TB_MEMBER_INFO(MEM_USERID, MEM_PASSWORD, MEM_NAME, MEM_NICKNAME, MEM_DEPT_NO, MEM_EMAIL, MEM_PHONE, MEM_EMPNO, MEM_HIREDATE, MEM_BIRTHDAY) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            let params = [
                // '/image/' + req.file.filename,
                // req.body.MEM_IMAGE_NAME,
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
            return res.status(200).json(req.body);
        });
    });

});

module.exports = router;