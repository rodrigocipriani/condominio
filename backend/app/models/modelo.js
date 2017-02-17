
var
    config      = require('../../config/config'),
    path        = require("path"),
    fs          = require("fs"),
    Sequelize   = require("sequelize"),
    sequelize   = null,
    modelo      = null,
    cls         = require('continuation-local-storage');
    namespace   = cls.createNamespace('cls-mysql-usi');


module.exports = function (app) {

    if (!modelo) {
        console.log('Inicializa modelos do bd');
        if (!sequelize) {
            console.log('-> instancia sequelize com cls');
            Sequelize.cls                      = namespace;
            sequelize                          = new Sequelize(config.mysql.db, config.mysql.usuario, config.mysql.senha, config.mysql.config);
            sequelize.dialect.supports.schemas = true;
        }
        var db = {};
        var diretorios = fs.readdirSync(__dirname).filter(function (file) {
            return fs.statSync(path.join(__dirname, file)).isDirectory();
        });

        diretorios.forEach(function (diretorio) {

            fs.readdirSync(path.join(__dirname, diretorio))
                .filter(function (file) {
                    return (file.indexOf(".") !== 0) && (file !== "modelo.js") && (file !== 'auto');
                })
                .forEach(function (file) {
                    var model = sequelize.import(path.join(__dirname, diretorio, file));
                    console.log("model",  model);
                    db[model.name] = model;
                });

            // Object.keys(db).forEach(function (model) {
            //     console.log("o que vem", model, db[model]);
            //     if ("associate" in db[model]) {
            //         db[model].associate(db)
            //     }
            // });
        });
        Object.keys(db).forEach(function (model) {
            if ("associate" in db[model]) {
                db[model].associate(db)
            }
        });


        db.Sequelize = Sequelize;
        db.sequelize = sequelize;
        modelo = db;
    }
    return modelo;
};


// fs.readdirSync(__dirname)
//     .filter(function (file) {
//         return (file.indexOf(".") !== 0) && (file !== "modelo.js") && (file !== 'auto');
//     })
//     .forEach(function (file) {
//         var model = sequelize.import(path.join(__dirname, file));
//         console.log("modelo", model);
//         db[model.name] = model;
//     });
//
// Object.keys(db).forEach(function (model) {
//     if ("associate" in db[model]) {
//         db[model].associate(db)
//     }
// });
