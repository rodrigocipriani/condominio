let api, app, base, staticServer;

switch (process.env.NODE_ENV) {
    case 'development' :
        api  = 'http://localhost:3004';
        app  = '';
        base = 'http://localhost.bb.com.br:3008';
        staticServer = 'http://disec.bb.com.br/static';
        break;
    case 'homologacao' :
        api  = 'http://usi3.intranet.bb.com.br/api';
        app  = '/eficiencia';
        base = 'http://usi3.intranet.bb.com.br';
        staticServer = 'http://disec.bb.com.br/static';
        break;
    case 'production' :
        api  = 'http://disec.bb.com.br/api';
        app  = '/eficiencia';
        base = 'http://disec.bb.com.br';
        staticServer = 'http://disec.bb.com.br/static';
        break;
}

export const API_URL         = api;
export const APP_URL         = app;
export const SERVER_BASE_URL = base;
export const STATIC_SERVER_URL = staticServer;



