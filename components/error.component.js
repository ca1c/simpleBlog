import styles from '../styles/components/Error.module.css';
import { useState } from 'react';

export default function Error({close, message}) {

    return (
        <>
            <div className={styles.error}>
                {message}
                <button onClick={close} className={styles.errorButton}>close</button>
            </div>
        </>
    )
}