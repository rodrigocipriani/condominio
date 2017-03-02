/**
 * Created by ThiagoFernando on 26/03/2015.
 */
angular.module('Invest').factory('Personagem', function($resource)
{
    console.log("passei no Personagem Service");
    return $resource('/personagens/:id');
});
