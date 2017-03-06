import React, {Component, PropTypes} from "react";

const css = {
    fixBotton: {
        position: 'absolute',
        width: '100%',
        bottom: '0px',
        zIndex: 9999
    }
};

// todo - implementar que no onmousehover o contador de tempo fica parado e a msg não fecha
class SnackBarMsgs extends Component {
    static propTypes = {
        // children: PropTypes.object,
        msgs: PropTypes.array.isRequired,
        closeTimer: PropTypes.number
    };

    static defaultProps = {
        // children: null,
        msgs: [],
        closeTimer: 5
    };

    state = {
        counter: 0,
        msgs: []
    };

    componentWillReceiveProps(nextProps) {
        const newMsgs = nextProps.msgs.map((msg, key) => {
            msg.type = msg.tipo || 'info';
            msg.uuid = new Date().getTime() + key;
            return msg;
        });
        this.setState({msgs: this.state.msgs.concat(newMsgs)});
    }

    snackMsgs = () => {
        const retorno = this.state.msgs.map((msg, key) => {
            return <Snack key={msg.uuid} uuid={msg.uuid} type={msg.type} text={msg.texto}
                          handleClose={this.handleSnackClose}
                          closeTime={(this.props.closeTimer)}/>;
        });

        return retorno;
    };

    handleSnackClose = (uuid) => {
        return this.state.msgs.filter(msg => {
            return msg.uuid != uuid;
        });
    };


    render() {

        return (
            <div className="row" style={css.fixBotton}>
                <div className="col s12 center-align">
                    {this.snackMsgs()}
                </div>
            </div>
        );
    }
}

class Snack extends Component {

    static propTypes = {
        type: PropTypes.string,
        text: PropTypes.string.isRequired,
        closeTime: PropTypes.number,
        uuid: PropTypes.number,
        handleClose: PropTypes.func.isRequired
    };

    static defaultProps = {
        type: 'info',
        text: '',
        closeTime: 5,
        uuid: null,
        handleClose: {}
    };

    constructor(props) {
        super(props);
        this.initCounter();
    }

    state = {
        counter: 0
    };

    timer = null;
    initCounter = () => {
        this.timer = setInterval(() => {
            this.setState({counter: this.state.counter + 1});
        }, 1000);
    };

    componentWillUnmount() {
        this.stopTimer();
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    close = () => {
        this.stopTimer();
        this.setState({counter: 9999});
    };

    render() {

        const {counter} = this.state;
        const {type, text, closeTime, uuid, handleClose} = this.props;

        if (counter >= closeTime) {
            this.stopTimer();
            handleClose(uuid);
            return null;
        }

        const style = [];
        style['info'] = {
            textClass: 'white-text',
            cardClass: 'grey darken-1'
        };
        style['success'] = {
            textClass: 'white-text',
            cardClass: 'green darken-2'
        };
        style['warning'] = {
            textClass: 'grey-text text-darken-4',
            cardClass: 'orange lighten-2'
        };
        style['danger'] = {
            textClass: 'white-text',
            cardClass: 'deep-orange darken-4'
        };

        // todo : trocar o ok por button
        return (
            <div className={['card-panel center-align', style[type].cardClass].join(' ')}
                 style={{
                     padding: 10,
                     width: '80%',
                     margin: '0 auto',
                     marginTop: 5,
                     maxWidth: 400,
                     position: 'relative'
                 }}>
                    <span className={style[type].textClass}>
                       {text}
                    </span>
                <a onClick={() => this.close()} href="javascript:" style={{position: 'absolute', right: 15}}
                   className={[style[type].textClass].join(' ')}>OK</a>
            </div>
        );
    }
}
;

export default SnackBarMsgs;