'use strict';

module.exports = function (app) {

    const service = {};
    const documento = app.models.modelo.documento;

    service.findAll = () => {
        console.log('documento', documento);
        return documento.findAll();
    };

    return service;
};
