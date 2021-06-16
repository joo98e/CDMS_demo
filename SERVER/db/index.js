const multer = require("multer");
// ────────────────────────────────────────────────────────── Require
const CURRENT_DIR = __dirname;
const app = require('./app');
const port = process.env.PORT || 5005;
const users = require('./routes/users');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const isDev = CURRENT_DIR.indexOf("C:") !== -1 ? `local is ${true}` : `local is ${false}`;

app.use('/users', users);

// ────────────────────────────────────────────────────────── 

const password = "12345";
bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(`hash is ${hash}`);
    });
});
setTimeout(() => {
    const newPass = "12345";
    console.log(`compareSync is ${bcrypt.compareSync(password, newPass)}`)    
}, 3000);

// ────────────────────────────────────────────────────────── 

app.listen(port, () => console.log(`${isDev}, Listening on PORT ${port}`));