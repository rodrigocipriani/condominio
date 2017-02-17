
'use strict';

module.exports = function(app) {

    const Erro                         = app.common.erro;
    const ContratoService              = app.services.contrato;
    const sequelize                    = app.models.modelo.sequelize;
    const controller                   = {};

    controller.buscaPorDependencia                   = function(req, res) {

        ContratoService.buscaPorDependencia(
            req.params.anoContrato,
            req.params.codigoUorContrato,
            req.params.numeroContrato
        ).then(function(contratos) {
            var dados   = [];
            var geral   = [];
            var estados = [];
            var posicao  ;
            var item    = {};

            for (var i = 0; i < contratos.length; i ++) {
                item = {};
                item.numeroContrato     = contratos[i].numeroContrato;
                item.codigoUorContrato  = contratos[i].codigoUorContrato;
                item.anoContrato        = contratos[i].anoContrato;
                item.codigoDependenciaContrato = contratos[i].codigoDependenciaContrato;
                item.nomeAgrupador      = contratos[i].AgrupadorContrato.nomeAgrupador;
                item.codigoAgrupador    = contratos[i].AgrupadorContrato.codigoAgrupador;
                item.projetos           = contratos[i].ContratoProjetos;
                item.atributos           = contratos[i].ContratoAtributo;
                if(contratos[i].ContratoAtributo){
                    item.indicadorAptoRenovacao = contratos[i].ContratoAtributo.indicadorAptoRenovacao || false;
                }else{
                    item.indicadorAptoRenovacao = false;
                }

                geral.push({
                    'anoContrato'                : contratos[i].anoContrato,
                    'codigoUorContrato'          : contratos[i].codigoUorContrato,
                    'numeroContrato'             : contratos[i].numeroContrato,
                    'codigoDependenciaContrato'  : contratos[i].codigoDependenciaContrato,
                    'dataInicioVigenciaContrato' : contratos[i].dataInicioVigenciaContrato,
                    'dataFimVigenciaContrato'    : contratos[i].dataFimVigenciaContrato,
                    'valorContrato'              : contratos[i].valorContrato,
                    'codigoFornecedor'           : contratos[i].codigoFornecedor,
                    'nomeAgrupador'              : item.nomeAgrupador,
                    'codigoAgrupador'            : item.codigoAgrupador,
                    'projetos'                   : item.projetos,
                    'indicadorAptoRenovacao'     : item.indicadorAptoRenovacao
                });




                for (var j = 0; j < contratos[i].ItemContratos.length; j ++) {

                    item.valorItem             = contratos[i].ItemContratos[j].valorUnitarioItemContratado;
                    item.dataInicioVigencia    = contratos[i].ItemContratos[j].dataInicioVigencia;
                    item.dataFimVigencia       = contratos[i].ItemContratos[j].dataFimVigencia;
                    item.nomeItem              = contratos[i].ItemContratos[j].Pbms.nomeItem;
                    item.quantidadeContratado  = contratos[i].ItemContratos[j].quantidadeItemContratado;

                    for (var k = 0; k < contratos[i].ItemContratos[j].BeneficiarioServicoContratados.length; k ++) {
                        item.sequencialItem        = contratos[i].ItemContratos[j].BeneficiarioServicoContratados[k].sequencialContrato;
                        item.prefixoBeneficiado    = contratos[i].ItemContratos[j].BeneficiarioServicoContratados[k].dependencia.prefixoDependencia;
                        item.uorBeneficiada        = contratos[i].ItemContratos[j].BeneficiarioServicoContratados[k].dependencia.codigoUor;
                        item.nomeDependencia       = contratos[i].ItemContratos[j].BeneficiarioServicoContratados[k].dependencia.nomeDependencia;
                        item.municipio             = contratos[i].ItemContratos[j].BeneficiarioServicoContratados[k].dependencia.municipio;
                        item.siglaUf               = contratos[i].ItemContratos[j].BeneficiarioServicoContratados[k].dependencia.siglaUf;

                        // posicao = estados.indexOf(contratos[i].ItemContratos[j].MapaEntregas[k].dependencia.siglaUf);

                        dados.push({
                            'numeroContrato'       : item.numeroContrato,
                            'codigoUorContrato'    : item.codigoUorContrato,
                            'anoContrato'          : item.anoContrato,
                            'codigoDependenciaContrato' : item.codigoDependenciaContrato,
                            'nomeItem'             : item.nomeItem,
                            'sequencialItem'       : item.sequencialItem,
                            'dataInicioVigencia'   : item.dataInicioVigencia,
                            'dataFimVigencia'      : item.dataFimVigencia,
                            'valorItem'            : item.valorItem,
                            'prefixoBeneficiado'   : item.prefixoBeneficiado,
                            'uorBeneficiada'       : item.uorBeneficiada,
                            'nomeDependencia'      : item.nomeDependencia,
                            'municipio'            : item.municipio,
                            'quantidadeContratada' : item.quantidadeContratado,
                            'siglaUf'              : item.siglaUf
                        });

                        // console.log("será?",  JSON.parse(JSON.stringify(contratos[i].ItemContratos[j].MapaEntregas.dependencia.siglaUf)));
                    }
                }
            }

            var saida = {'itens'     : dados,
                'contratos' : geral};

            res.send(saida);
        }).catch(function(err) {
            Erro.novo(Erro.CONSULTAR_DADOS, req, res, err);
        });
    };

    controller.buscaPorId                            = function(req, res) {

        ContratoService.findById(
            req.params.anoContrato,
            req.params.codigoUorContrato,
            req.params.numeroContrato
        ).then(function (contrato) {
            res.send(contrato);
        }).catch(function (erro) {
            Erro.novo(Erro.CONSULTAR_DADOS, req, res, erro);
        });

    };

    controller.buscaResultadoPorDependencia          = function(req, res) {

        ContratoService.buscaResultadoPorDependencia().then(function(contratos) {
            res.send(contratos);
        }).catch(function(err) {
            Erro.novo(Erro.CONSULTAR_DADOS, req, res, err);
        });

    };

    controller.buscaTotaisPorMesFimVigenciaSintetico = function(req, res) {

        ContratoService.buscaTotaisPorMesFimVigenciaSintetico()
            .then(function (contratos) {
                res.send(contratos);
            }).catch(function (erro) {
            Erro.novo(Erro.CONSULTAR_DADOS, req, res, erro);
        });

    };

    controller.findAllPbms                           = function(req, res) {

        ContratoService.findAllPbms()
            .then(function(pbmss) {
            res.send(pbmss);
        }).catch(function(erro) {
            Erro.novo(Erro.CONSULTAR_DADOS, req, res, erro);
        });
    };

    controller.vincularContratoProjeto               = function(req, res) {

        ContratoService.vincularContratoProjeto(
            req.params.anoContrato,
            req.params.codigoUorContrato,
            req.params.numeroContrato,
            req.params.codigoSistemaOrigem,
            req.params.codigoProjeto
        ).then(function (contrato) {
            res.send(contrato);
        }).catch(function (erro) {
            Erro.novo(Erro.CONSULTAR_DADOS, req, res, erro);
        });

    };

    return controller;



};
