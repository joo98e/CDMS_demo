const multer = require('multer');
const getDest = require("../func/getDest");
const ReadDestination = require("./ReadDestination");

const ReleaseStorage = multer({
    storage: multer.diskStorage({
        destination: (req, res, cb) => {
            const targetDIR = `${getDest}release/${req.params.agency}/${req.params.project}`

            ReadDestination(targetDIR);
            cb(null, targetDIR);
        },
        filename: function (req, file, cb) {
            cb(null, `test_${Date.now()}_${file.originalname}`);
        }
    }),
});

module.exports = ReleaseStorage;
