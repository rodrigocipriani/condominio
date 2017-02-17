module.exports = function (app) {

    var controller = app.controllers.documentosController;

    app.route('/api/pbms/buscar')
        .get(controller.findAllPbms);

};
