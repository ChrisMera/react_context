import React from 'react';
import UserContext from './UserContext';

const MessageList = () => (
  /* Use Context object's Consumer property to get a value out of it*/
  /* Wrap the component which you want to pass the prop values to with the Context object's Consumer property*/ 
  /* Consumer expects you to pass a single function as a child, not an element! */
  /* Thus you need to pass a function dynamically in between the UserContext.Consumer tags to wrap the element in a function to satisfy the Consumer property expectations: 
    {({ value }) => (
      <div className="element">
        ...
      </div>
    )} */
  <UserContext.Consumer>
    {({ user }) => (
      <div className="MessageList">
        <div className="no-messages">
          Your mailbox is empty, {user.firstName}! 🎉
        </div>
      </div>
    )}
  </UserContext.Consumer>
);

export default MessageList;
