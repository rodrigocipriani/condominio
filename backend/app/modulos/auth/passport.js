/**
 * Created by ThiagoFernando on 15/03/2015.
 */
module.exports = function (app) {

    var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        uuid = require('node-uuid'),
        UsuarioService          = app.services.usuario,
        bcrypt = require(process.env.NODE_ENV == 'DESENVOLVIMENTO' ? 'bcryptjs': 'bcrypt')
    ;
    // estratégia local - login
    passport.use('login', new LocalStrategy({passReqToCallback: true},
        function (req, username, password, done) {
            console.log('logar como ', username);
            UsuarioService
                .obterUsuarioPorEmail(username)
                .then(function (usuario) {
                    if (!usuario) {
                        console.log('Usuário inexistente: ', username);
                        return done(null, false, {chave:  'mensagem.usuarioInexistente'});
                    }else if (usuario.situacao != 1) { // 1 confirmado, 0 - pendente
                        console.log('Confirmar usuário: ', username);
                        return done(null, false, {chave:  'mensagem.mensagemEmailConfirmacao'});
                    }
                    //Validar senha
                    else if (!bcrypt.compareSync(password, usuario.senha)) {
                        console.error('senha invalida!');
                        return done(null, false,  {chave:  'mensagem.senhaInvalida'});
                    }
                    // Tanto usuario e senha estão corretos, retorna usuario através
                    // do metodo done, e, agora, será considerado um sucesso
                    // limpa senha
                    usuario.senha = '';
                    return done(null, usuario);


                }).catch(function(erro){
                    console.log('erro:', erro);
                    return done(erro);
                });
        }))
        // estratégia local - cadastrar
        .use('cadastrar', new LocalStrategy({passReqToCallback: true}, // permite retornar a requisição no callback
            function (req, username, password, done) {
                findOrCreateUser = function () {
                    // procura usuario no postgre
                    UsuarioService
                        .buscarOuCriar(req.param('email'), username, password)
                        .then(function(usuario){
                            // retorna usuario criado
                            return done(null, usuario);
                        }).catch(function(erro){
                            console.log('passport - cadastro - erro: ', erro);
                            return done(null, false, erro);
                        });
                };
                // Delay the execution of findOrCreateUser and execute the method
                // in the next tick of the event loop
                process.nextTick(findOrCreateUser);
            })
    );

    passport.serializeUser(function (usuario, done) {
        done(null, usuario.id);
    });

    passport.deserializeUser(function (id, done) {
        UsuarioService
            .obterUsuarioPorId(id)
            .then(function (usuario) {
                console.log('deserialize usuario - nome=%s', usuario.nome);
                if(!usuario){
                   done({chave: 'menssagem.usuarioInexistente'});
                }else{
                done(null, usuario);
                }
            })
            .catch(function(erro){
                console.log('erro: ', erro);
                done(erro);
            });
    });

};
