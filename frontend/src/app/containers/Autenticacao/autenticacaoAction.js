import {createAssyncAction} from '../../lib/actionsHelper';
import {autenticacaoActionTypes} from './autenticacaoActionTypes';
import api  from 'lib/api';
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
    let user = Auth.getUser();
    if(user){
        console.log('user1', user);
    }else{
        console.log('user2', user);
    }
    if (Auth.isUserAuthenticated() && user) {
        return store.dispatch(
            {type: autenticacaoActionTypes.REQ_LOGGED_USER_SUCCESS, payload: user}
        )
    } else {
        createAssyncAction(autenticacaoActionTypes.REQ_LOGGED_USER,
            apiGeral.get('/usuario')
        );
    }
};
