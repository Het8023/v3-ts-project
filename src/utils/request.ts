import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  type Method
} from 'axios'
import type { DataType } from './types'

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 20000
})

// 添加请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么
    return config
  },
  (error: AxiosError) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // 请求成功,将response.data返回出去
    if (response.status === 200 && response.data.code === 20000) {
      return response.data
    }
  },
  (error: AxiosError) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

const request = <T = any>(
  url: string,
  method: Method = 'GET',
  data?: Object,
  options?: InternalAxiosRequestConfig
) => {
  return service.request<T, DataType>({
    url,
    method,
    [method === 'GET' ? 'params' : 'data']: data,
    ...options
  })
}

export const get = <T = any>(url: string, data: Object) => {
  return request<T>(url, 'GET', data)
}
export const post = <T = any>(url: string, data: Object) => {
  return request<T>(url, 'POST', data)
}
export const put = <T = any>(url: string, data: Object) => {
  return request<T>(url, 'PUT', data)
}
export const del = <T = any>(url: string, data: Object) => {
  return request<T>(url, 'DELETE', data)
}

export default request
