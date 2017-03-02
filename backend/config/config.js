'use strict';

let isProduction = process.env.NODE_ENV == 'production';

const desenvolvimento = require('./ambiente/desenvolvimento');
const producao = require('./ambiente/producao');

module.exports = isProduction ? producao : desenvolvimento;
