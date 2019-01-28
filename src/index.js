import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import { UserProvider, UserConsumer } from './UserContext';
import { EmailProvider } from './EmailContext'; 
import './index.css';

const Root = () => {
  return (
    /* The Context object's Provider property take a value prop*/
    /* the value prop is the value that gets passed down through the tree */
    /* To pass event handler functions down via the Context object, you can make a value object to pass, as demonstrated below*/
    <UserConsumer>
      {({ user, onLogin }) =>
        user ? (
          <MainPage />
        ) : (
            <LoginPage onLogin={onLogin} />
          )
      }
    </UserConsumer>
  );
}
// Put UserProvider at "top level" bc it may be easier for refactoring later
ReactDOM.render(
  // The app has access to the current user
  // and emails
  <UserProvider>
    <EmailProvider>
      <Root />
    </EmailProvider>
  </UserProvider>,
  document.querySelector('#root'));
