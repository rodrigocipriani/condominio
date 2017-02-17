module.exports = function (app) {

    app.get('/', function (req, res) {
        console.log('routes/index.js - get(/) ');
        var nomeUsuario = '',
            admin = false;
        if (req.user) {
            nomeUsuario = req.user.nome;
            admin = req.user.admin;
        }
        res.render('index', {"usuarioLogado": nomeUsuario, "admin": admin});
    });
};
