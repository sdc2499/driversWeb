import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import socketIOClient from 'socket.io-client';
import ChatRequests from './ChatRequests';
import ChatWindow from './ChatWindow';
import './Chat.css';

const SOCKET_SERVER_URL = 'http://localhost:8080';

const SecretaryChat = () => {
  const [currentUser] = useContext(UserContext);
  const [socket] = useState(socketIOClient(SOCKET_SERVER_URL));
  const [chatRequests, setChatRequests] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [handlingRequest, setHandlingRequest] = useState(false);

  useEffect(() => {
    const handleChatRequest = (data) => {
      if (!handlingRequest) {
        setChatRequests((prevRequests) => [...prevRequests, data]);
      }
    };

    const handleIncomingMessage = (message) => {
      if (message.senderId === activeChat?.customerSocketId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    socket.on('chatRequestForSecretary', handleChatRequest);
    socket.on('receiveMessage', handleIncomingMessage);

    return () => {
      socket.off('chatRequestForSecretary', handleChatRequest);
      socket.off('receiveMessage', handleIncomingMessage);
    };
  }, [socket, activeChat, handlingRequest]);

  const handleResponse = (customerSocketId, accepted) => {
    const response = accepted ? 'המזכירה אישרה את השיחה' : 'המזכירה דחתה את הבקשה';
    socket.emit('respondToChatRequest', { customerSocketId, accepted, message: response, secretarySocketId: socket.id });

    setHandlingRequest(true);
    setChatRequests((prevRequests) => prevRequests.filter(req => req.customerSocketId !== customerSocketId));

    if (accepted) {
      const acceptedChat = chatRequests.find(req => req.customerSocketId === customerSocketId);
      setActiveChat(acceptedChat);
      setMessages([]);
    }
  };

  const sendMessage = () => {
    if (messageInput.trim() === '') return;

    const message = {
      senderId: socket.id,
      recipientId: activeChat.customerSocketId,
      userName: currentUser.firstName,
      text: messageInput,
      timestamp: new Date().toISOString()
    };

    socket.emit('sendMessage', message);
    setMessages((prevMessages) => [...prevMessages, message]);
    setMessageInput('');
  };

  const closeChat = () => {
    const closingMessage = {
      senderId: socket.id,
      recipientId: activeChat.customerSocketId,
      userName: currentUser.firstName,
      text: 'המזכירה סיימה את השיחה',
      timestamp: new Date().toISOString()
    };

    socket.emit('sendMessage', closingMessage);
    setMessages((prevMessages) => [...prevMessages, closingMessage]);

    setTimeout(() => {
      setActiveChat(null);
      setMessages([]);
      setHandlingRequest(false);
    }, 500);
  };

  return (
    <div>
      <ChatRequests
        chatRequests={chatRequests}
        handleResponse={handleResponse}
      />
      {activeChat && (
        <ChatWindow
          activeChat={activeChat}
          messages={messages}
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          sendMessage={sendMessage}
          closeChat={closeChat}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default SecretaryChat;



// import React, { useContext, useEffect, useState } from 'react';
// import { UserContext } from '../../App';
// import socketIOClient from 'socket.io-client';
// import './Chat.css';

// const SecretaryChat = () => {
//   const [currentUser] = useContext(UserContext);
//   const [socket] = useState(socketIOClient('http://localhost:8080'));
//   const [chatRequests, setChatRequests] = useState([]);
//   const [activeChat, setActiveChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState('');
//   const [handlingRequest, setHandlingRequest] = useState(false); // משתנה סוג בוליאני לניהול בקשת שיחה בלבד

//   useEffect(() => {
//     const handleChatRequest = (data) => {
//       if (!handlingRequest) { // בדיקה האם כבר קיימת בקשת שיחה בטיפול
//         setChatRequests((prevRequests) => [...prevRequests, data]);
//       }
//     };

//     socket.on('chatRequestForSecretary', handleChatRequest);

//     const handleIncomingMessage = (message) => {
//       if (message.senderId === activeChat?.customerSocketId) {
//         setMessages((prevMessages) => [...prevMessages, message]);
//       }
//     };

//     socket.on('receiveMessage', handleIncomingMessage);

//     return () => {
//       socket.off('chatRequestForSecretary', handleChatRequest);
//       socket.off('receiveMessage', handleIncomingMessage);
//     };
//   }, [socket, activeChat, handlingRequest]);

//   const handleResponse = (customerSocketId, accepted) => {
//     const response = accepted ? 'המזכירה אישרה את השיחה' : 'המזכירה דחתה את הבקשה';
//     socket.emit('respondToChatRequest', { customerSocketId, accepted, message: response, secretarySocketId: socket.id });

//     setHandlingRequest(true); // סימון שכרגע יש בטיפול בבקשת שיחה

//     setChatRequests((prevRequests) => prevRequests.filter(req => req.customerSocketId !== customerSocketId));

//     if (accepted) {
//       const acceptedChat = chatRequests.find(req => req.customerSocketId === customerSocketId);
//       setActiveChat(acceptedChat);
//       setMessages([]);
//     }
//   };

//   const sendMessage = () => {
//     if (messageInput.trim() === '') return;

//     const message = {
//       senderId: socket.id,
//       recipientId: activeChat.customerSocketId,
//       userName: currentUser.firstName,
//       text: messageInput,
//       timestamp: new Date().toISOString()
//     };

//     socket.emit('sendMessage', message);
//     setMessages((prevMessages) => [...prevMessages, message]);
//     setMessageInput('');
//   };

//   const closeChat = () => {
//     const closingMessage = {
//       senderId: socket.id,
//       recipientId: activeChat.customerSocketId,
//       userName: currentUser.firstName,
//       text: 'המזכירה סיימה את השיחה',
//       timestamp: new Date().toISOString()
//     };

//     socket.emit('sendMessage', closingMessage);
//     setMessages((prevMessages) => [...prevMessages, closingMessage]);

//     setTimeout(() => {
//       setActiveChat(null);
//       setMessages([]);
//       setHandlingRequest(false); // סיום טיפול בבקשת שיחה
//     }, 500); // השהייה כדי לוודא שהודעת הסגירה תשלח לפני סגירת השיחה
//   };

//   return (
//     <div>
//       {chatRequests.map((request, index) => (
//         <div className="notification show" key={index}>
//           <p>{request.userName} רוצה להתחיל שיחה</p>
//           <button onClick={() => handleResponse(request.customerSocketId, true)}>אשר</button>
//           <button onClick={() => handleResponse(request.customerSocketId, false)}>דחה</button>
//         </div>
//       ))}

//       {activeChat && (
//         <div className="chat-window">
//           <h3>שיחה עם {activeChat.userName} ({activeChat.customerSocketId})</h3>
//           <button className="close-chat-button" onClick={closeChat}>❎</button>
//           <div className="chat-messages">
//             {messages.map((msg, index) => (
//               <div key={index} className={msg.userName === currentUser.firstName ? 'message sent' : 'message received'}>
//                 <p><strong>{msg.userName}</strong>: {msg.text}</p>
//                 <p className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</p>
//               </div>
//             ))}
//           </div>
//           <div className="chat-input">
//             <input 
//               type="text" 
//               value={messageInput} 
//               onChange={(e) => setMessageInput(e.target.value)} 
//               placeholder="הקלד הודעה..." 
//             />
//             <button onClick={sendMessage}>שלח</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SecretaryChat;
