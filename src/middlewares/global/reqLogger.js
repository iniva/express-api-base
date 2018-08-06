import Logger from 'Utils/logger';

const log = Logger.create('middlewares:global:logger');

export const reqLogger = (req, res, next) => {
    console.log(req.originalUrl, req.params);
    console.log(Object.values(req.params));
    log('Logged');
    next();
};
