const multer = require('multer');
const getDest = require("../func/getDest");
const readDestination = require("./ReadDestination");

const ReleaseStorage = multer({
    storage: multer.diskStorage({
        destination: (req, res, cb) => {
            const targetDIR = `${getDest}release/${req.params.agency}/${req.params.project}`

            readDestination(targetDIR);
            cb(null, targetDIR);
        },
        filename: function (req, file, cb) {
            cb(null, `test_${Date.now()}_${file.originalname}`);
        }
    }),
});

module.exports = ReleaseStorage;
