import {createAssyncAction} from '../../lib/actionsHelper';
import api  from 'lib/api';
import {autenticacaoActionTypes} from './autenticacaoActionTypes';
import Auth from './Auth';
import config from '../../config';
import store from '../../lib/store';


const apiGeral = api(config.urls.api);

export const signUp = (username, email, password) => {
    createAssyncAction(autenticacaoActionTypes.SIGNUP,
        apiGeral.post('/usuario', {username, email, password}),
        {}
    );
};

export const signIn = (email, password) => {
    createAssyncAction(autenticacaoActionTypes.SIGNIN,
        apiGeral.post('/Autenticacao', {email, password})
    );
};

export const signOut = (email, password) => {
    createAssyncAction(autenticacaoActionTypes.SIGNOUT,
        apiGeral.get('/Autenticacao')
    );
};

export const resquestLoggedUser = () => {
    if(Auth.isUserAuthenticated()){
        let user = Auth.getUser();
        return store.dispatch(
            {type: autenticacaoActionTypes.REQ_LOGGED_USER_SUCCESS, user}
        )
    }
    createAssyncAction(autenticacaoActionTypes.REQ_LOGGED_USER,
        apiGeral.get('/usuario')
    );
};
