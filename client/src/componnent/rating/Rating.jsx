import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

import './ratingPage.css'; // קובץ ה-CSS שלנו
import { useParams } from 'react-router-dom';
const RatingPage = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const { driverId, id} = useParams();
    const stars = Array.from({ length: 5 }, (_, index) => index + 1);

    const handleStarClick = (star) => {
        setRating(star);
    };

    const handleSubmit = (event) => {
        console.log("id "+id+"   driverId  "+driverId)
        event.preventDefault();
        console.log(`דירוג: ${rating}`);
        console.log(`תגובה: ${comment}`);
        const ratingDriver={
            driverId:driverId,
            stars:rating,
            ratingMsg:comment,
            userPhone:id
        }

        fetch(`http://localhost:8080/drivers/rating`, {
            method: 'POST',
            body: JSON.stringify(ratingDriver),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }).then(response => {
            if (response.status === 200) {
                alert("הדירוג בוצע בהצלחה תודה לך!!!");

            } else {
                console.log("res"+response)
                alert("Oops, something went wrong... Please try again!");
            }
        }).catch(error => {
            console.error('Error updating user:', error);
            alert("Oops, something went wrong... Please try again!");
        });
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
