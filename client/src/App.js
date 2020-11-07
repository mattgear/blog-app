import React, {Component, useState} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import axios from 'axios';

import Header from './components/Header/header';
import RegistrationForm from './components/RegForm/registrationForm';
import LoginForm from './components/LoginForm/loginForm';
import Home from './components/Home/home';
import AlertComponent from './components/AlertComponent/alertComponent';

function App(){
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);

  return (
    <Router>
    <div className="App">
      <Header title={title}/>
      <div className="container d-flex align-items-center flex-column">
        <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/register" exact={true}>
            <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
          </Route>
          <Route path="/login" exact={true}>
            <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
          </Route>
          <Route path="/home" exact={true}>
            <Home />
          </Route>
        </Switch>
        <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
      </div>
    </div>
    </Router>
  );
}

/*
class App extends Component {
  state = {
    response: {}
  };

  componentDidMount() {
    axios.get('/api/v1/say-something').then((res) => {
      const response = res.data;
      this.setState({response});
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Hello from the frontend!</h1>
        <h1>{this.state.response.body}</h1>
      </div>
    );
  }
}
*/

export default App;