'use strict';

module.exports = function (app) {

    const service                  = {};
    const PbmsModel                = app.models.modelo.PbmsModel;
    // const {PbmsModel} = app.models.modelo;

    service.findAllPbms                           = function () {

        return PbmsModel.findAll();
    };

    return service;
};
