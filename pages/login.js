import { useState } from 'react'
import { useRouter } from 'next/router';
import styles from '../styles/login.module.css'
import axios from 'axios';
import Cookies from 'universal-cookie';
import redirect from 'nextjs-redirect';
import Navigation from '../components/navigation.component';
import Error from '../components/error.component';
import Link from 'next/Link';

import Head from 'next/head'

export default function Login() {
    const [loginDetails, setLoginDetails] = useState({username: "", password: ""});
    const router = useRouter();

    function handleUsernameChange(e) {
        var value = e.target.value;
        setLoginDetails({username: value, password: loginDetails.password});
    }

    function handlePasswordChange(e) {
        var value = e.target.value;
        setLoginDetails({username: loginDetails.username, password: value});
    }

    function SubmitLogin() {
        axios.post('http://localhost:8080/api/login', loginDetails)
            .then((res) => {
                const cookies = new Cookies();
                cookies.set('sessID', res.data.sessID);
                router.push('/');
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
            <Navigation>
                <Link href="/">Home</Link>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
            </Navigation>
            <div className={styles.outerContainer}>
                <div className={styles.container}>
                    <h1 className={styles.subheading}>Login</h1>
                    <label>Username:</label>
                    <input type="text" placeholder="username" className={styles.input} onChange={handleUsernameChange} />
                    <label>Password:</label>
                    <input type="password" placeholder="password" className={styles.input} onChange={handlePasswordChange} />
                    <button className={styles.button} onClick={SubmitLogin}>Login</button>
                    <Error visible={true} message="Username or password incorrect"/>
                </div>
            </div>
        </>
    );
}