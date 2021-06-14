// ────────────────────────────────────────────────────────── Require
const multer = require("multer");
const connection = require("./db_connection");
const app = require('./app');
const port = process.env.PORT || 5005;
const users = require('./routes/users');

app.use('/users', users);

// ────────────────────────────────────────────────────────── 
// ──────────────────────────────────────────────────────────

app.listen(port, () => console.log(`Listening on PORT ${port}`));