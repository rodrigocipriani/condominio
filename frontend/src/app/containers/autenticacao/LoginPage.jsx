import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import LoginForm from './components/LoginForm.jsx';
import * as autenticacaoActions from './autenticacaoAction';
import {routeCodes} from '../../routes';
import Auth from './Auth';

@connect(state => ({
    usuario: state.autenticacao.usuario,
}))
class LoginPage extends React.Component {

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
                password: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
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

        console.log('(TESTE)');
        autenticacaoActions.signin(email, password);

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

        if (Auth.isUserAuthenticated()) {
            console.log('location.href *************', location.pathname, routeCodes.LOGIN);
            location.href = location.pathname != routeCodes.LOGIN ? location.pathname : routeCodes.HOME
        }

        return (
            <LoginForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}
            />
        );
    }

}

export default LoginPage;