
module.exports = (app) => {

    const controller = app.controllers.documentos;
    const authCheckMiddleware = require('../passport/auth-check');

    app.route('/api/documentos')
        .all(authCheckMiddleware(app))
        .get(controller.findAll);

    // app.use(authCheckMiddleware(app)).route('/api/usuario')

};