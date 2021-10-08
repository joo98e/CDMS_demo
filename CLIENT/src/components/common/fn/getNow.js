const moment = require("moment");
require('moment-timezone');

module.exports = () => {
    moment.tz.setDefault("Asia/Seoul");

    const now = moment().format("YYYY-MM-DD HH:mm:ss");

    return now;
};
