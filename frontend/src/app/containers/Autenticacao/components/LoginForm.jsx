import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Card, Button, TextField} from 'br-react-utils/layout';

const LoginForm = ({
    onSubmit,
    onChange,
    errors,
    user
}) => (

    <form action="/" onSubmit={onSubmit}>
        <Card title="Entrar" actions={
            <Button type="submit">Entrar</Button>
        }>

            <p>Ainda não tem uma conta? <Link to={'/signup'}>Criar conta</Link></p>


            {errors.summary && <p className="error-message">{errors.summary}</p>}

            <br />

            <TextField
                sizes="s12"
                label="E-mail"
                name="email"
                errorText={errors.email}
                onChange={onChange}
                value={user.email}
            />

            <TextField
                sizes="s12"
                label="Senha"
                type="password"
                name="password"
                onChange={onChange}
                errorText={errors.password}
                value={user.password}
            />

        </Card>
    </form>
);

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default LoginForm;