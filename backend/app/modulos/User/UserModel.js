module.exports = function (sequelize, DataTypes) {

    const UserModel = sequelize.define('UserModel', {

        id: {
            type: DataTypes.BIGINT,
            field: 'id',
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        email: {
            type: DataTypes.STRING,
            field: 'email',
            allowNull: false,
        },

        password: {
            type: DataTypes.STRING,
            field: 'password',
            allowNull: true,
        },

        nome: {
            type: DataTypes.STRING,
            field: 'nome',
            allowNull: true,
        },

    }, {
        schema: 'condominio',
        tableName: 'user',
    });

    return UserModel;
};
