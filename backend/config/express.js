const express = require('express');
const cors = require('cors');
const redis = require("redis");
const consign = require('consign');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const redisStore = require('connect-redis')(session);

const config = require('./config');
const passport = require('passport');

console.log('config >>', config);

let isProduction = process.env.NODE_ENV == 'production';

module.exports = () => {

    const app = express();
    const port = process.env.PORT || config.port;

    app.set('port', port);
    app.set('views', './app/views');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html'); // ejs

    /**
     * servir a aplicação no frontend
     * */
    app.use(express.static('../frontend/public'));

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(require('method-override')());

    app.use(cookieParser(config.secretCookie));

    // app.all("*", function (req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    //     res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    //     res.header("Access-Control-Allow-Credentials", true);
    //     return next();
    // });

    app.use(cors({
        origin: [
            'http://localhost',
            'http://127.0.0.1',
            'http://localhost:8000',
            'http://127.0.0.1:8000',
            'localhost:8000',
            '127.0.0.1:8000'
        ],
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

    app.use(passport.initialize());
    app.use(passport.session());

    //load('models/modelo.js', {cwd: 'app'})
    consign({
        cwd: isProduction ? 'backend/app' : 'backend/app'
    })
        .include('models/modelo.js')
        //   .then('models/modelo.js')
        .then('util')
        .then('services')
        .then('controllers')
        .then('passport')
        .then('routes')
        .into(app);

    app.get('*', (req, res) => {
        res.status(404).render('404.ejs');
    });


    // app.use((req,res, next) => {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     next();
    // });

    // tratamento de erros
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

