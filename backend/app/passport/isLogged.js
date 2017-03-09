module.exports = (app) => {

    const Erro = require('../util/Erro');

    return (req, res, next) => {

        if (!req.isAuthenticated()) {
            return res.redirect(401, '/logout');
            // return res.status(401).send(Erro.getMensagemErro('Usuário não está autenticado'));
        }

        return next();

    };
};
