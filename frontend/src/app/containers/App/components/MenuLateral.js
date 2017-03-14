import React, {Component} from 'react'
import RouterLink from 'br-react-utils/components/RouterLink';
import {routeCodes} from '../../../routes';

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

    menu = [
        {label: <span><i className="fa fa-file-text-o" aria-hidden="true" /> Documentos</span>, to: routeCodes.DOCUMENTOS},
        {label: <span><i className="fa fa-comments-o" aria-hidden="true" /> Fórum</span>, to: routeCodes.FORUM},
        {label: <span><i className="fa fa-briefcase" aria-hidden="true" /> Indicações (Serviços)</span>, to: routeCodes.INDICACOES},
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
                    <ul>
                        {this.montaItensMenu(this.menu)}
                    </ul>
                </li>
                <li>
                    <div className="divider"></div>
                </li>
                <li>
                    <RouterLink className="waves-effect waves-ripple" to={ routeCodes.LOGOUT }>
                        <i className="fa fa-sign-out" aria-hidden="true" /> Sair
                    </RouterLink>
                </li>
            </ul>
        );

    }


}

export default MenuLateral;
