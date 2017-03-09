module.exports = (app) => {

    const controller = {};
    const Erro = app.util.Erro;
    const DocumentosService = app.services.documentosService;

    controller.findAll = function (req, res) {

        DocumentosService.findAll().then(function (documentos) {
            res.send(documentos);
        }).catch((erro) => {
            return res.status(400).send(Erro.getMensagemErro(erro));
        });
    };

    return controller;

};
