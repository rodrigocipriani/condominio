module.exports = (app) => {

    const passport = require('passport');
    const config = require('../../config/config');
    const Erro = require('../util/Erro');
    const UsuariosService = app.services.usuario;
    const controller = {};

    controller.obterUsuarioLogado = (req, res) => {
        if (!req.user) {
            res.status(401).send(Erro.getMensagemErro({chave: 'mensagem.realizarLogin'}));
        }
        res.json(req.user);
    };

    // migrados do autenticação controller
    controller.cadastrar = (req, res, next) => {

        console.log('req', req);

        passport.authenticate('cadastrar', (err, user, info) => {
            if (err) {
                return next(err)
            }
            if (!user) {
                console.log('mensagem de erro : ', info);
                return res.status(400).send(Erro.getMensagemErro(info));
            }
            req.logIn(user, (erro) => {
                if (erro) {
                    return next(erro);
                }
                console.log('cadastro efetuado com sucesso! - user:', user);
                return res.send(Erro.getMensagemSucesso({chave: 'mensagem.usuarioCriadoSucesso'}));
            });
        })(req, res, next);

    };

    controller.alterar = (req, res) => {
        console.log('usuarioController.alterar - req.body', JSON.stringify(req.body));
        UsuariosService
            .alterar(req.body.id, req.body.nome, req.body.senhaAntiga, req.body.senha)
            .then((r) => {
                console.log('usuarioController.alterar - resposta: ', r);
                return res.json(Erro.getMensagemSucesso({chave: 'mensagem.usuarioAlteradoSucesso'}));
            }).catch((erro) => {
            console.log('usuarioController.alterar - erro: ', erro);
            return res.status(400).send(Erro.getMensagemErro(erro));
        });
    };

    controller.solicitarNovoToken = (req, res, next) => {
        console.log('usuarioService.solicitarNovoToken ', req.body.email);
        return UsuariosService
            .solicitarNovoToken(req.body.email)
            .then((email) => {
                return res.status(200).send(email);
            })
            .catch((erro) => {
                console.log('--> erro: ', erro);
                return res.status(400).send(Erro.getMensagemErro(erro));
            });
    };

    /**
     * Altera a senha com o token recebido via email.
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    controller.alterarSenhaComToken = (req, res, next) => {
        console.log('usuarioService.alterarSenhaComToken() - token=%s, senha=%s', req.body.token, req.body.senha);
        return UsuariosService
            .alterarSenhaComToken(req.body.token, req.body.senha)
            .then((usuarioAlterado) => {
                console.log('não devolve nada quando dá certo: %s', JSON.stringify(usuarioAlterado));
                return res.status(200).send();
            })
            .catch((erro) => {
                // console.log('--> erro: ', erro);
                return res.status(400).send(Erro.getMensagemErro(erro)); //getMensagemErro(erro));
            });
    };

    controller.confirmarCadastro = (req, res) => {

        const token = req.params.token;
        console.log('usuarioService.confirmarCadastro - token: %s', token);
        UsuariosService
            .validarTokenNovoUsuario(token)
            .then((r) => {
                console.log('deu certo: ', JSON.stringify(r));
                return res.json(Erro.getMensagemSucesso({chave: 'mensagem.usuarioConfirmadoSucesso'}));

            })
            .catch((erro) => {
                    console.log('usuario.confirmar - erro: ', JSON.stringify(erro));
                    //if(erro.chave){
                    //    return res.json({mensagens: [{tipo: 'danger', chave: erro.chave}]});
                    //}
                    //return res.json({mensagens: [{tipo: 'danger', texto: erro}]});
                    return res.status(401).send(Erro.getMensagemErro(erro));
                }
            );
    };


    controller.logar = (req, res, next) => {

        const {email, password} = req.body;

        if ('' === email) {
            Erro.add(Erro.getMensagemErro('E-mail informado incorreto'));
        }
        if ('' === password) {
            Erro.add(Erro.getMensagemErro('Senha informada incorreta'));
        }
        if (Erro.hasErrors()) {
            return res.status(401).send(Erro.getFlush());
        }

        passport.authenticate('login', (erro, usuario, info) => {


            if (erro) {
                return res.status(401).send(Erro.getMensagemErro(info));
            }
            if (!usuario) {
                return res.status(401).send(Erro.getMensagemErro('Usuário não encontrado'));
            }

            req.logIn(usuario, (erro) => {
                if (erro) {
                    return next(erro);
                }
                const payload = {
                    email: usuario.email
                };
                return res.json(usuario);
            });
        })(req, res, next);
    };

    controller.sair = (req, res) => {
        req.session.destroy(function () {
            console.log("session destroyed.");
        });
        req.logOut();
        return res.json({msg: 'ok'});
        // res.redirect('/');
    };

    return controller;
};
