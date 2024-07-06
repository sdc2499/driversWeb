import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import './ratingPage.css';
import { useParams } from 'react-router-dom';
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

    const handleSubmit = (event) => {
        // console.log("id " + id + "   driverId  " + driverId)
        event.preventDefault();
        console.log(`דירוג: ${rating}`);
        console.log(`תגובה: ${comment}`);
        const ratingDriver = {
            // driverId: driverId,
            stars: rating,
            ratingMsg: comment,
            // userPhone: id
        }
        console.log(ratingDriver)
        fetch(`http://localhost:8080/drivers/rating?token=${token}`, {
            method: 'POST',
            body: JSON.stringify(ratingDriver),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': currentUser.token
            }
        }).then(response => {
            if (response.status === 200) {
                alert("הדירוג בוצע בהצלחה תודה לך!!!");
                navigate(`/thank`);
            } else {
                console.log("res" + response)
                alert("אין לדרג יותר מפעם אחת");
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
