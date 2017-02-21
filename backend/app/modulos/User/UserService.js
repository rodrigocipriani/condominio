'use strict';

module.exports = function (app) {

    const service = {};
    const UserModel = app.models.UserModel;

    service.findOne = (params) => {
        return UserModel.findOne({
            where: {
                email: params.email
            }
        });
    };

    service.findById = (id) => {
        return UserModel.findOne({
            where: {
                id: id
            }
        });
    };

    return service;
};
