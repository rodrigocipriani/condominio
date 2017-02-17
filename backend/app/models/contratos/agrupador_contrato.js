module.exports = function (sequelize, DataTypes) {

    const AgrupadorContrato = sequelize.define('AgrupadorContrato', {

        codigoAgrupador: {
            type: DataTypes.INTEGER,
            field: 'cd_agpr',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        nomeAgrupador: {
            type: DataTypes.CHAR(50),
            field: 'nm_agpr',
            allowNull: false
        },
        ts_alt: {
            type: DataTypes.DATE,
            underscored: true,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }

    }, {
        schema: 'contrato',
        tableName: 'agpr_ctr'
    });

    return AgrupadorContrato;

};
