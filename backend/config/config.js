'use strict';

let isProduction = process.env.NODE_ENV == 'production';

const defaultConfig = require('./ambiente/default');
const desenvolvimento = require('./ambiente/desenvolvimento');
const producao = require('./ambiente/producao');

module.exports =
    isProduction ?
        Object.assign(defaultConfig, producao):
        Object.assign(defaultConfig, desenvolvimento);
