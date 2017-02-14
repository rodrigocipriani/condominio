import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {testAction, testAsync} from 'actions/app';
// import 'font-awesome/css/font-awesome.min.css';
import Button from 'rc-react-elements/Button';

@connect(state => ({
    asyncData: state.app.get('asyncData'),
    asyncError: state.app.get('asyncError'),
    asyncLoading: state.app.get('asyncLoading'),
    counter: state.app.get('counter'),
}))
export default class Home extends Component {
    static propTypes = {
        asyncData: PropTypes.string,
        asyncError: PropTypes.object,
        asyncLoading: PropTypes.bool,
        counter: PropTypes.number,
        // from react-redux connect
        dispatch: PropTypes.func,
    }

    constructor() {
        super();

        this.handleAsyncButtonClick = this.handleAsyncButtonClick.bind(this);
        this.handleTestButtonClick = this.handleTestButtonClick.bind(this);
    }

    handleAsyncButtonClick() {
        const {dispatch} = this.props;

        dispatch(testAsync());
    }

    handleTestButtonClick() {
        const {dispatch} = this.props;

        dispatch(testAction());
    }

    render() {
        const {
            asyncData,
            asyncError,
            asyncLoading,
            counter,
        } = this.props;

        return (
            <div className='Home'>
                <h2>Estatuto</h2>
                <hr />
                <div>
                    <Button onClick={ this.handleTestButtonClick }>
                        <i className="fa fa-telegram" aria-hidden="true"></i> Acessar Estatuto
                    </Button>
                </div>
            </div>
        );
    }
}
