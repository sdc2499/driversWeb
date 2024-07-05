import React, { useState } from 'react';
import Modal from 'react-modal';
import './ForgotPasswordModal.css';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
Modal.setAppElement('#root');

const ForgotPasswordModal = ({ isOpen, closeModal }) => {
  const [phone, setPhone] = useState('');
  const [sentPassword, setSentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [emailSentSuccessfully, setEmailSentSuccessfully] = useState(false);
  const [userId, setUserId] = useState();
  const [showPassword, setShowPassword] = useState({
    sentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const toggleShowPassword = (field) => {
    setShowPassword(prevState => ({ ...prevState, [field]: !prevState[field] }));
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


      const response = await fetch(`http://localhost:8080/passwordReset/passwordReset`, {
        method: 'POST',
        body: JSON.stringify({ phone }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      });

      if (response.ok) {
        setMessage('סיסמה זמנית נשלחה בהצלחה.');
        setEmailSentSuccessfully(true); // מצב מייל נשלח בהצלחה
        // לאחר שהשליחה הצליחה, אפשר לאפס את השדות
        const data = await response.json();
        setUserId(data.data)
        console.log(userId + data)
      } else {
        throw new Error('שגיאה בשליחת סיסמה זמנית.');
      }
    } catch (error) {
      setMessage('שגיאה בשליחת סיסמה זמנית.');
    }
  };

  const handlePasswordUpdate = async () => {

    try {
      if (newPassword !== confirmNewPassword) {
        setMessage('הסיסמאות החדשות אינן תואמות.');
        setSentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        return;
      }
      const response = await fetch(`http://localhost:8080/passwordReset/passwordUpdate`, {
        method: 'POST',
        body: JSON.stringify({ sentPassword, newPassword, userId }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      });

      if (response.ok) {
        setMessage('הסיסמה עודכנה בהצלחה.');
        setSentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        throw new Error('שגיאה בעדכון הסיסמה.');
      }
    } catch (error) {
      setSentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setMessage('יש שגיאה בעדכון הסיסמה יש לנסות שוב.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="Modal"
      overlayClassName="Overlay"
    >
      <button className="close-button" onClick={closeModal}>❌</button>
      <div className="modal-content">
        <h2>שחזור סיסמה</h2>
        <form>

          <input
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            required
            placeholder="מספר הטלפון המופיע במערכת"
          />


          {/* תנאי להצגת שדות הסיסמה רק אם המייל נשלח בהצלחה */}

          <div className="password-container">
                <input
                  type={showPassword.sentPassword ? "text" : "password"}
                  value={sentPassword}
                  onChange={handleSentPasswordChange}
                  required
                  placeholder="הסיסמא שנשלחה"
                  disabled={!emailSentSuccessfully}
                />
                <span
                  className="toggle-password"
                  onClick={() => toggleShowPassword('sentPassword')}
                >
                  {showPassword.sentPassword ? <FaEyeSlash/> : <FaEye/>}
                </span>
              </div>

              <div className="password-container">
                <input
                  type={showPassword.newPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  required
                  disabled={!emailSentSuccessfully}
                  placeholder="סיסמא חדשה"
                />
                <span
                  className="toggle-password"
                  onClick={() => toggleShowPassword('newPassword')}
                >
                  {showPassword.newPassword ?  <FaEyeSlash/> : <FaEye/>}
                </span>
              </div>

              <div className="password-container">
                <input
                  type={showPassword.confirmNewPassword ? "text" : "password"}
                  value={confirmNewPassword}
                  onChange={handleConfirmNewPasswordChange}
                  required
                  disabled={!emailSentSuccessfully}
                  placeholder="אימות סיסמא חדשה"
                />
                <span
                  className="toggle-password"
                  onClick={() => toggleShowPassword('confirmNewPassword')}
                >
                  {showPassword.confirmNewPassword ?  <FaEyeSlash/> : <FaEye/>}
                </span>
              </div>
          <input
            type="password" value={confirmNewPassword} onChange={handleConfirmNewPasswordChange}
            required disabled={!emailSentSuccessfully} placeholder="אימות סיסמא חדשה"
          />

          <button className={`btnSend ${emailSentSuccessfully ? 'disabled' : ''}`} disabled={emailSentSuccessfully} type="button" onClick={handleSendPassword}> קבלת סיסמה חד פעמית</button>
          <div className="button-row">
            <button disabled={!emailSentSuccessfully} className={`btnSend ${!emailSentSuccessfully ? 'disabled' : ''}`} type="button" onClick={handleSendPassword}>קבלה סיסמא חוזרת</button>

            <button className={`btnSend ${!emailSentSuccessfully ? 'disabled' : ''}`}
              disabled={!emailSentSuccessfully} type="button" onClick={handlePasswordUpdate}>עדכון סיסמה</button>
          </div>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </Modal>
  );
};

export default ForgotPasswordModal;


