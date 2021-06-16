
const express = require('express');
const router = express.Router();

const connection = require("../db_connection");

router.get('/register', (req, res) => {
    // 회원가입시 필요한 정보들을 client에서 가져오면, 
    // 그것들을 DB에 넣는다.

    const MEMBER_INFO = new User(req.body);



});

module.exports = router;