import React from 'react';

const ChatRequests = ({ chatRequests, handleResponse }) => {
  return chatRequests.map((request, index) => (
    <div className="notification show" key={index}>
      <p>{request.userName} רוצה להתחיל שיחה</p>
      <button onClick={() => handleResponse(request.customerSocketId, true)}>אשר</button>
      <button onClick={() => handleResponse(request.customerSocketId, false)}>דחה</button>
    </div>
  ));
};

export default ChatRequests;
