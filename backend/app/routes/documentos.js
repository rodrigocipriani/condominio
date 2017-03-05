
module.exports = (app) => {

    const controller = app.controllers.documentos;
    const authCheckMiddleware = require('../passport/auth-check');
    const isLogged = require('../passport/isLogged');

    app.route('/api/documentos')
        .all(isLogged(app))
        .get(controller.findAll);

    // app.use(authCheckMiddleware(app)).route('/api/usuario')

};