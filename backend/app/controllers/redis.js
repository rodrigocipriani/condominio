/**
 * Created by thiago on 07/12/2015.
 */

'use strict';

module.exports = function(app) {

    const config              = require('../../config/config');
    const redis               = require("redis");
    const cliente             = redis.createClient(config.redis.port,config.redis.host, {auth_pass: config.redis.pass, no_ready_check: true});
    const controller   = {};


    controller.recuperarDados = function (req, res, next) {

        cliente.get(req.user._id + req.params.id, function (erro, dados) {

            if (erro) {
                return res.status(500).send("Erro ao recuperar dados", erro);
            }

            req.memoria = JSON.parse(dados);
      //      console.log("dados redis",req.memoria );
            return next();
        });
    };

    controller.gravarDados    = function(req, res) {

        console.log("stringificando 2 ", JSON.stringify(req.memoria));

        cliente.set(req.user._id + req.params.id,  JSON.stringify(req.memoria), function(erro, dados) {
            if(erro){
                console.log("erro redis", erro);
                return res.status(500).send("Erro ao gravar dados", erro);
            }
            console.log("gravei redis", dados);
            return res;
        });
    };


    return controller;

};



