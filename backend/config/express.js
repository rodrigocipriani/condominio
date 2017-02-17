var config = require('./config'),
    express = require('express'),
    cors = require('cors'),
    redis = require("redis"),
    path = require("path"),
    consign = require('consign'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    helmet = require('helmet'),
    session = require('express-session'),
    compression = require('compression'),
    modRewrite = require('connect-modrewrite'),
    redisStore = require('connect-redis')(session),
    cliente = redis.createClient(config.redis.port, config.redis.host, {
        auth_pass: config.redis.pass,
        no_ready_check: true
    });

module.exports = function () {

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

    consign({
        cwd: 'app',
        // cwd: path.join(process.cwd(),'backend','app'),
        logger: console,
        verbose: true
    })
        .include('models/modelo.js')
        .then('common')
        .then('services')
        .then('controllers')
        .then('routes')
        .into(app);

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
