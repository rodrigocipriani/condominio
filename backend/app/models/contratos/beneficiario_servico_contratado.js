module.exports = function (sequelize, DataTypes) {

    var BeneficiarioServicoContratado = sequelize.define('BeneficiarioServicoContratado', {

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

            numeroProjetoInfraestrutura: {
                type: DataTypes.INTEGER,
                field: 'NR_PROJ_PGM_IETR',
                primaryKey: false,
                allowNull: true
            },

            numeroUniversal: {
                type: DataTypes.INTEGER,
                field: 'NR_UNVL',
                allowNull: true
            },

            codigoUorBeneficiada: {
                type: DataTypes.INTEGER,
                field: 'CD_UOR_BNFC_SRVC',
                allowNull: true
            }

        },
        {
            schema: 'contrato',
            tableName: 'bnfc_srvc_ctrd',
            classMethods: {
                associate: function (models) {
                    BeneficiarioServicoContratado.belongsTo(models.Tmst606, {
                        foreignKey: 'codigoUorBeneficiada',
                        targetKey: 'codigoUor',
                        as: 'dependencia'
                    });
                }
            }
        }
    );

    return BeneficiarioServicoContratado;

};
