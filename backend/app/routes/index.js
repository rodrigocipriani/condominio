/**
 * Created by ThiagoFernando on 15/03/2015.
 */
module.exports = (app) => {

    app.get('/', (req, res) => {
        console.log('routes/index.js - get(/) ');

        let nomeUsuario = '';
        let admin = false;
        if (req.user) {
            nomeUsuario = req.user.nome;
            admin   = req.user.admin;
        }
        res.render('index', {"usuarioLogado": nomeUsuario, "admin": admin});
    });
};
