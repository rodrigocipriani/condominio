/**
 * Created by Hamilton Geraldo Fantin on 02/06/2015.
 */
angular.module('Invest')
    .factory('Autenticacao', function ($resource) {
        return $resource('/autenticacao');
    })
    .factory('Usuario', function ($resource) {
        return $resource('/usuario',
            { username : '@username', password:'@password', email: '@email'},
            {
                update: {method: 'PUT'},
                save: {method: 'POST'},
                query: {method: 'GET', isArray: true},
                get: {method: 'GET'},
                delete: {method: 'DELETE'}
            }
        );
    })
    .factory('UsuarioCadastro', function ($resource) {
        return $resource('/usuario/cadastro/:token?',
            { token:'@token', senha: '@senha'},
            {
                update: {method: 'PUT'},
                save: {method: 'POST'},
                query: {method: 'GET', isArray: true},
                get: {method: 'GET'},
                delete: {method: 'DELETE'}
            });
    });