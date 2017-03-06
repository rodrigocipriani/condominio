/**
 * Evite alterar este arquivo
 * */
let isProduction = process.env.NODE_ENV == 'production';

const defaultConfig = require('./ambiente/default');
const development = require('./ambiente/development');
const production = require('./ambiente/production');

module.exports =
    isProduction ?
        Object.assign(defaultConfig, production):
        Object.assign(defaultConfig, development);
