
const urlConexao = 'https://rodrigocipriani:LQP1wqj9PQ@couchdb.cloudno.de/condominio';
const userStore = require('nano')(urlConexao);

module.exports = (app) => {
  const controller = {};
  const Erro = app.util.Erro;
  const ExtratoService = app.services.extratoService;

  controller.teste = function (req, res) {
    try {
      const key = 'app';

      userStore.get(key, (error, body) => {
        if (!error) {
          console.log(body);
        } else {
          console.log(error, body);
          res.send({ error, body });
        }
        const newBody = {
          ...body,
          madeBy: 'madeByServer',
          state : {
            ...body.state,
            total: 0
          }
        };
        userStore.insert(newBody, key, (error, bodySalvo) => {
          if (!error) {
            return res.send(newBody);
          }
          return res.send(error);
        });
      });

      // userStore.insert({
      //   // "_id": "app",
      //   // "_rev": "121-f48a29e0f0dc4c7ca244d6bffc5280a8",
      //   "madeBy": "rodrigo",
      //   "state": {
      //     "total": 501,
      //     "teste": 1
      //   }
      // }, 'app', function (error, body) {
      //   if(!error) {
      //     console.log(body);
      //     res.send(body);
      //   }else{
      //     console.log(error, body);
      //     res.send({error, body});
      //   }
      // });
      // return userStore.get('app', (err, body) => {
      //   if (!err) {
      //     console.log(body);
      //     res.send(body);
      //   }
      // });
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
