
module.exports = function (app) {

    var service = {},
        UsuariosModel = app.models.modelo.usuarios,
        CadastroModel = app.models.modelo.cadastros,
        sequelize = app.models.modelo.sequelize,
        utilitarios = app.util.utilitarios,
        bcrypt = require(process.env.NODE_ENV == 'DESENVOLVIMENTO' ? 'bcryptjs' : 'bcrypt'),
        INCLUIR_CADASTRO = 1,
        ALTERAR_CADASTRO = 2,
        SITUACAO_PENDENTE = 0,
        DUAS_HORAS = 1000 * 60 * 60 * 2;

    // funções
    service.alterar = alterar;
    service.listarNomes = listarNomes;
    service.buscarOuCriar = buscarOuCriar;
    service.obterJogador = obterJogador;
    service.obterUsuarioPorEmail = obterUsuarioPorEmail;
    service.obterUsuarioPorId = obterUsuarioPorId;
    service.solicitarNovoToken = solicitarNovoToken;
    service.validarTokenNovoUsuario = validarTokenNovoUsuario;

    /**
     * Obtem lista de nomes dos usuários.
     * @param ids (array de ids)
     * @returns {detalhesJogo}
     */
    function listarNomes(ids, cb) {
        UsuariosModel.findAll({
            attributes: ['nome'],
            where: {
                id: {
                    $in: ids
                }
            }
        }).then(function (usuarios) {
            cb(null, usuarios);
        }).catch(function (erro) {
            cb(erro);
        });

    };

    /**
     *
     * @param idJogador
     * @returns {Query|Promise|*}
     */
    function obterJogador(idJogador) {
        return UsuariosModel.findOne({
            where: {id: idJogador},
            attributes: ['id', 'nome', 'email']
        })
    };

    /**
     *
     * @param idJogador
     * @returns {Query|Promise|*}
     */
    function obterUsuarioPorId(idJogador) {
        return UsuariosModel
            .findOne({attributes: ['id', 'nome', 'email', 'situacao', 'tipo'], where: {id: idJogador}});
    };

    /**
     * Obtem todos os de um usuario
     * @param idJogador
     * @returns {Query|Promise|*}
     */
    function obterUsuarioPorEmail(email) {
        return UsuariosModel.findOne({
            where: {email: email}
        }).then(function (usuario) {
            return JSON.parse(JSON.stringify(usuario));
        });
    };

    /**
     * Busca o usuario ou cria novo.
     * @param email
     * @param nome
     * @param hashSenha
     * @returns {*}
     */
    function buscarOuCriar(email, nome, senha) {
        // valida campos:
        if(email == undefined || email.trim().length  == 0){
            return sequelize.Promise.reject({chave: 'mensagem.emailInvalido'});
        }else if(nome == undefined || nome.trim().length  == 0){
            return sequelize.Promise.reject({chave: 'mensagem.nomeUsuarioInvalido'});
        }else if(senha == undefined || senha.trim().length  < 6){
            return sequelize.Promise.reject({chave: 'mensagem.senhaTamanhoInvalida'});
        }
        var campoEmail = email.toLowerCase(), 
            hashSenha = bcrypt.hashSync(senha, bcrypt.genSaltSync(10));



        return sequelize.transaction({autocommit: false}, function (t) {
            var usuarioPromise;
            return UsuariosModel
                .findOrCreate(
                    {
                        where: {email: campoEmail},
                        defaults: {nome: nome, senha: hashSenha}
                    }
                ).spread(function (usuario, criado) {
                    usuarioPromise = usuario;
                    // Se o usuario foi criado, deve inserir registro na tabela Cadastro e retornar sua promise, caso contrário, undefined:
                    if (criado) {
                        return CadastroModel.create({"usuario_id": usuario.id, "tipo": INCLUIR_CADASTRO});
                    } else {
                        return sequelize.Promise.reject({chave: 'mensagem.usuarioExistente'});
                    }
                }).then(function (cadastro) {
                    // envia o email com o token recém criado
                    //TODO verificar se esse if é necessário
                    if (cadastro) {
                        utilitarios.enviarEmailCadastro(campoEmail, cadastro.token);
                        // Caso não tenha sido  feito novo cadastro, significa que o usuário já existe, então deve retornar undefined. Senão, retornar usuarioPromise;
                        return usuarioPromise;
                    }
                    //Caso contrário não retorna nada.
                    return;
                })
        });//--> se der erro, faz rollback
    };

    /**
     *
     * @param token
     */
    function validarTokenNovoUsuario(token) {
        return sequelize.transaction({autocommit: false}, function (t) {
            return CadastroModel
                .find(
                    {
                        where: {token: token},
                        include: [{model: UsuariosModel}]
                    })
                .then(function (cadastro) {
                    if (!cadastro) {
                        return sequelize.Promise.reject({chave: 'mensagem.tokenInexistente'});
                    } else if (cadastro.usuario.situacao != 0) {
                        return sequelize.Promise.reject({chave: 'mensagem.usuarioConfirmado'});
                    } else if(new Date() - cadastro.criacao > DUAS_HORAS){
                        // apagar token e depois rejeitar a promise
                        return CadastroModel.destroy({where: {token: token}}).
                        then(function(r){
                            // se der certo, faz o commit do delete e rejeita a promise
                            t.commit();
                            return sequelize.Promise.reject({chave: 'mensagem.tokenExpirado'});
                        });
                    } else {
                        cadastro.usuario.situacao = 1;
                        return cadastro.usuario.save();
                    }
                }).then(function (r) {
                    return CadastroModel.destroy({where: {token: token}});
                });
        });
    };

    /**
     * Alterar dados do usuario.
     * @param id
     * @param nome
     * @param senhaAntiga
     * @param senhaNova
     */
    function alterar(id, nome, senhaAntiga, senhaNova) {
        console.log('services/usuario - alterar ');

        return sequelize.transaction({autocommit: false}, function (t) {
            return UsuariosModel.findOne({where: {id: id}})
                .then(function (usuario) {
                    console.log('services/usuario - alterar - usuario.nome: %s, usuario.senha: %s: ', usuario.nome, usuario.senha);
                    if (senhaNova == undefined || senhaNova.trim().length == 0 || !bcrypt.compareSync(senhaAntiga, usuario.senha)) {
                        console.error('senha invalida!');
                        return sequelize.Promise.reject({chave: 'mensagem.senhaInvalida'});
                    } else {
                        return UsuariosModel.update(
                            {
                                nome: nome,
                                senha: bcrypt.hashSync(senhaNova, bcrypt.genSaltSync(10))
                            },
                            {where: {id: id}}
                        );
                    }
                });
        });
    };

    /**
     * Solicita novo token para alteração de senha.
     * @param email
     * @returns {*}
     */
    function solicitarNovoToken(email) {
        console.log('usuarioService.solicitarNovoToken - ', email);
        var usuarioRecuperado;
        var tipoCadastro;
        return sequelize.transaction({autocommit: false}, function (t) {
            return obterUsuarioPorEmail(email)
                .then(function (usuario) {
                    if (!usuario) {
                        return sequelize.Promise.reject({chave: 'mensagem.usuarioInexistente'});
                    }
                    usuarioRecuperado = usuario;
                    console.log('--> usuario: ', usuario);
                    tipoCadastro = usuario.situacao == SITUACAO_PENDENTE ? INCLUIR_CADASTRO : ALTERAR_CADASTRO;
                    return CadastroModel
                        .findOrCreate(
                            {
                                where: {usuario_id: usuario.id},
                                defaults: {tipo: tipoCadastro}
                            }
                        );
                })
                .spread(function (cadastro, criado) {
                    console.log('--> criado: %s, cadastro: %s', criado, cadastro);
                    if (!criado) {
                        //TODO apagar token e criar novo quando expirado
                        return sequelize.Promise.reject({chave: "mensagem.tokenPendente"});
                    }
                    // envia email de acordo com o tipo de cadastro:
                    if(tipoCadastro == INCLUIR_CADASTRO){
                        utilitarios.enviarEmailCadastro(usuarioRecuperado.email, cadastro.token);

                    }else{
                        utilitarios.enviarEmailAlterarSenha(usuarioRecuperado.email, usuarioRecuperado.nome, cadastro.token);
                    }
                    return sequelize.Promise.resolve({email: usuarioRecuperado.email});
                });
        });

    };


    service.alterarSenhaComToken = function (token, senha) {
        console.log('usuarioService.alterarSenhaComToken - token=%s, senha=%s', token, senha);
        return sequelize.transaction({autocommit: false}, function (t) {
            return CadastroModel
                .findOne(
                    {
                        where: {token: token}
                    }
                ).then(function (cadastro) {
                    //verifica se o usuario algum token
                    if (cadastro) {
                        console.log('cadastro.token %s , token=', cadastro.token, token);
                        // caso possua token, é necessário verificar se é do tipo 2 - alteração senha e se é igual ao da base
                        if (cadastro.tipo == ALTERAR_CADASTRO && token == cadastro.token) {
                            if(new Date() - cadastro.criacao > DUAS_HORAS){
                                // apagar token e depois rejeitar a promise
                                return CadastroModel.destroy({where: {token: token}}).
                                then(function(r){
                                    // se der certo, faz o commit do delete e rejeita a promise
                                    t.commit();
                                    return sequelize.Promise.reject({chave: 'mensagem.tokenExpirado'});
                                });
                            }
                            // busca o usuario e altera a senha
                            return obterUsuarioPorId(cadastro.usuario_id);
                        } else {
                            return sequelize.Promise.reject({chave: 'mensagem.tokenInvalido'});
                        }
                    } else {
                        return sequelize.Promise.reject({chave: 'mensagem.tokenInexistente'});
                    }
                }).then(function (usuario) {
                    console.log('--> recupera usuario: ', usuario.nome);
                    // valida senha
                    if (senha == undefined || senha.trim().length == 0) {
                        return sequelize.Promise.reject({chave: 'mensagem.senhaInvalida'});
                    }
                    // altera a senha
                    return usuario.update(
                        {
                            senha: bcrypt.hashSync(senha, bcrypt.genSaltSync(10))
                        },
                        {where: {id: usuario.id}}
                    );
                }).then(function (ok) {
                    //apaga o token
                    return CadastroModel.destroy({where: {token: token}});
                });
        });

    }
    return service;
};

