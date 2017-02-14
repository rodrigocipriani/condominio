import React, { Component, PropTypes } from 'react';

import Header from 'components/Global/Header';
import SideNav from 'rc-react-elements/SideNav';

export default class App extends Component {
    static propTypes = {
        children: PropTypes.object,
    }

    render() {
        const { children } = this.props;

        return (
            <div className='App'>
                <SideNav>
                    <Header />

                    <div className='Page'>
                        { children }
                    </div>
                </SideNav>
            </div>
        );
    }
}
