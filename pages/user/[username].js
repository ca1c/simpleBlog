import { useState, useEffect } from "react";
import axios from "axios";
import AuthenticateUser from "../../util/authenticate";
import Navigation from "../../components/navigation.component";

function SingleUser({ data }) {
    const [authenticated, setAuthenticated] = useState(false);
    const props = data;
    const username = props.success === true ? props.data.username : props.message;
    const posts = props.success === true ? props.data.posts : props.message;

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
            {
                props.success ? 
            <>
                <h1>{username}</h1>
                <ul>
                    { posts.length > 0 ? 
                        posts.map((post) => {
                            return(
                                <li>
                                    {post.title}
                                </li>
                            )
                        })
                        :
                        <p>This user does not have any posts.</p>
                    }
                </ul>
             </>
             :
             <h1>user not found</h1>
            }
        </>
    )
}

export async function getServerSideProps(context) {
    const res = await axios.get(`http://localhost:8080/api/getUserData?username=${context.params.username}`);
    const data = await res.data;

    return { props: { data } };
}

export default SingleUser;