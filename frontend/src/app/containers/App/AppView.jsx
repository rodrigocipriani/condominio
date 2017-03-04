import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SideNav from './components/SideNav';

@connect(state => ({
    usuario: state.autenticacao.usuario,
}))
export default class AppView extends Component {

    static propTypes = {
        children: PropTypes.object,
        usuario: PropTypes.object,
    };

    render() {
        const {children, usuario} = this.props;

        if (!usuario) {
            return <div>loading...</div>
        }

        return (
            <div className='App'>
                <SideNav userName={usuario.nome} userEmail={usuario.email}
                         userAvatarUrl="http://then.gasbuddy.com/images/default_avatar.gif">
                    <div className='Page'>
                        {children}
                    </div>
                </SideNav>
            </div>
        );
    }
}
