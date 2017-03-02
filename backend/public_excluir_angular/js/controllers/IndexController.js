/**
 * Created by Hamilton Geraldo Fantin on 20/03/2016.
 */
angular.module('Invest').controller('IndexController', function ($window, $cookies, $log, $location, $rootScope, $scope, Autenticacao, mensagemService) {

    var vm = this;
    vm.location = $location;

    vm.carregarUsuario = function(){
        var usuario = $cookies.get('usuarioLogado') || undefined;
        if(usuario){
            $rootScope.usuarioLogado = JSON.parse(usuario);
        }
        // $log.info('IndexController.carregarUsuario() ', $rootScope.usuarioLogado);
    };

    vm.isPaginaTabuleiro = function () {
        return $location.path().indexOf('/tabuleiro') == 0;
    };
    vm.logout = function () {
        // $log.debug('IndexController.logout');
        var autenticacaoService = new Autenticacao;
        autenticacaoService.$get(
            function (resposta) {
                // $log.debug("-> resposta", resposta);
                $location.path('/');
                $rootScope.usuarioLogado = undefined;
                $cookies.remove('usuarioLogado');
            },
            function (erro) {
                // console.log('erro:', erro);
                mensagemService.add(erro);
            }
        );
    };
    vm.init = function(){
        // console.log('passou no init()');
        window.addEventListener("load", function() { window. scrollTo(0, 1); });
        vm.limparMensagens();
    };
    vm.limparMensagens = function(){
        mensagemService.limpaVerificandoMsg();
    };

    /*
     $rootScope.$watch('usuarioLogado', function(usuarioLogado) {
     console.log('$watch - usuarioLogado %s, %s', angular.toJson(usuarioLogado), $location.path());
     console.log('em / e autenticacao ', ['/', '/autenticacao'].indexOf($location.path()));
     //console.log('em /', '/'.indexOf($location.path()));
     //console.log('em autenticacao ', '/autenticacao'.indexOf($location.path()));
     if (!usuarioLogado && (['/', '/autenticacao'].indexOf($location.path()) == -1 )) {
     console.log('redireciona para a página de login');
     $location.path('/autenticacao');
     }
     });
     */

});