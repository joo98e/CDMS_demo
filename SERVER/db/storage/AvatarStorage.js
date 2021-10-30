const multer = require('multer');
const getDest = require("../func/getDest");

const AvatarStorage = multer({
    storage: multer.diskStorage({
        destination: `${getDest}/avatars/items/user/`,
        filename: function (req, file, cb) {
            cb(null, `avatar_${Date.now()}_${file.originalname}`);
        }
    }),
});

module.exports = AvatarStorage;
