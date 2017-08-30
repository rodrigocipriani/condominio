
module.exports = (app) => {
  const extratoController = app.controllers.extratoController;
  const isLogged = require('../passport/isLogged');

  app.route('/api/extrato')
        // .all(isLogged(app)) // desta forma verifica o login
        .get(extratoController.findAll);

  app.route('/api/criarlista/:tamanho')
        .get(extratoController.criarlista);

  app.route('/api/reset')
        .get(extratoController.reset);
};
