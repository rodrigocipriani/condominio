import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(state => ({
    // counter: state.appReducer.get('counter'),
}))
export default class Indicacoes extends Component {
    static propTypes = {
        // from react-redux connect
        dispatch: PropTypes.func,
    }

    constructor() {
        super();
    }

    render() {
        const {} = this.props;

        return (
            <div className='Documentos row'>
                <h2>Indicações</h2>
                <hr />
                Em breve...
            </div>
        );
    }
}
