module.exports = function (sequelize, DataTypes) {

    var ContratoProjeto = sequelize.define('ContratoProjeto', {

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

        codigoProjeto: {
            type: DataTypes.INTEGER,
            field: 'CD_PROJ',
            primaryKey: true,
            allowNull: false
        },

        timestampAtualizacao: {
            type: DataTypes.DATE,
            field: 'TS_ATL',
            allowNull: true
        }

    }, {
        schema: 'contrato',
        tableName: 'ctr_proj'
    });

    return ContratoProjeto;
};

