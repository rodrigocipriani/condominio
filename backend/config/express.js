const config = require('./config');
const express = require('express');
const cors = require('cors');
const redis = require("redis");
const fs = require('fs');
const path = require("path");
const consign = require('consign');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const session = require('express-session');
const compression = require('compression');
const modRewrite = require('connect-modrewrite');
const redisStore = require('connect-redis')(session);
const cliente = redis.createClient(config.redis.port, config.redis.host, {
    auth_pass: config.redis.pass,
    no_ready_check: true
});

module.exports = function (appDir) {

    var app = express();
    var port = process.env.PORT || 3005;
    app.set('port', port);
    // app.set('views','./backend/app/views');
    // app.engine('html', require('ejs').renderFile);
    // app.set('view engine', 'html'); // ejs


    //compressão do response, performance
    // app.use(compression());

    app.use(express.static('./frontend/public'));

    // app.use(bodyParser.urlencoded({extended: true}));
    // app.use(bodyParser.json());
    // app.use(require('method-override')());

    // app.use(cookieParser(config.secretCookie));


    //permite chamadas ajax de outros hosts
    app.use(cors({
        origin: function (origin, callback) {
            let domains = ['localhost', 'disec', 'usi', 'usi3', 'usi4', 'infra.servicos'];
            let isAuthorized = !!domains.filter(function (domain) {
                let bbDomain = '.bb.com.br';
                let bbIntranetDomain = domain + '.intranet' + bbDomain;
                return new RegExp(domain + bbIntranetDomain).test(origin) || new RegExp(domain + bbDomain).test(origin);
            });
            callback(isAuthorized ? null : 'Bad request', isAuthorized);
        },
        credentials: true
    }));
    // app.use(cors({
    //     origin: [
    //         'http://localhost.bb.com.br',
    //         'http://localhost.bb.com.br:3005',
    //         'http://infra.servicos.bb.com.br:3005',
    //         'http://infra.servicos.bb.com.br',
    //         'http://usi3.intranet.bb.com.br:3005',
    //         'http://usi3.intranet.bb.com.br',
    //         'http://usi.intranet.bb.com.br:3005',
    //         'http://usi.intranet.bb.com.br',
    //         'http://webserver.bb.com.br:3005',
    //         'http://webserver.bb.com.br'
    //     ],
    //     credentials: true
    // }));

    // var configuracaoRedis = config.redis;
    //     configuracaoRedis.client = cliente;
    // app.use(session(
    //     {
    //         secret: config.secretSession,
    //         store: new redisStore(configuracaoRedis),
    //         resave: false,
    //         saveUninitialized: false
    //     }
    // ));

    // app.use(helmet.hidePoweredBy({ setTo: 'Cobol' }));

    // app.use(modRewrite(['!/api|/assets|\\.html|\\.js|\\.css|\\woff|\\ttf|\\swf$ /index.html'
    //     // '!\\.\\w+$ /index.html [L]'
    // ]));

    // console.log("@ - CARREGANDO ARQUIVOS", services, controllers, routes);
    // console.log("Fazer carregar estes arquivos para depois mudar para pastas por funcionalidade", services, controllers, routes);

    consign({
        cwd: 'app',
        // cwd: path.join(process.cwd(),'backend','app'),
        logger: console,
        verbose: true
    })
        .include('models.js')
        .then('common')
        .then('services')
        .then('controllers')
        .then('routes')
        .into(app);


    // const modelos = arquivos.filter(file => {return file.indexOf('modelo.js') >= 0});
    // const commons = arquivos.filter(file => {return file.indexOf('common') >= 0});
    // const services = arquivos.filter(file => {return file.indexOf('Service.js') >= 0});
    // const controllers = arquivos.filter(file => {return file.indexOf('Controller.js') >= 0});
    // const routes = arquivos.filter(file => {return file.indexOf('Route.js') >= 0});

    // console.log('>>>>>>>>>>>>>common', commons);
    // console.log('>>>>>>>>>>>>>modelo', modelos);

     // app.modelo = {};
     // arquivos.filter(file => {return file.indexOf('modelo.js') >= 0}).forEach(modelo => {
     // let name = path.basename(modelo).split('.')[0];
     // app.modelo[name] = require(modelo)(app);
     // });

     // app.common = {};
     // arquivos.filter(file => {return file.indexOf('common') >= 0}).forEach(common => {
     // let name = path.basename(common).split('.')[0];
     // app.common[name] = require(common)(app);
     // });
    const carregarModulos = (dir, fileList = [], pai, busca) => {
        fs.readdirSync(dir).forEach(file => {
            const filePath = path.join(dir, file);
            if(fs.statSync(filePath).isDirectory()) {
                carregarModulos(filePath, fileList, pai, busca)
            }else{
                if (filePath.indexOf(busca) >= 0) {
                    let modulo = require(filePath);
                    let name = path.basename(filePath).split('.')[0];
                    pai[name] = modulo;
                    console.log('Carregado:', name);
                }
            }
        });
        return fileList
    };

/*
    app.services = {};
    app.controllers = {};
    app.routes = {};
    carregarModulos(path.join(appDir, 'app'), [], app.services, 'Service.js');
    carregarModulos(path.join(appDir, 'app'), [], app.controllers, 'Controller.js');
    carregarModulos(path.join(appDir, 'app'), [], app.routes, 'Route.js');
*/
     // app.services = {};
     // arquivos.filter(file => {return file.indexOf('Service.js') >= 0}).forEach(service => {
     // let name = path.basename(service).split('.')[0];
     // app.services[name] = require(service)(app);
     // });

     // app.controllers = {};
     // arquivos.filter(file => {return file.indexOf('Controller.js') >= 0}).forEach(controller => {
     // let name = path.basename(controller).split('.')[0];
     // app.controllers[name] = require(controller)(app);
     // });

     // app.routes = {};
     // arquivos.filter(file => {return file.indexOf('Route.js') >= 0}).forEach(route => {
     // let name = path.basename(route).split('.')[0];
     // app.routes[name] = require(route)(app);
     // });


    // app.get('*', function(req,res) {
    //     res.status(404).render('404.ejs');
    // });
    // tratamento de erros
    // app.use(function(erro, req, res, next){
    //     console.log(erro.stack);
    //     if (res.headersSent) {
    //        return next(erro);
    //     }
    //     res.status(500);
    //     if(erro.chave){
    //         res.send({mensagens: [{tipo: 'danger', chave: erro.chave}]});
    //     }else{
    //         res.send({mensagens: [{tipo: 'danger', texto: erro.message}]});
    //     }
    // });
    return app;

};
