import {createAssyncAction} from '../../actionsHelper';
import api  from 'lib/api';
import {actionTypes} from './autenticacaoActionTypes';
import config from '../../config';

const apiGeral = api(config.url.api);

export const signup = (username, email, password) => {
    console.log('SIGNUP');
    createAssyncAction(actionTypes.SIGNUP,
        apiGeral.post('/usuario', {username, email, password}),
        {}
    );
};

export const signin = (email, password) => {
    console.log('SIGNIN');
    createAssyncAction(actionTypes.SIGNIN,
        apiGeral.post('/autenticacao', {email, password})
    );
};

export const resquestLoggedUser = () => {
    console.log('resquestLoggedUser');
    createAssyncAction(actionTypes.REQ_LOGGED_USER,
        apiGeral.get('/usuario')
    );
};
