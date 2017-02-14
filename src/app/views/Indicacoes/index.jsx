import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {testAction, testAsync} from 'actions/app';
import Button from 'rc-react-elements/Button';

@connect(state => ({
    // counter: state.app.get('counter'),
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
