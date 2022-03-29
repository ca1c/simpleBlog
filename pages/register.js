import { useState } from 'react'
import styles from '../styles/login.module.css'
import axios from 'axios';

import Head from 'next/head'

export default function Register() {
    return (
        <>
            <Head>
                <title>SimpleBlog - Register</title>
            </Head>
            <div className={styles.container}>
                <h1 className={styles.subheading}>Register</h1>
                <label>Username:</label>
                <input type="text" placeholder="username" className={styles.input} />
                <label>Email:</label>
                <input type="text" placeholder="example@gmail.com" className={styles.input} />
                <label>Password:</label>
                <input type="text" placeholder="password" className={styles.input} />
                <button className={styles.button}>Register</button>
            </div>
        </>
    )
}