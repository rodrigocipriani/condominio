'use strict';

module.exports = function (app) {

    const Erro = app.common.erro;
    const controller = {};
    const DocumentosService = app.services.documentosService;

    console.log('DocumentosService', DocumentosService);

    controller.findAllPbms = function (req, res) {

        console.log(DocumentosService);

        DocumentosService.findAllPbms()
            .then(function (pbmss) {
                res.send(pbmss);
            }).catch(function (erro) {
            // Erro.novo(Erro.CONSULTAR_DADOS, req, res, erro);
        });
    };

    return controller;


};
