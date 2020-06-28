import React, { useEffect, useContext } from 'react'
import { useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import AuthContext from '../context/auth.context'


export default function AuthPage() {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        login: '',
        password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            message(data.message)
        } catch (e) { }
    }

    const loginHandler = async () => {
        try {

            const data = await request('/api/auth/login', 'POST', { ...form })
            message(data.message)
            auth.login(data.token, data.userId)

        } catch (e) {
        }
    }


    return (
        <div className="row center-align ">
            <div className="col l6 xl4 m6 s12 offset-l3 offset-xl4 offset-m3">
                <h5>Авторизация/Регистрация</h5>
                <div className="card blue darken-1 ">
                    <div className="card-content white-text">
                        <span className="card-title">Auth/Reg</span>
                        <div>

                            <div className="input-field">
                                <input id="login" type="text" className="validate white-input" name="login" onChange={changeHandler} />
                                <label htmlFor="login">login</label>
                            </div>
                            <div className="input-field">
                                <input id="password" type="password" className="validate white-input" name="password" onChange={changeHandler} />
                                <label htmlFor="password">password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button onClick={loginHandler} disabled={loading} className="btn yellow darken-4 marginright">Войти</button>
                        <button onClick={registerHandler} disabled={loading} className="btn grey lighten-1  white-text">регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
