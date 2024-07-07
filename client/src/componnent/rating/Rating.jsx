import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getTokenFromCookie } from '../cookies/cookies';
import './ratingPage.css';
import { useParams } from 'react-router-dom';
import { postRequest } from '../../fetch';
const RatingPage = () => {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const { token } = useParams();
    const stars = Array.from({ length: 5 }, (_, index) => index + 1);

    const handleStarClick = (star) => {
        setRating(star);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const ratingDriver = {
            stars: rating,
            ratingMsg: comment,
        }

        try {
            const response = await postRequest(`drivers/rating?token=${token}`,ratingDriver)
            console.log(response)
            if (response.ok) {
                alert("הדירוג בוצע בהצלחה תודה לך!!!");
                navigate(`/thank`);
            } else {
                alert("אין לדרג יותר מפעם אחת");
            }
        } catch {
            console.error('Error fetching waitingForDriver rides:');
        }
    };

    return (
        <div className="rating-container">
            <h2>דירוג נהג</h2>
            <div className="rating-stars">
                {stars.map(star => (
                    <FaStar
                        key={star}
                        size={40}
                        className={`star ${star <= rating ? 'filled' : 'empty'}`}
                        onClick={() => handleStarClick(star)}
                    />
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="כתוב תגובה חופשית"
                />
                <button type="submit">שלח דירוג</button>
            </form>
        </div>
    );
};

export default RatingPage;
