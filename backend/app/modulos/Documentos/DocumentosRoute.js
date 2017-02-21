module.exports = function (app) {

    var DocumentosController = app.controllers.DocumentosController;

    app.route('/api/documentos').get(DocumentosController.findAllPbms);

};
