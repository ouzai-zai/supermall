//axios实例
import axios from "axios";

export function request(config) {
  const instance = axios.create({
    // baseURL: 'https://dc.3.cn',
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  }) 

  // axios的拦截器
    // 拦截请求
    instance.interceptors.request.use(config => {
      // console.log(config);
      return config
    }),err => {
      // console.log(err);
    }
    // 拦截响应
    instance.interceptors.response.use(res => {
      console.log(res);
      return res.data
    }),err => {
      console.log(err);
    }

  return instance(config)
}
