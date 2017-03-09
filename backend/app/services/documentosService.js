'use strict';

module.exports = function (app) {

    const service = {};
    const documentoModel = app.models.modelo.documentoModel;

    service.findAll = () => {
        console.log('documentoModel', documentoModel);
        return documentoModel.findAll();
    };

    return service;
};
