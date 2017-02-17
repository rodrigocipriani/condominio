module.exports = function (sequelize, DataTypes) {

    const PbmsModel = sequelize.define('PbmsModel', {

        tipoPbms: {
            type: DataTypes.BIGINT,
            field: 'TPO_PBMS',
            primaryKey: true,
            allowNull: false
        },

        classePbms: {
            type: DataTypes.BIGINT,
            field: 'CLS_PBMS',
            primaryKey: true,
            allowNull: false
        },

        subClassePbms: {
            type: DataTypes.BIGINT,
            field: 'SCL_PBMS',
            primaryKey: true,
            allowNull: false
        },

        sequencialPbms: {
            type: DataTypes.BIGINT,
            field: 'SEQ_PBMS',
            primaryKey: true,
            allowNull: false
        },

        codigoSistemaOrigem: {
            type: DataTypes.BIGINT,
            field: 'CD_SIS_OGM',
            primaryKey: true,
            allowNull: false
        },

        nomeItem: {
            type: DataTypes.BIGINT,
            field: 'NOM_ITEM',
            allowNull: true
        },

        codigoTipoItem: {
            type: DataTypes.BIGINT,
            field: 'CD_TIP_ITEM',
            allowNull: true
        }

    }, {
        schema: 'contrato',
        tableName: 'pbms',
        name: {
            plural: 'Pbmss',
            singular: 'Pbms'
        }
    });

    return PbmsModel;
};
