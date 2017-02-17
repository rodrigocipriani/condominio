module.exports = function (sequelize, DataTypes) {


    var ContratoAtributo = sequelize.define('ContratoAtributo', {

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
            allowNull: false
        },

        indicadorAptoRenovacao: {
            type: DataTypes.BOOLEAN,
            field: 'IN_APTO_RNVC',
            allowNull: false
        },

        timestampAtualizacao: {
            type: DataTypes.DATE,
            field: 'TS_ATL',
            allowNull: true,
            defaultValue: DataTypes.NOW
        }
    }, {
        schema: 'contrato',
        tableName: 'ctr_atb'
    });

    return ContratoAtributo;
};

