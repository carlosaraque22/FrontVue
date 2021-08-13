import axios from "axios";

async function login(email, password) {
    const url = "http://10.100.32.84:5000/test/login";
    const user = { email, password };
    const res = await axios.post(url, user)
    return res.data;
}


export default {
    login,
}