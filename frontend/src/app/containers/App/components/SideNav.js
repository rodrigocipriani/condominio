import React from 'react';
import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';

import bgCaymmi from '../../../assets/img/bg-bcaymmi.jpg';
import Menu from './Menu';

var SideNav = React.createClass({

    propTypes: {
        children: React.PropTypes.element,
        userName: React.PropTypes.string,
        userEmail: React.PropTypes.string,
        userAvatarUrl: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            children: <div></div>,
            userName: '',
            userEmail: '',
            userAvatarUrl: ''
        };
    },

    componentDidMount: function () {
        $(".button-collapse").sideNav({
            closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        });
    },

    render: function () {

        const {children, userName, userEmail, userAvatarUrl} = this.props;

        const menuLAteral = (isFixed) => {
            return <ul id={!isFixed && 'slide-out'} className={['side-nav', (isFixed && 'fixed')].join(' ')}>
                <li>
                    <div className="userView" style={{height: '170px'}}>
                        <div className="background">
                            <img src={bgCaymmi}/>
                        </div>

                        <a href="#!user"><img className="circle" src={userAvatarUrl}/></a>
                        <a href="#!name"><span className="white-text name">{userName}</span></a>
                        <a href="#!email"><span className="white-text email">{userEmail}</span></a>
                    </div>
                </li>
                <li><h5 style={{textAlign: 'center'}}>Boulevard Caymmi</h5></li>
                <li>
                    <Menu />
                </li>
            </ul>
        };

        return (
            <div>
                <div className="row hide-on-large-only">
                    <a href="#" data-activates="slide-out" className="btn waves-effect waves-ripple button-collapse">
                        <i className="fa fa-bars" aria-hidden="true"></i> Menu
                    </a>
                </div>
                <div className="row">
                    {/*<ul id="slide-out" className="side-nav fixed">*/}
                    {/*<li><a href="#!" className="waves-effect waves-ripple">First Sidebar Link</a></li>*/}
                    {/*<li><a href="#!" className="waves-effect waves-ripple">Second Sidebar Link</a></li>*/}
                    {/*</ul>*/}
                    <div className="main-small hide-on-large-only">
                        {children}
                    </div>
                    <div className="main hide-on-med-and-down">
                        {children}
                    </div>

                    {/*<ul id="slide-out" className="side-nav fixed">*/}
                        {/*<li><div className="userView">*/}
                            {/*<div className="background">*/}
                                {/*<img src="images/office.jpg" />*/}
                            {/*</div>*/}
                            {/*<a href="#!user"><img className="circle" src="images/yuna.jpg" /></a>*/}
                            {/*<a href="#!name"><span className="white-text name">John Doe</span></a>*/}
                            {/*<a href="#!email"><span className="white-text email">jdandturk@gmail.com</span></a>*/}
                        {/*</div></li>*/}
                        {/*<li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>*/}
                        {/*<li><a href="#!">Second Link</a></li>*/}
                        {/*<li><div className="divider"></div></li>*/}
                        {/*<li><a className="subheader">Subheader</a></li>*/}
                        {/*<li><a className="waves-effect" href="#!">Third Link With Waves</a></li>*/}
                    {/*</ul>*/}
                    {/*<a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>*/}

                    <div className="hide-on-med-and-down">
                        {menuLAteral(true)}
                    </div>

                    <div className="hide-on-large-only">
                        {menuLAteral(false)}
                    </div>
                    {/*<a href="#" data-activates="slide-out" className="waves-effect waves-ripple button-collapse">*/}
                    {/*<i className="material-icons">menu1</i>*/}
                    {/*</a>*/}
                </div>
            </div>
        );
    }
});

export default SideNav;
