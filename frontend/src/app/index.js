import React, {Component, PropTypes} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SideNav from './components/Global/SideNav';

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();


export default class App extends Component {

    static propTypes = {
        children: PropTypes.object,
    };

    render() {
        const {children, usuario} = this.props;

        console.log('this.context', this.context.router);
        console.log('usuario', usuario);

        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div className='App'>
                    <SideNav>
                        <div className='Page'>
                            {children}
                        </div>
                    </SideNav>
                </div>
            </MuiThemeProvider>
        );
    }
}
