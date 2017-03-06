class Auth {

    /**
     * Authenticate a user. Save a user object in Local Storage
     *
     * @param {object} user
     */
    static authenticateUser(user) {
        console.log('authenticateUser', user);
        localStorage.setItem('user', user);
    }

    /**
     * Check if a user is authenticated - check if a user is saved in Local Storage
     *
     * @returns {boolean}
     */
    static isUserAuthenticated() {
        let user = localStorage.getItem('user');
        console.log('isUserAuthenticated', user ? true : false);
        return user ? true : false;
    }

    /**
     * Deauthenticate a user. Remove a user from Local Storage.
     *
     */
    static deauthenticateUser() {
        console.log('deauthenticateUser', localStorage.getItem('user'));
        localStorage.removeItem('user');
    }

    /**
     * Get a user value.
     *
     * @returns {object}
     */

    static getUser() {
        console.log('getUser', localStorage.getItem('user'));
        return localStorage.getItem('user');
    }

}

export default Auth;