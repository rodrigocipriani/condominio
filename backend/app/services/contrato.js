/**
 * Created by thiago on 26/10/2016.
 */

'use strict';

module.exports = function (app) {

    const AgrupadorContratoModel   = app.models.modelo.AgrupadorContrato;
    const BeneficiarioServicoModel = app.models.modelo.BeneficiarioServicoContratado;
    const ContratoModel            = app.models.modelo.Contrato;
    const ContratoAtributoModel    = app.models.modelo.ContratoAtributo;
    const ContratoProjetoModel     = app.models.modelo.ContratoProjeto;
    const ItemContratoModel        = app.models.modelo.ItemContrato;
    const PbmsModel                = app.models.modelo.Pbms;
    const UorMestreModel           = app.models.modelo.Tmst606;
    const service                  = {};


    service.busca                                 =  function (dataInicio, dataFim) {

        var where = {};
        if (dataInicio && dataFim) {
            where = {
                where: {
                    dataFimVigenciaContrato: {
                        $between: [dataInicio, dataFim]
                    }
                },
                order: [
                    ['dataFimVigenciaContrato', 'ASC']
                ]
            };
        }

        return ContratoModel.findAll(where);

    };

    service.buscaPorDependencia                   =  function (anoContrato, codigoUorContrato, numeroContrato) {

        var dataAtual = new Date();
        return ContratoModel.findAll(
            {
                where: {
                    $or: [
                        {'dataFimVigenciaContrato': {$gte: dataAtual}},
                        {'dataFimVigenciaContrato': {$lt: dataAtual},
                            $and: [{'renovacao': true}]
                        }
                    ],
                    'codigoSistemaOrigem': 0
                },
                attributes: ['anoContrato', 'codigoUorContrato', 'numeroContrato', 'codigoDependenciaContrato', 'dataInicioVigenciaContrato', 'dataFimVigenciaContrato', 'valorContrato', 'codigoFornecedor'],
                order: [
                    ['dataFimVigenciaContrato', 'ASC']
                ],
                include: [{
                    model: AgrupadorContratoModel,
                    attributes: ['codigoAgrupador', 'nomeAgrupador']
                },
                    {
                        model: ContratoProjetoModel,
                        attributes: ['codigoProjeto'],
                        required: false,
                        where: {
                            $and: [
                                ["`Contrato`.`AA_CTR` = `ContratoProjetos`.`AA_CTR`"],
                                ["`Contrato`.`CD_UOR_CTR` = `ContratoProjetos`.`CD_UOR_CTR`"],
                                ["`Contrato`.`NR_CTR` = `ContratoProjetos`.`NR_CTR`"],
                                ["`Contrato`.`CD_SIS_OGM` = `ContratoProjetos`.`CD_SIS_OGM`"]
                            ]
                        }
                    },
                    {
                        model: ContratoAtributoModel,
                        attributes: ['indicadorAptoRenovacao'],
                        required: false,
                        where: {
                            $and: [
                                ["`Contrato`.`AA_CTR` = `ContratoAtributo`.`AA_CTR`"],
                                ["`Contrato`.`CD_UOR_CTR` = `ContratoAtributo`.`CD_UOR_CTR`"],
                                ["`Contrato`.`NR_CTR` = `ContratoAtributo`.`NR_CTR`"],
                                ["`Contrato`.`CD_SIS_OGM` = `ContratoAtributo`.`CD_SIS_OGM`"]
                            ]
                        }
                    },
                    {
                        model: ItemContratoModel,
                        attributes: ['quantidadeItemContratado', 'valorUnitarioItemContratado', 'dataInicioVigencia', 'dataFimVigencia'],
                        where: {
                            $and: [["`Contrato`.`CD_UOR_CTR` = `ItemContratos`.`CD_UOR_CTR`"], ["`Contrato`.`AA_CTR` = `ItemContratos`.`AA_CTR`"],
                                ["`Contrato`.`CD_SIS_OGM` = `ItemContratos`.`CD_SIS_OGM`"]]
                        },
                        include: [{
                            model: PbmsModel,
                            attributes: ['nomeItem'],
                            where: {
                                $and: [["`ItemContratos`.`CD_CLS_ITEM_CAT` = `ItemContratos.Pbms`.`CLS_PBMS`"], ["`ItemContratos`.`CD_SCLS_ITEM_CAT` = `ItemContratos.Pbms`.`SCL_PBMS`"],
                                    ["`ItemContratos`.`NR_ITEM_CAT` = `ItemContratos.Pbms`.`SEQ_PBMS`"]]
                            }
                        },
                            {
                                model: BeneficiarioServicoModel,
                                attributes: ['sequencialContrato'],
                                where: {
                                    $and: [["`ItemContratos`.`CD_UOR_CTR` = `ItemContratos.BeneficiarioServicoContratados`.`CD_UOR_CTR`"], ["`ItemContratos`.`AA_CTR` = `ItemContratos.BeneficiarioServicoContratados`.`AA_CTR`"],
                                        ["`ItemContratos.BeneficiarioServicoContratados`.`CD_SIS_OGM` = `ItemContratos`.`CD_SIS_OGM`"], ["`ItemContratos.BeneficiarioServicoContratados`.`NR_CTR` = `ItemContratos`.`NR_CTR`"]]
                                },
                                required: false,
                                include: [{
                                    model: UorMestreModel, as: 'dependencia',
                                    attributes: ['nomeDependencia', 'siglaUf', 'logradouro', 'bairro', 'municipio', 'codigoCep', 'prefixoDependencia', 'codigoUor']
                                }]
                            }]
                    }
                ]
            });
    };

    service.buscaResultadoPorDependencia          =  function () {

        var sql = ' SELECT depe_resultado.numero as numeroDependencia, ' +
            ' depe_resultado.numero_subordinada, ' +
            ' depe_resultado.tipo, ' +
            ' depe_resultado.tipo_resultado, ' +
            ' depe_resultado.valor_resultado, ' +
            ' MST606.NM_DEPE as nomeDependencia, ' +
            ' MST606.SG_UF as siglaUf, ' +
            ' MST606.CD_UOR as codigoUor, ' +
            ' lczc_geo_uor.NR_LTD as numeroLatitude, ' +
            ' lczc_geo_uor.NR_LGTE as numeroLongitude ' +
            ' FROM (mestre.MST606 MST606 ' +
            ' INNER JOIN uor.lczc_geo_uor lczc_geo_uor ' +
            ' ON (MST606.CD_UOR = lczc_geo_uor.CD_UOR)) ' +
            ' INNER JOIN contrato.depe_resultado depe_resultado ' +
            ' ON     (depe_resultado.numero = MST606.CD_PREF_DEPE) ' +
            ' AND (depe_resultado.numero_subordinada = MST606.CD_ORDM_SBRD) ';

        return new Promise(function (resolve, reject) {

            db.sequelize.query(sql).spread(function (dados) {

                resolve(dados);

            }).catch(reject);

        });
    };

    service.buscaTotaisPorMesFimVigenciaSintetico =  function () {

        var sql = ' SELECT contratos.dataFimVigenciaContrato, COUNT(contratos.dataFimVigenciaContrato) as total FROM ' +
            ' (SELECT  ' +
            ' DISTINCT CONCAT(Contrato.`AA_CTR`, Contrato.`CD_UOR_CTR`, Contrato.`NR_CTR`, Contrato.`CD_SIS_OGM`) AS numeroCotnratoComposto, ' +
            ' Contrato.`DT_FIM_VGC_CTR` AS dataFimVigenciaContrato ' +
            ' FROM contrato.`ctr` AS Contrato ' +
            ' INNER JOIN contrato.`item_ctr` AS ItemContrato  ' +
            ' 	ON ( ' +
            ' 		ItemContrato.`AA_CTR` = Contrato.`AA_CTR` ' +
            ' 		AND ItemContrato.CD_UOR_CTR = Contrato.CD_UOR_CTR  ' +
            ' 		AND ItemContrato.NR_CTR = Contrato.NR_CTR  ' +
            ' 		AND ItemContrato.CD_SIS_OGM = Contrato.CD_SIS_OGM  ' +
            ' 	) ' +
            ' INNER JOIN contrato.`pbms` AS Pbms  ' +
            ' 	ON ( ' +
            ' 		Pbms.`TPO_PBMS` = ItemContrato.`CD_TIP_ITEM_CAT`  ' +
            ' 		AND Pbms.`CLS_PBMS` = ItemContrato.`CD_CLS_ITEM_CAT`  ' +
            ' 		AND Pbms.`SCL_PBMS` = ItemContrato.`CD_SCLS_ITEM_CAT`  ' +
            ' 		AND Pbms.`SEQ_PBMS` = ItemContrato.`NR_ITEM_CAT` ' +
            ' 		AND Pbms.`CD_SIS_OGM` = ItemContrato.`CD_SIS_OGM` ' +
            ' 	) ' +
            // ' WHERE Contrato.`DT_FIM_VGC_CTR` BETWEEN '2016-09-26' AND '2016-10-26')
            ' WHERE Contrato.`DT_FIM_VGC_CTR` >= NOW() ' +
            ' ) AS contratos ' +
            ' GROUP BY contratos.dataFimVigenciaContrato ';

        return new Promise(function (resolve, reject) {

            db.sequelize.query(sql).spread(function (dados) {

                resolve(dados);

            }).catch(reject);

        });
    };

    service.consultar                             =  function () {

        return Pbms.findAll();
    };

    service.findAllPbms                           = function () {

        return PbmsModel.findAll();
    };

    service.findById                              =  function (anoContrato, codigoUorContrato, numeroContrato) {

        return ContratoModel.findOne({
            where: {
                anoContrato: anoContrato,
                codigoUorContrato: codigoUorContrato,
                numeroContrato: numeroContrato
            }

        });

    };


    return service;
};
