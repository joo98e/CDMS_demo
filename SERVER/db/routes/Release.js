
const express = require('express');
const router = express.Router();
const multer = require('multer');
const connection = require("../config/db_connection");
const format = require('../config/MyBatisFormat');
const myBatisMapper = require('mybatis-mapper');
const ReleaseStorage = require("../storage/ReleaseStorage");

myBatisMapper.createMapper(['./db/xml/Release/Release.xml']);

router.post("/test/:agency/:project", ReleaseStorage.array("files"), (req, res) => {
    console.log("is release");
    return res.status(204).end();
});

module.exports = router;