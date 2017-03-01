/**
 * Created by ThiagoFernando on 31/03/2015.
 */

angular.module('Invest')
    .factory('Tabuleiro', function ($resource) {
        console.log("passei no Tabuleiro Service");
        return $resource('/tabuleiro/:id')
    });

angular.module('Invest')
    .factory('TabuleiroAtacar', function ($resource) {
        console.log("passei no Tabuleiro atacar Service");
        return $resource('/tabuleiro/atacar/:id')
    });


angular.module('Invest')
    .factory('TabuleiroDistribuir', function ($resource) {
        console.log("passei no Tabuleiro distribuir Service");
        return $resource('/tabuleiro/distribuir/:id');
    });

angular.module('Invest')
    .factory('TabuleiroFimAtaque', function ($resource) {
        console.log("passei no Tabuleiro parar ataque Service");
        return $resource('/tabuleiro/atacar/parar/:id');
    });

angular.module('Invest')
    .factory('TabuleiroIniciar', function ($resource) {
        console.log("passei no Tabuleiro iniciar Service");
        return $resource('/tabuleiro/iniciar/:id');
    });

angular.module('Invest')
    .factory('TabuleiroRemanejar', function ($resource) {
        console.log("passei no Tabuleiro remanejar Service");
        return $resource('/tabuleiro/remanejar/:id');
    });

angular.module('Invest')
    .factory('TabuleiroTrocar', function ($resource) {
        console.log("passei no Tabuleiro Trocar Service");
        return $resource('/tabuleiro/trocar/:id');
    });

// angular.module('Guerra')
//     .factory('Somar', function ($resource) {
//         console.log("passei no Tabuleiro Trocar Service");
//         return $resource('/somar');
//     });

