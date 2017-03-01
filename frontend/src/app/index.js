import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SideNav from './components/Global/SideNav';

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

@connect(state => ({
    usuario: state.autenticacao.usuario,
}))
export default class App extends Component {

    static propTypes = {
        children: PropTypes.object,
        usuario: PropTypes.object,
    };

    componentDidUpdate(prevProps, prevState){
        console.log("ATUALIZOUUU", prevProps, prevState)
    }

    render() {
        const {children, usuario} = this.props;

        if(!usuario){
            return <div>loading...</div>
        }

        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div className='App'>
                    <SideNav userName={usuario.nome} userEmail={usuario.email} userAvatarUrl="http://then.gasbuddy.com/images/default_avatar.gif">
                        <div className='Page'>
                            {children}
                        </div>
                    </SideNav>
                </div>
            </MuiThemeProvider>
        );
    }
}
