/**
 * Created by ThiagoFernando on 25/03/2015.
 */
angular
    .module('Invest',
    [
        'ngRoute',
        'ngResource',
        'ngSanitize',
        'ui.bootstrap',
        'ui.utils.masks',
        'toggle-switch',
        'idf.br-filters',
        'ngCookies',
        'pascalprecht.translate'
    ])
    .config(function ($routeProvider, $httpProvider, $locationProvider, $translateProvider, $logProvider) {
        $logProvider.debugEnabled(true);
        // tradutor
        $routeProvider
            .when('/', {
                templateUrl: 'partials/home.html'
            })
            // comuns
            .when('/home', {
                templateUrl: 'partials/home.html'
            })
            .when('/sucesso', {
                templateUrl: 'partials/comuns/sucesso.html'
            })
            .when('/erro', {
                templateUrl: 'partials/comuns/erro.html'
            })
            // outras
            .when('/autenticacao', {
                templateUrl: 'partials/autenticacao.html'
            })
            .when('/cadastro', {
                templateUrl: 'partials/cadastro.html'
            })
            .when('/usuario-alterar', {
                templateUrl: 'partials/usuario-alterar.html'
            })
            .when('/usuario-alterar-senha/:token', {
                templateUrl: 'partials/usuario-alterar-senha.html'
            })
            .when('/cadastro-solicitar-token', {
                templateUrl: 'partials/cadastro-solicitar-token.html'
            })
            .when('/confirmar/:token', {
                templateUrl: 'partials/cadastro-confirmar.html'
            })
            .when('/confirmar', {
                templateUrl: 'partials/cadastro-confirmar.html'
            })
            .when('/guerra-icons', {
                templateUrl: 'partials/guerra-icons.html'
            })
            .when('/job/:id?', {
                templateUrl: 'partials/job.html'
            })
            .when('/jobs', {
                templateUrl: 'partials/jobs.html'
            })
            .when('/corretora', {
                templateUrl: 'partials/corretora.html',
                controller: 'CorretoraController'
            })
            .when('/corretora/:corretoraId', {
                templateUrl: 'partials/corretora.html',
                controller: 'CorretoraController'
            })
            .when('/corretoras', {
                templateUrl: 'partials/corretoras.html',
                controller: 'CorretorasController'
            })
            .when('/negocio', {
                templateUrl: 'partials/negocio.html',
                controller: 'NegocioController'
            })
            .when('/negocio/:negocioId', {
                templateUrl: 'partials/negocio.html',
                controller: 'NegocioController'
            })
            .when('/negocios', {
                templateUrl: 'partials/negocios.html',
                controller: 'NegociosController'
            })
            .when('/papel', {
                templateUrl: 'partials/papel.html',
                controller: 'PapelController'
            })
            .when('/papel/:papelId', {
                templateUrl: 'partials/papel.html',
                controller: 'PapelController'
            })
            .when('/papeis', {
                templateUrl: 'partials/papeis.html',
                controller: 'PapeisController'
            })
            .when('/tipoNegocio', {
                templateUrl: 'partials/tipoNegocio.html',
                controller: 'TipoNegocioController'
            })
            .when('/tipoNegocio/:tipoNegocioId', {
                templateUrl: 'partials/tipoNegocio.html',
                controller: 'TipoNegocioController'
            })
            .when('/tiposNegocio', {
                templateUrl: 'partials/tiposNegocio.html',
                controller: 'TiposNegocioController'
            })
            .when('/tipoPapel', {
                templateUrl: 'partials/tipoPapel.html',
                controller: 'TipoPapelController'
            })
            .when('/tipoPapel/:tipoPapelId', {
                templateUrl: 'partials/tipoPapel.html',
                controller: 'TipoPapelController'
            })
            .when('/tiposPapel', {
                templateUrl: 'partials/tiposPapel.html',
                controller: 'TiposPapelController'
            })
            .otherwise({redirectTo: '/'});
        $httpProvider.interceptors.push('meuInterceptor');

            $translateProvider.useCookieStorage();
            $translateProvider.useUrlLoader('/lang');
            $translateProvider.preferredLanguage('pt');
            $translateProvider.useSanitizeValueStrategy('escape');
});