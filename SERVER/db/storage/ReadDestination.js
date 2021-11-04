const fs = require("fs");
const mkdirp = require("mkdirp");

const readDestination = (DIR) => {
    console.log("readDestination", DIR);
    console.log(__dirname);
    fs.mkdirSync(DIR, { recursive : true});
}

module.exports = readDestination;