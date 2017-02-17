'use strict';

module.exports = function (app) {

    const service                  = {};
    const PbmsModel                = app.models.modelo.PbmsModel;
    const DocumentoModel                = app.models.modelo.DocumentoModel;
    // const {PbmsModel} = app.models.modelo;

    service.findAllPbms                           = function () {

        return DocumentoModel.findAll();
    };

    return service;
};
