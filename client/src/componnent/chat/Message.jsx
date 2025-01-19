import React from 'react';

const Message = ({ msg, currentUser }) => (
  <div className={msg.userName === currentUser.firstName ? 'message sent' : 'message received'}>
    <p><strong>{msg.userName}</strong>: {msg.text}</p>
    <p className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</p>
  </div>
);

export default Message;

