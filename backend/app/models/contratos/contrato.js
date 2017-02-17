module.exports = function (sequelize, DataTypes) {

// var ItemContratoModel = require('contrato/item_contrato');
// var ContratoProjetoModel = require('contrato/contrato_projeto');
// var ContratoAtributoModel = require('contrato/contrato_atributo');
// var MestreDependenciaModel = require('mestre/tmst606');
// var AgrupadorContratoModel = require('contrato/agrupador_contrato');


    const Contrato = sequelize.define('Contrato', {

        numeroContrato: {
            type: DataTypes.BIGINT,
            field: 'NR_CTR',
            primaryKey: true,
            allowNull: false,
            unique: 'chaveComposta'
        },

        anoContrato: {
            type: DataTypes.BIGINT,
            field: 'AA_CTR',
            primaryKey: true,
            allowNull: false,
            unique: 'chaveComposta'
        },

        codigoUorContrato: {
            type: DataTypes.BIGINT,
            field: 'CD_UOR_CTR',
            primaryKey: true,
            allowNull: false,
            unique: 'chaveComposta'
        },

        codigoSistemaOrigem: {
            type: DataTypes.INTEGER,
            field: 'CD_SIS_OGM',
            primaryKey: true,
            allowNull: true
        },

        codigoDependenciaContrato: {
            type: DataTypes.BIGINT,
            field: 'CD_DEPE_CTR',
            allowNull: false
        },

        dataInicioVigenciaContrato: {
            type: DataTypes.DATE,
            field: 'DT_INC_VGC_CTR',
            allowNull: true
        },

        dataFimVigenciaContrato: {
            type: DataTypes.DATE,
            field: 'DT_FIM_VGC_CTR',
            allowNull: true
        },

        valorContrato: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'VL_CTR',
            allowNull: true
        },

        codigoFornecedor: {
            type: DataTypes.INTEGER,
            field: 'CD_FRNC',
            allowNull: true
        },

        codigoTipoContrato: {
            type: DataTypes.INTEGER,
            field: 'CD_OCR_TX_TIP_CTR',
            allowNull: true
        },

        codigoFaseAtualContrato: {
            type: DataTypes.INTEGER,
            field: 'CD_OCR_TX_FASE_CTR',
            allowNull: true
        },

        renovacao: {
            type: DataTypes.BOOLEAN,
            field: 'IN_RNVC_CTR',
            allowNull: false,
            default: false
        },

        codigoAgrupador: {
            type: DataTypes.INTEGER,
            field: 'cd_agpr',
            allowNull: true
        }

    }, {
        schema: 'contrato',
        tableName: 'ctr',
        classMethods: {
            // associate: function (models) {
            //     Contrato.hasMany(models.ItemContrato, {foreignKey: 'numeroContrato'});
            //     Contrato.hasMany(models.ContratoProjeto, {foreignKey: 'numeroContrato'});
            //     Contrato.hasOne(models.ContratoAtributo, {foreignKey: 'numeroContrato'});
            //     Contrato.belongsTo(models.AgrupadorContrato, {foreignKey: 'codigoAgrupador'});
            //     Contrato.belongsTo(models.Tmst606, {foreignKey: 'codigoUorContrato', targetKey: 'codigoUor', as: 'uor'});
            // }
        }
    });

    return Contrato;
};
