import axios from "axios";

async function login(usuario, password) {
    // const config = {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    //   }
    const url = "http://tomcat-testing:8071/test/login";
    // const user = { email, password };
    const user = new URLSearchParams();
    user.append('usuario', usuario);
    user.append('password', password);
    const res = await axios.post(url, user)
    console.log(res)
    return res.data;
}


export default {
    login,
}