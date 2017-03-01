/**
 * Created by Hamilton Geraldo Fantin on 23/05/2016.
 */
angular.module('Invest')
    .factory('Objetivo', function ($resource) {
        return $resource('/objetivos/:id/:cenarioId',
            {id: '@id', cenarioId: '@cenarioId'}, {
                'get': {method: 'GET', cache: true},
                'query': {method: 'GET', cache: true, isArray: true}
            });
    });
