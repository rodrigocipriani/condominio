let isProduction = process.env.NODE_ENV == 'production';

const development = require('./ambiente/development.json');
const production = require('./ambiente/production.json');

module.exports = isProduction ? production : development;
