
module.exports = (app) => {
  const extratoController = app.controllers.extratoController;
  const isLogged = require('../passport/isLogged');

  app.route('/api/extrato')
        // .all(isLogged(app)) // desta forma verifica o login
        .get(extratoController.findAll);

  app.route('/api/teste')
        .get(extratoController.teste);
};
