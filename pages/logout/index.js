import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from 'universal-cookie';
import axios from 'axios';

export default function Logout() {
    const router = useRouter();

    function getSessionId() {
        const cookies = new Cookies();
        return {sessId: cookies.get('sessID')}
    }

    useEffect(() => {
        console.log('ran');
        axios.post('http://localhost:8080/api/logout', getSessionId()).then((res) => {
            console.log(res.data);
            router.push('/');
        })
        .catch((err) => {
            console.log(err);
        })
    },[])

    return ( 
        <>
        </>
    )
}