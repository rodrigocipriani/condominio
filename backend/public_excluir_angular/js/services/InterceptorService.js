/**
 * Created by ThiagoFernando on 15/03/2015.
 */
angular.module('Invest').factory('meuInterceptor', function ($cookies, $filter, $location, $log,  $q, $rootScope, mensagemService) {
    if (!$rootScope.mensagens) {
        $rootScope.mensagens = [];
    }
    var adicionarMensagens = function (mensagens) {
        mensagens.forEach(function (msg) {
            //Evita a inclusao de mensagens de erro duplicadas na lista de mensagens
            if ($rootScope.mensagens.filter(function (e) {
                    return e.texto === msg.texto;
                }).length === 0) {
                if(msg.chave){
                    mensagemService.add(msg.tipo, $filter('translate')(msg.chave));
                }else{
                    mensagemService.add(msg.tipo, msg.texto);
                }
            }
        });
    };
    var addUltimaMsg = function (mensagens) {
        if(angular.isArray(mensagens)){
            mensagens.forEach(function (msg) {
                gravaMensagem(msg);
            });
        }else{
            gravaMensagem(mensagens);
        }

    };
    var interceptor = {
        'request': function (config) {
            //$log.debug('request - config ', angular.toJson(config));
            return config || $q.when(config);
        },
        'requestError': function (rejection) {
            //$log.debug('requestError - rejection ', angular.toJson(rejection));
            return $q.reject(rejection);
        },
        response: function (resposta) {
            //$log.debug('response - resposta ', angular.toJson(resposta));
            if (resposta.data && resposta.data.mensagens) {
                adicionarMensagens(resposta.data.mensagens);
            }
            return resposta || $q.when(resposta);
        },
        responseError: function (resposta) {
            //$log.debug('responseError - resposta ', angular.toJson(resposta));
            if ((resposta.status == 401 || resposta.status == 403) && $location.path().indexOf('/autenticacao') == -1) {
                var deferred = $q.defer();
                //remove o usuario logado e o cookie de sessao
                $rootScope.usuarioLogado = undefined;
                $cookies.remove('usuarioLogado');

                addUltimaMsg(resposta.data.mensagens);
                $location.path('/autenticacao');
                return deferred.promise;
            }else{
                if (resposta.data && resposta.data.mensagens) {
                    adicionarMensagens(resposta.data.mensagens);
                }
            }
            return $q.reject(resposta);
        }
    }
    function gravaMensagem(msg){
        if (msg.chave) {
            mensagemService.addMsg('danger', $filter('translate')(msg.chave));
        } else {
            mensagemService.addMsg('danger', msg.texto);
        }
    }
    return interceptor;
});
