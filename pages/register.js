import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/login.module.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import redirect from 'nextjs-redirect';
import Navigation from '../components/navigation.component';
import Error from '../components/error.component';
import Link from 'next/Link';


import Head from 'next/head'

export default function Register() {

    const [registryDetails, setRegistryDetails] = useState({username: "", email: "", password: ""})
    const [errorMessage, setErrorMessage] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);
    const router = useRouter();

    function handleUsernameChange(e) {
        var value = e.target.value;
        setRegistryDetails({username: value, email: registryDetails.email, password: registryDetails.password})
    }
    function handleEmailChange(e) {
        var value = e.target.value;
        setRegistryDetails({username: registryDetails.username, email: value, password: registryDetails.password})
    }
    function handlePasswordChange(e) {
        var value = e.target.value;
        setRegistryDetails({username: registryDetails.username, email: registryDetails.email, password: value})
    }

    function submitRegistry() {
        axios.post('http://localhost:8080/api/register', registryDetails)
            .then((res) => {
                console.log(res.data);
                if(res.data.success) {
                    const cookies = new Cookies();
                    cookies.set('sessID', res.data.sessID, { SameSite: true });
                    router.push('/');
                }
                else {
                    console.log('ran');
                    setErrorMessage(res.data.message);
                    setErrorVisible(true);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function closeError() {
        setErrorVisible(false);
    }

    return (
        <>
            <Head>
                <title>SimpleBlog - Register</title>
            </Head>
            <Navigation>
                <Link href="/">Home</Link>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
            </Navigation>
            <div className={styles.container}>
                <h1 className={styles.subheading}>Register</h1>
                <label>Username:</label>
                <input type="text" placeholder="username" className={styles.input} onChange={handleUsernameChange}/>
                <label>Email:</label>
                <input type="text" placeholder="example@gmail.com" className={styles.input} onChange={handleEmailChange}/>
                <label>Password:</label>
                <input type="password" placeholder="password" className={styles.input} onChange={handlePasswordChange}/>
                <button className={styles.button} onClick={submitRegistry}>Register</button>
                {
                    errorVisible ?
                    <Error close={closeError} message={errorMessage}/>
                    :
                    <div></div>
                }
            </div>
        </>
    )
}