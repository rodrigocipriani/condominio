/**
 * Created by ThiagoFernando on 27/03/2015.
 */
angular.module('Invest')
    .factory('Cenario', function ($resource) {
        console.log("passei no Cenário Service");
        return $resource('/cenarios/:id');
    });

angular.module('Invest')
    .factory('CenarioPersonagem', function ($resource) {
        console.log("passei no Cenário Personagem Service");
        return $resource('/cenarios/personagens/:id')

    });
