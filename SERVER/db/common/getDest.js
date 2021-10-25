const status = process.env.NODE_ENV = (process.env.NODE_ENV && (process.env.NODE_ENV).trim().toLowerCase() == 'production') ? 'prod' : 'dev';

const dest = {
    dev: `uploads/avatars/items/user/`,
    prod: `/raid/cdms/`,
}

export default status === "prod" ? dest.prod : dest.dev;