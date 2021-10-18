

// ────────────────────────────────────────────────────────── 개발 환경 확인
const status = process.env.NODE_ENV = (process.env.NODE_ENV && (process.env.NODE_ENV).trim().toLowerCase() == 'production') ? 'prod' : 'dev';
console.log(status);

// ────────────────────────────────────────────────────────── 
const app = require('./app');
const port = status === "prod" ? process.env.PORT || 80 : process.env.PORT || 5005;
const express = require('express');
const path = require('path');

// ────────────────────────────────────────────────────────── Routes Import
const Member = require('./routes/Member');
const Org = require('./routes/Org');
const Register = require('./routes/Register');
const Menu = require('./routes/Menu');
const Agency = require('./routes/Agency');
const Project = require('./routes/Project');
const Process = require('./routes/Process');
const Policy = require('./routes/Policy');
const Util = require('./routes/Util');
const Mail = require('./routes/Mail');
// ────────────────────────────────────────────────────────── 

// 라우터 회원 
app.use('/api/member', Member);
app.use('/api/org', Org);
app.use('/api/register', Register);

// 라우터 에이전시, 프로젝트
app.use('/api/agency', Agency);
app.use('/api/project', Project);
app.use('/api/process', Process);

// 라우터 렌더링 필요 요소
app.use('/api/menu', Menu);
app.use('/api/policy', Policy);
app.use('/api/util', Util);

// 라우터 메일
app.use('/api/mail', Mail);

if (status === "prod") {
    // BUILD 제공
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
}

// ────────────────────────────────────────────────────────── 

app.listen(port, () => console.log(`Listening on PORT ${port}`));