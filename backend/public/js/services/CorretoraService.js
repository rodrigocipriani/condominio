/**
 * Created by ThiagoFernando on 14/08/2016.
 */
angular.module('Invest').factory('Corretora', function($resource)
{
    console.log("passei no Corretora Service");
    return $resource('/corretoras/:id');
});

angular.module('Invest').factory('CorretoraReabrir', function($resource)
{
    console.log("passei no CorretoraReabrir Service");
    return $resource('/corretoras/:id/reabrir');
});

angular.module('Invest').factory('CorretoraVigentes', function($resource)
{
    console.log("passei no Corretora Vigentes Service");
    return $resource('/corretoras/vigentes');
});
