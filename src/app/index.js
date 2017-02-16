import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';

import store from './store';
import SideNav from './components/Global/SideNav';

export default class App extends Component {
    static propTypes = {
        children: PropTypes.object,
    }

    render() {
        const {children} = this.props;

        return (
            <Provider store={store}>
                <div className='App'>
                    <SideNav>
                        <div className='Page'>
                            { children }
                        </div>
                    </SideNav>
                </div>
            </Provider>
        );
    }
}
