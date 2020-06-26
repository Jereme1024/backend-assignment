import axios, { AxiosAdapter, AxiosResponse, AxiosInstance } from 'axios'
const httpAdapter = require('axios/lib/adapters/http') // eslint-disable-line
const settle = require('axios/lib/core/settle') // eslint-disable-line
import axiosRetry from 'axios-retry'

function createRetryStatus200Axios(
    checkFormat: (res: AxiosResponse) => boolean,
    axiosRetryConfig: any
): AxiosInstance {
    const customAdapter: AxiosAdapter = (config: any) =>
        new Promise((resolve, reject) => {
            httpAdapter(config)
                .then((response: AxiosResponse) => {
                    if (response.status === 200 && !checkFormat(response)) {
                        response.status = 1000
                    }
                    settle(resolve, reject, response)
                })
                .catch(reject)
        })
    const axiosInstance = axios.create({ adapter: customAdapter })
    axiosRetryConfig.retryCondition = () => {
        return true
    }
    axiosRetry(axiosInstance, axiosRetryConfig)
    return axiosInstance
}

export default createRetryStatus200Axios
