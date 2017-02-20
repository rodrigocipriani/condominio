const http = require('http');
const fs = require("fs");
const path = require("path");
const cluster = require('cluster');
const app = require('./config/express')(__dirname);
const sequelize = app.models.sequelize;


// if (cluster.isMaster) {
//
//     // Count the machine's CPUs
//     var workers = require('os').cpus().length;
//
//     // Create a worker for each CPU
//     for (var i = 0; i < workers; i += 1) {
//         cluster.fork();
//     }
//
//     // Code to run if we're in a worker process
// } else {
//

sequelize.sync().done(function () {
    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express Server escutando na porta ' +
            app.get('port'));
    });
});


