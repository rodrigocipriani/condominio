
module.exports = function(app) {

    var  UsuariosService = app.services.usuario,
         passport        = require('passport'),
         controller = {} ;

    controller.obterUsuarioLogado = function(req, res) {
        console.log('obterUsuarioLogado ');
        if(req.user == undefined){
            res.status(401).send(getMensagemErro({chave: 'mensagem.realizarLogin'}));
        }
        res.json(req.user);
    };


    // migrados do autenticação controller
    controller.cadastrar       = function(req, res, next) {
        passport.authenticate('cadastrar', function (err, user, info) {
            if (err) {
                return next(err)
            }
            if (!user) {
                console.log('mensagem de erro : ', info);
                return res.status(400).send(getMensagemErro(info));
            }
            req.logIn(user, function (erro) {
                if (erro) {
                    return next(erro);
                }
                console.log('cadastro efetuado com sucesso! - user:', user);
                return res.send(getMensagemSucesso({chave: 'mensagem.usuarioCriadoSucesso'}));
            });
        })(req, res, next);

    };
    controller.alterar       = function(req, res) {
        console.log('usuarioController.alterar - req.body', JSON.stringify(req.body));
        UsuariosService
            .alterar(req.body.id, req.body.nome, req.body.senhaAntiga, req.body.senha)
            .then(function(r){
                console.log('usuarioController.alterar - resposta: ', r);
                return res.json(getMensagemSucesso({chave: 'mensagem.usuarioAlteradoSucesso'}));
            }).catch(function(erro){
                console.log('usuarioController.alterar - erro: ', erro);
                return res.status(400).send(getMensagemErro(erro));
            });
    };

    controller.solicitarNovoToken       = function(req, res, next) {
        console.log('usuarioService.solicitarNovoToken ', req.body.email);
        return UsuariosService
            .solicitarNovoToken(req.body.email)
            .then(function(email){
                return res.status(200).send(email);
            })
            .catch(function(erro){
                console.log('--> erro: ', erro);
                return res.status(400).send(getMensagemErro(erro));
            });
    };

    /**
     * Altera a senha com o token recebido via email.
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    controller.alterarSenhaComToken       = function(req, res, next) {
        console.log('usuarioService.alterarSenhaComToken() - token=%s, senha=%s', req.body.token, req.body.senha);
        return UsuariosService
            .alterarSenhaComToken(req.body.token, req.body.senha)
            .then(function(usuarioAlterado){
                console.log('não devolve nada quando dá certo: %s', JSON.stringify(usuarioAlterado));
                return res.status(200).send();
            })
            .catch(function(erro){
                // console.log('--> erro: ', erro);
                return res.status(400).send(erro); //getMensagemErro(erro));
            });
    };

    controller.confirmarCadastro = function(req, res) {
        var token = req.params.token;
        console.log('usuarioService.confirmarCadastro - token: %s', token);
        UsuariosService
            .validarTokenNovoUsuario(token)
            .then(function(r){
                console.log('deu certo: ', JSON.stringify(r));
                return res.json(getMensagemSucesso({chave: 'mensagem.usuarioConfirmadoSucesso'}));

            })
            .catch(function (erro) {
                console.log('usuario.confirmar - erro: ', JSON.stringify(erro));
                //if(erro.chave){
                //    return res.json({mensagens: [{tipo: 'danger', chave: erro.chave}]});
                //}
                //return res.json({mensagens: [{tipo: 'danger', texto: erro}]});
                return res.status(401).send(getMensagemErro(erro));
            }
        );
    };


    controller.logar       = function(req, res, next) {

        passport.authenticate('login', function (erro, usuario, info) {
            if (erro) {
                return next(erro)
            }
            if (!usuario) {
                console.log('mensagem de erro : ', info);
                return res.status(401).send(getMensagemErro(info));
            }
            // console.log("info", info);
            // console.log("user", usuario);
            // console.log("req.logIn", req.logIn);
            req.logIn(usuario, function (erro) {
                console.log ("erro", erro);
                if (erro) {
                    return next(erro);
                }
                return res.status(200).send();
            });
        })(req, res, next);

    };

    controller.sair       = function(req, res) {
        req.session.destroy(function(){
            console.log("session destroyed.");
        });
        req.logOut();
        res.redirect('/');

    };

    function getMensagem(tipo, info){
        console.log('getMensagem(%s, %s)', tipo, JSON.stringify(info));
        var mensagem = [];
        if(info.chave){
            mensagem =  {mensagens:[{tipo: tipo, chave: info.chave}]};
        }else{
            mensagem = {mensagens:[{tipo: tipo, texto: info.message}]};
        }
        return mensagem;
    }

    function getMensagemErro(info){
        return getMensagem('danger', info);
    }
    function getMensagemSucesso(info){
        return getMensagem('success', info);
    }

    return controller;
};
