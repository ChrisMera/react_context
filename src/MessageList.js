import React from 'react';
import { UserConsumer } from './UserContext';
import { EmailConsumer } from './EmailContext';

const MessageList = () => (
  /* Use Context object's Consumer property to get a prop value that is being passed down to the component*/
  /* Wrap the component which you want to pass the prop values to with the Context object's Consumer property*/
  /* Consumer expects you to pass a single function as a child, not an element! */
  /* Thus you need to pass a function dynamically in between the UserContext.Consumer tags to wrap the element in a function to satisfy the Consumer property expectations: 
    {({ value }) => (
      <div className="element">
        ...
      </div>
    )} */
  /* Need to destrucure the object and pull out the user property */
  // Since the component is already consuming 1 context, we can just add our second, emailContext, inside  
  <UserConsumer>
    {({ user }) => (
      <EmailConsumer>
        {({ loading, emails, onSelectEmail }) => (
          <div className="MessageList">
            {loading ?
              <div className="no-messages">Loading...</div> :
              emails.length === 0 ? 
            <div className="no-messages">
              Your mailbox is empty, {user.firstName}! 🎉
            </div> :
            <ul>
              {emails.map(email => 
                <Email key={email.id} 
                  email={email}
                  onClick={() => onSelectEmail(email)}
                />
              )}
            </ul>}
          </div>
        )}
      </EmailConsumer>
    )}
  </UserConsumer>
);

const Email = ({ email, onClick }) => (
  <li onClick={onClick}>
    <div className="subject">{email.subject}</div>
    <div className="preview">{email.preview}</div>

  </li>
)
export default MessageList;
