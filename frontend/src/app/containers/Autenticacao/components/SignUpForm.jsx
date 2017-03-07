import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Card, Button, TextField} from 'rc-react-elements/layout';

const SignUpForm = ({
    onSubmit,
    onChange,
    errors,
    user
}) => (

            <form action="/" onSubmit={onSubmit}>
                <Card title="Criar nova conta" actions={
                    <Button type="submit">Criar nova conta</Button>
                }>

                    <p>Já tem uma conta? <Link to={'/login'}>Entrar</Link></p>


                    {errors.summary && <p className="error-message">{errors.summary}</p>}

                    <br />

                    <TextField
                        sizes="s12"
                        label="Nome"
                        name="name"
                        errorText={errors.name}
                        onChange={onChange}
                        value={user.name}
                    />

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

SignUpForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default SignUpForm;