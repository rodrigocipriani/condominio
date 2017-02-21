module.exports = function (app) {

    const UserController = app.controllers.UserController;

    app.route('/api/user/email/:email').get(UserController.findOne);

};
