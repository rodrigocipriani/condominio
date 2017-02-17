const http = require('http');
const fs = require("fs");
const path = require("path");
const cluster = require('cluster')
// const app = require('./config/express')("Thiago Viadinho >>>>>>>>>>>>>>>");
// const sequelize = app.models.modelo.sequelize;


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

// busca arquivos na pasta recursivamente
var walk = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
};


function initApp(err, arquivos){
    const app = require('./config/express')(arquivos);
    const sequelize = app.models.modelo.sequelize;

    sequelize.sync().done(function () {
        http.createServer(app).listen(app.get('port'), function () {
            console.log('Express Server escutando na porta ' +
                app.get('port'));
        });
    });
}

// inicializa passando aruqivos
walk('./app', initApp);



