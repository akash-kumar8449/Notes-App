import axios from 'axios';

const apiEndPoint = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ✅ Include credentials (cookies) in requests
});

export const get=(url,params)=>apiEndPoint.get(url,{params});
export const post=(url,data)=>apiEndPoint.post(url,data);
export const put=(url,data)=>apiEndPoint.put(url,data);
export const del=(url)=>apiEndPoint.delete(url);