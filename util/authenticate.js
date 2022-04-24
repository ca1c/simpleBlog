import axios from 'axios';
import Cookies from 'universal-cookie';

const AuthenticateUser = new Promise(async (resolve, reject) => {
    try {
        const cookies = new Cookies();
        const sessID = cookies.get("sessID");
        const query = `?sessId=${sessID}`;
        const res = await axios.get(`http://localhost:8080/api/authenticate${query}`);
        if(res.data.success) {
            resolve(res.data.username);
        }

        reject("not authenticated, user must login");
    } catch(error) {
        reject(error);
    }
})

export default AuthenticateUser;