module.exports = {
    publicFolder: './frontend/public',
    corsOriginsAccept: [],
    port: 80,
    lib: {
        bcrypt: 'bcriptjs'
    },
    mailer: {
        auth: {
            user: 'xxx@gmail.com', // todo Colocar como variavel de ambiente
            pass: 'xxx'// todo Colocar como variavel de ambiente
        },
        defaultFromAddress: 'contato <contato@boulevardcaymmi.com.br>'
        // defaultFromAddress: 'nao_responda <nao_responda@guerra.com>'
    },
    redis: {
        host: 'localhost',
        port: 6379,
        pass: process.env.REDIS_PASSWD,
        client: ''
        // ttl :  260
    },
    /*
     postgres: {
     usuario: 'postgres',
     senha: 'postgres',
     db: 'condominio',
     config: {
     host: '127.0.0.1',
     port: 5432,
     dialect: 'postgres',
     dialectOptions: {
     ssl: true
     },
     // "logging": false,
     freezeTableName: true,
     define: {timestamps: false},
     pool: {max: 9, min: 0, idle: 10000}
     }
     },
     */
    postgres: {
        usuario: process.env.POSTGRES_USER,
        senha: process.env.POSTGRES_PASSWD,
        db: 'condominio',
        config: {
            host: 'localhost',
            port: 5432,
            dialect: 'postgres',
            freezeTableName: true,
            define: {timestamps: false},
            pool: {max: 100, min: 0, idle: 10000}
        }
    },
    secretSession: 'domingao faustao',
    secretCookie: 'pegadinha do malandro',
    servidor: 'localhost:3000'
};