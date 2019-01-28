import React from 'react';
import { fetchEmails } from './api';

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
      .then(emails => this.setState({ loading: false, emails }))
      .catch(error => this.setState({ loading: false, error }))
  }

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

export { EmailProvider, Consumer as EmailConsumer };