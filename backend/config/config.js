'use strict';

var desenvolvimento = require('./ambiente/desenvolvimento'),
            homologacao = require('./ambiente/homologacao'),
            producao = require('./ambiente/producao');

            // process.env.NODE_ENV='DESENVOLVIMENTO';

module.exports = process.env.NODE_ENV == 'DESENVOLVIMENTO' ? desenvolvimento: producao;
