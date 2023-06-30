import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
const http = axios.create({
    baseURL: '/',
    timeout: 60000,
    withCredentials: true,
})



http.interceptors.request.use((config: AxiosRequestConfig):any => {
        return config;
    },(error) => {
        return Promise.reject(error)
    }
)

http.interceptors.response.use((response:AxiosResponse) => {
    const dataAxios = response.data
        // 这个状态码是和后端约定的
    const code = dataAxios.reset
    return dataAxios
},(error)=>{
    return Promise.reject(error)
})





export default http