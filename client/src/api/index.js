import axios from 'axios'


export const configureApi = () => {
    const instance = axios.create({
        baseURL: '/api',
    })

    instance.interceptors.request.use(
        config => (config),
        error => {
            return Promise.reject(error)
        }
    )

    instance.interceptors.response.use(
        response => {
            return response
        },
        error => {
            return Promise.reject(error)
        }
    )

    return instance
}