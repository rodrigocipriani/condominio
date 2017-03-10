import React, {Component, PropTypes} from 'react';
import Toast from 'br-react-utils/layout/Toast';
import SideNav from 'br-react-utils/layout/SideNav';
import MenuLateral from './components/MenuLateral';
import config from '../../config';
import {Loading} from 'br-react-utils/layout/Loading';
const STATIC_SERVER_URL = config.urls.staticServer;

class AppPage extends Component {

    constructor(props) {
        super(props);
        props.buscaUsuarioLogado();
    }

    componentDidUpdate() {
        this.initJqueryes();
    }

    componentDidMount() {
        this.initJqueryes();
    }

    initJqueryes = () => {
        $(document).ready(function () {
            $('.tooltipped').tooltip({delay: 50});
            $('.collapsible').collapsible();
        });
    };

    render() {
        const {usuario, modoApresentacao, children, toggleModoApresentacao} = this.props;

        if (!usuario) {
            return <Loading />;
        }

        return (

            <SideNav
                sideMenu={<MenuLateral />}
                sideMenuTitle={'Gestão de Suprimentos'}
                sideMenuHeaderBg={`${STATIC_SERVER_URL}/imgs/commons/banner-usuario.png`}
                avatarImg={`https://connections.bb.com.br/profiles/photo.do?uid=${usuario.chave}`}
                avatarTitle={usuario.nome}
                avatarSubTitle={usuario.chave}
                isFixed={!modoApresentacao}
            >
                {children}

                <div className="fixed-action-btn" style={{zIndex: '9999'}}>
                    <a className="btn-floating btn-large blue">
                        <i className="fa fa-bars" aria-hidden="true"/>
                    </a>
                    <ul>
                        <li>
                            <a
                                onClick={() => toggleModoApresentacao()}
                                className="waves-effect waves-light btn-floating blue tooltipped"
                                data-position="left"
                                data-delay="50"
                                data-tooltip="Mode Apresentação">
                                <i className="fa fa-slideshare" aria-hidden="true"/>
                            </a>
                        </li>
                    </ul>
                </div>
            </SideNav>

            /*
             <div className="App">

             {usuario &&
             <div className="row">

             <div className={['main', (modoApresentacao ? 'flow-text' : 'paddingMenu')].join(' ')}>
             <div
             className={[(modoApresentacao ? 'paddintMainApresentacao' : 'container')].join(' ')}>
             {children}
             </div>

             <div className="fixed-action-btn" style={{zIndex: '9999'}}>
             <a className="btn-floating btn-large blue">
             <i className="fa fa-bars" aria-hidden="true"/>
             </a>
             <ul>
             <li>
             <a
             onClick={() => toggleModoApresentacao()}
             className="waves-effect waves-light btn-floating blue tooltipped"
             data-position="left"
             data-delay="50"
             data-tooltip="Mode Apresentação">
             <i className="fa fa-slideshare" aria-hidden="true"/>
             </a>
             </li>
             </ul>
             </div>

             </div>

             <MenuLateral isFixed={!modoApresentacao} usuario={usuario}/>

             </div>
             }

             <Toast timeout="180000"/>
             </div
             */
        );
    }
}

AppPage.propTypes = {
    modoApresentacao: PropTypes.bool,
    usuario: PropTypes.object
};

AppPage.defaultProps = {
    modoApresentacao: false,
    usuario: null
};

export default AppPage;