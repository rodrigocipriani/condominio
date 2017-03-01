/**
 * Created by ThiagoFernando on 26/03/2015.
 */
angular.module('Invest').factory('Jogo', function($resource)
{
    console.log("passei no Jogo Service");
    return $resource('/jogos/:id');
});
