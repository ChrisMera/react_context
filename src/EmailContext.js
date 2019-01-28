import React from 'react';
import { fetchEmails, fetchLatestEmails } from './api';
import { withNotifier } from './NotificationContext'; 

const { Provider, Consumer} = React.createContext();

class EmailProvider extends React.Component {
  state = {
    emails: [],
    currentEmail: null,
    error: null,
    loading: false
  }

  // implement this lifecycle method to fecth the emails.
  componentDidMount() {
    this.setState({ loading: true, error: null });
    // call fetchEmails
    fetchEmails()
      // then setState with the email data. Save emails into state
      .then(emails => 
        this.setState({ loading: false, emails })
      )
      .catch(error => 
        this.setState({ loading: false, error })
      );
    this.refreshInterval = setInterval(this.refresh, 5000);
    
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  refresh = () => {
    if(!this.state.loading) {
      fetchLatestEmails().then(emails => {
        if (emails.length > 0) {
          this.setState(state => ({
            email: state.emails.concat(emails)
          }));
          // want to emit notification from here, after the state is set
          // notify!
          // below line is now available due to HOC created in NotificationContext file
          this.props.notify(`${emails.length} more emails arrived `);
        }
      });
    }
  };

  // method that will take an email
  handleSelectEmail = (email) => {
    // this will give consumers a function to call when they want to change the current email
    this.setState({ currentEmail: email });
  }

  render() {
    return (
      <Provider 
        value={{
          // This is a copy of state
          ...this.state,
          onSelectEmail: this.handleSelectEmail
        }}
      >{this.props.children}</Provider>
    )
  }
}

// need to wrap emailProvder with the withNotifier HOC from NotificationContext
// cannot dynamically export this by wrapping the EmailProvider with Notifier
// we need to create a variable
const Wrapped = withNotifier(EmailProvider);
// then export the email provider
export { 
  Wrapped as EmailProvider, 
  Consumer as EmailConsumer 
};