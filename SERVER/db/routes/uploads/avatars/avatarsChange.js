// avatars

const fs = require('fs');
const CURRENT_DIR = __dirname;
const express = require('express');
const router = express.Router();

const connection = require("../../../db_connection");

const checkDirectory = (dir) => {
    const target = `${CURRENT_DIR}\\items\\${dir}`;

    if(!fs.existsSync(target)){
        fs.mkdirSync(target);
        console.log(`folder created, ${dir}`);
    }else{
        console.log(`folder is already exist, ${CURRENT_DIR}\\items\\${dir}`);
    }
}

router.get('/:userName/avatars', (req, res) => {
    
    // TODO 아바타 변경 / 폴더 만들 필요 없을 수도 있음
    checkDirectory(req.params.userName);
    
    res.status(200).send('일단 성공')
});


module.exports = router;