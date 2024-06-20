// import React, { useState, useContext } from 'react';
// import { UserContext } from '../../App';
// import { useNavigate } from 'react-router-dom';
// import './editDetails.css'; // לייבא את קובץ ה-CSS

// const EditDetails = () => {
//     const [currentUser, setCurrentUser] = useContext(UserContext);
//     const [updateSuccess, setUpdateSuccess] = useState(false);
//     const navigate = useNavigate();

//     const editDetails = (element) => {
//         element.preventDefault();
//         const updatedUser = {
//             firstName: element.target[0].value,
//             lastName: element.target[1].value,
//             phone: element.target[2].value,
//             email: element.target[3].value
//         };
//         console.log("updatedUser:::" + updatedUser + " " + updatedUser.phone);

//         fetch(`http://localhost:8080/users/${currentUser.id}`, {
//             method: 'PUT',
//             body: JSON.stringify(updatedUser),
//             headers: { 'Content-Type': 'application/json; charset=UTF-8' }
//         }).then(response => {
//             if (response.status === 200) {
//                 setUpdateSuccess(true);
//                 setCurrentUser({
//                     ...currentUser,
//                     firstName: updatedUser.firstName,
//                     lastName: updatedUser.lastName,
//                     email: updatedUser.email,
//                     phone: updatedUser.phone
//                 });
//             } else {
//                 alert("Oops, something went wrong... Please try again!");
//             }
//         }).catch(error => {
//             console.error('Error updating user:', error);
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
//                 <label htmlFor="firstName">firstName:</label>
//                 <input id="firstName" type="text" defaultValue={currentUser.firstName} /><br />

//                 <label htmlFor="lastName">lastName:</label>
//                 <input id="lastName" type="text" defaultValue={currentUser.lastName} /><br />

//                 <label htmlFor="phone">phone:</label>
//                 <input id="phone" type="tel" defaultValue={currentUser.phone} /><br />

//                 <label htmlFor="email">email:</label>
//                 <input id="email" type="email" defaultValue={currentUser.email} /><br />

//                 {currentUser.userType === 'driver' &&
//                     <>
//                         <label htmlFor="religiousSector">religiousSector:</label>
//                         <input id="religiousSector" type="text" defaultValue={currentUser.religiousSector} /><br />
//                     </>
//                 }

//                 <input type="submit" value="edit" />
//             </form>

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


import React, { useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import './editDetails.css'; // לייבא את קובץ ה-CSS

const EditDetails = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [passwordChange, setPasswordChange] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const editDetails = (element) => {
        element.preventDefault();
        const updatedUser = {
            firstName: element.target[0].value,
            lastName: element.target[1].value,
            phone: element.target[2].value,
            email: element.target[3].value
        };
        console.log("updatedUser:::" + updatedUser + " " + updatedUser.phone);

        fetch(`http://localhost:8080/users/${currentUser.id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedUser),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }).then(response => {
            if (response.status === 200) {
                setUpdateSuccess(true);
                setCurrentUser({
                    ...currentUser,
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    email: updatedUser.email,
                    phone: updatedUser.phone
                });
            } else {
                alert("Oops, something went wrong... Please try again!");
            }
        }).catch(error => {
            console.error('Error updating user:', error);
            alert("Oops, something went wrong... Please try again!");
        });
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
            <form onSubmit={editDetails}>
                <label htmlFor="firstName">firstName:</label>
                <input id="firstName" type="text" defaultValue={currentUser.firstName} /><br />

                <label htmlFor="lastName">lastName:</label>
                <input id="lastName" type="text" defaultValue={currentUser.lastName} /><br />

                <label htmlFor="phone">phone:</label>
                <input id="phone" type="tel" defaultValue={currentUser.phone} /><br />

                <label htmlFor="email">email:</label>
                <input id="email" type="email" defaultValue={currentUser.email} /><br />

                {currentUser.userType === 'driver' &&
                    <>
                        <label htmlFor="religiousSector">religiousSector:</label>
                        <input id="religiousSector" type="text" defaultValue={currentUser.religiousSector} /><br />
                    </>
                }

                <input type="submit" value="edit" />
            </form>

            <button onClick={() => setPasswordChange(true)}>שינוי סיסמה</button>

            {passwordChange && (
                <div className="overlay">
                    <div className="modal">
                        <h2>שינוי סיסמה</h2>
                        <form onSubmit={handlePasswordChange}>
                            <label htmlFor="currentPassword">סיסמה נוכחית:</label>
                            <input id="currentPassword" type="password" required /><br />

                            <label htmlFor="newPassword">סיסמה חדשה:</label>
                            <input id="newPassword" type="password" required /><br />

                            <label htmlFor="confirmPassword">אימות סיסמה חדשה:</label>
                            <input id="confirmPassword" type="password" required /><br />

                            {passwordError && <p className="error">{passwordError}</p>}

                            <input type="submit" value="שמור" />
                            <button type="button" onClick={() => setPasswordChange(false)}>ביטול</button>
                        </form>
                    </div>
                </div>
            )}

            {updateSuccess && (
                <div className="overlay">
                    <div className="modal">
                        <h2>הפרטים עודכנו בהצלחה!</h2>
                        <button onClick={handleConfirmation}>אישור</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditDetails;
