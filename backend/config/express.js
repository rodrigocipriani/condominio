/**
 * Created by ThiagoFernando on 24/03/2015.
 */
const config      = require('./config'),
    express      = require('express'),
    cors         = require('cors'),
    redis        = require("redis"),
     consign      = require('consign'),
     bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session      = require('express-session'),
    redisStore   = require('connect-redis')(session),
    cliente      = redis.createClient(config.redis.port, config.redis.host, {auth_pass: config.redis.pass, no_ready_check: true}),
    passport     = require('passport');


module.exports =() => {

    const app = express();
    const port = process.env.PORT || 3000;

    app.set('port', port);
    app.set('views','./app/views');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html'); // ejs

    app.use(express.static('./public'));

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


    let configuracaoRedis = config.redis;
    configuracaoRedis.client = cliente;
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
      consign ({cwd: 'app'})
     .include('models/modelo.js')
     //   .then('models/modelo.js')
        .then('util')
        .then('services')
        .then('controllers')
        .then('passport')
        .then('routes')
        .into(app);


    app.get('*', (req,res) => {
        res.status(404).render('404.ejs');
    });


    // app.use((req,res, next) => {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     next();
    // });

    // tratamento de erros
    app.use((erro, req,res, next) => {
        console.log(erro.stack);
        // res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        if (res.headersSent) {
           return next(erro);
        }
        res.status(500);
        if(erro.chave){
            res.send({mensagens: [{tipo: 'danger', chave: erro.chave}]});
        }else{
            res.send({mensagens: [{tipo: 'danger', texto: erro.message}]});
        }
    });
    return app;
};

