import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/Link'
import styles from '../styles/Home.module.css'
import Navigation from '../components/navigation.component';
import axios from 'axios';

export default function Home() {

  return (
    <>
      <Head>
        <title>SimpleBlog - Home</title>
        <meta name="description" content="Create your space." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </Navigation>
      <div className={styles.header}>
        <h1 className={styles.heading}>SimpleBlog</h1>
        <h1 className={styles.subheading}>Create your space.</h1>
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
