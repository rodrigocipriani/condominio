'use strict';

module.exports = function(app) {

    const Erro                         = app.common.erro;
    const sequelize                    = app.models.modelo.sequelize;
    const controller                   = {};
    const DocumentosService              = app.services.documentosService;

    controller.findAllPbms                           = function(req, res) {

        DocumentosService.findAllPbms()
            .then(function(pbmss) {
            res.send(pbmss);
        }).catch(function(erro) {
            Erro.novo(Erro.CONSULTAR_DADOS, req, res, erro);
        });
    };

    return controller;



};
