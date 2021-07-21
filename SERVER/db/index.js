// ────────────────────────────────────────────────────────── Require
const CURRENT_DIR = __dirname;
const app = require('./app');
const port = process.env.PORT || 5005;

// ────────────────────────────────────────────────────────── Routes Import
const users = require('./routes/users');
const departments = require('./routes/departments');
const register = require('./routes/register');
const menu = require('./routes/menu');
const projects = require('./routes/projects');
const policy = require('./routes/policy');
const avatarsChange = require('./routes/uploads/avatars/avatarsChange');

// ────────────────────────────────────────────────────────── etc
const isDev = CURRENT_DIR.indexOf("C:") !== -1 ? `Dev is ${true}` : `Dev is ${false}`;

// ────────────────────────────────────────────────────────── 

// 라우터 회원 
app.use('/users', users);
app.use('/departments', departments);
app.use('/register', register);

// 라우터 프로젝트 + 렌더링
app.use('/projects', projects);
app.use('/uploads', avatarsChange);

// 라우터 렌더링 필요 요소
app.use('/menu', menu);
app.use('/policy', policy);

// ────────────────────────────────────────────────────────── 

app.listen(port, () => console.log(`${isDev}, Listening on PORT ${port}`));