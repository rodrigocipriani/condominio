module.exports = function (app) {

    var controller = app.controllers.contrato;

    app.route('/api/buscar/:anoContrato/:codigoUorContrato/:numeroContrato')
        .get(controller.buscaPorId);

    app.route('/api/buscar/pordependencia')
        .get(controller.buscaPorDependencia);

    app.route('/api/dependencia/resultado')
        .get(controller.buscaResultadoPorDependencia);

    app.route('/api/pbms/buscar')
        .get(controller.findAllPbms);

    app.route('/api/sintetico/totais/mes/fimvigencia')
        .get(controller.buscaTotaisPorMesFimVigenciaSintetico);

};
