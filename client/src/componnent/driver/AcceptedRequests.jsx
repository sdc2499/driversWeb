import { useState, useEffect, useContext } from "react";
import RequestDetails from "./RequestDetails"
import { UserContext } from "../../App";

const AcceptedRequests = () => {

    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [acceptedRequests, setAcceptedRequests] = useState([])
    useEffect(() => {
        const fetchAcceptedRequests = async () => {
            try {
                const response = await fetch(`http://localhost:8080/rides/acceptedRequests/${currentUser.id}`, {
                    headers: { Authorization: currentUser.token }
                });
                const data = await response.json();
                setAcceptedRequests(data.data);
            } catch (error) {
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