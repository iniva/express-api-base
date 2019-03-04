import os from 'os';
import merge from 'webpack-merge';
import Path from 'path';

import * as packageInfo from '../../package';

const ENVIRONMENT = process.env.NODE_ENV || 'development';
const SERVER_HOST = process.env.SERVER_HOST || '0.0.0.0';
const SERVER_PORT = process.env.SERVER_PORT || 8091;
const CACHE_DRIVER = process.env.CACHE_DRIVER || 'memory';
const CACHE_DEFAULT_TTL = process.env.CACHE_DEFAULT_TTL || 3600;
const API_VERSION = packageInfo.version;
const APP_NAME = process.env.APP_NAME || 'Express API';

const rootDir = Path.dirname(require.main.filename || process.mainModule.filename);
const defaultConfig = {
  rootDir,

  app: {
    name: APP_NAME,
    version: API_VERSION,
    env: ENVIRONMENT,
    'case sensitive routing': true,
    'strict routing': false,
    'x-powered-by': false,
  },

  server: {
    host: SERVER_HOST,
    port: SERVER_PORT,
  },

  userAgent: `${APP_NAME}/${API_VERSION}`,

  cache: {
    environment: ENVIRONMENT,
    // available: redis, memory
    // "memory" available only in development
    driver: CACHE_DRIVER,
    // TTL in seconds
    ttl: CACHE_DEFAULT_TTL,
  },

  logger: {
    // prettyPrint: process.env.NODE_ENV !== 'production',
    base: { hostname: os.hostname() },
  },
};
const { default: targetConfig } = require(`./${ENVIRONMENT}`); // eslint-disable-line import/no-dynamic-require
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
