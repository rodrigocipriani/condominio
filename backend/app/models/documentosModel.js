module.exports = function (sequelize, DataTypes) {

    var documentoModel = sequelize.define('documentoModel', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: true
        },

    }, {
        tableName: 'documento',
        freezeTableName: true
    });

    return documentoModel;
};
