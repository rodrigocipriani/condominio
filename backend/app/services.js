const path = require('path');
const fs = require('fs');
let services = null;

module.exports = function () {

    if (!services) {
        let modulos = [];

        const carregarModulos = (dir, fileList = []) => {
            fs.readdirSync(dir).forEach(file => {
                const filePath = path.join(dir, file);
                if(fs.statSync(filePath).isDirectory()) {
                    carregarModulos(filePath, fileList)
                }else{
                    if (filePath.indexOf('Service.js') >= 0) {
                        let modulo = require(filePath);
                        let name = path.basename(filePath).split('.')[0];
                        modulos[name] = modulo;
                        console.log('Carregado:', name);
                    }
                }
            });
            return fileList
        };
        carregarModulos(__dirname);

        services = [];
        services = modulos;
    }
    return services;
};
