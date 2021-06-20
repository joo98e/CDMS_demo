const multer = require("multer");
// ────────────────────────────────────────────────────────── Require
const CURRENT_DIR = __dirname;
const app = require('./app');
const port = process.env.PORT || 5005;
const users = require('./routes/users');
const departments = require('./routes/departments');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const isDev = CURRENT_DIR.indexOf("C:") !== -1 ? `Is ${true}` : `Is ${false}`;

app.use('/users', users);
app.use('/departments', departments);

// ────────────────────────────────────────────────────────── 

app.listen(port, () => console.log(`${isDev}, Listening on PORT ${port}`));