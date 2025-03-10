import axios from "axios";
const client = axios.create({
    baseURL: 'http://localhost:8000',
    // baseURL: 'http://192.168.1.104',

    // timeout: 1000,
    headers: { "Accept": "application/json" },
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
});
client.defaults.withCredentials = true;
client.defaults.withXSRFToken = true;
export default client;