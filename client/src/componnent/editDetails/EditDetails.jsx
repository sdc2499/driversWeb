import React, { useContext } from 'react'
import { UserContext } from '../../App'


const EditDetails = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);

    const editDetails = (element) => {
        element.preventDefault()
        const updatedUser = {
            firstName: element.target[0].value,
            lastName: element.target[1].value,
            phone: element.target[2].value,
            email: element.target[3].value
        }
        console.log("updatedUser:::" + updatedUser + " " + updatedUser.phone)
        // fetch(`http://localhost:8080/users/${currentUser.id}`, {
        //     method: 'PUT',
        //     body: JSON.stringify(updatedUser),
        //     headers: { 'Content-type': 'application/json; charset=UTF-8' }
        // }).then(response => {
        //     response.status ==200? () => {
        //         alert("wow");
        //         setCurrentUser({
        //             id: currentUser.id,
        //             firstName: element.target[0].value,
        //             lastName: element.target[1].value,
        //             email: element.target[3].value,
        //             phone: element.target[2].value,
        //             userType: currentUser.userType
        //         });
        //         // localStorage.setItem('currentUser', JSON.stringify({ phone: element.target[2].value, userId: currentUser.id, token: currentUser.token }));
        //     } : alert("oops somthing went wrong... please try again!")
        // });


        fetch(`http://localhost:8080/users/${currentUser.id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedUser),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }).then(response => {
            if (response.status === 200) {
                alert("Updated successfully!");
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
    }



    return (<>
        <form onSubmit={editDetails}>
            <label htmlFor="firstName">firstName:</label>
            <input id="firstName" type="text" defaultValue={currentUser.firstName} /><br />

            <label htmlFor="lastName">lastName:</label>
            <input id="lastName" type="text" defaultValue={currentUser.lastName} /><br />

            <label htmlFor="phone">phone:</label>
            <input id="phone" type="tel" defaultValue={currentUser.phone} /><br />

            <label htmlFor="email">email:</label>
            <input id="email" type="email" defaultValue={currentUser.email} /><br />

            {currentUser.userType == 'driver' &&
                <>
                    <label htmlFor="religiousSector">religiousSector:</label>
                    <input id="religiousSector" type="text" defaultValue={currentUser.religiousSector} /><br />
                </>

            }

            <input type="submit" value="edit" />

        </form>
    </>
    )
}
export default EditDetails