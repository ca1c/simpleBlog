import styles from '../../styles/createPost.module.css';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Navigation from '../../components/navigation.component';
import AuthenticateUser from '../../util/authenticate';

export default function createPost() {
    const [authenticated, setAuthenticated] = useState(false);
    const [bodyText, setBodyText] = useState("");
    const [titleText, setTitleText] = useState("");
    const [subheadingText, setSubheadingText] = useState("");
    const router = useRouter();

    useEffect(() => {
        AuthenticateUser.then((username) => {
            setAuthenticated(true);
            console.log(username);
        })
        .catch((err) => {
            console.log(err);
            router.push('/login');
        })
    }, [])

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

    return (
        <>
            <Navigation authenticated={authenticated}/>
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
        </>
    )
}