

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
const Users = require('./routes/Users');
const Org = require('./routes/Org');
const Register = require('./routes/Register');
const Menu = require('./routes/Menu');
const Agency = require('./routes/Agency');
const Projects = require('./routes/Projects');
const Policy = require('./routes/Policy');
const AvatarsChange = require('./routes/uploads/avatars/avatarsChange');

// ────────────────────────────────────────────────────────── 

// 라우터 회원 
app.use('/api/users', Users);
app.use('/api/org', Org);
app.use('/api/register', Register);

// 라우터 에이전시, 프로젝트
app.use('/api/agency', Agency);
app.use('/api/projects', Projects);
app.use('/api/uploads', AvatarsChange);

// 라우터 렌더링 필요 요소
app.use('/api/menu', Menu);
app.use('/api/policy', Policy);


if (status === "prod") {
    // BUILD 제공
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
}

// ────────────────────────────────────────────────────────── 

app.listen(port, () => console.log(`Listening on PORT ${port}`));