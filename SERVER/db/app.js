const status = process.env.NODE_ENV = (process.env.NODE_ENV && (process.env.NODE_ENV).trim().toLowerCase() == 'production') ? 'prod' : 'dev';
const express = require('express');
const path = require('path');

module.exports = (() => {
    const app = express();
    status === 'prod' && app.use('/static', express.static('/raid/cdms'));
    status === 'dev' && app.use('/static', express.static('uploads'));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use((err, req, res, next) => {
        res.status(404).send("찾을 수 없는 요청");
    });

    app.use((err, req, res, next) => {
        res.status(500).send("무언가 잘못되었음");
    });

    app.use((err, req, res, next) => {
        res.status(504).send("잘못된 요청.");
    });
    
    return app;
})();