/**
 * Created by ThiagoFernando on 29/03/2015.
 */
angular.module('Invest').factory('Jogador', function($resource)
{
    console.log("passei no Jogador Service");
    return $resource('/jogadores/:id');
});
