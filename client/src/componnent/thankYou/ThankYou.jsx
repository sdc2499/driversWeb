import React from 'react';
import './thankYou.css';

import { useNavigate ,NavLink} from 'react-router-dom';

const ThankYou = () => {
const navigate = useNavigate();
    return (
        <div className="thank-you-container">
            <div className="thank-you-message">
                <h1>תודה על הדירוג!</h1>
                <p>המשוב שלך חשוב לנו ועוזר לנו להשתפר.</p>
                <NavLink to={`/home/main`}>לעמוד ראשי</NavLink><br />
            </div>
        </div>
    );
};

export default ThankYou;
