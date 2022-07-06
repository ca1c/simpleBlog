import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/Link'
import styles from '../styles/Home.module.css'
import Navigation from '../components/navigation.component';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import AuthenticateUser from '../util/authenticate';

export default function Home() {

  const [userData, setUserData] = useState({ username: "" });
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    AuthenticateUser.then((username) => {
      setUserData({ username: username });
      setAuthenticated(true);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <>
      <Head>
        <title>SimpleBlog - Home</title>
        <meta name="description" content="Create your space." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation authenticated={authenticated} />
      <div className={styles.hero}>
        <div className="container-fluid">
          <div className={styles.header}>
            <h1 className={styles.heading}>SimpleBlog</h1>
            <h1 className={styles.subheading}>Create your space.</h1>
          </div>
        </div>
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
