/**
 * Created by Hamilton Fantin on 01/09/2015.
 */
angular.module('Invest').factory('Jogada', function($resource)
{
    console.log("passei no Jogada Service");
    return $resource('/jogadas/:id');
});
