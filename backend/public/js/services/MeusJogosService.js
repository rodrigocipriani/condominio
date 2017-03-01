/**
 * Created by ThiagoFernando on 26/03/2015.
 */
angular.module('Invest').factory('MeuJogo', function($resource)
{
    console.log("passei no MeuJogo Service");
    return $resource('/meusjogos/:id');
});
