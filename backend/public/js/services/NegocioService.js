/**
 * Created by ThiagoFernando on 31/08/2016.
 */
angular.module('Invest').factory('Negocio', function($resource)
{

    console.log("passei no Negocio Service");
    return $resource('/negocios/:id' );
});

