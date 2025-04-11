import axios from "axios";
import Swal from 'sweetalert2'
import router from "./router";
const client = axios.create({
    baseURL: 'http://localhost:8000',
    // baseURL: 'http://192.168.1.104:8000',

    // timeout: 1000,
    headers: { "Accept": "application/json" },
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
});
client.defaults.withCredentials = true;
client.defaults.withXSRFToken = true;
client.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    Swal.fire({
        title: 'Une erreur s\'est produite',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonText: 'OK'
    }).then(() => {
        if (error.status === 401)
            router.push({ 'name': 'login' })
    })
    return Promise.reject(error);
});

export default client;

