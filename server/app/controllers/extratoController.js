const urlConexao = 'http://rodrigocipriani:LQP1wqj9PQ@couchdb.cloudno.de:5984/condominio';
// const urlConexao = 'https://couchdb.cloudno.de/condominio';
var nano = require('nano')('http://rodrigocipriani:LQP1wqj9PQ@couchdb.cloudno.de:5984');
nano.db.create('alice');
var alice = nano.db.use('alice');

module.exports = (app) => {
  const controller = {};
  const Erro = app.util.Erro;
  const ExtratoService = app.services.extratoService;

  controller.teste = function (req, res) {

    try{
      // clean up the database we created previously
      nano.db.destroy('alice', function() {
        // create a new database
        nano.db.create('alice', function() {
          // specify the database we are going to use
          var alice = nano.use('alice');
          // and insert a document in it
          alice.insert({ crazy: true }, 'rabbit', function(err, body, header) {
            if (err) {
              console.log('[alice.insert] ', err.message);
              return;
            }
            console.log('you have inserted the rabbit.')
            console.log(body);
          });
        });
      });
    }catch (e) {
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
