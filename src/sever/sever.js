import Axios from 'axios'
import qs from 'qs'
const baseUrl = process.env.NODE_ENV === 'production' ? window.hostName : '/Sev'
const instance = Axios.create({
  baseURL: '',
  timeout: 30000,
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
})
instance.interceptors.response.use(
  response => {
    // 拦截响应，做统一处理
    // if (response.data.code) {
    //   // switch (response.data.code) {
    //   //     case 1002:

    //   // }
    //   if (response.data.code == 1) {
    //     return response
    //   } else {

    //   }
    // } else {

    // }
    return response
  },
  // 接口错误状态处理，也就是说无响应时的处理
  error => {

  })
export default {
  get(url, parame) {
    return instance.get(baseUrl + url, {
      params: parame
    })
  },
  post(url, parame) {
    return instance({
      url: baseUrl + url,
      method: 'post',
      data: qs.stringify(parame),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
}
