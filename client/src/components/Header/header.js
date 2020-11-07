import React from 'react';
import {withRouter} from 'react-router-dom';

function Header(props) {
    
    const redirectToRegister = () => {
        props.history.push('/register');
    }
    const redirectToLogin = () => {
        props.history.push('/login');
    }

    return (
        <nav class="navbar navbar-dark bg-primary">
                <div className="row col-12 d-flex justify-content-center text-white">
                    <span className="registerText" onClick={() => redirectToRegister()}>Register</span> 
                </div>
                <div className="row col-12 d-flex justify-content-center text-white">
                    <span className="loginText" onClick={() => redirectToLogin()}>Login</span> 
                </div>
        </nav>
    )
}

export default withRouter(Header);