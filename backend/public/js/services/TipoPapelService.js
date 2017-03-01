/**
 * Created by ThiagoFernando on 14/08/2016.
 */
angular.module('Invest').factory('TipoPapel', function($resource)
{
    console.log("passei no TipoPapel Service");
    return $resource('/tiposPapel/:id');
});


angular.module('Invest').factory('TipoPapelReabrir', function($resource)
{
    console.log("passei no TipoPapelReabrir Service");
    return $resource('/tiposPapel/:id/reabrir');
});

angular.module('Invest').factory('TipoPapelVigentes', function($resource)
{
    console.log("passei no TipoPapel Service");
    return $resource('/tiposPapel/vigentes');
});
