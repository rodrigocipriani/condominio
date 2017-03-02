/**
 * Created by thiago on 14/10/2015.
 */
'use strict';
angular.module('Invest')
    .directive("mapa", function ($filter, $log) {
        return {
            restrict: 'E',
            scope: {
                territorios: '=?',
                onClickCallback: '&',
                caminhoMapa: '@?'
            },
            transclude: true,
            template: '<div id="map" class="externa" ng-transclude></div>',
            link: function (scope, elemento, atributos) {
                var largura,
                    altura,
                    icones,
                    zoom,
                    g,
                    projecao,
                    svg,
                    base,
                    graticulado,
                    tooltip,
                    paises,
                    pais,
                    titulos,
                    id = 'map',
                    idLabelTerritorioSelecionado,
                    onClickCallback = scope.onClickCallback();

                montarMapa();

                function montarMapa() {
                    var mapaJson = scope.caminhoMapa || 'mapas/mundi2.topojson';
                    largura = document.getElementById(id).offsetWidth;
                    altura = largura / 2;
                    // altura = document.body.scrollHeight; //largura / 2;
                    // testes para obter altura maxima da janela:
                    /*
                    altura = Math.max(
                        Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
                        Math.max(document.body.offsetHeight, document.documentElement.offsetHeight),
                        Math.max(document.body.clientHeight, document.documentElement.clientHeight)
                    );
                    */

                    d3.select(window).on("resize", redimensionar);
                    zoom = d3.behavior.zoom()
                        .scaleExtent([0.7, 9])
                        .on("zoom", focalizar);
                    graticulado = d3.geo.graticule();
                    tooltip = d3.select("#map").append("div").attr("class", "dica interna sombra hidden");
                    configurarMapa();
                    d3.json(mapaJson, function (erro, mundo) {
                        paises = topojson.feature(mundo, mundo.objects.countries).features;
                        desenhar(paises);
                    });
                }
                
                function configurarMapa() {
                  projecao = d3.geo.mercator()
                        .translate([(largura / 2), (altura / 2)])
                        .center([0,44.43094232824041])
                        .scale((largura/640)*100); //largura / 2 / Math.PI);

                    base = d3.geo.path().projection(projecao);
                    svg = d3.select("#map")
                        .append("svg")
                        .attr("width", largura)
                        .attr("height", altura)
                        .attr("class", "oceano")
                        .call(zoom);
                    g = svg.append("g");
                }
                
                //TODO acho que não passa aqui nunca
                //function click() {
                //    var latlon = projecao.invert(d3.mouse(this));
                //    console.log('funcao click() - latlon=', latlon);
                //}
                
                function obterDadosTerritorio(identificador) {
                    var territorio;
                    if(identificador){
                        // a posição do territorio no array é sempre o id Selecionado - 1
                        var posicaoTerritorioArray = identificador -1;
                        territorio = scope.territorios[posicaoTerritorioArray];
                    }
                    return territorio;
                }
                
                function desenhar(topografia) {
                    desenharTerritorios(topografia);
                    desenharPosses(topografia);
                    // FIXME ARRUMAR POSIÇÃO DOS ICONES
                     desenharIcones(topografia);
                    pais
                        .on("mouseover", function (d, i) {
                            var mouse = d3.mouse(svg.node()).map(function (d) {
                                return parseInt(d);
                            });
                            var dadosTerritorio = obterDadosTerritorio(d.id);
                            if (dadosTerritorio) {
                                tooltip.classed("hidden", false)
                                    .html('<span>' + $filter('translate')(dadosTerritorio.territorio.nome)
                                    + " (" + dadosTerritorio.exercitos + ") - " + dadosTerritorio.jogador.nome + '</span>');
                            }
                        })
                        .on("mouseout", function (d, i) {
                            tooltip.classed("hidden", true);
                        })
                        .on('click', function (d) {
                            tratarClique(d.id);
                        });
                }

                function desenharPosses(topografia) {

                    titulos = g.selectAll('labels').data(topografia);
                    titulos.remove();
                    titulos.enter()
                        .append("text")
                        .attr("id", function (d) {
                            return "territorio" + (d.id ? d.id : '');
                        })
                        .attr("class", function (d) {
                            return "labels";
                        })
                        .attr("style", function (d) {
                            return obterCorFonte(d);
                        })
                        .attr("transform", function (d) {
                    //        console.log("centroid", base.centroid(d));
                            return d.id ? 'translate(' + base.centroid(d) + ')' :  '';
                        })
                        .attr("dy", ".25em")
                        .attr("x", function(d){
                            //TODO mover esse trecho para o arquivo topojson
                            switch (d.id){
                                case 5: // costa do marfim
                                    return "-20";
                                case 9: // tanzania
                                    return "-10";
                                // case 16: // itália
                                //     return "10";
                                case 18: // ucrânia
                                    return "10";
                                case 19: // arabia saudita
                                    return "15";
                                case 33: // nova zelândia
                                    return "-18";
                                case 39: // canada
                                    return "-30";
                                default:
                                    return "";
                            }

                        })
                        .attr("y", function(d){
                            //TODO mover esse trecho para o arquivo topojson
                            switch (d.id){
                                case 5: // costa do marfim
                                    return "10";
                                case 9: // tanzania
                                    return "10";
                                case 13: // finlandia
                                    return "40";
                                case 16: // itália
                                    return "-10";
                                case 18: // ucrânia
                                    return "10";
                                case 19: // arabia saudita
                                    return "10";
                                case 31: // indonesia
                                    return "-15";
                                case 39: // canada
                                    return "40";
                                default:
                                    return "";
                            }

                        })
                        .text(function (d) {
                            var dadosTerritorio = obterDadosTerritorio(d.id);
                            if (dadosTerritorio && scope.territorios) {
                                return $filter('translate')(dadosTerritorio.territorio.nome) + " (" + dadosTerritorio.exercitos + ")";
                            }
                        })

                }

                function desenharIcones(topografia) {
                    var personagem, x, y;
                    icones = g.selectAll('image').data(topografia);
                    icones.remove();
                    icones.enter()
                        .append("svg:image")
                        .attr('xlink:href', function(d){
                            personagem = obterPersonagem(d);
                            return 'images/avatares/' + personagem + '.svg';
                            // switch (personagem){
                            //     case 1:
                            //         return 'images/avatares/judge.svg';
                            //     case 2:
                            //         return 'images/avatares/2.svg';
                            //      case 3:
                            //          return 'images/avatares/3.svg';
                            //      case 4:
                            //          return 'images/avatares/4.svg';
                            //     case 5:
                            //         return 'images/avatares/5.svg';
                            //     case 6:
                            //         return 'images/avatares/6.svg';
                            //     default:
                            //         return "";
                            // }
                        })
                        .attr("class", function (d) {
                            return "icones";
                        })
                        // .attr("id", function (d) {
                        //     return "territorio" + (d.id ? d.id : '');
                        // })
                        // .attr("transform", function (d) {
                        //          console.log(d.id , 'translate(' + base.centroid(d) + ')');
                        //   //      console.log("d", d);
                        //         return ('translate('+ d.properties.icone.x + ',' + d.properties.icone.y + ')');
                        //    //     return d.id ? 'translate(' + base.centroid(d) + ')' :  '';
                        // })
                    // "x":720.3064396051657, "y":795.1530961443799
                   //     .attr("dy", ".25em")
                   //     .attr("preserveAspectRatio", "xMinYMin meet")
                        .attr("transform", function (d) {
                            // if (d.id == 43) {
                            //     console.log("43", d);
                            // }
                            //     console.log("d.id", d.id, base.centroid(d));
                              x = base.centroid(d)[0] * d.properties.icone.x;
                              y = base.centroid(d)[1] * d.properties.icone.y;
                              return d.id ? 'translate(' + [x, y] + ')' :  '';
                              // return d.id ? 'translate(' + base.centroid(d) + ')' :  '';
                         })
                        .attr("width",  0.0105 * largura)
                        .attr("height", 0.0210 * altura);

                }

                function obterCorFonte(d) {
                    var dadosTerritorio = obterDadosTerritorio(d.id);
                    if (dadosTerritorio && scope.territorios) {
                        return 'fill: #' + dadosTerritorio.personagem.cor;
                    }
                    return '';
                }

                function obterPersonagem(d) {
                    var dadosTerritorio = obterDadosTerritorio(d.id);
                    if (dadosTerritorio && scope.territorios) {
                        return dadosTerritorio.personagem.id;
                    }
                    return '';
                }

                function desenharTerritorios(topografia) {
                    pais = g.selectAll("path").data(topografia);
                    pais.enter().insert("path")
                        .attr("d", base)
                        .attr("id", function (d, i) {
                            return d.id;
                        }).attr("style", function(d){
                            return "fill:" + d.properties.cor;
                        });
                }

                function focalizar() {
                    var t = d3.event.translate,
                        s = d3.event.scale,
                        h = altura / 4;
                    t[0] = Math.min(
                        (largura / altura) * (s - 1),
                        Math.max(largura * (1 - s), t[0])
                    );
                    t[1] = Math.min(
                        h * (s - 1) + h * s,
                        Math.max(altura * (1 - s) - h * s, t[1])
                    );
                    zoom.translate(t);
                    g.attr("transform", "translate(" + t + ")scale(" + s + ")");
                }

                function redesenhar() {
                    largura = document.getElementById(id).offsetWidth;
                    altura = largura / 2;
                    d3.select('svg').remove();
                    configurarMapa();
                    desenhar(paises);
                }

                function redimensionar() {
                    var throttleTimer;
                    window.clearTimeout(throttleTimer);
                    throttleTimer = window.setTimeout(function () {
                        redesenhar();
                    }, 200);
                }

                function tratarClique(idSelecionado) {
                    // $log.debug('mapas.js - tratarClique ', idSelecionado);
                    idLabelTerritorioSelecionado =  idSelecionado;
                    if (typeof onClickCallback === 'function') {
                        scope.$apply(function () {
                            // a posição do territorio no array é sempre o idSelecionado - 1
                            var posicaoTerritorioArray = idSelecionado-1;
                            onClickCallback(posicaoTerritorioArray);
                        });
                    }
                }

                scope.$on('atualizar-territorio', function (evento, dados) {
                    // $log.debug('mapa.js - $on(atualizar-territorio) - dados: ', angular.toJson(dados));
                    //    desenharPosses();
                    if(dados.territorios && dados.territorios.length > 0){
                        for(var i=0; i <  dados.territorios.length; i++){
                            var dadosTerritorio = obterDadosTerritorio(dados.territorios[i]);
                            document.getElementById('territorio' + dados.territorios[i]).textContent =
                                $filter('translate')(dadosTerritorio.territorio.nome) + " (" + dadosTerritorio.exercitos + ")";
                            document.getElementById('territorio' + dados.territorios[i]).style.fill =
                                '#' + dadosTerritorio.personagem.cor;
                        }
                    }else{
                        var dadosTerritorio = obterDadosTerritorio(idLabelTerritorioSelecionado);
                        if (dadosTerritorio) {
                            document.getElementById('territorio' + idLabelTerritorioSelecionado).textContent =
                                $filter('translate')(dadosTerritorio.territorio.nome) + " (" + dadosTerritorio.exercitos + ")";
                        }
                    }
                });
            }
        };
    });