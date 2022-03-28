import { useState } from 'react'
import styles from '../styles/login.module.css'
import axios from 'axios';

import Head from 'next/head'

export default function Login() {
    const [loginDetails, setLoginDetails] = useState({username: "", password: ""});

    function handleUsernameChange(e) {
        var value = e.target.value;
        setLoginDetails({username: value, password: loginDetails.password});
    }

    function handlePasswordChange(e) {
        var value = e.target.value;
        setLoginDetails({username: loginDetails.username, password: value});
    }

    function SubmitLogin() {
        axios.post('http://localhost:8080/login', loginDetails)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <Head>
                <title>SimpleBlog - Login</title>
            </Head>
            <div className={styles.outerContainer}>
                <div className={styles.container}>
                    <h1 className={styles.subheading}>Login</h1>
                    <label>Username:</label>
                    <input type="text" placeholder="username" className={styles.input} onChange={handleUsernameChange} />
                    <label>Password:</label>
                    <input type="password" placeholder="password" className={styles.input} onChange={handlePasswordChange} />
                    <button className={styles.button} onClick={SubmitLogin}>Login</button>
                </div>
            </div>
        </>
    );
}