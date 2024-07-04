import React, { useState } from 'react';
import Modal from 'react-modal';
import './ForgotPasswordModal.css';

Modal.setAppElement('#root');

const ForgotPasswordModal = ({ isOpen, closeModal }) => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSendPassword = async () => {
    try {
      const response = await fetch(`http://localhost:8080/passwordReset/passwordReset`, {
        method: 'POST',
        body: JSON.stringify({phone: phone }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }

      });
      
      if (response.ok) {
        setMessage('סיסמה זמנית נשלחה בהצלחה.');
      } else {
        throw new Error('שגיאה בשליחת סיסמה זמנית.');
      }
    } catch (error) {
      setMessage('שגיאה בשליחת סיסמה זמנית.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="Modal"
      overlayClassName="Overlay"
    >
      <h2>שחזור סיסמה</h2>
      <form>
        <label>
          מספר טלפון:
          <input
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            required
          />
        </label>
        <button type="button" onClick={handleSendPassword}>
          קבלת סיסמה חד פעמית
        </button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={closeModal}>סגור</button>
    </Modal>
  );
};

export default ForgotPasswordModal;
