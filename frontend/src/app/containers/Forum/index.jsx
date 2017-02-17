import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(state => ({
    // counter: state.app.get('counter'),
}))
export default class Forum extends Component {
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
                <h2>Fórum</h2>
                <hr />

                Em breve...
            </div>
        );
    }
}
