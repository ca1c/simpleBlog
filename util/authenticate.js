import axios from 'axios';
import Cookies from 'universal-cookie';

const AuthenticateUser = new Promise(async (resolve, reject) => {
    try {
        const cookies = new Cookies();
        const sessID = cookies.get("sessID");
        const query = `?sessId=${sessID}`;
        const res = await axios.get(`http://localhost:8080/api/authenticate${query}`);
        if(res.data.success) {
            resolve({ success: true, user: res.data.username, message: "user authenticated" });
        }

        resolve({ success: false, message: "user not authenticated"});
    } catch(error) {
        reject({success: false, message: err });
    }
})

export default AuthenticateUser;