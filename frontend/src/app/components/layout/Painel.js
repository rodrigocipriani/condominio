import React, {Component, PropTypes} from "react";
import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';

export default class Painel extends Component {

    static propTypes = {
        titulo: React.PropTypes.string,
        children: React.PropTypes.element,
        isOpen: React.PropTypes.bool,
    };

    static defaultProps = {
        titulo: '',
        children: <div></div>,
        isOpen: false
    };

    componentDidMount() {
        $(document).ready(function () {
            $('.collapsible').collapsible();
        });
    }

    render() {

        const {titulo, children, isOpen} = this.props;

        return (

            <ul className="collapsible" data-collapsible="accordion">
                <li>
                    <div className={['collapsible-header', (isOpen && 'active')].join(' ')}>{titulo}</div>
                    <div className="collapsible-body white" style={{padding: '0px'}}>
                        {children}
                    </div>
                </li>
            </ul>
        );
    }
}
