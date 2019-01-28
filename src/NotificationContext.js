import React from 'react';

const { Provider, Consumer } = React.createContext();

class NotificationProvider extends React.Component {
  state = {
    messages: []
  };

  addMessage = text => {
    // set state based on existing state
    this.setState(state => ({
      //returning a new object with "messages" equal to a new array that 
      messages: [
        // contains all the old messages
        ...state.messages,
        // plus a new object
        {
          // with an id that is a random number
          id: Math.random(),
          // the text
          text,
          // the time this message was added
          addedAt: new Date().getTime()
        }
      ]
    }));
  };

  removeMessage = message => {
    // update state
    this.setState(state => ({
      // set messages to the existing messages, but filtered
      messages: state.messages.filter(m => (
        // only keeping the messages that are not the one we want to remove
        m.id !== message.id
      ))
    }));
  };

  render() {
    return(
      <Provider
        value={{
          ...this.state,
          notify: this.addMessage
        }}
      >
        <div className="notification-wrapper">
          <ul>
            {this.state.messages.map(message => (
              <Notification
                key={message.id}
                message={message}
                onClose={() => this.removeMessage(message)}
              />
            ))}
          </ul>
          {this.props.children}
        </div>
      </Provider>
    );
  }
}

const Notification = ({ message, onClose }) => (
  <li>
    {message.text}
    <button className="close" onClick={onClose}>&times;</button>
  </li>
);

// HOC
// Takes a component
function withNotifier(Component) {
  // it will return a new component that takes some props
  return function Notified(props) {
    return (
      <Consumer> 
        {({ notify }) => (
          // Render out the component, passing in the existing props and our notify callback
          <Component {...props} notify={notify} />
        )}
      </Consumer>
    );
  };
}

export { NotificationProvider, Consumer as Notifier, withNotifier };