'use strict';

let isProduction = process.env.NODE_ENV == 'production';



console.log('process.env.NODE_ENV >>', process.env.NODE_ENV);

const defaultConfig = require('./ambiente/default');
const desenvolvimento = require('./ambiente/desenvolvimento');
const producao = require('./ambiente/producao');

module.exports =
    isProduction ?
        Object.assign(defaultConfig, producao):
        Object.assign(defaultConfig, desenvolvimento);
