import {createAssyncAction} from '../../lib/actionsHelper';
import api  from 'lib/api';
import {actionTypes} from './autenticacaoActionTypes';
import config from '../../config';

const apiGeral = api(config.urls.api);

export const signup = (username, email, password) => {
    createAssyncAction(actionTypes.SIGNUP,
        apiGeral.post('/usuario', {username, email, password}),
        {}
    );
};

export const signin = (email, password) => {
    createAssyncAction(actionTypes.SIGNIN,
        apiGeral.post('/Autenticacao', {email, password})
    );
};

export const signout = (email, password) => {
    createAssyncAction(actionTypes.SIGNOUT,
        apiGeral.get('/Autenticacao')
    );
};

export const resquestLoggedUser = () => {
    createAssyncAction(actionTypes.REQ_LOGGED_USER,
        apiGeral.get('/usuario')
    );
};
