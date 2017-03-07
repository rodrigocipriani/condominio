/**
 * Evite alterar este arquivo
 * */
let isProduction = process.env.NODE_ENV == 'production';

const defaultConfig = require('./ambiente/default.json');
const develepment = require('./ambiente/develepment.json');
const production = require('./ambiente/production.json');

module.exports =
    isProduction ?
        Object.assign(defaultConfig, production) :
        Object.assign(defaultConfig, develepment);
