/**
 * Mensagens de erro.
 * tipos disponiveis: success, info, warning, danger
 */
'use strict';
angular.module('Invest')
.factory('mensagemService', [
      '$rootScope', function($rootScope) {
        var mensagemService,
            paramsMsg = {
              offset: {
                x: 10,
                y: 70
              },
              spacing: 5,
              delay: 1000,
              timer: 2000,
              animate: {
                enter: 'animated slideInRight',
                exit: 'animated slideOutRight'
              }
            };

        $rootScope.mensagens = [];
        return mensagemService = {
          add: function(tipo, texto) {
            paramsMsg.type = tipo;
            $.notify({
              // options
              message: texto,
              icon: obterIcone(tipo)
            }, paramsMsg);
            // return $rootScope.mensagens.push({
            //   tipo: tipo,
            //   texto: texto,
            //   close: function() {
            //     return mensagemService.fecharMensagem(this);
            //   }
            // });
          },
          success: function(texto) {
            return this.add('success', texto);
          },
          info: function(texto) {
            return this.add('info', texto);
          },
          warning: function(texto) {
            return this.add('warning', texto);
          },
          danger: function(texto) {
            return this.add('danger', texto);
          },
          // TODO testes - NÃO FUNCIONOU...
          //addAndRedirect: function(tipo, texto) {
          //  // teste para enviar mensagem para o Interceptor
          //  return $rootScope.$broadcast('novaMensagem',[{tipo: tipo, texto: texto}]);
          //},
          fecharMensagem: function(mensagem) {
            return this.fecharMensagemIdx($rootScope.mensagens.indexOf(mensagem));
          },
          fecharMensagemIdx: function(index) {
            return $rootScope.mensagens.splice(index, 1);
          },
          clear: function(){
            $rootScope.mensagens = [];
          },
          addMsg: function(tipo, texto){
            console.log('addMsg - tipo=%s, texto=%s', tipo, texto);
            $rootScope.msg = {tipo: tipo, texto: texto};
          },
          limpaVerificandoMsg: function(){
            console.log('limpaVerificandoMsg() - msg: ', angular.toJson($rootScope.msg));
            // limpa mensagens anteriores
            mensagemService.clear();
            // caso exista alguma mensagem no rootscope, exibe e depois limpa a variavel msg.
            if($rootScope.msg){
              console.log('--> exibe mensagem: ', $rootScope.msg.texto);
              mensagemService.add($rootScope.msg.tipo, $rootScope.msg.texto);
              $rootScope.msg = undefined;
            }
          }
        };

        function obterIcone(tipo){
          console.log('obterIcone ', tipo);
          var icone = 'glyphicon glyphicon';
          if(tipo == 'danger'){
            icone += '-remove-circle';
          }else if(tipo == 'warning'){
            icone += '-warning-sign';
          }else if(tipo == 'info'){
            icone += '-info-sign';
          }else if(tipo == 'success'){
            icone += '-ok-circle';
          }
          return icone;
        }
      }
]);
