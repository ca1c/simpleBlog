import styles from '../../styles/createPost.module.css';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'universal-cookie';

import Navigation from '../../components/navigation.component';
import AuthenticateUser from '../../util/authenticate';

function EditPost({ data }) {
    const props = data;
    console.log(props);
    const [authenticated, setAuthenticated] = useState(false);
    const [bodyText, setBodyText] = useState(props.bodyText);
    const [titleText, setTitleText] = useState(props.title);
    const [subheadingText, setSubheadingText] = useState(props.subheading);
    const [user, setUser] = useState("");
    const router = useRouter();
    const { postId } = router.query;

    function handleBodyChange(e) {
        let value = e.target.value;
        setBodyText(value);
    }

    function handleTitleChange(e) {
        let value = e.target.value;
        setTitleText(value);
    }

    function handleSubheadingChange(e) {
        let value = e.target.value;
        setSubheadingText(value);
    }

    function submitPost() {

        console.log(user);

        const blogPost = {
            username: user,
            pid: postId,
            title: titleText,
            subheading: subheadingText,
            bodyText: bodyText, 
        }

        axios.post("http://localhost:8080/api/editPost", blogPost).then((res) => {
            console.log(res.data.success, res.data.message);
        })
    }

    useEffect(() => {
        AuthenticateUser.then((data) => {
            if(data.success) {
                setUser(data.user);
            }
            setAuthenticated(data.success);
            console.log('ran')
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
                authenticated ?
                <div className={styles.box}>
                    <div className="container-fluid">
                        <h2>Create Blog Post</h2>
                        <div className="mb-3">
                            <input className="form-control" placeholder="title" value={titleText} onChange={handleTitleChange}/>
                        </div>
                        <div className="mb-3">
                            <input className="form-control" placeholder="subheading" value={subheadingText} onChange={handleSubheadingChange}/>
                        </div>
                        <div className="mb-3">
                            <textarea className="form-control" placeholder="body" value={bodyText} onChange={handleBodyChange} rows="3"></textarea>
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary" onClick={submitPost}>Submit</button>
                        </div>
                        <div className="title">
                            <h4>{titleText}</h4>
                        </div>
                        <div className="subheading">
                            <h6>{subheadingText}</h6>
                        </div>
                        <div className="bodyText">
                            {bodyText}
                        </div>
                    </div>
                </div>
                :
                <h1>You do not own this post.</h1>
            }
        </>
    )
}

export async function getServerSideProps(context) {
    const res = await axios.get(`http://localhost:8080/api/getPost?post=${context.params.postId}`);
    const data = await res.data;

    return { props: { data } };
}

export default EditPost

