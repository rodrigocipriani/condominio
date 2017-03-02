/**
 * Created by ThiagoFernando on 18/08/2016.
 */
angular.module('Invest').factory('Papel', function($resource)
{

    console.log("passei no Papel Service");
    return $resource('/papeis/:id' );
});

angular.module('Invest').factory('PapelReabrir', function($resource)
{
    console.log("passei no PapelReabrir Service");
    return $resource('/papeis/:id/reabrir');
});


angular.module('Invest').factory('PapelVigentes', function($resource)
{
    console.log("passei no Papel Service");
    return $resource('/papeis/vigentes');
});
