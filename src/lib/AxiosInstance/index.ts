import axios from "axios";
import { cookies } from "next/headers";

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async function (config) {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToekn")?.value

    if(accessToken){
      config.headers.Authorization = accessToken
    }

    return config; 
  });

export default axiosInstance;
