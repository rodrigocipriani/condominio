'use strict';

module.exports = function (app) {

    const service = {};
    const DocumentoModel = app.models.DocumentoModel;

    service.findAllPbms = () => {
        return DocumentoModel.findAll();
    };

    return service;
};
