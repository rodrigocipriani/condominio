import React, {Component} from 'react';
import {IndexLink, Link} from 'react-router';
import {routeCodes} from '../../routes';

export default class Menu extends Component {

    render() {
        return (
            <ul>
                <li>
                    <IndexLink className="waves-effect waves-ripple" to={ routeCodes.DOCUMENTOS }>
                        Documentos
                    </IndexLink>
                </li>
                <li>
                    <IndexLink className="waves-effect waves-ripple" to={ routeCodes.FORUM }>
                        Fórum
                    </IndexLink>
                </li>
                <li>
                    <IndexLink className="waves-effect waves-ripple" to={ routeCodes.INDICACOES }>
                        Indicações Serviços / Compras
                    </IndexLink>
                </li>
                <li><div className="divider"></div></li>
                <li>
                    <IndexLink className="waves-effect waves-ripple" to={ routeCodes.LOGOUT }>
                        <i className="fa fa-sign-out" aria-hidden="true"></i> Sair
                    </IndexLink>
                </li>
                {/*<li>*/}
                    {/*<IndexLink className="waves-effect waves-ripple" to={ routeCodes.ABOUT }>*/}
                        {/*Sobre*/}
                    {/*</IndexLink>*/}
                {/*</li>*/}
            </ul>
        );
    }
}
