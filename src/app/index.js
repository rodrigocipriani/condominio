import React, { Component, PropTypes } from 'react';

import SideNav from 'components/Global/SideNav';

export default class App extends Component {
    static propTypes = {
        children: PropTypes.object,
    }

    render() {
        const { children } = this.props;

        return (
            <div className='App'>
                <SideNav>
                    <div className='Page'>
                        { children }
                    </div>
                </SideNav>
            </div>
        );
    }
}
