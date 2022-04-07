import styles from '../styles/components/Error.module.css';
import { useState } from 'react';

export default function Error({visible, message}) {
    const [stateVisible, setStateVisible] = useState(visible);
    
    function toggleVisible() {
        setStateVisible(stateVisible ? false : true);
    }

    return (
        <>
            {stateVisible ?
                <div className={styles.error}>
                    {message}
                    <button onClick={toggleVisible} className={styles.errorButton}>close</button>
                </div>
                
                     :
                <div></div>
            }   
        </>
    )
}