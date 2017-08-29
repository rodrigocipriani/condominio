const urlConexao = 'https://rodrigocipriani:LQP1wqj9PQ@couchdb.cloudno.de/condominio';
// const urlConexao = 'https://couchdb.cloudno.de/condominio';
// const nano = require('nano')(urlConexao);
const db = require('nano')(urlConexao);

module.exports = (app) => {
  const controller = {};
  const Erro = app.util.Erro;
  const ExtratoService = app.services.extratoService;

  controller.teste = function (req, res) {
    try {
      // const condominio = nano.db.use('condominio');
      return db.get('app', (err, body) => {
        if (!err) {
          console.log(body);
          res.send(body);
        }
      });
    } catch (e) {
      console.log('2222e', e);
    }
  };

  controller.findAll = function (req, res) {
    ExtratoService.findAll().then((extrato) => {
      // console.log('extrato', extrato);
      // setTimeout(() => { res.send(extrato); }, 2000);
      res.send(extrato);
    }).catch((erro) => {
      return res.status(400).send(Erro.getMensagemErro(erro));
    });
  };

  return controller;
};
