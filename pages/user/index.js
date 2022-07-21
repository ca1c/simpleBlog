import { useState, useEffect } from "react";
import AuthenticateUser from "../../util/authenticate";
import Navigation from "../../components/navigation.component";

function User() {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        AuthenticateUser.then((data) => {
            setAuthenticated(data.success);
        })
        .catch((err) => {
            console.log(err);
            setAuthenticated(false);
        })
    },[])
    
    return (
        <>
            <Navigation authenticated={authenticated}/>
            <h1>User not found.</h1>
        </>
    )
}

export default User;