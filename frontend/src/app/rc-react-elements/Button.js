import React from 'react';
import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';

const Button = ({children, className}, props) => (
    <a {...props} className={['waves-effect waves-light btn', className].join(' ')}>
        {children}
    </a>
);

export default Button;
