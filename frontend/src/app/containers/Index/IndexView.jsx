import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
// todo : está aqui para o material-ui. Retirar caso não for usado
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SnackBarMsgs from '../../components/layout/SnackBarMsgs';

// todo : remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

@connect(state => ({
    msgs: state.indexReducer.msgs,
}))
export default class Index extends Component {

    static propTypes = {
        children: PropTypes.element, // todo : é element ou string
        msgs: PropTypes.array,
    };

    constructor(props){
        super(props);
    }

    render() {
        const {children, msgs} = this.props;

        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div className='Index'>
                    {children}

                    <SnackBarMsgs msgs={msgs} />

                </div>
            </MuiThemeProvider>
        );
    }
}
