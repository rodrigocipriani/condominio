import React from 'react';
import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';


var Painel = React.createClass({

    propTypes: {
        titulo: React.PropTypes.string,
        children: React.PropTypes.element,
        isOpen: React.PropTypes.bool,
    },

    getDefaultProps: function () {
        return {
            titulo: '',
            children: <div></div>,
            isOpen: false
        };
    },

    componentDidMount: function () {
        $(document).ready(function () {
            $('.collapsible').collapsible();
        });
    },

    render: function () {

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
});

export default Painel;
