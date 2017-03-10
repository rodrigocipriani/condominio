import React, {Component, PropTypes} from 'react';
import SnackBarMsgs from 'br-react-utils/layout/SnackBarMsgs';
import {DefaultTheme} from 'br-react-utils/layout/theme';
import {Loading} from 'br-react-utils/layout/Loading';


class IndexPage extends Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {

        const isLogged = nextProps.isLogged;
        if(!isLogged){
            nextProps.callbackNotLogged();
        }
    }

    render() {
        const {children, msgs, isLogged} = this.props;

        // if(!isLogged){
        //     return <Loading />;
        // }

        return (
            <DefaultTheme>
                <div className='Index'>

                    {children}

                    <SnackBarMsgs msgs={msgs}/>

                </div>
            </DefaultTheme>
        );
    }
}

IndexPage.propTypes = {
    children: PropTypes.element, // todo : Implementar apra ser element ou string
    msgs: PropTypes.array,
    isLogged: PropTypes.bool.isRequired,
    callbackNotLogged: PropTypes.func
};

IndexPage.defaultProps = {
    children: null,
    msgs: [],
    isLogged: false,
    callbackNotLogged: () => {}
};

export default IndexPage;