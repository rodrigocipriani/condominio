angular
    .module('Invest')
    .directive('localeSelector', function($translate) {
        return {
            restrict: 'C',
            replace: true,
            templateUrl: 'partials/templates/locale-selector.html',
            link: function(scope, elem, attrs) {
                scope.locale = $translate.proposedLanguage();
                scope.setLocale = function(idioma) {
                    $translate.use(idioma); //scope.locale);
                };
                scope.getLocale = function() {
                    return $translate.use();
                };
                scope.getBandeira=  function() {
                   var idiomaAtual = $translate.use();
                   if(idiomaAtual == 'pt'){
                       return 'flag-icon flag-icon-br';
                   }else if(idiomaAtual == 'en'){
                       return 'flag-icon flag-icon-um';
                   }
                };
            }
        };
    });