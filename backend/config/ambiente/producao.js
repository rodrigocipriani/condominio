var   user = process.env.DB_USER,
  pwd = process.env.DB_PWD;

module.exports = {

  lib: {
    bcrypt: 'bcriptjs'
  },
  mysql: {
    usuario: user,
    senha: pwd,
    db: 'global',
    config: {
      host: '172.17.85.81',
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
  servidor: 'usi.intranet.bb.com.br:3005'

};
