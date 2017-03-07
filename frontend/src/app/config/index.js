/**
 * Evite alterar este arquivo
 * */
let isProduction = process.env.NODE_ENV == 'production';

const development = require('./ambiente/development');
const production = require('./ambiente/production');

module.exports = isProduction ? production : development;
