module.exports = function (sequelize, DataTypes) {

    const Tmst606 = sequelize.define('Tmst606', {

        prefixoDependencia: {
            type: DataTypes.INTEGER,
            field: 'CD_PREF_DEPE',
            primaryKey: true,
            allowNull: false
        },
        subordinada: {
            type: DataTypes.INTEGER,
            field: 'CD_ORDM_SBRD',
            primaryKey: true,
            allowNull: false
        },
        nomeDependencia: {
            type: DataTypes.STRING(22),
            field: 'NM_DEPE',
            allowNull: true
        },
        siglaUf: {
            type: DataTypes.STRING(2),
            field: 'SG_UF',
            allowNull: true
        },
        logradouro: {
            type: DataTypes.STRING(35),
            field: 'TX_LGR',
            allowNull: true
        },
        bairro: {
            type: DataTypes.STRING(25),
            field: 'TX_CMPT_LGR',
            allowNull: true
        },

        municipio: {
            type: DataTypes.STRING(30),
            field: 'TX_MUN',
            allowNull: true
        },

        codigoCep: {
            type: DataTypes.INTEGER,
            field: 'CD_CEP',
            allowNull: true
        },

        codigoUor: {
            type: DataTypes.INTEGER,
            field: 'CD_UOR',
            allowNull: true
        }

    }, {
        schema: 'mestre',
        tableName: 'MST606'
    });


    return Tmst606;
};
