import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import styles from '../../styles/login.module.css'
import axios from 'axios';
import Cookies from 'universal-cookie';
import Navigation from '../../components/navigation.component';
import Error from '../../components/error.component';
import AuthenticateUser from '../../util/authenticate';

import Head from 'next/head'

export default function Login() {
    const [loginDetails, setLoginDetails] = useState({username: "", password: ""});
    const [errorMessage, setErrorMessage] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
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
                if(res.data.success) {
                    const cookies = new Cookies();
                    cookies.set('sessID', res.data.sessID);
                    router.push('/');
                }
                else {
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
                <title>SimpleBlog - Login</title>
            </Head>
            <Navigation authenticated={authenticated} />
            <div className={styles.box}>
                <div className="container-fluid">
                    <h2>Login</h2>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input type="text" placeholder="username" className="form-control" onChange={handleUsernameChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" placeholder="password" className="form-control" onChange={handlePasswordChange} />
                            <div id="passwordHelpBlock" className="form-text">
                                Your password must be 8-20 Characters long.
                            </div>
                        </div>

                        <button className="btn btn-primary" onClick={SubmitLogin}>Login</button>
                    </form>
                    {
                        errorVisible ?
                        <Error close={closeError} message={errorMessage}/>
                        :
                        <div></div>
                    }
                </div>
            </div>
        </>
    );
}