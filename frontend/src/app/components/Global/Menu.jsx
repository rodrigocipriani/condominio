import React, {Component} from 'react';
import {IndexLink, Link} from 'react-router';
import {routeCodes} from '../../routes';

export default class Menu extends Component {

    render() {
        return (
            <ul>
                <li>
                    <IndexLink className="waves-effect waves-ripple" to={ routeCodes.DOCUMENTOS }>
                        <i className="fa fa-file-text-o" aria-hidden="true" /> Documentos
                    </IndexLink>
                </li>
                <li>
                    <IndexLink className="waves-effect waves-ripple" to={ routeCodes.FORUM }>
                        <i className="fa fa-comments-o" aria-hidden="true" /> Fórum
                    </IndexLink>
                </li>
                <li>
                    <IndexLink className="waves-effect waves-ripple" to={ routeCodes.INDICACOES }>
                        <i className="fa fa-briefcase" aria-hidden="true" /> Indicações (Serviços)
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
