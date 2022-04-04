import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/Link'
import styles from '../styles/Home.module.css'
import Navigation from '../components/navigation.component';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';

export default function Home() {

  const [userData, setUserData] = useState({ username: "" });
  const [authenticated, setAuthenticated] = useState(false);

  async function AuthenticateUser() {
    try {
      const cookies = new Cookies();
      const sessID = cookies.get("sessID");
      const query = `?sessId=${sessID}`;
      const res = await axios.get(`http://localhost:8080/api/authenticate${query}`);
      console.log(res.data);
      setUserData({ username: res.data.username });
      setAuthenticated(true);
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    AuthenticateUser();
  }, [])

  return (
    <>
      <Head>
        <title>SimpleBlog - Home</title>
        <meta name="description" content="Create your space." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation>
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </Navigation>
      <div className={styles.header}>
        <h1 className={styles.heading}>SimpleBlog</h1>
        <h1 className={styles.subheading}>Create your space.</h1>
        <p>username: {userData.username}</p>
      </div>
      <div className={styles.main}>
        <div className={styles.container}>
          <h3 className={styles.pheading}>Why use SimpleBlog?</h3>
          <p className={styles.paragraph}>This is just an example paragraph.</p>
        </div>
      </div>
    </>
  )
}
