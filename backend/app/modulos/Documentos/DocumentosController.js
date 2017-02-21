'use strict';

module.exports = (app) => {

    const DocumentosController = {};
    const Erro = app.common.erro;
    const DocumentosService = app.services.DocumentosService;

    DocumentosController.findAllPbms = function (req, res) {

        DocumentosService.findAllPbms().then(function (pbmss) {
            res.send(pbmss);
        }).catch(function (erro) {
            Erro.novo(Erro.CONSULTAR_DADOS, req, res, erro);
        });
    };

    return DocumentosController;

};
