import React from 'react';
import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';

import bgCaymmi from '../../assets/img/bg-bcaymmi.jpg';

var SideNav = React.createClass({

    propTypes: {
        children: React.PropTypes.element
    },

    getDefaultProps: function () {
        return {
            children: <div></div>
        };
    },

    componentDidMount: function () {
        $(".button-collapse").sideNav();

    },

    render: function () {

        const {children} = this.props;

        return (

            <div>
                {/*<ul id="slide-out" className="side-nav fixed">*/}
                {/*<li><a href="#!" className="waves-effect waves-ripple">First Sidebar Link</a></li>*/}
                {/*<li><a href="#!" className="waves-effect waves-ripple">Second Sidebar Link</a></li>*/}
                {/*</ul>*/}

                <ul id="slide-out" className="side-nav fixed">
                    <li>
                        <div className="userView" style={{height: '170px'}}>
                            <div className="background">
                                <img src={bgCaymmi} />
                            </div>

                            {/*<a href="#!user"><img className="circle" src="images/yuna.jpg"/></a>*/}
                            {/*<a href="#!name"><span className="white-text name">Caymmi</span></a>*/}
                            {/*<a href="#!email"><span className="white-text email">contato@boulevardcaymmi.com.br</span></a>*/}
                        </div>
                    </li>
                    <li><h5 style={{textAlign: 'center'}}>Boulevard Caymmi</h5></li>
                    <li><a className="waves-effect waves-ripple" href="#!">Documentos</a></li>
                    <li><a className="waves-effect waves-ripple" href="#!">Discussões</a></li>
                    <li><a className="waves-effect waves-ripple" href="#!">Indicações Serviço/Compras</a></li>
                </ul>
                {/*<a href="#" data-activates="slide-out" className="waves-effect waves-ripple button-collapse">*/}
                    {/*<i className="material-icons">menu1</i>*/}
                {/*</a>*/}
                <div>
                    {children}
                </div>
            </div>
        );
    }
});

export default SideNav;