
module.exports = (app) => {

    const controller = app.controllers.usuario;
    // const authCheckMiddleware = require('../passport/auth-check');

    // app.use(authCheckMiddleware(app));

    app.route('/api/autenticacao')
        .post(controller.logar)
        .get(controller.sair);
    app.route('/api/usuario')
        .get(controller.obterUsuarioLogado)
        .post(controller.cadastrar)
        .put(controller.alterar);
    app.route('/api/usuario/cadastro/:token?')
        .get(controller.confirmarCadastro)
        .post(controller.solicitarNovoToken)
        .put(controller.alterarSenhaComToken);
};