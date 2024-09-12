import axios from "axios";

const request = axios.create({
    baseURL: 'https://localhost:7080/api'
})
export default request