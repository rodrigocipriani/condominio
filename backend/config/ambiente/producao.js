module.exports = {
  lib: {
    bcrypt: 'bcript'
  },
  mailer: {
    auth: {
      user: 'usr.war@gmail.com',
      pass: 'aerolitos51'
    },
    defaultFromAddress: 'nao_responda <nao_responda@guerra.com>'
  },
  redis:{

    host: 'redis-15775.c11.us-east-1-3.ec2.cloud.redislabs.com',
    port: 15775,
    pass: '',
    client: '',
    ttl :  260
  },
  postgres: {
    usuario: 'zwvuhrjpwrsceh',
      senha: 'q-u9TG1P9Jv2nc8IRH84o3SS_Z',
      db: 'd259lc4cj3bn94',
    config: {
        host: 'ec2-54-243-201-144.compute-1.amazonaws.com',
      port: 5432,
      dialect: 'postgres',
        dialectOptions: {
            ssl: true
        },
      freezeTableName: true,
      define: {timestamps: false},
      pool: {max: 9, min: 0, idle: 10000}
    }
  },
  secretSession: 'domingao faustao',
  secretCookie: 'pegadinha do malandro',
  servidor: 'http://pareocarro.herokuapp.com/'
};