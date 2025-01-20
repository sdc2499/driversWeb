import { useState, useEffect, useContext } from "react";
import RequestDetails from "./RequestDetails";
import { UserContext } from "../../App";
import { getRequest } from "../../fetch";

const PAGE_SIZE = 4; // מספר הנסיעות שיוצגו בכל עמוד

const AcceptedRequests = () => {
    const [currentUser] = useContext(UserContext);
    const [acceptedRequests, setAcceptedRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchAcceptedRequests = async () => {
            try {
                const response = await getRequest(`rides/acceptedRequests/${currentUser.id}`);
                if (response.ok) {
                    const data = await response.json();
                    // מיון בסדר הפוך (נסיעות אחרונות תחילה)
                    setAcceptedRequests(data.data.reverse());
                }
            } catch (error) {
                console.error("Error fetching accepted requests:", error);
            }
        };

        fetchAcceptedRequests();
    }, [currentUser.id]);

    const handleNextPage = () => {
        if ((currentPage + 1) * PAGE_SIZE < acceptedRequests.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // חישוב הנסיעות שיוצגו לפי העמוד הנוכחי
    const paginatedRequests = acceptedRequests.slice(
        currentPage * PAGE_SIZE,
        (currentPage + 1) * PAGE_SIZE
    );

    return (
        <div className="accepted-requests">
            <div className="requests-grid">
                {paginatedRequests.map((acceptedRequest, index) => (
                    <div className="accepted-request" key={index}>
                        <RequestDetails request={acceptedRequest} />
                    </div>
                ))}
            </div>
            <div className="pagination-buttons">
                <button onClick={handlePreviousPage} disabled={currentPage === 0}>
                    חזרה
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={(currentPage + 1) * PAGE_SIZE >= acceptedRequests.length}
                >
                    קדימה
                </button>
            </div>
        </div>
    );
};

export default AcceptedRequests;




// import { useState, useEffect, useContext } from "react";
// import RequestDetails from "./RequestDetails"
// import { UserContext } from "../../App";
// import { getTokenFromCookie } from '../cookies/cookies';
// import { getRequest } from "../../fetch";
// const AcceptedRequests = () => {
//     const [currentUser, setCurrentUser] = useContext(UserContext);
//     const [acceptedRequests, setAcceptedRequests] = useState([])
//     useEffect(() => {
//         const fetchAcceptedRequests = async () => {
//             try {
//                 const response = await getRequest(`rides/acceptedRequests/${currentUser.id}`)
//                 if (response.ok) {
//                     const data = await response.json();
//                     setAcceptedRequests(data.data);
//                 }
//             } catch {
//                 console.error('Error fetching waitingForDriver rides:', error);
//             }
//         };

//         fetchAcceptedRequests();

//     }, []);

//     return (
//         <div className="accepted-requests">
//             {acceptedRequests.map((acceptedRequest, index) => (
//                 <div className="accepted-request" key={index}>
//                     <RequestDetails request={acceptedRequest} />
//                 </div>
//             ))}
//         </div>
//     )
// }
// export default AcceptedRequests