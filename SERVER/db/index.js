// ────────────────────────────────────────────────────────── Require
const CURRENT_DIR = __dirname;
const multer = require("multer");
const connection = require("./db_connection");
const app = require('./app');
const port = process.env.PORT || 5005;
const users = require('./routes/users');

app.use('/users', users);

// ────────────────────────────────────────────────────────── 

const isDev = CURRENT_DIR.indexOf("C:") !== -1 ? 'localhost' : 'service';

app.listen(port, () => console.log(`${isDev}, Listening on PORT ${port}`));