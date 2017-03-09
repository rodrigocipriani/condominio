
module.exports = (app) => {

    const usuarioController = app.controllers.usuarioController;

    app.route('/api/autenticacao')
        .post(usuarioController.logar)
        .get(usuarioController.sair);
    app.route('/api/usuario')
        .get(usuarioController.obterUsuarioLogado)
        .post(usuarioController.cadastrar)
        .put(usuarioController.alterar);
    app.route('/api/usuario/cadastro/:token?')
        .get(usuarioController.confirmarCadastro)
        .post(usuarioController.solicitarNovoToken)
        .put(usuarioController.alterarSenhaComToken);
};