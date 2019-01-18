import React from 'react';

import { login } from './api';

import UserContext from './UserContext';

class LoginPage extends React.Component {
  state = {
    error: null,
    loading: false,
    username: '',
    password: ''
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  // Added additional parameter to be received in handler function, which can then be used directly 
  handleSubmit = (e, onLogin) => {
    e.preventDefault();
    this.setState({ loading: true, error: null });
    login(this.state.username, this.state.password)
      .then(user => {
        this.setState({ loading: false });
        onLogin(user);
      })
      .catch(error => this.setState({ error, loading: false }));
  };

  render() {
    const { username, password, error, loading } = this.state;

    return (
      /* Wrap content with Context.Consumer */
      /* Use render props pattern to desctructure onLogin property from the Context object */
      /* To use the destructured property from the Context object in a handler function (aka not being used in the render), you will need to set an additional parameter (the destructured property from the Context object will be passed as the argument) in the handler function */
      /* Then you will need to make an es6 arrow function for the, in this case, onSubmit prop, that takes the event (e) and calls handleSubmit with the event and the destructured property/function (which we got from Context), as the arguments */
      <UserContext.Consumer>
        {({ onLogin }) => (
          <div className="LoginPage">
            <form onSubmit={e => this.handleSubmit(e, onLogin)}>
              <label>
                Username
                <input
                  name="username"
                  value={username}
                  onChange={this.handleInputChange}
                />
              </label>
              <label>
                Password
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.handleInputChange}
                />
              </label>
              {error && <div className="error">{error.message}</div>}
              <button type="submit" disabled={loading}>
                Sign In
              </button>
            </form>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export default LoginPage;
