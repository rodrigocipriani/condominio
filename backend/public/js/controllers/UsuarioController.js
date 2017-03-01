/**
 * Created by Hamilton 03/05/2016
 */
angular.module('Invest').controller('UsuarioController',
    function ($filter, $location, $log, $routeParams, $rootScope, $scope, mensagemService, Usuario, UsuarioCadastro) {
        var vm = this;
        //variaveis
        vm.token;
        vm.usuario = {};
        //funcoes
        vm.init = init;

        vm.cadastrar = cadastrar;
        vm.confirmar = confirmar;
        vm.confirmarAlteracao = confirmarAlteracao;
        vm.confirmarAlteracaoSenha = confirmarAlteracaoSenha;
        vm.limparMensagens = limparMensagens;
        vm.receberToken = receberToken;
        vm.solicitarToken = solicitarToken;


        /**
         *
         */
        function init() {
            mensagemService.limpaVerificandoMsg();
            angular.copy($rootScope.usuarioLogado, vm.usuario);
            limparSenhas();
        }

        /**
         * Cria novo cadastro de usuario
         */
         function cadastrar(){
            mensagemService.clear();
            $log.debug('UsuarioController.cadastrar() - vm.usuario=' ,  angular.toJson(vm.usuario));
            var novoJogador;

            novoJogador = new Usuario;

            novoJogador.username = vm.usuario.nome;
            novoJogador.password = vm.usuario.senha1;
            novoJogador.email    = vm.usuario.email;

            novoJogador.$save(
                function (resposta) {
                    $log.debug("UsuarioController.cadastrar() - resposta: ", resposta);
                    vm.usuario = {};
                    $location.path('sucesso');
                },
                function(erro) {
                    limparSenhas();
                    $log.error('erro: ', erro);
                    // mensagemService.add(erro);
                }
            );
        };

        function confirmar(){
            mensagemService.clear();
            $log.debug('autenticacaoController.confirmar - token: ' ,  $routeParams.token);
            var token = $routeParams.token;
            if(!token || token.trim().length == 0){
                mensagemService.danger($filter('translate')('mensagem.tokenInvalido'));
            }else{
                UsuarioCadastro.get({token: token}
                    ,
                    function (retorno) {
                        $log.debug('autenticacaoController.confirmar retorno=', retorno);
                    },
                    function (erro) {
                        mensagemService.add(erro);
                    }
                );
            }
        };

        /**
         *
         */
        function confirmarAlteracao() {
            limparMensagens();
            $log.debug('confirmarAlteracao() - vm.usuario ', angular.toJson(vm.usuario));
            var usuario = new Usuario;
            //move campos
            usuario.id = vm.usuario.id;
            usuario.nome = vm.usuario.nome;
            usuario.senha = vm.usuario.senha1;
            usuario.senhaAntiga = vm.usuario.senhaAntiga;
            // realiza update;
            usuario.$update()
                .then(function (r) {
                    // $log.debug('deu certo: ', r);
                    $location.path('/sucesso');
                }).catch(function (erro) {
                    $log.error('deu erro: ', angular.toJson(erro));
                    mensagemService.danger($filter('translate')(erro.data.chave));
                    $location.path('/erro');
                });
        };

        function solicitarToken() {
            limparMensagens();
            $log.debug('--> solicitarToken ', angular.toJson(vm.usuario));
            var usuarioCadastroService = new UsuarioCadastro;
            usuarioCadastroService.email = vm.usuario.email;
            usuarioCadastroService
                .$save()
                .then(function (r) {
                    mensagemService.success($filter('translate')('mensagem.tokenEnviado'));
                });
        }

        function receberToken() {
            limparMensagens();
            limparSenhas();
            vm.token = $routeParams.token;
            $log.debug('receberToken ', vm.token);

        }

        function confirmarAlteracaoSenha() {
            $log.debug('confirmarAlteracaoSenha() senha=%s, token=%s', vm.usuario.senha1, vm.token);

            var usuario = new Usuario;
            //move campos
            var usuarioCadastroService = new UsuarioCadastro;
            usuarioCadastroService.senha = vm.usuario.senha1;
            usuarioCadastroService.token = vm.token;
            // realiza update;
            usuarioCadastroService.$update()
                .then(function (r) {
                    $log.debug('alteração: ', angular.toJson(r));
                    mensagemService.success($filter('translate')('mensagem.senhaAlteradaSucesso'));
                    $location.path('/sucesso');
                }).catch(function (erro) {
                    $log.error('deu erro: ', angular.toJson(erro));
                    mensagemService.danger($filter('translate')(erro.data.chave));
                    $location.path('/erro');
                });
        }

        /**
         *
         */
        function limparSenhas() {
            vm.usuario.senha1 = '';
            vm.usuario.senha2 = '';
        }
        function limparMensagens() {
            mensagemService.clear();
        }
    });
