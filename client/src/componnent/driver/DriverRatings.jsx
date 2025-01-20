import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { getRequest } from "../../fetch";

const PAGE_SIZE = 6; // מספר הדירוגים בעמוד אחד

const DriverRatings = () => {
    const [currentUser] = useContext(UserContext);
    const [ratings, setRatings] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    
    const fetchRatings = async (driverId) => {
        try {
            const response = await getRequest(`drivers/${driverId}/ratings`);
            if (response.ok) {
                const data = await response.json();
                return data["data"];
            }
        } catch (error) {
            console.error("Error fetching ratings:", error);
        }
        return [];
    };

    useEffect(() => {
        const fetchDriverRatings = async () => {
            const fetchedRatings = await fetchRatings(currentUser.id);
            setRatings(fetchedRatings || []);
        };

        fetchDriverRatings();
    }, [currentUser.id]);

    const handleNextPage = () => {
        if ((currentPage + 1) * PAGE_SIZE < ratings.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // דירוגים לעמוד הנוכחי
    const paginatedRatings = ratings.slice(
        currentPage * PAGE_SIZE,
        (currentPage + 1) * PAGE_SIZE
    );

    return (
        <div className="driver-ratings-container">
            <h1>דירוגים שלך</h1>
            <div className="ratings-grid">
                {paginatedRatings.map((rating, index) => (
                    <div key={index} className="rating-card">
                        <p><strong>לקוח:</strong> {rating.userId}</p>
                        <p><strong>ציון:</strong> {rating.stars} / 5</p>
                        <p><strong>חוות דעת:</strong> {rating.ratingMsg}</p>
                    </div>
                ))}
            </div>
            <div className="pagination-buttons">
                <button onClick={handlePreviousPage} disabled={currentPage === 0}>
                    חזרה
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={(currentPage + 1) * PAGE_SIZE >= ratings.length}
                >
                    קדימה
                </button>
            </div>
        </div>
    );
};

export default DriverRatings;
