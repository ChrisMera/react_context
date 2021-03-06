import React from 'react';

import { FAKE_USER } from './api';

const { Provider, Consumer } = React.createContext();
// returns an object with two properties =>
// Context.Consumer, Context.Provider

// holds state and dsitributes the state with the provider
class UserProvider extends React.Component {
  state = {
    currentUser: FAKE_USER
  };

  handleLogin = user => {
    this.setState({ currentUser: user });
  };

  handleLogout = () => {
    this.setState({ currentUser: null });
  };

  render() {
    return (
      <Provider
        value={{
          user: this.state.currentUser,
          onLogin: this.handleLogin,
          onLogout: this.handleLogout
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}
export { UserProvider, Consumer as UserConsumer };
// export whole context object