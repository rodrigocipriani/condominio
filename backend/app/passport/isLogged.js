module.exports = (app) => {

    const Erro = require('../util/Erro');

    return (req, res, next) => {

        console.log('req.user', req.user);

        if (!req.user) {
            return res.status(401).send(Erro.getMensagemErro('Usuário não está autenticado'));
        }

        return next();

    };
};
