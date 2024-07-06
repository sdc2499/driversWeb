import React from "react"
import './driver.css'
import Driver from "./Driver"

const RequestDetails = ({ request }) => {

    return (
        <>
            <p><strong>מ:</strong> {request.from || request.pickupLocation}</p>
            <p><strong>ל:</strong> {request.destination || request.to}</p>
            <p><strong>תאריך:</strong> {request.date}</p>
            <p><strong>שעה:</strong> {request.time}</p>
            <p><strong>מחיר:</strong> {request.price}</p>
            {request.guestPhone && <p><strong>טלפון(לקוח לא רשום):</strong> {request.guestPhone}</p>}
            {request.requestType === 'package' ? (
                <p><strong>גודל החבילה:</strong> {request.packageSize}</p>
            ) : (
                <div>
                    <p><strong>מספר נוסעים:</strong> {request.passengers}</p>
                </div>
            )}
        </>

    )
}
export default RequestDetails