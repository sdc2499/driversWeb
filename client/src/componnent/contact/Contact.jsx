import React, { useState } from 'react';
import './contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: ''
    });

    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // כאן ניתן להוסיף לוגיקה לשליחת נתונים לשרת או לתהליך אחר
        setFormSubmitted(true);
    };

    return (
        <div className="contact-container">
            <h1>יצירת קשר</h1>
            <p>מספר טלפון: <a href="tel:+1234567890">+1234567890</a></p>

            <h2>טופס יצירת קשר</h2>
            {formSubmitted ? (
                <p>תודה שיצרתם קשר! נציג יחזור אליכם בהקדם האפשרי.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">שם:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email">אימייל:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="message">הודעה:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">שלח</button>
                </form>
            )}

            <h2>התכתבות עם מזכירה</h2>
            <p>לחץ כאן להתחיל התכתבות עם מזכירה זמינה:</p>
            <button onClick={() => window.location.href = 'mailto:secretary@company.com'}>צור קשר עם מזכירה</button>
        </div>
    );
};

export default Contact;
