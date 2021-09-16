

// ────────────────────────────────────────────────────────── 개발 환경 확인
const status = process.env.NODE_ENV = (process.env.NODE_ENV && (process.env.NODE_ENV).trim().toLowerCase() == 'production') ? 'prod' : 'dev';
console.log(status);

// ────────────────────────────────────────────────────────── Require
const CURRENT_DIR = __dirname;
const app = require('./app');
const port = process.env.PORT || 5005;

const express = require('express');
const path = require('path');

// ────────────────────────────────────────────────────────── Routes Import
const users = require('./routes/users');
const departments = require('./routes/departments');
const register = require('./routes/register');
const menu = require('./routes/menu');
const projects = require('./routes/projects');
const policy = require('./routes/policy');
const avatarsChange = require('./routes/uploads/avatars/avatarsChange');

// ────────────────────────────────────────────────────────── 

// 라우터 회원 
app.use('/api/users', users);
app.use('/api/departments', departments);
app.use('/api/register', register);

// 라우터 프로젝트 + 렌더링
app.use('/api/projects', projects);
app.use('/api/uploads', avatarsChange);

// 라우터 렌더링 필요 요소
app.use('/api/menu', menu);
app.use('/api/policy', policy);


if (status === "prod") {
    // BUILD 제공
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
}

// ────────────────────────────────────────────────────────── 

app.listen(port, () => console.log(`Listening on PORT ${port}`));