import axios from "axios";

export const API = axios.create({
    baseURL : "http://localhost:1000/api/src",
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

API.interceptors.request.use( function(request){
    let token = localStorage.getItem("token") ?? "";
    request.headers.Authorization = `Bearer ${token}`
    return request
})