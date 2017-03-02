/**
 * Created by Hamilton Geraldo Fantin on 06/08/2016.
 */
angular.module('Invest')
    .factory('Jobs', function ($resource) {
        return $resource('/jobs/:id');
    });