import styles from '../styles/components/Navigation.module.css';


export default function Navigation({children}) {

    return (
        <>
            <nav className={styles.navigation}>
                {children}
            </nav>
        </>
    )
}