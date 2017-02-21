'use strict';

let apiPort, configExpress;

// const isProduction = process.env.NODE_ENV === 'production';
switch (process.env.AMBIENTE) {
    case 'desenvolvimento' :
        configExpress = require('./ambiente/desenvolvimento');
        apiPort = 3005;
        break;
    case 'homologacao' :
        configExpress = require('./ambiente/homologacao');
        apiPort = 3005;
        break;
    case 'producao' :
        configExpress = require('./ambiente/producao');
        apiPort = 3005;
        break;
}

module.exports = {
    CONFIG_EXPRESS: configExpress,
    API_PORT: apiPort
};
