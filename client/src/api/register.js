import { api } from '../index'

export const register = data => {
    return api.post('/auth/register', data)
}

