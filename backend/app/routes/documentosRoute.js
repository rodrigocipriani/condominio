
module.exports = (app) => {

    const documentosController = app.controllers.documentosController;
    const isLogged = require('../passport/isLogged');

    app.route('/api/documentos')
        .all(isLogged(app))
        .get(documentosController.findAll);

};