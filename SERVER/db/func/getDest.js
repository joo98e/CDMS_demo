const status = process.env.NODE_ENV = (process.env.NODE_ENV && (process.env.NODE_ENV).trim().toLowerCase() == 'production') ? 'prod' : 'dev';

const dest = {
    dev: `uploads/`,
    prod: `/raid/cdms/`,
}

module.exports = status === "prod" ? dest.prod : dest.dev;
