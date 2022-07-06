import Link from 'next/link';


export default function Navigation(props) {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link href="/"><a className="navbar-brand">SimpleBlog</a></Link>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <Link href="/login"><a className="nav-link">Login</a></Link>
                        </li>
                        <li className="nav-item">
                        <Link href="/register"><a className="nav-link">Register</a></Link>
                        </li>
                        <li className="nav-item">
                        {
                            props.authenticated ?    
                            <Link href="/logout">Log Out</Link>
                            :
                            <div></div>
                        }
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}