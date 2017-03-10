import React, {Component, PropTypes} from 'react';
import SnackBarMsgs from 'br-react-utils/layout/SnackBarMsgs';
import {DefaultTheme} from 'br-react-utils/layout/theme';
import {routeCodes} from '../../routes';


class IndexPage extends Component {

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
    isLogged: PropTypes.bool.isRequired
};

IndexPage.defaultProps = {
    children: null,
    msgs: [],
    isLogged: false
};

export default IndexPage;