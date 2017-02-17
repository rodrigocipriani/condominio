module.exports = function (sequelize, DataTypes) {


    const MapaEntrega = sequelize.define('MapaEntrega', {

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

        sequencialContrato: {
            type: DataTypes.INTEGER,
            field: 'NR_SEQL_ITEM_CTR',
            primaryKey: true,
            allowNull: false
        },

        numeroMapaEntrega: {
            type: DataTypes.INTEGER,
            field: 'NR_MAPA_ETGA',
            primaryKey: true,
            allowNull: true
        },

        numeroDependenciaBeneficiadaItem: {
            type: DataTypes.INTEGER,
            field: 'NR_DEPE_BNFD_ITEM',
            allowNull: true
        },

        numeroProjetoBeneficiadoMapa: {
            type: DataTypes.INTEGER,
            field: 'NR_PROJ_BNFD_MAPA',
            allowNull: true
        },

        numeroProjetoLocalEntrega: {
            type: DataTypes.INTEGER,
            field: 'NR_PROJ_LCL_ETGA',
            allowNull: true
        },

        quantidadePrevistaMapaEntrega: {
            type: DataTypes.INTEGER,
            field: 'QT_PRVT_MAPA_ETGA',
            allowNull: true
        },

        quantidadeRecebidaMapaEntrega: {
            type: DataTypes.INTEGER,
            field: 'QT_REC_MAPA_ETGA',
            allowNull: true
        },

        codigoPrefixoDependenciaBeneficiada: {
            type: DataTypes.INTEGER,
            field: 'CD_PRF_DEPE_BNFD',
            allowNull: true
        },

        codigoSubordinadaDependenciaBeneficiada: {
            type: DataTypes.INTEGER,
            field: 'CD_SBDD_DEPE_BNFD',
            allowNull: true
        },

        numeroUniversalDependenciaBeneficiada: {
            type: DataTypes.INTEGER,
            field: 'NR_UNVL_DEPE_BNFD',
            allowNull: true
        },

        codigoPrefixoLocalizacaoEntrega: {
            type: DataTypes.INTEGER,
            field: 'CD_PRF_LCL_ETGA',
            allowNull: true
        },

        codigoSubordinadaLocalizacaoEntrega: {
            type: DataTypes.INTEGER,
            field: 'CD_SBDD_LCL_ETGA',
            allowNull: true
        },

        numeroUniversalLocalizacaoEntrega: {
            type: DataTypes.INTEGER,
            field: 'NR_UNVL_LCL_ETGA',
            allowNull: true
        }

    }, {
        schema: 'contrato',
        tableName: 'mapa_etga',
        classMethods: {
            // associate: function (models) {
            //     MapaEntrega.belongsTo(models.MestreDependencia, {
            //         foreignKey: 'codigoPrefixoDependenciaBeneficiada',
            //         targetKey: 'prefixoDependencia',
            //         as: 'dependencia'
            //     });
            //
            // }
        }
    });


    return MapaEntrega;
};

