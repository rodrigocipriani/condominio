/**
 * Created by f9329476 on 19/01/2017.
 */


'use strict';

module.exports = function(app) {

    var common                       = {};

    var ambiente	           = process.env.AMBIENTE || 'desenvolvimento';

    common.CONSULTAR_DADOS     = 'Erro ao tentar consultar os dados.';
    common.ARMAZENAR_DADOS     = 'Erro ao tentar armazenar os dados.';
    common.AUDITAR_DADOS       = 'Erro ao tentar auditar os dados';

    common.novo                = function (msg, req, res, err) {

        var self = this;

        var erro = {
            usuario : {
                chave : req.session.usuario.chave,
                nome : req.session.usuario.nome,
                prefixo : req.session.usuario.prefixo
            },
            req : {
                method : req.method,
                url : req.originalUrl,
                query: req.query,
                params : req.params
                //body : req.body,
            },
            stack : err.stack
        };

        logger.error(err.stack);

        logger.error(msg, erro);

        if (res && !res.headersAlreadySent) {

            var retorno = {
                msg : msg,
                error : (ambiente == 'desenvolvimento' ? err : undefined),
                stack : (ambiente == 'desenvolvimento' ? err.stack : undefined)
            };

            if (self.isAjax(req)){
                res.status(500).send({msg : msg});
            }else{

                res.status(500).send(retorno);
            }


        }

        return msg;

    };

    common.buscaPorDependencia = function (req) {

        if (req.xhr) return true;

        if (!req.headers) return false;

        if (!req.headers.accept) return false;

        return req.headers.accept.indexOf('json') > -1;

    };

    return common;



};

