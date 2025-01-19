import React, { useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { putRequest } from '../../fetch';
import './editDetails.css';

const EditDetails = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [passwordChange, setPasswordChange] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const editDetails = async (element) => {
        element.preventDefault();
        const updatedUser = {
            firstName: element.target[0].value,
            lastName: element.target[1].value,
            phone: element.target[2].value,
            email: element.target[3].value
        };

        try {
            const response = await putRequest(`users/${currentUser.id}`, updatedUser);
            if (response.ok) {
                setUpdateSuccess(true);
                setCurrentUser({
                    ...currentUser,
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    email: updatedUser.email,
                    phone: updatedUser.phone
                });
            }
        } catch (error) {
            console.error('Error fetching waitingForDriver rides:', error);
        }
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        const currentPassword = e.target[0].value;
        const newPassword = e.target[1].value;
        const confirmPassword = e.target[2].value;

        if (newPassword !== confirmPassword) {
            setPasswordError('הסיסמאות אינן תואמות');
            return;
        }

        fetch(`http://localhost:8080/users/changePassword/${currentUser.id}`, {
            method: 'PUT',
            body: JSON.stringify({ currentPassword, newPassword }),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }).then(response => {
            if (response.status === 200) {
                setPasswordChange(false);
                alert('הסיסמה שונתה בהצלחה!');
            } else {
                alert('שגיאה בשינוי הסיסמה, נסה שוב.');
            }
        }).catch(error => {
            console.error('Error changing password:', error);
            alert("Oops, something went wrong... Please try again!");
        });
    };

    const handleConfirmation = () => {
        setUpdateSuccess(false);
        navigate(`/home/${currentUser.userType}/${currentUser.id}`);
    };

    return (
        <>
            <div className="overlay">
                <div className="modal">
                {updateSuccess && (
                        <div className="update-success-container">
                            <h2>הפרטים עודכנו בהצלחה!</h2>
                            <button onClick={handleConfirmation} className="confirm-button">אישור</button>
                        </div>
                    )}
                    <form onSubmit={editDetails}>
                        <label htmlFor="firstName">שם פרטי:</label>
                        <input id="firstName" type="text" defaultValue={currentUser.firstName} /><br />

                        <label htmlFor="lastName">שם משפחה:</label>
                        <input id="lastName" type="text" defaultValue={currentUser.lastName} /><br />

                        <label htmlFor="phone">📞:</label>
                        <input id="phone" type="tel" defaultValue={currentUser.phone} /><br />

                        <label htmlFor="email">מייל:</label>
                        <input id="email" type="email" defaultValue={currentUser.email} /><br />

                        {currentUser.userType === 'driver' &&
                            <>
                                <label htmlFor="religiousSector">מגזר דתי:</label>
                                <input id="religiousSector" type="text" defaultValue={currentUser.religiousSector} /><br />
                            </>
                        }

                        <input type="submit" value="ערוך" className="submit-button" />
                    </form>

                    <button onClick={() => setPasswordChange(true)} className="change-password-button">שינוי סיסמה</button>

                    {passwordChange && (
                        <div className="password-change-container">
                            <h2>שינוי סיסמה</h2>
                            <form onSubmit={handlePasswordChange}>
                                <label htmlFor="currentPassword">סיסמה נוכחית:</label>
                                <input id="currentPassword" type="password" required /><br />

                                <label htmlFor="newPassword">סיסמה חדשה:</label>
                                <input id="newPassword" type="password" required /><br />

                                <label htmlFor="confirmPassword">אימות סיסמה חדשה:</label>
                                <input id="confirmPassword" type="password" required /><br />

                                {passwordError && <p className="error">{passwordError}</p>}

                                <input type="submit" value="שמור" className="submit-button" />
                                <button type="button" onClick={() => setPasswordChange(false)} className="cancel-button">ביטול</button>
                            </form>
                        </div>
                    )}

                    
                </div>
            </div>
        </>
    );
};

export default EditDetails;


// import React, { useState, useContext } from 'react';
// import { UserContext } from '../../App';
// import { useNavigate } from 'react-router-dom';
// import { putRequest } from '../../fetch';
// import './editDetails.css';

// const EditDetails = () => {
//     const [currentUser, setCurrentUser] = useContext(UserContext);
//     const [updateSuccess, setUpdateSuccess] = useState(false);
//     const [passwordChange, setPasswordChange] = useState(false);
//     const [passwordError, setPasswordError] = useState('');
//     const navigate = useNavigate();

//     const editDetails =async (element) => {
//         element.preventDefault();
//         const updatedUser = {
//             firstName: element.target[0].value,
//             lastName: element.target[1].value,
//             phone: element.target[2].value,
//             email: element.target[3].value
//         };

