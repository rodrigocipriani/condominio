module.exports = function (sequelize, DataTypes) {

    var ItemContrato = sequelize.define('ItemContrato', {

        numeroSequencialItemContrato: {
            type: DataTypes.BIGINT,
            field: 'NR_SEQL_ITEM_CTR',
            primaryKey: true,
            allowNull: false
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

        numeroContrato: {
            type: DataTypes.BIGINT,
            field: 'NR_CTR',
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

        quantidadeItemContratado: {
            type: DataTypes.BIGINT,
            field: 'QT_ITEM_CTRD',
            allowNull: true
        },

        valorUnitarioItemContratado: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'VL_UNT_ITEM_CTRD',
            allowNull: true
        },

        tipoPbms: {
            type: DataTypes.INTEGER,
            field: 'CD_TIP_ITEM_CAT'
        },

        classePbms: {
            type: DataTypes.INTEGER,
            field: 'CD_CLS_ITEM_CAT',
            allowNull: true
        },

        subClassePbms: {
            type: DataTypes.INTEGER,
            field: 'CD_SCLS_ITEM_CAT',
            allowNull: true
        },

        sequencialPbms: {
            type: DataTypes.INTEGER,
            field: 'NR_ITEM_CAT',
            allowNull: true
        },

        dataInicioVigencia: {
            type: DataTypes.DATEONLY,
            field: 'DT_INC_VGC_ITEM',
            allowNull: true
        },

        dataFimVigencia: {
            type: DataTypes.DATEONLY,
            field: 'DT_FIM_VGC_ITEM',
            allowNull: true
        }
    }, {
        schema: 'contrato',
        tableName: 'item_ctr',
        classMethods: {
            // associate: function (models) {
            //     ItemContrato.hasMany(models.BeneficiarioServicoContratado, {foreignKey: 'sequencialContrato'});
            //     ItemContrato.hasMany(models.MapaEntrega, {foreignKey: 'sequencialContrato'});
            //     ItemContrato.belongsTo(models.Pbms, {foreignKey: 'tipoPbms'});
            // }
        }
    });

    return ItemContrato;
};
