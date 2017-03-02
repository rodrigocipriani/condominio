/**
 * Created by ThiagoFernando on 25/08/2016.
 */
angular.module('Invest').factory('TipoNegocio', function($resource)
{
    console.log("passei no TipoNegocio Service");
    return $resource('/tiposNegocio/:id');
});

angular.module('Invest').factory('TipoNegocioReabrir', function($resource)
{
    console.log("passei no TipoNegocioReabrir Service");
    return $resource('/tiposNegocio/:id/reabrir');
});

angular.module('Invest').factory('TipoNegocioVigentes', function($resource)
{
    console.log("passei no TipoPapel Service");
    return $resource('/tiposNegocio/vigentes');
});
