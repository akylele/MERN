import { useState, useCallback, useContext } from 'react'
import AuthContext from '../context/auth.context'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const auth = useContext(AuthContext)

    const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {

        setLoading(true)
        try {

            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, { method, body, headers })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Что-то не так')
            }

            setLoading(false)
            auth.getLen()

            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [auth])

    const clearError = useCallback(() => setError(null), [])

    return { loading, request, error, clearError }
}