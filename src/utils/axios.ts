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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    data: params
  })

// get请求
// eslint-disable-next-line @typescript-eslint/ban-types
axios.get = (url: string, params?: any): any =>
  axios({
    method: 'get',
    url,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    params
  })

export default axios
