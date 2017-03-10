import React, {Component, PropTypes} from 'react';
import SideNav from './components/SideNav';

class AppPage extends Component {

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

AppPage.propTypes = {
    children: PropTypes.children,
    usuario: PropTypes.object.isRequired
};

AppPage.defaultProps = {
    children: null,
    usuario: null
};

export default AppPage;

