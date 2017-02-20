const config = require('../config/config');
const path = require('path');
const fs = require('fs');
const cls = require('continuation-local-storage');
const namespace = cls.createNamespace('cls-mysql-usi');
const Sequelize = require("sequelize");
let sequelize = null;
let models = null;

module.exports = function (app) {

    // const allFilesSync = (dir, fileList = []) => {
    //     fs.readdirSync(dir).forEach(file => {
    //         const filePath = path.join(dir, file);
    //         fs.statSync(filePath).isDirectory() ? allFilesSync(filePath, fileList) : fileList.push(filePath);
    //     });
    //     return fileList
    // };

    if (!models) {
        if (!sequelize) {
            Sequelize.cls = namespace;
            sequelize = new Sequelize(config.mysql.db, config.mysql.usuario, config.mysql.senha, config.mysql.config);
            sequelize.dialect.supports.schemas = true;
        }
        let db = {};

        let diretorios = fs.readdirSync(__dirname).filter(function (file) {
            return fs.statSync(path.join(__dirname, file)).isDirectory();
        });

        const carregarModulos = (dir, fileList = []) => {
            fs.readdirSync(dir).forEach(file => {
                const filePath = path.join(dir, file);
                if(fs.statSync(filePath).isDirectory()) {
                    carregarModulos(filePath, fileList)
                }else{
                    if (filePath.indexOf('Model.js') >= 0) {
                        let model = sequelize.import(filePath);
                        db[model.name] = model;
                        console.log('Carregado:', model.name);
                    }
                }
            });
            return fileList
        };
        carregarModulos(__dirname);

        Object.keys(db).forEach(function (model) {
            if ("associate" in db[model]) {
                db[model].associate(db)
            }
        });

        db.Sequelize = Sequelize;
        db.sequelize = sequelize;
        models = db;
    }
    return models;
};


// fs.readdirSync(__dirname)
//     .filter(function (file) {
//         return (file.indexOf(".") !== 0) && (file !== "models.js") && (file !== 'auto');
//     })
//     .forEach(function (file) {
//         let model = sequelize.import(path.join(__dirname, file));
//         console.log("models", model);
//         db[model.name] = model;
//     });
//
// Object.keys(db).forEach(function (model) {
//     if ("associate" in db[model]) {
//         db[model].associate(db)
//     }
// });
