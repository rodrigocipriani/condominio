import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
// todo : está aqui para o material-ui. Retirar caso não for usado
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SnackBarMsgs from 'rc-react-elements/layout/SnackBarMsgs';
import {routeCodes} from '../../routes';

// todo : remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

@connect(state => ({
    msgs: state.indexReducer.msgs,
    isLogged: state.autenticacaoReducer.isLogged
}))
class IndexView extends Component {

    static propTypes = {
        children: PropTypes.element, // todo : é element ou string
        msgs: PropTypes.array,
    };

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        // todo : location... mexe com o navegador, trocar para algo nativo do react
        const isLogged = nextProps.isLogged;
        if(!isLogged){
            location.pathname != routeCodes.LOGIN ? location.href = routeCodes.LOGIN : null;
        }
    }

    render() {
        const {children, msgs} = this.props;

        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div className='Index'>
                    {children}

                    <SnackBarMsgs msgs={msgs}/>

                </div>
            </MuiThemeProvider>
        );
    }
}

// IndexView.contextTypes = {
//     location: React.PropTypes.object
// };

function mapStateToProps(state) {
    return {
        msgs: state.indexReducer.msgs,
        isLogged: state.autenticacaoReducer.isLogged
    }
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({ addTodo }, dispatch)
// }

export default connect(mapStateToProps)(IndexView);