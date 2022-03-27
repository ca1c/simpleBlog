import { useState } from 'react';
import styles from '../styles/login.module.css';

import Head from 'next/head'
import TextInput from '../components/textInput.component';

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
        console.log(loginDetails);
    }

    return (
        <>
            <Head>
                <title>SimpleBlog - Login</title>
            </Head>
            <div className={styles.container}>
                <h1>Login</h1>
                <div className={styles.container}>
                    <label>Username:</label>
                    <input type="text" onChange={handleUsernameChange} />
                    <label>Password:</label>
                    <input type="password" onChange={handlePasswordChange} />
                    <button onClick={SubmitLogin}>Login</button>
                </div>
            </div>
        </>
    );
}