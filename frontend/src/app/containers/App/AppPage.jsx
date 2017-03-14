import React, {Component, PropTypes} from 'react';
// import SideNav from './components/SideNav';
import SideNav from 'br-react-utils/layout/SideNav';
import MenuLateral from './components/MenuLateral';

import bgCaymmi from '../../assets/img/bg-bcaymmi.jpg';

class AppPage extends Component {

    render() {
        const {children, usuario} = this.props;

        if (!usuario) {
            return <div>loading...</div>
        }

        return (
            <div className='App'>
                <SideNav
                    sideMenu={<MenuLateral />}
                    sideMenuTitle="Boulevard Caymmi"
                    sideMenuHeaderBg={bgCaymmi}
                    avatarImg="http://then.gasbuddy.com/images/default_avatar.gif"
                    avatarTitle={usuario.nome}
                    avatarSubTitle={usuario.email}
                    isFixed={true}
                >
                    {children}
                </SideNav>
            </div>
        );
    }
}

AppPage.propTypes = {
    children: PropTypes.any,
    usuario: PropTypes.object.isRequired
};

AppPage.defaultProps = {
    children: null,
    usuario: null
};

export default AppPage;

