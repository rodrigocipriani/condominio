import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store from './store';
import SideNav from './components/Global/SideNav';

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

export default class App extends Component {
    static propTypes = {
        children: PropTypes.object,
    }

    render() {
        const {children} = this.props;

        return (
            <Provider store={store}>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div className='App'>
                        <SideNav>
                            <div className='Page'>
                                { children }
                            </div>
                        </SideNav>
                    </div>
                </MuiThemeProvider>
            </Provider>
        );
    }
}
