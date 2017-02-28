const http      = require('http'),
      app       = require('./config/express')(),
      sequelize = app.models.modelo.sequelize,
      port      = process.env.PORT || 3000,
      env       = process.env.NODE_ENV;


sequelize.sync().done(() => {
    http.createServer(app).listen(app.get('port'), ()=> {
        console.log('Express Server escutando na porta ' +
            app.get('port'));
    });
});