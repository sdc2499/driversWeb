import react,{useContext} from 'react'
import { UserContext } from '../../App'


const EditDetails = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);

    const editDetails = (element) => {
        element.preventDefault()
console.log(element.target[0].value)
        fetch(`http://localhost:8080/users/${currentUser.id}`, {
            method: 'PUT',
            body: JSON.stringify({ firstName: element.target[0].value, lastName: element.target[1].value , phone: element.target[2].value, email: element.target[3].value})

        }).then(response => {

            response.ok ? alert("wow") : alert("oops somthing went wrong... please try again!")
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