import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/login.module.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import redirect from 'nextjs-redirect';
import Navigation from '../../components/navigation.component';
import Error from '../../components/error.component';
import Link from 'next/Link';


import Head from 'next/head'
import AuthenticateUser from '../../util/authenticate';

export default function Register() {

    const [registryDetails, setRegistryDetails] = useState({username: "", email: "", password: ""})
    const [errorMessage, setErrorMessage] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
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

    useEffect(() => {
        AuthenticateUser.then((username) => {
            setUserData({ username: username });
            setAuthenticated(true);
        })
        .catch((err) => {
            console.log(err);
        })
    },[])

    return (
        <>
            <Head>
                <title>SimpleBlog - Register</title>
            </Head>
            <Navigation authenticated={authenticated}/>
            <div className={styles.box}>
                <div className="container-fluid">
                    <div className="mb-3">
                        <h2>Register</h2>
                        <label className="form-label">Username:</label>
                        <input type="text" placeholder="username" className="form-control" onChange={handleUsernameChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input type="text" placeholder="example@gmail.com" className="form-control" onChange={handleEmailChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input type="password" placeholder="password" className="form-control" onChange={handlePasswordChange}/>
                    </div>
                    <button className="btn btn-primary" onClick={submitRegistry}>Register</button>
                    {
                        errorVisible ?
                        <Error close={closeError} message={errorMessage}/>
                        :
                        <div></div>
                    }
                </div>
            </div>
            <div className={styles.container}>

            </div>
        </>
    )
}