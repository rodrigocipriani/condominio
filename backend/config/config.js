'use strict';

const isProduction = process.env.NODE_ENV === 'production';

var desenvolvimento = require('./ambiente/desenvolvimento'),
            homologacao = require('./ambiente/homologacao'),
            producao = require('./ambiente/producao');

            // process.env.NODE_ENV='DESENVOLVIMENTO';

module.exports = isProduction ? producao : desenvolvimento;
