'use strict';

module.exports = function (app) {

    const Erro = app.common.erro;
    const controller = {};
    const UserService = app.services.UserService;

    controller.findOne = (req, res) => {

        const email = req.params.email;

        UserService.findOne({email}).then(function (user) {
            res.send(user);
        }).catch(function (erro) {
            Erro.novo(Erro.CONSULTAR_DADOS, req, res, erro);
        });

    };

    return controller;

};
