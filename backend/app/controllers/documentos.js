'use strict';

module.exports = (app) => {

    const controller = {};
    // const Erro = app.common.erro;
    const DocumentosService = app.services.documentos;

    controller.findAll = function (req, res) {

        console.log('DocumentosService', DocumentosService);

        DocumentosService.findAll().then(function (documentos) {
            res.send(documentos);
        }).catch((erro) => {
            // console.log('--> erro: ', erro);
            return res.status(400).send(erro); //getMensagemErro(erro));
        });
    };

    return controller;

};
