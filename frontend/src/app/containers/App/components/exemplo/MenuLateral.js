import React, {Component} from 'react'
import config from '../../../config';
import RouterLink from 'br-react-utils/components/RouterLink';
import {routeCodes} from '../../../routes';

const STATIC_SERVER_URL = config.urls.staticServer;

class MenuLateral extends Component {

    constructor(props) {
        super(props);
    }

    static contextTypes = {
        router: React.PropTypes.object
    };

    componentDidMount() {
        $('.collapsible').collapsible();
    }

    componentDidUpdate() {
        $('.collapsible').collapsible();
    }

    menuContrato = [
        {label: 'Painel', to: routeCodes.CONTRATO},
    ];

    montaItensMenu = (itens) => {
        return itens.map((item, i) => (
            <li key={i}>
                <RouterLink to={item.to}>
                    {item.label}
                </RouterLink>
            </li>
        ));
    };

    isActiveParentRouter = (opcoes) => {
        return opcoes.filter(opcao => {
            return this.context.router.isActive(opcao.to);
        }).length > 0;
    };

    render() {

        const {} = this.props;

        return (

            <ul>
                <li>
                    <ul className="collapsible collapsible-accordion" data-collapsible="accordion">
                        <li>
                            <div className={['collapsible-header', (this.isActiveParentRouter(this.menuContrato) ? 'active' : '')].join(' ')}>Contratos</div>
                            <div className="collapsible-body">
                                <ul>
                                    {this.montaItensMenu(this.menuContrato)}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul className="collapsible collapsible-accordion" data-collapsible="accordion">
                        <li>
                            <div className={['collapsible-header'].join(' ')}>Cobertura</div>
                            <div className="collapsible-body">
                                <ul>
                                    <a href="javascript:">Painel</a>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className="divider"></div>
                </li>
            </ul>

        );

    }


}

export default MenuLateral;