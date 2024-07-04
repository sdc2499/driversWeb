import React, { useState } from 'react';
import Modal from 'react-modal';
import './ForgotPasswordModal.css';

Modal.setAppElement('#root');

const ForgotPasswordModal = ({ isOpen, closeModal }) => {
  const [phone, setPhone] = useState('');
  const [sentPassword, setSentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [emailSentSuccessfully, setEmailSentSuccessfully] = useState(false); // סטייט לצורך הצגת השדות של הסיסמה

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSentPasswordChange = (e) => {
    setSentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleSendPassword = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        setMessage('הסיסמאות החדשות אינן תואמות.');
        return;
      }

      const response = await fetch(`http://localhost:8080/passwordReset/passwordReset`, {
        method: 'POST',
        body: JSON.stringify({ phone, sentPassword, newPassword, confirmNewPassword }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      });

      if (response.ok) {
        setMessage('סיסמה זמנית נשלחה בהצלחה.');
        setEmailSentSuccessfully(true); // מצב מייל נשלח בהצלחה
        // לאחר שהשליחה הצליחה, אפשר לאפס את השדות
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
      <div className="modal-content">
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


          {/* תנאי להצגת שדות הסיסמה רק אם המייל נשלח בהצלחה */}
          <><label>
            סיסמה שנשלחה:
            <input
              type="password"
              value={sentPassword}
              onChange={handleSentPasswordChange}
              required
              disabled={!emailSentSuccessfully}
            />
          </label>
            <label>
              סיסמה חדשה:
              <input
                type="password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
                disabled={!emailSentSuccessfully}

              />
            </label>
            <label>
              אימות סיסמה חדשה:
              <input
                type="password"
                value={confirmNewPassword}
                onChange={handleConfirmNewPasswordChange}
                required
                disabled={!emailSentSuccessfully}

              />
            </label>
          </>


          <button type="button" onClick={handleSendPassword}>
            קבלת סיסמה חד פעמית
          </button>
        </form>
        {message && <p className="message">{message}</p>}
        <button className="close-button" onClick={closeModal}>סגור</button>
      </div>
    </Modal>
  );
};

export default ForgotPasswordModal;
