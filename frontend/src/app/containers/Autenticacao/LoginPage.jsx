import React, {Component, PropTypes} from 'react';
import LoginForm from './components/LoginForm.jsx';
import {Row, Col} from 'br-react-utils/layout';

class LoginPage extends Component {

    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            user: {
                email: '',
                password: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
        this.handleSignIn = props.handleSignIn.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // todo : location... mexe com o navegador, trocar para algo nativo do react
        const isLogged = nextProps.isLogged;
        if (isLogged) {
            location.href = location.pathname != nextProps.routeCodes.LOGIN ? location.pathname : nextProps.routeCodes.HOME
        }
    }

    /**
     * Process the form.
     *
     * @param {object} event - the JavaScript event object
     */
    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        const email = this.state.user.email;
        const password = this.state.user.password;

        this.handleSignIn(email, password);

    }

    /**
     * Change the user object.
     *
     * @param {object} event - the JavaScript event object
     */
    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    }

    /**
     * Render the component.
     */
    render() {

        return (
            <Row>
                <Col sizes="s12">
                    <LoginForm
                        onSubmit={this.processForm}
                        onChange={this.changeUser}
                        errors={this.state.errors}
                        user={this.state.user}
                    />
                </Col>
            </Row>
        );
    }

}

LoginPage.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    handleSignIn: PropTypes.func.isRequired,
    routeCodes: PropTypes.object.isRequired
};

LoginPage.defaultProps = {
    isLogged: false,
    handleSignIn: null,
    routeCodes: {}
};

export default LoginPage;