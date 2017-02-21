var user = process.env.DB_USER,
    pwd = process.env.DB_PWD;

module.exports = {
    lib: {
        bcrypt: 'bcriptjs'
    },
    mysql: {
        usuario: user,
        senha: pwd,
        db: 'condominio',
        config: {
            host: 'localhost',
            port: 3306,
            dialect: 'mysql',
            freezeTableName: true,
            define: {timestamps: false},
            pool: {
                maxConnections: 10,
                minConnections: 0,
                maxIdleTime: 60
            }
        }
    },
    redis: {
        host: 'localhost',
        port: 6379,
        pass: ' ',
        client: '',
        ttl: 260
    },
    timezone: '-03:00',
    secretSession: 'domingao faustao',
    secretCookie: 'pegadinha do malandro',
    servidor: 'localhost:3005'
};
