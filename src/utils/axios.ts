import Axios from 'axios'

interface AxiosConfig {
  timeout: number;
  headers: {
    'Content-Type': string
  };
}

const config: AxiosConfig = {
  timeout: 600000,
  headers: {
    'Content-Type': 'application/json'
  }
}

const axios = Axios.create(config)

// post请求
axios.post = (url: string, params?: any): any =>
  axios({
    method: 'post',
    url,
    data: params
  })

// get请求
axios.get = (url: string, params?: object): any =>
  axios({
    method: 'get',
    url,
    params
  })

export default axios
