module.exports = (app) => {
  const controller = {};
  const Erro = app.util.Erro;
  const ExtratoService = app.services.extratoService;

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
