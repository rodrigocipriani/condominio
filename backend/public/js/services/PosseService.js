/**
 * Created by Hamilton Fantin on 14/09/2015.
 */

angular.module('Invest')
    .factory('Posse', function ($resource) {
        console.log("passei no Posse Service");
        return $resource('/posse/:jogoId/:jogadorId')
    });