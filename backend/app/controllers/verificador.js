module.exports = (app) => {

    const verificadorController     = {};

    verificadorController.isAutenticado =  (req, res, next) => {

        console.log('verificador.isAutenticado ');


        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.status('401').json(
                {mensagens: [{
                    tipo: 'danger',
                    chave: "mensagem.naoAutorizado"
                }]});
        }
    };

    verificadorController.isAdmin =  (req, res, next) => {
        console.log('verificador.isAdmin ');
        if (req.isAuthenticated() && req.user.tipo == 99) {
            console.log('req.user ', JSON.stringify(req.user));
            return next();
        } else {
            console.log('req.user ', JSON.stringify(req.user));
            return res.status('403').json(
                {mensagens: [{
                    tipo: 'danger',
                    chave: "mensagem.naoAutorizado"
                }]});
        }
    };

    return verificadorController;
};