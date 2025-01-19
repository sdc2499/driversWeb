import React from 'react';
import Message from './Message';

const ChatWindow = ({
  activeChat,
  messages,
  messageInput,
  setMessageInput,
  sendMessage,
  closeChat,
  currentUser
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-window">
      <h3>שיחה עם המזכירה</h3>
      <button className="close-chat-button" onClick={closeChat}>❎</button>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <Message key={index} msg={msg} currentUser={currentUser} />
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyDown} 
          placeholder="הקלד הודעה..."
          disabled={!activeChat}
        />
        <button onClick={sendMessage} disabled={!activeChat}>שלח</button>
      </div>
    </div>
  );
};

export default ChatWindow;


// import React from 'react';
// import Message from './Message';

// const ChatWindow = ({
//   activeChat,
//   messages,
//   messageInput,
//   setMessageInput,
//   sendMessage,
//   closeChat,
//   currentUser
// }) => (
//   <div className="chat-window">
//     <h3>שיחה עם המזכירה</h3>
//     <button className="close-chat-button" onClick={closeChat}>❎</button>
//     <div className="chat-messages">
//       {messages.map((msg, index) => (
//         <Message key={index} msg={msg} currentUser={currentUser} />
//       ))}
//     </div>
//     <div className="chat-input">
//       <input
//         type="text"
//         value={messageInput}
//         onChange={(e) => setMessageInput(e.target.value)}
//         placeholder="הקלד הודעה..."
//         disabled={!activeChat}
//       />
//       <button onClick={sendMessage} disabled={!activeChat}>שלח</button>
//     </div>
//   </div>
// );

// export default ChatWindow;

