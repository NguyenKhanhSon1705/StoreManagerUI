import axios from "axios";
import Cookies from "js-cookie";

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_2
})

httpRequest.interceptors.request.use(function (config) {
  // Do something before request is sent
  // gắn token vào header
  let token = Cookies.get(process.env.REACT_APP_COOKIES)
  config.headers = {
      authorization: token ? `Bearer ${token}` : null
  }
  return config;
});

// Add a response interceptor
httpRequest.interceptors.response.use(function (response) {
  // refresh token
  
  return response;
});

export default httpRequest