//         try {
//             const response = await putRequest(`users/${currentUser.id}`, updatedUser)
//             if (response.ok) {
//                 setUpdateSuccess(true);
//                 setCurrentUser({
//                     ...currentUser,
//                     firstName: updatedUser.firstName,
//                     lastName: updatedUser.lastName,
//                     email: updatedUser.email,
//                     phone: updatedUser.phone
//                 });
//             }
//         } catch {
//             console.error('Error fetching waitingForDriver rides:', error);
//         }

//         // fetch(`http://localhost:8080/users/${currentUser.id}`, {
//         //     method: 'PUT',
//         //     body: JSON.stringify(updatedUser),
//         //     //cd
//         //     headers: { 'Content-Type': 'application/json; charset=UTF-8' }
//         // }).then(response => {
//         //     if (response.status === 200) {
//         //         setUpdateSuccess(true);
//         //         setCurrentUser({
//         //             ...currentUser,
//         //             firstName: updatedUser.firstName,
//         //             lastName: updatedUser.lastName,
//         //             email: updatedUser.email,
//         //             phone: updatedUser.phone
//         //         });
//         //     } else {
//         //         alert("Oops, something went wrong... Please try again!");
//         //     }
//         // }).catch(error => {
//         //     console.error('Error updating user:', error);
//         //     alert("Oops, something went wrong... Please try again!");
//         // });
//     }

//     const handlePasswordChange = (e) => {
//         e.preventDefault();
//         const currentPassword = e.target[0].value;
//         const newPassword = e.target[1].value;
//         const confirmPassword = e.target[2].value;

//         if (newPassword !== confirmPassword) {
//             setPasswordError('הסיסמאות אינן תואמות');
//             return;
//         }

//         fetch(`http://localhost:8080/users/changePassword/${currentUser.id}`, {
//             method: 'PUT',
//             body: JSON.stringify({ currentPassword, newPassword }),
//             //לשנות להדר
//             headers: { 'Content-Type': 'application/json; charset=UTF-8' }
//         }).then(response => {
//             if (response.status === 200) {
//                 setPasswordChange(false);
//                 alert('הסיסמה שונתה בהצלחה!');
//             } else {
//                 alert('שגיאה בשינוי הסיסמה, נסה שוב.');
//             }
//         }).catch(error => {
//             console.error('Error changing password:', error);
//             alert("Oops, something went wrong... Please try again!");
//         });
//     };

//     const handleConfirmation = () => {
//         setUpdateSuccess(false);
//         navigate(`/home/${currentUser.userType}/${currentUser.id}`);
//     };

//     return (
//         <>
//             <form onSubmit={editDetails}>
//                 <label htmlFor="firstName">שם פרטי:</label>
//                 <input id="firstName" type="text" defaultValue={currentUser.firstName} /><br />

//                 <label htmlFor="lastName">שם משפחה:</label>
//                 <input id="lastName" type="text" defaultValue={currentUser.lastName} /><br />

//                 <label htmlFor="phone">📞:</label>
//                 <input id="phone" type="tel" defaultValue={currentUser.phone} /><br />

//                 <label htmlFor="email">מייל:</label>
//                 <input id="email" type="email" defaultValue={currentUser.email} /><br />

//                 {currentUser.userType === 'driver' &&
//                     <>
//                         <label htmlFor="religiousSector">מגזר דתי:</label>
//                         <input id="religiousSector" type="text" defaultValue={currentUser.religiousSector} /><br />
//                     </>
//                 }

//                 <input type="submit" value="ערוך" />
//             </form>

//             <button onClick={() => setPasswordChange(true)}>שינוי סיסמה</button>

//             {passwordChange && (
//                 <div className="overlay">
//                     <div className="modal">
//                         <h2>שינוי סיסמה</h2>
//                         <form onSubmit={handlePasswordChange}>
//                             <label htmlFor="currentPassword">סיסמה נוכחית:</label>
//                             <input id="currentPassword" type="password" required /><br />

//                             <label htmlFor="newPassword">סיסמה חדשה:</label>
//                             <input id="newPassword" type="password" required /><br />

//                             <label htmlFor="confirmPassword">אימות סיסמה חדשה:</label>
//                             <input id="confirmPassword" type="password" required /><br />

//                             {passwordError && <p className="error">{passwordError}</p>}

//                             <input type="submit" value="שמור" />
//                             <button type="button" onClick={() => setPasswordChange(false)}>ביטול</button>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {updateSuccess && (
//                 <div className="overlay">
//                     <div className="modal">
//                         <h2>הפרטים עודכנו בהצלחה!</h2>
//                         <button onClick={handleConfirmation}>אישור</button>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default EditDetails;
