module.exports = function (app) {

    var controller = app.controllers.documentosController;

    app.route('/documentos')
        .get(controller.findAllPbms);

};
