import axiosInstance from 'axios';
import ENDPOINT from './endpoint';
import local from '../utils/localStorage';
import DeviceDetector from "device-detector-js";
import { getToast } from "../utils/toast";
import toastLibrary from '../utils/toastLibrary';

const deviceDetector = new DeviceDetector();


const axios = axiosInstance.create({
  baseURL: ENDPOINT.BASE_URL,
  timeout: 60000,
  headers: {
    'Access-Control-Allow-Headers':'Content-Type',
    "Content-Type": "application/json; charset=UTF-8",
    "Device": JSON.stringify(deviceDetector.parse(navigator.userAgent)) 
  },
});

axios.interceptors.request.use(
   async(config) =>{
    const accessToken = local.get('accessToken') ? 'Bearer '+ local.get('accessToken') : null;
    // if(config.url?.indexOf('./login') >= 0 || config.url?.indexOf('./getToken') >= 0 ){
    //   return config
    // }
    if (accessToken) {
      return {
        ...config,
        headers: {
          Authorization: accessToken,  // auto attach token
          ...config.headers, // but you can override for some requests
        }
      }
    }
    return config
  },
  
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async(res) => {
    // if(res?.data?.status == 401 && !res?.data?.auth){
    //   //refresh token...
    //   const refreshToken = local.get('refreshToken') || null;
    //   const result = await axios.post('/getToken',{refreshToken})
    //   if(result?.status === 200){
    //     local.add('accessToken',JSON.stringify(result.data.accessToken));
    //   }
    // }
    return res.data;
  },
  (err) => {
    toastLibrary("error",err.response?.data?.errorMessage)
    console.log('err',err)
  }
);


export default axios;
