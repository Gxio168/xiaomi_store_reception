import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { getToken } from '@/utils/auth';
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})

request.interceptors.request.use(function (config: AxiosRequestConfig) {
  (config.headers?.common as any)["Authorization"] = getToken();  // 设置请求头
  return config;
}, function (error) {
  return Promise.reject(error);
});

request.interceptors.response.use(function (response: AxiosResponse) {
  const res = response.data;
  if (res.statusCode !== 200) {
    ElMessage.error({
      message: res.message
    })
  }
  return res
}, function (error) {
  return Promise.reject(error)
})


export default request