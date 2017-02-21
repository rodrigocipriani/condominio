module.exports = function (sequelize, DataTypes) {

    const DocumentoModel = sequelize.define('DocumentoModel', {

        id: {
            type: DataTypes.BIGINT,
            field: 'id',
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        titulo: {
            type: DataTypes.STRING,
            field: 'titulo',
            allowNull: true,
        },

        url: {
            type: DataTypes.STRING,
            field: 'url',
            allowNull: true,
        },

    }, {
        schema: 'condominio',
        tableName: 'documento',
        // classMethods: {
        //     // associate: function (models) {
        //     //     Contrato.hasMany(models.ItemContrato, {foreignKey: 'numeroContrato'});
        //     //     Contrato.hasMany(models.ContratoProjeto, {foreignKey: 'numeroContrato'});
        //     //     Contrato.hasOne(models.ContratoAtributo, {foreignKey: 'numeroContrato'});
        //     //     Contrato.belongsTo(models.AgrupadorContrato, {foreignKey: 'codigoAgrupador'});
        //     //     Contrato.belongsTo(models.Tmst606, {foreignKey: 'codigoUorContrato', targetKey: 'codigoUor', as: 'uor'});
        //     // }
        // }
    });

    return DocumentoModel;
};
