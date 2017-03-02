const express = require('express');
const path = require('path');
const cors = require('cors');
const redis = require("redis");
const consign = require('consign');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const modRewrite = require('connect-modrewrite');
const redisStore = require('connect-redis')(session);

const config = require('./config');
const passport = require('passport');

let isProduction = process.env.NODE_ENV == 'production';

module.exports = () => {

    const app = express();
    const port = process.env.PORT || config.port;

    app.set('port', port);
    app.set('views', './app/views');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html'); // ejs

    /**
     * Reescrevendo a url para sempre cair no index.html
     * (correção refresh da tela)
     * */
    app.use(modRewrite(
        ['!\\api/|\\.html|\\.js|\\.svg|\\.css|\\.png|\\.jpg$ /index.html [L]']
    ));

    /**
     * servir a aplicação no frontend
     * */
    app.use(express.static(config.publicFolder));



    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(require('method-override')());

    app.use(cookieParser(config.secretCookie));

    /**
     * Configuração para cross domain
     * */
    app.use(cors({
        origin: config.corsOriginsAccept,
        //  allowedHeaders: ['Content-Type', 'Authorization'],
        //   additionalHeaders: ['cache-control', 'x-requested-with'],
        credentials: true

    }));

    /**
     * Configuração do redis
     * */
    let configuracaoRedis = config.redis;
    configuracaoRedis.client = redis.createClient(config.redis.port, config.redis.host, {
        auth_pass: config.redis.pass,
        no_ready_check: true
    });
    app.use(session(
        {
            secret: config.secretSession,
            store: new redisStore(configuracaoRedis),
            resave: false,
            saveUninitialized: false
        }
    ));

    /**
     * Inicialização do passport
     * */
    app.use(passport.initialize());
    app.use(passport.session());

    /**
     * Carga de módulos
     * */
    consign({
        cwd: isProduction ? 'backend/app' : 'backend/app'
    })
        .include(path.join('models', 'modelo.js'))
        .then('util')
        .then('services')
        .then('controllers')
        .then('passport')
        .then('routes')
        .into(app);

    app.get('*', (req, res) => {
        res.status(404).render('404.ejs');
    });

    /**
     * Tratamento de erros
     * */
    app.use((erro, req, res, next) => {
        console.log(erro.stack);
        // res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        if (res.headersSent) {
            return next(erro);
        }
        res.status(500);
        if (erro.chave) {
            res.send({mensagens: [{tipo: 'danger', chave: erro.chave}]});
        } else {
            res.send({mensagens: [{tipo: 'danger', texto: erro.message}]});
        }
    });

    return app;
};

