import React, { useState } from 'react';
import './contact.css';
import { getTokenFromCookie } from "../../componnent/cookies";

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    try {
      const response = await fetch('http://localhost:8080/contact/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
                    'Authorization': getTokenFromCookie() },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('ההודעה נשלחה בהצלחה!');
        setFormData({ name: '', phone: '', message: '' });
        setTimeout(() => setSuccessMessage(''), 5000); // העלמת ההודעה אחרי 5 שניות
      } else {
        setSuccessMessage('אירעה שגיאה בשליחת ההודעה. נסו שוב מאוחר יותר.');
      }
    } catch (error) {
      setSuccessMessage('שגיאה: לא הצלחנו לשלוח את ההודעה.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="customer-service-container">
      <div className="customer-service-text">
        <h1>שירות לקוחות</h1>
        <p>יש לכם שאלה לגבי הזמנה או נסיעה?</p>
        <p>זקוקים לתמיכה טכנית? עזרה בהצטרפות לשירות?</p>
        <p>השאירו פרטים/התקשרו ונציגנו יצור איתכם קשר בהקדם.</p>
        <p>טלפון: 058-325-1093</p>
      </div>
      <div className="customer-service-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="שם"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="טלפון"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="הודעה"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'שולח...' : 'שליחה'}
          </button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default Contact;


// import React, { useState } from 'react';
// import './contact.css';
// import { getTokenFromCookie } from "../../componnent/cookies";

// const Contact = () => {
//     const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
//     const [responseMessage, setResponseMessage] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch('http://localhost:8080/contact/sendEmail', { 
//                 method: 'POST',
//                 headers: { 
//                     'Content-Type': 'application/json',
//                     'Authorization': getTokenFromCookie() },
//                 body: JSON.stringify(formData),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 setResponseMessage('ההודעה נשלחה בהצלחה!');
//                 setFormData({ name: '', phone: '', message: '' });
//             } else {
//                 setResponseMessage(data.error || 'שגיאה בשליחת ההודעה.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setResponseMessage('שגיאה בשרת.');
//         }
//     };

//     return (
//         <div className="customer-service-container">
//             <div className="customer-service-text">
//                 <h1>שירות לקוחות</h1>
//                 <p>יש לכם שאלה לגבי הזמנה או נסיעה?</p>
//                 <p>זקוקים לתמיכה טכנית? עזרה בהצטרפות לשירות?</p>
//                 <p>השאירו פרטים/התקשרו ונציגנו יצור איתכם קשר בהקדם.</p>
//                 <p>טלפון: 058-325-1093</p>
//             </div>
//             <div className="customer-service-form">
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         type="text"
//                         name="name"
//                         placeholder="שם"
//                         value={formData.name}
//                         onChange={handleChange}
//                     />
//                     <input
//                         type="tel"
//                         name="phone"
//                         placeholder="טלפון"
//                         value={formData.phone}
//                         onChange={handleChange}
//                     />
//                     <textarea
//                         name="message"
//                         placeholder="הודעה"
//                         value={formData.message}
//                         onChange={handleChange}
//                     ></textarea>
//                     <input type="submit" value="שליחה" />
//                 </form>
//                 {responseMessage && <p>{responseMessage}</p>}
//             </div>
//         </div>
//     );
// };

// export default Contact;

