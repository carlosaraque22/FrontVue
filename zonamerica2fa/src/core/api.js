import axios from "axios";

async function login(email, password) {
    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    const url = "http://10.100.32.84:5000/test/login";
    const user = { email, password };
    console.log(user)
    const res = await axios.post(url, user, config)
    return res.data;
}


export default {
    login,
}