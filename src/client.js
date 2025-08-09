import axios from "axios";
import Swal from 'sweetalert2'
import router from "./router";
import Cookies from "js-cookie";
const client = axios.create({
    // baseURL: 'http://localhost:8000',

    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,

    // timeout: 1000,
    headers: { "Accept": "application/json", "ngrok-skip-browser-warning": "true" },
    // xsrfCookieName: "XSRF-TOKEN",
    // xsrfHeaderName: "X-XSRF-TOKEN",
});
client.defaults.withCredentials = true;
client.defaults.withXSRFToken = true;
client.interceptors.request.use(config => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }
    return config;
});
client.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data.message) {
        Swal.fire({
            title: 'Succès',
            text: response.data.message,
            icon: 'success',
            confirmButtonText: 'OK'
        })
    }
    return response;
}, function (error) {
    if (error.status === 401) {
        router.push({ 'name': 'login' })
    } else {
        Swal.fire({
            title: 'Une erreur s\'est produite',
            text: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
    return Promise.reject(error);
})
export default client;

