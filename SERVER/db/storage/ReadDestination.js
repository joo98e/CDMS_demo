const fs = require("fs");
const mkdirp = require("mkdirp");

const ReadDestination = (DIR) => {
    console.log("ReadDestination", DIR);
    console.log(__dirname);
    fs.mkdirSync(DIR, { recursive : true});
}

module.exports = ReadDestination;