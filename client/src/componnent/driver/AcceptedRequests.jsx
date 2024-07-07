import { useState, useEffect, useContext } from "react";
import RequestDetails from "./RequestDetails"
import { UserContext } from "../../App";
import { getTokenFromCookie } from '../cookies/cookies';
import { getRequest } from "../../fetch";
const AcceptedRequests = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [acceptedRequests, setAcceptedRequests] = useState([])
    useEffect(() => {
        const fetchAcceptedRequests = async () => {
            try {
                const response = await getRequest(`rides/acceptedRequests/${currentUser.id}`)
                if (response.ok) {
                    const data = await response.json();
                    setAcceptedRequests(data.data);
                }
            } catch {
                console.error('Error fetching waitingForDriver rides:', error);
            }
        };

        fetchAcceptedRequests();

    }, []);

    return (
        <div className="accepted-requests">
            {acceptedRequests.map((acceptedRequest, index) => (
                <div className="accepted-request" key={index}>
                    <RequestDetails request={acceptedRequest} />
                </div>
            ))}
        </div>
    )
}
export default AcceptedRequests