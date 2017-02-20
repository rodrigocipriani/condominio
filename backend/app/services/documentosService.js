'use strict';

module.exports = function (app) {

    const service                  = {};
    const DocumentoModel                = app.models.DocumentoModel;

    service.findAllPbms                           = function () {

        console.log('DocumentoModel', DocumentoModel);
        return DocumentoModel.findAll();
    };

    return service;
};
