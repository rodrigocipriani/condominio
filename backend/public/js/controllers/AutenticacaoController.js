/**
 * Created by ThiagoFernando on 31/03/2015.
 */
angular.module('Invest').controller('AutenticacaoController',
    function($cookies, $window, $scope, $rootScope, $http, $log, $location, $routeParams, mensagemService, Usuario, UsuarioCadastro, Autenticacao) {


        $scope.init = function(){
            mensagemService.limpaVerificandoMsg();
        };

        $scope.logar = function(){
            mensagemService.clear();
            console.log('logar como ', $scope.email);
            var entrar;
            entrar = new Autenticacao();
            entrar.username = $scope.email;
            entrar.password = $scope.senha1;

            entrar.$save()
                .then(function (usuario) {
                    $log.debug("autenticacaoController.logar - usuario=", usuario);
                    return Usuario.get().$promise;

                })
                .then(function(usuarioLogado){
                    $log.debug("autenticacaoController.logar - usuarioLogado=", angular.toJson(usuarioLogado));
                    $rootScope.usuarioLogado = usuarioLogado;
                    $cookies.putObject('usuarioLogado', usuarioLogado);
                    $location.path('/meusjogos');
                })
                .catch(function(erro) {
                    limparSenhas();
                    // limpa usuario logado
                    $rootScope.usuarioLogado = undefined;
                    $cookies.remove('usuarioLogado');
                    //$window.sessionStorage.usuarioLogado = undefined;
                    $log.error('autenticacaoController.logar - erro:', erro);
                    //mensagemService.add(erro);
                });
        };

        function limparSenhas(){
            $scope.senha1 = '';
            $scope.senha2 = '';
        }

        $scope.confirmar = function(){
            mensagemService.clear();
            $log.debug('autenticacaoController.confirmar - token: ' ,  $routeParams.token);

            UsuarioCadastro.get({token:$routeParams.token},
                function (retorno) {
                    $log.debug('autenticacaoController.confirmar retorno=', retorno);
                },
                function (erro) {
                    mensagemService.add(erro);
                }
            )
        };

        $scope.navegarCadastro = function(){
            mensagemService.clear();
            $location.path('/cadastro');
        }

    });
