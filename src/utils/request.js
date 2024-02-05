import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VU_APP_BASE_API,
  timeout: 5000
})

export default service
