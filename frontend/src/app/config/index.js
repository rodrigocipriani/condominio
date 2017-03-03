let isProduction = process.env.NODE_ENV == 'production';

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

const desenvolvimento = require('./ambiente/desenvolvimento');
const producao = require('./ambiente/producao');

module.exports = isProduction ? producao : desenvolvimento;
