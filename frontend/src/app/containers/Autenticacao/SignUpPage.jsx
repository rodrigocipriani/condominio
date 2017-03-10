import React, {Component, PropTypes} from 'react';
import SignUpForm from './components/SignUpForm.jsx';
import {Row, Col} from 'br-react-utils/layout';

class SignUpPage extends Component {

    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        // set the initial component state
        this.state = {
            errors: {},
            user: {
                email: '',
                name: '',
                password: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
        this.handleSignUp = props.handleSignUp.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // todo : location... mexe com o navegador, trocar para algo nativo do react
        const isLogged = nextProps.isLogged;
        if (isLogged) {
            console.log('AQUI');
            location.href = location.pathname != nextProps.routeCodes.LOGIN ? location.pathname : nextProps.routeCodes.HOME
        }
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
     * Process the form.
     *
     * @param {object} event - the JavaScript event object
     */
    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        const name = this.state.user.name;
        const email = this.state.user.email;
        const password = this.state.user.password;

        this.handleSignUp(name, email, password);

    }

    render() {
        return (
            <Row>
                <Col sizes="s12">
                    <SignUpForm
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

SignUpPage.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    handleSignUp: PropTypes.func.isRequired,
    routeCodes: PropTypes.object.isRequired
};

SignUpPage.defaultProps = {
    isLogged: false,
    handleSignUp: null,
    routeCodes: {}
};


export default SignUpPage;