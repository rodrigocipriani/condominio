import React, {Component, PropTypes} from 'react';
import SideNav from './components/SideNav';
import Auth from '../autenticacao/Auth';

export default class AppView extends Component {

    static propTypes = {
        children: PropTypes.object
    };

    render() {
        const {children} = this.props;

        const usuario = Auth.getUser();

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
