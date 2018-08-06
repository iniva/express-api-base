import merge from 'webpack-merge';
import Path from 'path';

import * as packageInfo from '../../package';

const ENVIRONMENT = process.env.NODE_ENV || 'development';
const DEFAULT_SERVER_PORT = 8091;
const DEFAULT_CACHE_TTL = 3600;
const API_VERSION = packageInfo.version;
const APP_NAME = process.env.APP_NAME || packageInfo.name;

const rootDir = Path.dirname(require.main.filename || process.mainModule.filename);
const defaultConfig = {
    rootDir,

    app: {
        name: APP_NAME,
        version: API_VERSION,
        env: ENVIRONMENT,
        'case sensitive routing': true,
        'strict routing': false,
        'x-powered-by': false
    },

    server: {
        host: process.env.SERVER_HOST || '0.0.0.0',
        port: process.env.SERVER_PORT || DEFAULT_SERVER_PORT
    },

    http: {
        userAgent: `${APP_NAME}/${API_VERSION}`
    },

    cache: {
        environment: ENVIRONMENT,
        // available: redis, memory
        // "memory" available only in development
        driver: process.env.CACHE_DRIVER || 'memory',
        // TTL in seconds
        ttl: process.env.CACHE_DEFAULT_TTL || DEFAULT_CACHE_TTL
    }
};
const { 'default': targetConfig } = require(`./${ENVIRONMENT}`);
const configurations = merge(defaultConfig, targetConfig);

const find = (object, property) => {
    const elements = Array.isArray(property) ? property : property.split('.');
    const name = elements[0];
    const value = object[name];

    if (elements.length <= 1) {
        return value;
    }

    if (value === null || typeof value !== 'object') {
        return undefined;
    }

    return find(value, elements.slice(1));
};

export default class Config {
    /**
     * Briefly inspired by https://github.com/lorenwest/node-config
     */
    static get(property) {
        const value = find(configurations, property);

        if (value === undefined) {
            throw new Error(`Configuration property ${property} was not found!`);
        }

        return value;
    }
}
