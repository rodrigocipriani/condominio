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

    componentWillReceiveProps(nextProps) {
        // this.snackMsgs = nextProps.msgs
        /*
         let msgs = nextProps.msgs;
         console.log('msgs >>>', msgs);
         if (msgs && msgs.length > 0) {
         msgs.map(msg => {
         // alert(`MSG: ${msg.tipo} - ${msg.texto}`);
         Materialize.toast('I am a toast!', 4000)
         })
         }
         */
    }

    snackMsgs = (msgs) => {
        const retorno = msgs.map((msg, key) => {
            console.log('msg :::', msg);
            {/*return <SnackBarMsgs key={key} text={msg.texto} type={msg.tipo}/>*/
            }
            return <Snackbar
                open={true}
                message={<SnackBarMsgs key={key} text={msg.texto} type={msg.tipo}/>}
                action="Ok"
                autoHideDuration={3000}
            />;
            // onActionTouchTap={() => {}}
            // onRequestClose={this.handleRequestClose}
        });
        //todo : chamar action para apagar msgs mostradas

        return retorno;
    };

    render() {
        const {children, msgs} = this.props;
        console.log('msgs ===', msgs);

        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div className='Index'>
                    {children}

                    {/*todo : colocar um callback que quando é mostrado chama uma aciton para apagar msgs do reducer*/}
                    <SnackBarMsgs msgs={msgs} />

                </div>
            </MuiThemeProvider>
        );
    }
}
