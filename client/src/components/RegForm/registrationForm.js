import React, {useState} from 'react';
import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter } from 'react-router-dom';

function RegistrationForm(props) {
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const handleChange = (e) => {
        const {id, value} = e.target;
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            sendDetailsToServer()
        } else {
            props.showError('Passwords do not match');
        }
    }
    const sendDetailsToServer = () => {
        if (state.email.length && state.password.length) {
            const payload = {
                "name": state.name,
                "email": state.email,
                "password": state.password,
                "confirmPassword": state.confirmPassword
            }
            axios.post(API_BASE_URL + 'register', payload)
                .then(function (response) {
                    if (response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': 'Registration successful. Redirecting to home page..'
                        }))
                        localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token)
                        redirectToHome();
                        props.showError(null);
                    } else {
                        props.showError("some error occurred");
                    }
                })
                .catch(function (error) {
                    console.log(error)
                }); 
        } else {
            props.showError('Please enter valid username and password');
        }
    }
    const redirectToHome = () => {
        props.updateTitle('Home');
        props.history.push('/home');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login');
        props.history.push('/login');
    }

    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
            <div className="form-group text-left">
                    <label htmlFor="exampleInputName1">Name</label>
                    <input type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter name"
                        value={state.name}
                        onChange={handleChange}
                        />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Email Address</label>
                    <input type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={state.email}
                        onChange={handleChange}
                        />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> 
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange}
                        />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleChange}
                        />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Register
                </button>
            </form>

            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>Already have an account?</span>
                <span className="loginText" onClick={() => redirectToLogin()}>Login</span> 
            </div>
        </div>
    )
}

export default withRouter(RegistrationForm);